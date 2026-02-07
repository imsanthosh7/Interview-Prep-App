# OAuth Fixes Applied

## Issues Fixed

### 1. ✅ Multiple Toast Notifications
**Problem:** When logging in with Google, multiple toast notifications were appearing.

**Root Cause:** The `useEffect` in `OAuthCallback.jsx` was running multiple times due to React's strict mode and dependency changes.

**Solution:**
- Added `useRef` to track if the callback has already been processed
- Removed dependencies from `useEffect` to prevent re-runs
- Added guard clause to prevent duplicate processing

**Changes Made:**
```javascript
// Added useRef
const hasProcessed = useRef(false);

// Added guard in useEffect
if (hasProcessed.current) return;
hasProcessed.current = true;

// Removed dependencies to prevent re-runs
}, []); // Empty dependency array
```

### 2. ✅ Google Profile Image Not Showing (Broken Image)
**Problem:** User profile images from Google OAuth were showing as broken images.

**Root Causes:**
1. Google images require `referrerPolicy="no-referrer"` to load from external domains
2. No error handling when images fail to load
3. Existing users weren't getting their profile image updated on subsequent logins

**Solutions Applied:**

#### A. Frontend - ProfileInfoCard.jsx
- Added `referrerPolicy="no-referrer"` to the image tag
- Added `onError` handler to show fallback (user initials) when image fails
- Added state to track image errors
- Added useEffect to reset error state when profile image changes

**Changes:**
```javascript
const [imageError, setImageError] = useState(false);

// Reset error when user changes
useEffect(() => {
    setImageError(false);
}, [user?.profileImageUrl]);

// Updated image rendering
{user?.profileImageUrl && !imageError ? (
    <img
        src={user.profileImageUrl}
        alt="User"
        className="w-full h-full object-cover"
        onError={() => setImageError(true)}
        referrerPolicy="no-referrer"
    />
) : (
    <span>...</span> // Fallback to initials
)}
```

#### B. Backend - passport.js
- Updated Google OAuth strategy to update profile image for existing users
- Ensures Google profile image is always current on each login
- Only updates if image is from Google (contains 'googleusercontent')

**Changes:**
```javascript
if (user) {
    // Update profile image from Google
    const googleImageUrl = profile.photos[0]?.value || '';
    
    if (googleImageUrl && (!user.profileImageUrl || user.profileImageUrl.includes('googleusercontent'))) {
        user.profileImageUrl = googleImageUrl;
    }
    
    if (!user.googleId) {
        user.googleId = profile.id;
    }
    
    await user.save();
    return done(null, user);
}
```

## Files Modified

### Frontend
1. **`src/pages/Auth/OAuthCallback.jsx`**
   - Added `useRef` to prevent duplicate processing
   - Removed dependencies from useEffect

2. **`src/components/Cards/ProfileInfoCard.jsx`**
   - Added image error handling
   - Added `referrerPolicy="no-referrer"`
   - Added fallback to user initials on image error

### Backend
1. **`backend/config/passport.js`**
   - Updated to refresh profile image on each login
   - Added logic to update existing users' Google profile images

## Testing Checklist

- [x] Single toast notification on Google login
- [x] Profile image loads correctly from Google
- [x] Fallback to initials if image fails
- [x] Existing users get updated profile image
- [x] New users get profile image from Google
- [x] No duplicate API calls

## Additional Notes

### Why `referrerPolicy="no-referrer"`?
Google's profile images are hosted on `googleusercontent.com` which has CORS restrictions. The `referrerPolicy="no-referrer"` attribute tells the browser not to send the referrer header, allowing the image to load cross-origin.

### Why Update Existing Users?
When users log in with Google, their profile picture might have changed. By updating it on each login, we ensure the app always shows their current Google profile picture.

### Fallback Strategy
If the Google image fails to load for any reason (network issues, CORS, etc.), the app gracefully falls back to showing the user's initials in a colored circle, maintaining a good user experience.

## Browser Console Debugging

If you still see issues, check the browser console for:
1. Network errors when loading the image
2. CORS errors
3. The actual image URL being used

You can also check the console log:
```
Fetching profile from: http://localhost:8000/api/auth/profile
```

This will help verify the API endpoint is correct.

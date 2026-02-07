# Google OAuth Setup Guide

This guide will help you set up Google OAuth authentication for the Interview Prep App.

## Prerequisites
- A Google account
- Access to Google Cloud Console

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click "New Project"
4. Enter a project name (e.g., "Interview Prep App")
5. Click "Create"

## Step 2: Enable Google+ API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

## Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Select "External" user type
3. Click "Create"
4. Fill in the required information:
   - **App name**: Interview Prep App
   - **User support email**: Your email
   - **Developer contact information**: Your email
5. Click "Save and Continue"
6. Skip the "Scopes" section (click "Save and Continue")
7. Add test users if needed (for development)
8. Click "Save and Continue"

## Step 4: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Web application" as the application type
4. Configure the following:
   - **Name**: Interview Prep App OAuth Client
   - **Authorized JavaScript origins**:
     - `http://localhost:5173` (for development)
     - Your production frontend URL (when deploying)
   - **Authorized redirect URIs**:
     - `http://localhost:8000/api/auth/google/callback` (for development)
     - Your production backend URL + `/api/auth/google/callback` (when deploying)
5. Click "Create"
6. **IMPORTANT**: Copy the Client ID and Client Secret

## Step 5: Update Environment Variables

1. Open your backend `.env` file
2. Add the following variables:

```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:8000/api/auth/google/callback
FRONTEND_URL=http://localhost:5173
```

3. Replace `your_client_id_here` and `your_client_secret_here` with the values from Step 4

## Step 6: Test the Integration

1. Restart your backend server:
   ```bash
   cd backend
   npm start
   ```

2. Restart your frontend server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Navigate to the signup or login page
4. Click "Sign up with Google" or "Continue with Google"
5. You should be redirected to Google's login page
6. After successful authentication, you'll be redirected back to your app

## Production Deployment

When deploying to production, make sure to:

1. Update the OAuth consent screen to "Production" status
2. Add your production URLs to the authorized origins and redirect URIs
3. Update the environment variables in your production environment:
   - `GOOGLE_CALLBACK_URL`: Your production backend URL + `/api/auth/google/callback`
   - `FRONTEND_URL`: Your production frontend URL
   - `NODE_ENV=production`

## Troubleshooting

### "redirect_uri_mismatch" error
- Make sure the redirect URI in your Google Console exactly matches the one in your `.env` file
- Check for trailing slashes - they must match exactly

### "Access blocked: This app's request is invalid"
- Verify that you've enabled the Google+ API
- Check that your OAuth consent screen is properly configured

### User not redirected after login
- Check your `FRONTEND_URL` environment variable
- Verify that the callback route `/auth/callback` exists in your frontend routes

## Security Notes

- Never commit your `.env` file to version control
- Keep your Client Secret secure
- Use HTTPS in production
- Regularly rotate your credentials

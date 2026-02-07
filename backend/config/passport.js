import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userModel from '../models/userModel.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:8000/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await userModel.findOne({ email: profile.emails[0].value });

        if (user) {
          // User exists, update profile image if it's from Google
          const googleImageUrl = profile.photos[0]?.value || '';

          // Update user's profile image and googleId if not already set
          if (googleImageUrl && (!user.profileImageUrl || user.profileImageUrl.includes('googleusercontent'))) {
            user.profileImageUrl = googleImageUrl;
          }

          if (!user.googleId) {
            user.googleId = profile.id;
          }

          await user.save();
          return done(null, user);
        }

        // Create new user
        user = await userModel.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          profileImageUrl: profile.photos[0]?.value || '',
          googleId: profile.id,
          password: 'oauth-user', // Placeholder password for OAuth users
        });

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;

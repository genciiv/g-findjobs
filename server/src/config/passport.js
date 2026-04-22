import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error(
    "Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in server/.env"
  );
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value || "";
        const fullName = profile.displayName || "Google User";
        const googleId = profile.id;
        const avatar = profile.photos?.[0]?.value || "";

        let user = await User.findOne({
          $or: [{ googleId }, { email }],
        });

        if (user) {
          if (!user.googleId) user.googleId = googleId;
          if (!user.avatar && avatar) user.avatar = avatar;
          if (!user.fullName && fullName) user.fullName = fullName;
          await user.save();
          return done(null, user);
        }

        user = await User.create({
          fullName,
          email,
          googleId,
          avatar,
          role: "candidate",
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
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import dotenv from "dotenv";
import routes from "./routes";
import User from "./models/User";
import {
  gihubLoginCallback,
  facebookLoginCallback
} from "./controllers/userController";

dotenv.config();

passport.use(User.createStrategy()); //shorcut

passport.use(
  //auth in githubLogin (Controller)
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: process.env.PRODUCTION
        ? `http://localhost:4000${routes.githubCallback}`
        : `https://aqueous-mountain-42753.herokuapp.com${routes.githubCallback}`
    },
    gihubLoginCallback
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `https://afraid-baboon-46.localtunnel.me${
        routes.facebookCallback
      }`,
      profileFields: ["id", "displayName", "photos", "email"],
      scope: ["public_profile", "email"]
    },
    facebookLoginCallback
  )
);
passport.serializeUser(User.serializeUser()); //serializer : we say only send user.id on the cookie

passport.deserializeUser(User.deserializeUser()); //deserializer : get the user by id

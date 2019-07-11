import passport from "passport";
import GithubStrategy from "passport-github";
import dotenv from "dotenv";
import routes from "./routes";
import User from "./models/User";
import { gihubLoginCallback } from "./controllers/userController";

dotenv.config();

passport.use(User.createStrategy()); //shorcut

passport.use(
  //auth in githubLogin (Controller)
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`
    },
    gihubLoginCallback
  )
);

passport.serializeUser(User.serializeUser()); //serializer : we say only send user.id on the cookie

passport.deserializeUser(User.deserializeUser()); //deserializer : get the user by id

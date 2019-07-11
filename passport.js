import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy()); //shorcut

passport.serializeUser(User.serializeUser()); //serializer : we say only send user.id on the cookie

passport.deserializeUser(User.deserializeUser()); //deserializer : get the user by id

import express from "express";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
import cors from "cors";
import session from "express-session";
import "dotenv/config";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import QuizRoutes from "./Kanbas/quizes/routes.js";

mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
const app = express();
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL
    })
);
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.HTTP_SERVER_DOMAIN,
    };
}


app.use(session(sessionOptions));


app.use(express.json());
const port = process.env.PORT || 4000;

UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
QuizRoutes(app);
app.listen(port);



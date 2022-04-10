const express = require("express");
const path = require("path");
// middleware
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();
const indexRouter = require("./Server/routes");
const signinRouter = require("./Server/routes/signin");
const signupRouter = require("./Server/routes/signup");

const app = express();
app.set("port", process.env.PORT || 9000);

const port = app.get("port");
const staticPath = path.join(__dirname, "/Frontend");

// set middleware
app.use(morgan("dev"));
app.use("/", express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session-cookie  ",
  })
);

app.use("/", indexRouter);
app.use("/signin", signinRouter);
app.use("/signup", signupRouter);

app.use((req, res, next) => {
  res.status(404).send("not found");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(port, () => {
  console.log("server listen", port);
});

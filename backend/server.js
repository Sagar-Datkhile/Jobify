import express from "express";
import db from "./db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import cloudinaryLib from "cloudinary";
import multer from "multer";
import cors from "cors";

const app = express();
const saltRounds = parseInt(process.env.SALT_ROUNDS);
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Aaalu le lo" });
});

app.post(
  "/signup",
  async (req, res, next) => {
    console.log("signup middleware");
    if (
      !(req.body.email &&
      req.body.password &&
      req.body.type &&
      req.body.fullName &&
      req.body.type == "employer"
        ? req.body.companyName
        : true)
    ) {
      return res.status(400).json({
        success: false,
        name: "INCOMPLETE_BODY",
        code: 61,
        message: "signup request body is incomplete.",
      });
    }
    const { email } = req.body;
    try {
      const response = await db.query(
        "SELECT * FROM users WHERE user_email = $1",
        [email]
      );
      if (response.rows.length == 0) {
        next();
      } else {
        return res.status(409).json({
          success: false,
          name: "INVALID_CREDENTIALS",
          code: 62,
          message: "the email passed for signup already exists in the server",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        name: "DATABASE_SERVER_ERROR",
        code: 63,
        message: "internal database server error",
      });
    }
  },
  async (req, res) => {
    console.log("signup route handler");

    const body = req.body;
    const { email, password, type, fullName } = body;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const data = await db.query(
        "INSERT INTO users(user_email, user_password, user_type) VALUES ($1,$2,$3) RETURNING user_id",
        [email, hashedPassword, type]
      );
      const user_id = await data.rows[0].user_id;
      if (type == "seeker") {
        await db.query(
          "insert into user_details(details_user_id,details_user_full_name) values ($1, $2)",
          [user_id, fullName]
        );
      } else {
        await db.query(
          "insert into user_details(details_user_id,details_user_full_name, details_company_name) values ($1, $2)",
          [user_id, fullName, body.companyName]
        );
      }
      res.status(200).json({
        success: true,
        code: 64,
        message: "user signup was successful",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        name: "DATABASE_SERVER_ERROR",
        code: 63,
        message: "internal database server error",
      });
    }
  }
);

app.post(
  "/signin",
  async (req, res, next) => {
    if (!(req.body.email && req.body.password)) {
      return res.status(400).json({
        success: false,
        name: "INCOMPLETE_BODY",
        code: 61,
        message: "signin request body is incomplete.",
      });
    }
    const { email } = req.body;
    try {
      const response = await db.query(
        "SELECT * FROM users WHERE user_email = $1",
        [email]
      );
      if (response.rows.length == 1) {
        next();
      } else {
        return res.status(401).json({
          success: false,
          name: "INVALID_CREDENTIALS",
          code: 62,
          message:
            "the email passed for signin does not exist in the server, please signup",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        name: "DATABASE_SERVER_ERROR",
        code: 63,
        message: "internal database server error",
      });
    }
  },
  async (req, res) => {
    const body = req.body;
    const { email, password } = body;
    try {
      const result = await db.query(
        "SELECT * FROM users WHERE user_email = $1",
        [email]
      );
      const hashedPassword = result.rows[0].user_password;
      const userType = result.rows[0].user_type;
      const isMatching = await bcrypt.compare(password, hashedPassword);
      if (isMatching) {
        const accessToken = jwt.sign(
          { user_email: email, user_type: userType },
          process.env.ACCESS_TOKEN_SECRET_KEY,
          { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
          { user_email: email },
          process.env.REFRESH_TOKEN_SECRET_KEY,
          { expiresIn: "7d" }
        );

        const refreshTokenExpiryTime = jwt.decode(refreshToken).exp;

        await db.query(
          "DELETE FROM user_refresh_tokens WHERE refresh_user_email = $1",
          [email]
        );

        await db.query(
          "INSERT INTO user_refresh_tokens (refresh_user_email, refresh_token, refresh_token_expires_at) VALUES ($1, $2, to_timestamp($3))",
          [email, refreshToken, refreshTokenExpiryTime]
        );

        res.cookie("jobify_refresh_token", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        });
        res.status(200).json({
          success: true,
          code: 64,
          message: "user signin was successful",
          access_token: accessToken,
        });
      } else {
        return res.status(401).json({
          success: false,
          name: "INVALID_CREDENTIALS",
          code: 65,
          message: "the password passed for signin is invalid.",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        name: "DATABASE_SERVER_ERROR",
        code: 63,
        message: "internal database server error",
      });
    }
  }
);

app.post(
  "/login",
  (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(400).json({
        success: false,
        name: "INCOMPLETE_BODY",
        code: 61,
        message: "access token missing.",
      });
    } else {
      next();
    }
  },
  (req, res) => {
    const accessToken = req.headers.authorization.split(" ")[1];
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      (err, user) => {
        if (err) {
          return res.status(401).json({
            success: false,
            name: "INVALID_CREDENTIALS",
            code: 66,
            message: "the access token passed for login is invalid.",
          });
        } else {
          res.status(200).json({
            success: true,
            code: 64,
            message: "user login was successful",
          });
        }
      }
    );
  }
);

app.post(
  "/refresh",
  async (req, res, next) => {
    if (!req.cookies.jobify_refresh_token) {
      return res.status(400).json({
        success: false,
        name: "INCOMPLETE_BODY",
        code: 61,
        message: "refresh token missing.",
      });
    }
    try {
      const refreshToken = req.cookies.jobify_refresh_token;
      const result = await db.query(
        "SELECT * FROM user_refresh_tokens WHERE refresh_token = $1",
        [refreshToken]
      );
      if (result.rows.length == 0) {
        return res.status(403).json({
          success: false,
          name: "INVALID_CREDENTIALS",
          code: 67,
          message: "the refresh token passed for login is invalid.",
        });
      } else {
        jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET_KEY,
          async (err, user) => {
            if (err) {
              if (err.name === "TokenExpiredError") {
                await db.query(
                  "DELETE FROM user_refresh_tokens WHERE refresh_token = $1",
                  [refreshToken]
                );
              }
              return res.status(403).json({
                success: false,
                name: "INVALID_CREDENTIALS",
                code: 67,
                message: "the refresh token passed for login has expired.",
              });
            }
            next();
          }
        );
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        name: "DATABASE_SERVER_ERROR",
        code: 63,
        message: "internal database server error",
      });
    }
  },
  async (req, res) => {
    try {
      const refreshToken = req.cookies.jobify_refresh_token;
      const userEmail = jwt.decode(refreshToken).user_email;
      const result = await db.query(
        "SELECT * FROM users WHERE user_email = $1",
        [userEmail]
      );
      if (result.rows.length == 0) {
        return res.status(404).json({
          success: false,
          name: "INVALID_CREDENTIALS",
          code: 68,
          message: "user for refresh token not found.",
        });
      } else {
        const user = result.rows[0];
        const newAccessToken = jwt.sign(
          {
            user_email: user.user_email,
            user_type: user.user_type,
          },
          process.env.ACCESS_TOKEN_SECRET_KEY,
          { expiresIn: "15m" }
        );
        res.status(200).json({
          success: true,
          code: 64,
          message: "access token refreshed successfully",
          access_token: newAccessToken,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        name: "DATABASE_SERVER_ERROR",
        code: 63,
        message: "internal database server error",
      });
    }
  }
);

app.delete("/logout", async (req, res) => {
  if (!req.cookies.jobify_refresh_token) {
    return res.status(400).json({
      success: false,
      name: "INCOMPLETE_BODY",
      code: 61,
      message: "refresh token missing.",
    });
  } else {
    try {
      await db.query(
        "DELETE FROM user_refresh_tokens WHERE refresh_token = $1",
        [req.cookies.jobify_refresh_token]
      );
      res.status(200).json({
        success: true,
        code: 64,
        message: "user logout successful",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        name: "DATABASE_SERVER_ERROR",
        code: 63,
        message: "internal database server error",
      });
    }
  }
});

app.listen(process.env.SERVER_PORT, () => {
  console.log("Server is live ...", process.env.SERVER_PORT);
});

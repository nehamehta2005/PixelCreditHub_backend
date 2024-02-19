import { body, validationResult } from "express-validator";
import { capitalize } from "../helpers/index.js";
import User from "../models/userSchema.js";
// If you need to perform user-related operations after validation, importing the User model would be necessary.

export const userRegisterValidation = [
  body("email")
    .exists()
    .withMessage("you have to pass an email")
    .isEmail()
    .withMessage("you have to pass an accurate email")
    .trim()
    .normalizeEmail(),

  body("password")
    .exists()
    .trim()
    .isLength({ min: 8, max: 16 })
    .withMessage(" password should between 8 and 16 characters")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
    .withMessage(" password should include number and alpha characters"),

    body("name")
    .exists()
    .trim()
    .escape()
    .matches(/^[A-Za-z\s\-']+$/, "i")
    .withMessage("Name can only contain letters, spaces, hyphens, and apostrophes"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      req.body.name = capitalize(req.body.name);

      next();
    } else {
      res.status(400).send(errors);
    }
  },
];

const { body, validationResult } = require("express-validator");
const validateApplication = [
  body("firstname")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Firstname must be at least 3 characters long"),
    
  body("lastname")
    .trim()
    .notEmpty()
    .withMessage("Lastname is required"),
    
  body("qualification")
    .trim()
    .notEmpty()
    .withMessage("Please enter your highest or most recent qualification"),
    
  body("yop")
    .trim()
    .notEmpty()
    .withMessage("Please enter the year of passing")
    .isInt({ min: 1900, max: 3000 })
    .withMessage("Year of passing must be a valid year"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }));
      return res.status(400).json({ errors: formattedErrors });
    }
    next();
  },
];

module.exports = validateApplication;

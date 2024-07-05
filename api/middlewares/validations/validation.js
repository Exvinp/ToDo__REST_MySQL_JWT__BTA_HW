const { check, body } = require('express-validator')
const User = require('../../models/user')

exports.user = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, { req }) => {
      return User.findOneByColumnName(CONSTANT.email, value).then((userDoc) => {
        if (userDoc[0][0]) {
          return Promise.reject('E-Mail address already exists!')
        }
      })
    })
    .normalizeEmail(),
  body('password').trim().isLength({ min: 1 }),
  body('username').trim().not().isEmpty(),
]

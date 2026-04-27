const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const userAuthCheck = require('../middleware/userAuthCheck')
const { validate, schemas } = require('../middleware/validation')

router.route('/register')
  .post(validate(schemas.userRegister), userController.userRegister)

router.route('/login')
  .post(validate(schemas.login), userController.userLogin)

router.route('/logout')
  .post(userAuthCheck, userController.userLogout)

router.route('/refresh-token')
  .post(userController.userRefreshToken)

router.route('/blog')
  .get(userController.publicBlogOperations)

router.route('/blog/:id')
  .get(userController.publicBlogOperations)

router.route('/blog/:id/like')
  .post(userAuthCheck, userController.toggleLike)

router.route('/blog/:id/comment')
  .post(userAuthCheck, validate(schemas.comment), userController.addComment)

router.route('/blog/:id/comments')
  .get(userController.getComments)

module.exports = router

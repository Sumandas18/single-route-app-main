const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const { adminAuthCheck, verifyAdminApiKey } = require('../middleware/adminAuthCheck')
const { validate, schemas } = require('../middleware/validation')

router.route('/register')
  .post(validate(schemas.adminRegister), adminController.adminRegister)

router.route('/login')
  .post(validate(schemas.login), adminController.adminLogin)

router.route('/logout')
  .post(adminAuthCheck, adminController.adminLogout)

router.route('/refresh-token')
  .post(adminController.adminRefreshToken)

router.route('/update-password')
  .post(adminAuthCheck, adminController.adminPasswordUpdate)

router.route('/blog/approval/:blogId')
  .post(adminAuthCheck, verifyAdminApiKey, adminController.approveAndPublishBlog)

router.route('/blog/reject/:blogId')
  .post(adminAuthCheck, verifyAdminApiKey, adminController.rejectBlog)

router.route('/category')
  .get(adminAuthCheck, adminController.getCategories)
  .post(adminAuthCheck, validate(schemas.categorySchema), adminController.createCategory)

router.route('/category/:id')
  .delete(adminAuthCheck, adminController.deleteCategory)

router.route('/blog')
  .get(adminAuthCheck, verifyAdminApiKey, adminController.blogOperations)
  .post(adminAuthCheck, verifyAdminApiKey, validate(schemas.blog), adminController.blogOperations)

router.route('/blog/:id')
  .get(adminAuthCheck, verifyAdminApiKey, adminController.blogOperations)
  .put(adminAuthCheck, verifyAdminApiKey, validate(schemas.blog), adminController.blogOperations)
  .delete(adminAuthCheck, verifyAdminApiKey, adminController.blogOperations)

module.exports = router

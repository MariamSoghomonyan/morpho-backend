import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import * as adminController from '../controllers/admin.js';

const router = Router();

router.get('/', auth, adminController.get_admin_page);
router.get('/login', adminController.login_get);
router.post('/login', adminController.login_post);
router.get('/logout', auth, adminController.logout);
router.get('/change-admin-name', auth, adminController.change_admin_name_get);
router.post('/change-admin-name', auth, adminController.change_admin_name_post);
router.get('/change-admin-password', auth, adminController.change_admin_password_get);
router.post('/change-admin-password', auth, adminController.change_admin_password_post);

export default router;
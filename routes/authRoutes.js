import express from 'express';
import {registerController,loginController,testController,forgotPasswordController, updateProfileController, getOrdersController,
  getAllOrdersController,
  orderStatusController} from '../controllers/authController.js';
import { requireSignIn,isAdmin } from '../middlewares/authMiddleware.js';

//route object
const router=express.Router();

//routing

//REGISTER || POST
router.post('/register',registerController);
//LOGIN || POST
router.post('/login',loginController);

//FORGOT PASSWORD || POST
router.post('/forgot-password',forgotPasswordController);
//TEST ROUTES
router.post('/test',requireSignIn,isAdmin,testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });
  //protected Admin route auth
  router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;

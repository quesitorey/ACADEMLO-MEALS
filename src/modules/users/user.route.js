import express from "express";
import { deleteUser, findAllUsersOrders, findOneUserOrder, login, signup, updateUser } from "./user.controller.js";
import { protect, protectAccountOwner, validateExistUser } from "./user.middleware.js";

export const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)

router.use(protect)

router.get('/orders', findAllUsersOrders)
router.get('/orders/:id',validateExistUser, findOneUserOrder)

router.route('/:id')
    .patch(validateExistUser, protectAccountOwner,updateUser)
    .delete(validateExistUser, protectAccountOwner,deleteUser)
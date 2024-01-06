import express from "express";
import { createRestaurant, deleteRestaurant, getAllRestaurants, getOneRestaurant, updateRestaurant } from "./restaurant.controller.js";
import { validateExistRestaurant } from "./restaurant.middleware.js";
import { protect, protectAccountOwner, restrictTo } from "../users/user.middleware.js";
import { createReview, deleteReview, updateReview } from "../reviews/reviews.controller.js";

export const router = express.Router()

router.route('/')
    .get(getAllRestaurants)
    .post( restrictTo('admin'), createRestaurant)

router.route('/:id')
    .get(validateExistRestaurant, getOneRestaurant)
    .patch(restrictTo('admin'), validateExistRestaurant, updateRestaurant)
    .delete(restrictTo('admin'), validateExistRestaurant, deleteRestaurant)

router.post('/reviews/:id', createReview)

router.route('/reviews/:restaurantId/:id')
    .patch(protectAccountOwner, updateReview)
    .delete(protectAccountOwner, deleteReview)
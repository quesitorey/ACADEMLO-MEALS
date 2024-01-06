import express from 'express'
import {router as userRouter} from '../modules/users/user.route.js'
import { router as ordersRouter } from '../modules/orders/order.route.js'
import { router as mealsRouter } from  '../modules/meals/meal.route.js'
import { router as restaurantsRouter } from '../modules/restaurants/restaurant.route.js'
import { protect } from '../modules/users/user.middleware.js'

export const router = express.Router()

router.use('/users', userRouter)
router.use(protect)
router.use('/orders', ordersRouter)
router.use('/meals', mealsRouter)
router.use('/restaurants', restaurantsRouter)
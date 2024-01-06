import express from 'express'
import { createOrder, deleteOrder, getAllOrders, updateOrder } from './order.controller.js'

export const router = express.Router()

router.post('/', createOrder)

router.get('/me', getAllOrders)

router.patch('/:id', updateOrder)

router.delete('/:id', deleteOrder)
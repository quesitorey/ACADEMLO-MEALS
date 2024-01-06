import { catchAsync } from "../../common/errors/catchAsync.js";
import { validateOrder } from "./order.schema.js";
import { OrderService } from "./order.service.js";

export const createOrder = catchAsync(async(req, res, next) => {
    const { hasError, errorMessages, orderData } = validateOrder(req.body)

    if(hasError) {
        return res.status(422).json( {
            status: 'error',
            message: errorMessages
        })
    }

    const order = await OrderService.createOrder(orderData)

    return res.status(201).json(order)
})
export const getAllOrders = catchAsync(async(req, res, next) => {
    const orders = await OrderService.getAllOrders()

    return res.status(200).json(orders)
})
export const updateOrder = catchAsync(async(req, res, next)=> {
    const {id} = req.params
    const { hasError, errorMessages, orderData } = validateOrder(req.body)

    const order = OrderService.findOneOrder(id)

    const updatedOrder = OrderService.updateOrder(order, orderData)  

    return res.status(201).json(updatedOrder)
})

export const deleteOrder =  catchAsync(async(req, res, next)=> {
    const {id} = req.params

    const order = OrderService.findOneOrder(id)
    await OrderService.deleteOrder(order)

    return res.status(204).json()
})
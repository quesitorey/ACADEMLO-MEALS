import { catchAsync } from "../../common/errors/catchAsync.js";
import { validateLogin, validatePartialUser, validateUser } from "./user.schema.js";
import { UserService } from "./user.service.js";
import { generateJWT } from "../../config/plugins/generate.jwt.plugin.js";
import { verifyPassword } from "../../config/plugins/encripted-password.js";
import { AppError } from "../../common/errors/appError.js";
import { OrderService } from "../orders/order.service.js";


export const signup = catchAsync(async(req, res, next) => {
    const { hasError, errorMessages, userData } = validateUser(req.body)

    if(hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const user = await UserService.createUser(userData)

    const token = await generateJWT(user.id)

    return res.status(201).json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    })

})

export const login = catchAsync(async(req, res, next) => {
    const { hasError, errorMessages, userData } = validateLogin(req.body)

    if(hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const user = await UserService.findOneByEmail(userData.email)

    if(!user){
        return next(new AppError('This account does npot exist', 404))
    }


    const isCorrectPassword = await verifyPassword(userData.password, user.password)

    if(!isCorrectPassword){
            return next(new AppError('Incorrect email or password', 401))
    }

    const token = await generateJWT(user.id)

    return res.status(200).json({
        token,
        user: {
                id: user.id,
                name: user.name,
                surname: user.surname,
                email: user.email
        }
    })
})

export const findAllUsersOrders = catchAsync(async(req, res, next) => {
    const orders = await OrderService.getAllOrders()
    const users = await UserService.findAllUsers()
    return res.status(200).json({
        user: {
            id: users.id,
            name: users.name,
            surname: users.surname,
            email: users.email,
            orders
        }
    })
})

export const findOneUserOrder = catchAsync(async(req, res, next) => {
    const { user } = req
    return res.status(201).json(user)
})

export const updateUser = catchAsync(async(req, res, next) => {
    const {user} = req
    const { hasError , errorMessages, userData} = validatePartialUser(req.body)

    const userUpdated = await UserService.updateUser(user, userData)

    return res.status(201).json(userUpdated)
})

export const deleteUser = catchAsync(async(req, res, next) => {
    const { user } = req

    await UserService.deleteUser(user)

    return res.status(204).json()
})
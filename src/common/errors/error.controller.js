import { AppError } from "./appError.js";
import { Error } from "./error.model.js";

const handleCastError23505 = ( ) => {
    return new AppError('Duplicate field value: please write another value', 400)
}

const handleCastError22P02 = () => new AppError('Invallid datatype in database', 400)

const handleJWTExpiredError = () => {
    return new AppError('Your token has expired, please login again', 401)
}

const handleeJWTError = () => {
    return new AppError('Invalid Token')
}

const sendErrorProd = async(err, res) => {

    await Error.create({
        status: err.status,
        message: err.message,
        stack: err.stack
    })

    if(err.isOperational){
    // operational, trusted error: send message to client
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
    }else{
        // programming or other unknown error: don't leak on details
        console.log('Error 💣: ', err)
        return res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong'
        })
    }
}

export const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail'

    let error = err

        if(err.parent?.code === '23505') error = handleCastError23505()
        if(err.parent?.code === '22P02') error = handleCastError22P02()
        if(err.name === 'TokenExpiredError') error = handleJWTExpiredError()
        sendErrorProd(err, res)
        if(err.name === 'JsonWebTokenError') error = handleeJWTError()

}
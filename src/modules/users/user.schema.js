import z from 'zod'
import { extractValidationData } from '../../common/utils/extractErrorData.js'

const signUpSchema = z.object({
    name: z
        .string({
        invalid_type_error: 'Name must be a string',
        required_error: 'Name is required'
        })
        .min(3, {message: 'Name is too short'})
        .max(50, {message: 'Name is too long'}),

    email: z    
        .string()
        .email({message: 'Invalid email'}),
    password: z
        .string()
        .min(8, {message: 'Password must be at least 8 characters'}),
    role: z
        .string()
})

const loginUserSchema = z.object({
    email: z    
        .string()
        .email({message: 'Invalid email'}),
    password: z
        .string()
        .min(8, {message: 'Password must be at least 8 characters'})
})

export function validateUser(data) {
    const result = signUpSchema.safeParse(data)

    const {
        hasError,
        errorMessages,
        data: userData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        userData
    }
}

export function validatePartialUser(data) {
    const result = signUpSchema.partial().safeParse(data)

    const {
        hasError,
        errorMessages,
        data: userData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        userData
    }
}

export function validateLogin(data) {
    const result = loginUserSchema.safeParse(data)

    const {
        hasError, 
        errorMessages, 
        data: userData
    } = extractValidationData(result)
        
    return {
        hasError,
        errorMessages,
        userData
    }
}
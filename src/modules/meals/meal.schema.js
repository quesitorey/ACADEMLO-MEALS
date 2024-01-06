import z from 'zod'
import { extractValidationData } from '../../common/utils/extractErrorData.js'

const mealSchema = z.object({
    name: z
    .string({
    invalid_type_error: 'Name must be a string',
    required_error: 'Name is required'
    })
    .min(3, {message: 'Name is too short'})
    .max(50, {message: 'Name is too long'}),
    price: z.number(),
    restaurantId: z.number(),
})

export function validateMeal(data) {
    const result = mealSchema.safeParse(data)

    const {
        hasError,
        errorMessages,
        data: mealData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        mealData
    }
}

export function validatePartialMeal(data) {
    const result = mealSchema.partial().safeParse(data)

    const {
        hasError,
        errorMessages,
        data: mealData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        mealData
    }
}
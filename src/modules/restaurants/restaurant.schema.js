import z from "zod";
import { extractValidationData } from "../../common/utils/extractErrorData.js";

const restaurantSchema = z.object({
    name: z
    .string({
    invalid_type_error: 'Name must be a string',
    required_error: 'Name is required'
    })
    .min(3, {message: 'Name is too short'})
    .max(50, {message: 'Name is too long'}),
    adress: z
    .string({
        invalid_type_error: 'Adress must be string',   
        required_error: 'Address is required'
    })
    .min(5, {message: 'Adress is too short'}),
    rating: z.number().min(0).max(5)

})

export function validateResturant(data) {
    const result = restaurantSchema.safeParse(data)

    const {
        hasError,
        errorMessages,
        data: restaurantData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        restaurantData
    }

}

export function validatePartialResturant(data) {
    const result = restaurantSchema.partial().safeParse(data)

    const {
        hasError,
        errorMessages,
        data: restaurantData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        restaurantData
    }

}
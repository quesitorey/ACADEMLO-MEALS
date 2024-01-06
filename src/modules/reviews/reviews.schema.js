import { z } from "zod";

const reviewSchema = z.object({
    userId: z.number(),
    comment: z.string().min(5),
    restaurantId: z.number(),
    rating: z.number().max(5)
})

export function validateReview(data) {
    const result = reviewSchema.safeParse(data)

    const {hasError,
        errorMessages,
        data: reviewData} = extractValidationData(result)

        return {
            hasError,
            errorMessages,
            data: reviewData
        }
}
export function validatePartialReview(data) {
    const result = reviewSchema.partial().safeParse(data)

    const {hasError,
        errorMessages,
        data: reviewData} = extractValidationData(result)

        return {
            hasError,
            errorMessages,
            data: reviewData
        }
}
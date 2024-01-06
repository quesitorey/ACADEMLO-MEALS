import { catchAsync } from "../../common/errors/catchAsync.js";
import { ReviewService } from "./reviews.service.js";

export const createReview = catchAsync(async(req, res, next) => {
    const review = await ReviewService.createReview(req.body)

    return res.status(201).json(review)
})

export const updateReview = catchAsync(async(req, res, next) => {
    const {id} = req.params
    const review = await ReviewService.findOneReview(id)

    const updatedReview = ReviewService.updateReview(review, req.body)

    return res.status(201).json(updatedReview)
})

export const deleteReview = catchAsync(async(req, res, next) => {
    const {id} = req.params
    const review = ReviewService.findOneReview(id)

    await ReviewService.deleteReview(review)

    return res.status(204).json()

})
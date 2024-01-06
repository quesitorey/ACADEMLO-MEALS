import { Review } from "./reviews.model.js";

export class ReviewService  {

    static async findOneReview(id) {
        return await Review.findOne({
            where: {
                id
            }
        })
    }
    static async createReview(data) {
        return await Review.create(data)
    }

    static async updateReview(review, data) {
        return await review.update(data)
    }

    static async deleteReview(review) {
        return review.update({status: 'deleted'})
    }
}
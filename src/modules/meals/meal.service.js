import { Meal } from "./meal.model.js";

export class MealService {
    static async createMeal(data) {
        return await Meal.create(data)
    }
    static async findOneMeal(id) {
        return await Meal.findOne({
            where: {
                id,
                status: 'active'
            }
        })
    }
    static async findAllMeals(){
        return await Meal.findAll({
            where: {
                status: 'active'
            }
        })
    }
    static async updateMeal(meal, data){
        return await meal.update(data)
    }
    static async deleteMeal(meal) {
        return await meal.update({
            status: 'inactive'
        })
    }
}
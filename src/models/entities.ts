export interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}

export interface RecipeModel {
    idMeal: string,
    strMeal: string,
    strMealThumb: string 
}

export interface UserModel {
    firstName: string,
    lastName?: string,
    email: string,
    phone: string,
    password: string,
    favourite?: string[]
}
export interface Book {
    _id:number
    name:string
    photo: string
    description:String
    reviews: Array<number>
    authorId: number
    categoryId: number
    avgRating:  number 
    ratingCount: number
}
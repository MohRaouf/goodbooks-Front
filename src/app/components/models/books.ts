export interface Book {
    id:number
    name:string
    email:string
    city:string
    photo: string
    description:String
    reviews: Array<number>
    authorId: number

    categoryId: number
    avgRating:  number 
    ratingCount: number
}
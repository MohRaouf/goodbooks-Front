 interface Book {
    _id: string
    name: string,
    description: string,
    photo: string,
    authorId: { _id: string, fname: string, lname: string },
    categoryId: { _id: string, name: string }
  }

  interface Category{
    _id:string,
    name:string,
    photo:string
  }

  interface Author{
    _id: string,
    fname:string,
    lname:string,
    photo:string
    dob:Date
    gender: string
  }

  enum Gender{
    m="Male",
    f="Female"
  }

  export {
    Book,
    Category,
    Author,
    Gender
}
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Observable, Subscriber } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { Book, Category, Author } from '../../models/admin-models'
import { convertToBase64 } from '../../helpers/image-helpers'

@Component({
  selector: 'app-admin-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.css']
})
export class AdminBooksComponent implements OnInit, OnDestroy {

  constructor(private modalService: NgbModal, private adminService: AdminService, private router: Router) { }

  subscriber: any
  showSuccess: boolean = false;
  showFailed: boolean = false;
  books: Array<Book> = []
  insert: boolean = false;
  loading: boolean = true;
  authors: Array<Author> = []
  categories: Array<Category> = []
  // bookToUpdate:Book={_id:"",name:"",description:"",photo:"",authorId:{_id:"",fname:"",lname:""},categoryId:{_id:"",name:""}};

  ngOnInit(): void {
    this.loading = true;
    this.adminService.getAllBooks().subscribe((response: any) => {
      console.log(response)
      this.books = response.body
      console.log(this.books)
      this.loading = false;
    })

    this.adminService.getAllAuthors().subscribe((response: any) => {
      this.authors = response.body;
      console.log("Authors ===== >", this.authors)
      this.authors = this.authors.map(({ _id, fname, lname, photo, dob, gender }) => ({
        _id, fname, lname, photo, dob, gender
      }))
    })

    this.adminService.getAllCategories().subscribe((response: any) => {
      this.categories = response.body;
      this.categories = this.categories.map(({ _id, name, photo }) => ({
        _id, name, photo
      }))
    })
  }

  ngOnDestroy(): void {
    console.log('AdminBooks Component Destroy')
    this.subscriber && this.subscriber.unsubscribe();
  }

  closeResult: any;
  /* Insert - update Modals */
  open(content: any, caller: any, book: any) {
    /* Incase of updating book - populate its data in the modal */
    caller.name != "add" && this.bookForm.patchValue({ name: book.name, description: book.description });
    this.modalService.open(content).result.then((result) => {
      /* Check for the caller either update or insert and execute its method */
      caller.name == "add" ? this.insertBook() : this.updateBook(book);
      this.closeResult = `Closed with: ${content}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult)
    });
  }

  /* Delete Confirmation Modal */
  confirm(content: any, bookId: any) {
    console.log(content)
    this.modalService.open(content).result.then((result) => {
      this.deleteBook(bookId)
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  bookForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(4)]),
    photo: new FormControl('',
      [RxwebValidators.image({ maxHeight: 2000, maxWidth: 2000 }),
      RxwebValidators.extension({ extensions: ["jpeg", "jpg", "png"] })
      ]),
    description: new FormControl('', [Validators.required, Validators.maxLength(350), Validators.minLength(4)]),
    author: new FormControl(''),
    category: new FormControl(''),
  })

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  nameFocused: boolean = false
  focusName() { this.nameFocused = true }

  descriptionFocused: boolean = false
  focusDescription() { this.descriptionFocused = true }

  photoChanged: boolean = false
  imgParsed: Boolean = false;
  bookPhoto: any
  onImgChange($event: any) {
    const img: any = $event.target.files[0]
    if (img) {
      this.photoChanged = true;
      this.imgParsed = false;
      convertToBase64(img).subscribe((data) => {
        this.imgParsed = true
        this.bookPhoto = data
        console.log(img)
      })
    }
  }

  getFormObject() {
    return {
      name: this.bookForm.controls.name.value,
      photo: this.bookPhoto,
      description: this.bookForm.controls.description.value,
      authorId: this.bookForm.controls.author.value,
      categoryId: this.bookForm.controls.category.value
    }
  }

  /****************** Insert - Update - Delete *******************/
  /** Insert */
  insertBook() {
    this.subscriber = this.adminService.insertBook(this.getFormObject()).subscribe((response: any) => {
      response.status == 201 ? this.showSuccess = true : this.showFailed = true;
      // setTimeout(() => {this.showFailed = false;this.showSuccess = false;}, 3000);
    }, (err) => {
      console.log(err)
    }, () => {
      this.router.navigate(['/admin']);
    })
    console.log(this.getFormObject())
  }

  /** Delete */
  deleteBook(bookId: any) {
    this.subscriber = this.adminService.deleteBook(bookId).subscribe((response: any) => {
      response.status == 200 ? this.showSuccess = true : this.showFailed = true;
      // setTimeout(() => {this.showFailed = false;this.showSuccess = false;}, 3000);
    }, (err) => {
      console.log(err)
    }, () => {
      this.router.navigate(['/admin']);
    })
  }

  /**Update */
  updateBook(book: any) {
    this.subscriber = this.adminService.updateBook(book._id, this.getFormObject()).subscribe((response:any) => {
      console.log(response)
      response.status == 202 ? this.showSuccess = true : this.showFailed = true;
      // setTimeout(() => {this.showFailed = false;this.showSuccess = false;}, 3000);
    }, (err) => {
      // alert(err)
      console.log(err)
    }, () => {
      // this.router.navigate(['/admin']);
    })
    console.log("Update book with Data ===> ",this.getFormObject())
  }
}





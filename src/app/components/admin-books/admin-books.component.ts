import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'
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
  books: Array<Book> = []
  loading: boolean = true;
  authors: Array<Author> = []
  categories: Array<Category> = []
  closeResult: any;
  totalBooks: number = 0;
  page: number = 1;
  booksPerPage: number = 5;

  ngOnInit(): void {
    this.loading = true;
    this.adminService.getAllBooks(this.page, this.booksPerPage).subscribe((response: any) => {
      this.books = response.body.allBooks
      this.totalBooks = response.body.countBooks
      this.loading = false
    })

    this.adminService.getAllAuthors().subscribe((response: any) => {
      this.authors = response.body.allAuthors;
      console.log("Authors ===== >", this.authors)
      this.authors = this.authors.map(({ _id, fname, lname, photo, dob, gender }) => ({
        _id, fname, lname, photo, dob, gender
      }))
    })

    this.adminService.getAllCategories().subscribe((response: any) => {
      this.categories = response.body.allCategories;
      this.categories = this.categories.map(({ _id, name, photo }) => ({
        _id, name, photo
      }))
    })
  }

  showPageIndex(pageIndex: any) {
    this.loading = true;
    this.page = pageIndex;
    this.subscriber = this.adminService.getAllBooks(this.page, this.booksPerPage).subscribe((response: any) => {
      this.books = response.body.allBooks
      this.loading = false
    })
  }

  ngOnDestroy(): void {
    console.log('AdminBooks Component Destroy')
    this.subscriber && this.subscriber.unsubscribe();
  }

  /* Insert - update Modals */
  open(content: any, caller: any, book: any) {
    this.actionLoading = false;
    this.success = false;
    this.failed = false;
    console.log('modal opened')

    /* Incase of updating book - populate its data in the modal */
    caller.name != "add" && this.bookForm.patchValue({ name: book.name, description: book.description });
    this.modalService.open(content, { centered: true, animation: true }).result.then((result) => {

      /* Check for the caller either update or insert and execute its method */
      caller.name == "add" ? this.insertBook() : this.updateBook(book);

      /** clear modal content */
      this.bookForm.controls.name.setValue('')
      this.bookForm.controls.description.setValue('')
      this.img=''

      this.closeResult = `Closed with: ${content}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      /** clear modal content */
      this.bookForm.controls.name.setValue('')
      this.bookForm.controls.description.setValue('')
      this.img=''

      console.log(this.closeResult)
    });
  }

  /* Delete Confirmation Modal */
  confirm(content: any, bookId: any) {
    this.actionLoading = false;
    this.success = false;
    this.failed = false;

    console.log(content)
    this.modalService.open(content).result.then((result) => {
      this.deleteBook(bookId)
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  bookForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(4)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(500), Validators.minLength(4)]),
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

  bookPhoto: any
  invalidPhoto: boolean = false;
  img: any = ""
  onImgChange($event: any) {
    this.bookPhoto = ""
    this.img = ""
    this.invalidPhoto = false;
    this.img = $event.target.files[0]
    if (this.img.size < 2048090) {
      convertToBase64(this.img).subscribe((data) => {
        this.bookPhoto = data;
      })
    }
    else { this.invalidPhoto = true; }
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
  actionLoading: Boolean = false;
  success: Boolean = false;
  failed: Boolean = false;
  /** Insert */
  insertBook() {
    this.actionLoading = true
    this.subscriber = this.adminService.insertBook(this.getFormObject()).subscribe((response: any) => {
      this.onSuccessAction(201, response);
    }, (err) => {
      this.onFailureAction()
    })
  }

  /** Delete */
  deleteBook(bookId: any) {
    this.actionLoading = true
    this.subscriber = this.adminService.deleteBook(bookId).subscribe((response: any) => {
      this.onSuccessAction(200, response)
    }, (err) => {
      this.onFailureAction()
    })
  }

  /**Update */
  updateBook(book: any) {
    this.actionLoading = true
    this.subscriber = this.adminService.updateBook(book._id, this.getFormObject()).subscribe((response: any) => {
      this.onSuccessAction(202, response)
    }, (err) => {
      this.onFailureAction()
    })
  }

  /** helper functions performs the success and failure actions of the requests */
  onSuccessAction(code: any, response: any) {
    this.actionLoading = false;
    response.status === code ? this.success = true : this.failed = true;
    setTimeout(() => { this.success = false; this.failed = false; }, 3000);
    this.ngOnInit();
  }
  onFailureAction() {
    this.actionLoading = false;
    this.success = false;
    this.failed = true;
    setTimeout(() => { this.success = false; this.failed = false; }, 3000);
  }
}





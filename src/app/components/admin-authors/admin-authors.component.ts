import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { AdminService } from 'src/app/services/admin.service';
import { Author, Gender } from '../../models/admin-models'
import { convertToBase64 } from '../../helpers/image-helpers'

@Component({
  selector: 'app-admin-authors',
  templateUrl: './admin-authors.component.html',
  styleUrls: ['./admin-authors.component.css']
})
export class AdminAuthorsComponent implements OnInit {

  constructor(private modalService: NgbModal, private adminService: AdminService, private router: Router) { }
  subscriber: any
  authors: Array<Author> = []
  insert: boolean = false;
  loading: boolean = true;
  closeResult: any;
  genderEnum = Gender;

  date: Date = new Date("11-22-2115")

  ngOnInit(): void {
    this.loading = true;

    this.adminService.getAllAuthors().subscribe((response: any) => {
      this.authors = response.body.allAuthors;
      console.log(this.authors)
      this.authors = this.authors.map(({ _id, fname, lname, photo, dob, gender }) => ({
        _id, fname, lname, photo, dob, gender
      }))
      this.loading = false
    })
  }

  ngOnDestroy(): void {
    console.log('AdminAuthors Component Destroy')
    this.subscriber && this.subscriber.unsubscribe();
  }

  /* Insert - update Modals */
  open(content: any, caller: any, author: any) {
    this.actionLoading = false;
    this.success = false;
    this.failed = false;

    /* Incase of updating author - populate its data in the modal */
    caller.name != "add" && this.authorForm.patchValue({
      fname: author.fname,
      lname: author.lname,
      gender: author.gender,
    });

    this.modalService.open(content).result.then((result) => {

      /* Check for the caller either update or insert and execute its method */
      caller.name == "add" ? this.insertAuthor() : this.updateAuthor(author);
    }, (reason) => {
      console.log(this.closeResult)
    });
  }

  /* Delete Confirmation Modal */
  confirm(content: any, authorId: any) {
    this.actionLoading = false;
    this.success = false;
    this.failed = false;

    console.log(content)
    this.modalService.open(content).result.then((result) => {
      this.deleteAuthor(authorId)
    }, (reason) => {
      console.log(reason)
    });
  }

  today: string | null = new DatePipe("en-US").transform(new Date("1/1/1980"), "yyyy-MM-dd");
  authorForm = new FormGroup({
    fname: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(4)]),
    lname: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(4)]),
    gender: new FormControl('m', [Validators.required]),
    dob: new FormControl(this.today, [Validators.required]),
  })

  fnameFocused: boolean = false
  focusFname() { this.fnameFocused = true }

  lnameFocused: boolean = false
  focusLname() { this.lnameFocused = true }

  authorPhoto: any
  invalidPhoto: boolean = false;
  img: any = ""
  onImgChange($event: any) {
    this.authorPhoto = ""
    this.img = ""
    this.invalidPhoto = false;
    this.img = $event.target.files[0]
    if (this.img.size < 2048090) {
      convertToBase64(this.img).subscribe((data) => {
        this.authorPhoto = data;
      })
    }
    else { this.invalidPhoto = true; }
  }

  actionLoading: boolean = false;
  success: boolean = false;
  failed: boolean = false;

  getFormObject() {
    return {
      fname: this.authorForm.controls.fname.value,
      lname: this.authorForm.controls.lname.value,
      photo: this.authorPhoto,
      gender: this.authorForm.controls.gender.value,
      dob: this.authorForm.controls.dob.value,
    }
  }

  insertAuthor() {
    this.actionLoading = true
    this.subscriber = this.adminService.insertAuthor(this.getFormObject()).subscribe((response: any) => {
      this.onSuccessAction(201, response);
    }, (err) => {
      this.onFailureAction()
    })
  }

  deleteAuthor(authorId: any) {
    this.actionLoading = true
    this.subscriber = this.adminService.deleteAuthor(authorId).subscribe((response: any) => {
      this.onSuccessAction(200, response)
    }, (err) => {
      this.onFailureAction()
    })
  }

  updateAuthor(author: any) {
    this.actionLoading = true
    this.subscriber = this.adminService.updateAuthor(author._id, this.getFormObject()).subscribe((response: any) => {
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

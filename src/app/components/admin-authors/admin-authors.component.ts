import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Observable, Subscriber } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { Author,Gender } from '../../models/admin-models'
import {convertToBase64} from '../../helpers/image-helpers'
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-admin-authors',
  templateUrl: './admin-authors.component.html',
  styleUrls: ['./admin-authors.component.css']
})
export class AdminAuthorsComponent implements OnInit {

  constructor(private modalService: NgbModal, private adminService: AdminService, private router: Router) { }
  subscriber: any
  showSuccess: boolean = false;
  showFailed: boolean = false;
  authors: Array<Author> = []
  insert: boolean = false;
  loading: boolean = true;
  closeResult: any;
  genderEnum=Gender;

date:Date= new Date("11-22-2115")

  ngOnInit(): void {
    this.loading = true;

    this.adminService.getAllAuthors().subscribe((response: any) => {
      this.authors = response.body;
      console.log (this.authors)
      this.authors = this.authors.map(({ _id, fname, lname, photo, dob, gender }) => ({
        _id, fname, lname, photo, dob, gender
      }))

      // var mapped = this.authors.map(author => { 
      //   const container ={};
      //   author.dob =author.dob.toDateString()
      //   container[author.dob]=author.dob.toDateString();
      //   return container
      // })
      this.loading = false
    })
  }

  ngOnDestroy(): void {
    console.log('AdminAuthors Component Destroy')
    this.subscriber && this.subscriber.unsubscribe();
  }

  /* Insert - update Modals */
  open(content: any, caller: any, author: any) {
    /* Incase of updating auhtor - populate its data in the modal */
    caller.name!="add" && this.authorForm.patchValue({
      fname:author.fname,
      lname:author.lname,
      gender:author.gender,
     });

    this.modalService.open(content).result.then((result) => {
      /* Check for the caller either update or insert and execute its method */
      caller.name == "add" ? this.insertAuthor() : this.updateAuthor(author); 
    }, (reason) => {
      console.log(reason)
    });
  }

  /* Delete Confirmation Modal */
  confirm(content: any, authorId: any) {
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
    photo: new FormControl('',
      [RxwebValidators.image({ maxHeight: 2000, maxWidth: 2000 }),
      RxwebValidators.extension({ extensions: ["jpeg", "jpg", "png"] })
      ]),
    gender: new FormControl('m', [Validators.required]),
    dob: new FormControl(this.today, [Validators.required]),
  })

  fnameFocused: boolean = false
  focusFname() { this.fnameFocused = true }

  lnameFocused: boolean = false
  focusLname() { this.lnameFocused = true }

  photoChanged: boolean = false
  imgParsed: Boolean = false;
  authorPhoto: any
  onImgChange($event: any) {
    const img: any = $event.target.files[0]
    if (img) {
      this.photoChanged = true;
      this.imgParsed = false;
      convertToBase64(img).subscribe((data) => {
        this.imgParsed = true
        this.authorPhoto = data
        console.log(img)
      })
    }
  }



  getFormObject(){
    return {
      fname: this.authorForm.controls.fname.value,
      lname: this.authorForm.controls.lname.value,
      photo: this.authorPhoto,
      gender: this.authorForm.controls.gender.value,
      dob: this.authorForm.controls.dob.value,
    }
  }

  insertAuthor() {
    this.subscriber = this.adminService.insertAuthor(this.getFormObject()).subscribe((response: any) => {
      response.status == 201 ? this.showSuccess = true : this.showFailed = true;
      // setTimeout(() => {this.showFailed = false;this.showSuccess = false;}, 3000);
    }, (err) => {
      console.log(err)
    }, () => {
      this.router.navigate(['/admin']);
    })
    console.log(this.getFormObject())
  }

  deleteAuthor(authorId: any) {
    this.subscriber = this.adminService.deleteAuthor(authorId).subscribe((response: any) => {
      response.status == 200 ? this.showSuccess = true : this.showFailed = true;
      // setTimeout(() => {this.showFailed = false;this.showSuccess = false;}, 3000);
    }, (err) => {
      console.log(err)
    }, () => {
      this.router.navigate(['/admin']);
    })
  }


  updateAuthor(author: any) {

    this.subscriber = this.adminService.updateAuthor(author._id, this.getFormObject()).subscribe((response: any) => {
      response.status == 201 ? this.showSuccess = true : this.showFailed = true;
      // setTimeout(() => {this.showFailed = false;this.showSuccess = false;}, 3000);
    }, (err) => {
      // alert(err)
      console.log(err)
    }, () => {
      this.router.navigate(['/admin']);
    })
    console.log(this.getFormObject())
  }

}

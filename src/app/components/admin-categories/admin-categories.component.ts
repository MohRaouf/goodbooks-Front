import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Observable, Subscriber } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { Category } from '../../models/admin-models'
import { convertToBase64 } from '../../helpers/image-helpers'

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit, OnDestroy {

  subscriber: any
  showSuccess: boolean = false;
  showFailed: boolean = false;
  categories: Array<Category> = []
  insert: boolean = false;
  loading: boolean = true;

  constructor(private modalService: NgbModal, private adminService: AdminService, private router: Router) { }

  ngOnDestroy(): void {
    console.log('AdminsCategories Component Destroy')
    this.subscriber && this.subscriber.unsubscribe();
  }

  ngOnInit(): void {
    this.loading = true;
    this.adminService.getAllCategories().subscribe((response: any) => {
      this.categories = response.body;
      this.categories = this.categories.map(({ _id, name, photo }) => ({
        _id, name, photo
      }))
      console.log(this.categories)
      this.loading = false;
    })
  }

  closeResult: any;
  /* Insert - update Modals */
  open(content: any, caller: any, category: any) {
    /* In case of updating Category - populate its data in the modal */
    caller.name != "add" && this.categoryForm.patchValue({ name: category.name});
    this.modalService.open(content).result.then((result) => {
      /* Check for the caller either update or insert and execute its method */
      caller.name == "add" ? this.insertCategory() : this.updateCategory(category);
    }, (reason) => {
      console.log(reason)
    });
  }

  /* Delete Confirmation Modal */
  confirm(content: any, categoryId: any) {
    console.log(content)
    this.modalService.open(content).result.then((result) => {
      this.deleteCategory(categoryId)
    }, (reason) => {
      console.log(reason)
    });
  }

  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(4)]),
    photo: new FormControl('',
      [RxwebValidators.image({ maxHeight: 2000, maxWidth: 2000 }),
      RxwebValidators.extension({ extensions: ["jpeg", "jpg", "png"] })
      ]),
  })


  nameFocused: boolean = false
  focusName() { this.nameFocused = true }

  photoChanged: boolean = false
  imgParsed: Boolean = false;
  categoryPhoto: any
  onImgChange($event: any) {
    const img: any = $event.target.files[0]
    if (img) {
      this.photoChanged = true;
      this.imgParsed = false;
      convertToBase64(img).subscribe((data) => {
        this.imgParsed = true
        this.categoryPhoto = data
        console.log(img)
      })
    }
  }

  getFormObject(){
    return {
      name: this.categoryForm.controls.name.value,
      photo: this.categoryPhoto,
    }
  }

  insertCategory() {
    this.subscriber = this.adminService.insertCategory(this.getFormObject()).subscribe((response: any) => {
      response.status == 201 ? this.showSuccess = true : this.showFailed = true;
      // setTimeout(() => {this.showFailed = false;this.showSuccess = false;}, 3000);
    }, (err) => {
      console.log(err)
    }, () => {
      this.router.navigate(['/admin']);
    })
    console.log(this.getFormObject())
  }

  deleteCategory(categoryId: any) {
    this.subscriber = this.adminService.deleteCategory(categoryId).subscribe((response: any) => {
      response.status == 200 ? this.showSuccess = true : this.showFailed = true;
      // setTimeout(() => {this.showFailed = false;this.showSuccess = false;}, 3000);
    }, (err) => {
      console.log(err)
    }, () => {
      this.router.navigate(['/admin']);
    })
  }


  updateCategory(category: any) {
    this.subscriber = this.adminService.updateCategory(category._id, this.getFormObject()).subscribe((response: any) => {
      response.status == 201 ? this.showSuccess = true : this.showFailed = true;
      // setTimeout(() => {this.showFailed = false;this.showSuccess = false;}, 3000);
    }, (err) => {
      // alert(err)
      console.log(err)
    }, () => {
      // this.router.navigate(['/admin']);
    })
    console.log(this.getFormObject())
  }

}

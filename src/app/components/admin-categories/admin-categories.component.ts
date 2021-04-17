import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { AdminService } from 'src/app/services/admin.service';
import { Category } from '../../models/admin-models'
import { convertToBase64 } from '../../helpers/image-helpers'
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit, OnDestroy {

  subscriber: any
  categories: Array<Category> = []
  loading: boolean = true;
  totalCategories: number = 0;
  page: number = 1
  CategoriesPerPage: number = 5;

  constructor(private modalService: NgbModal, private publicService:PublicService, private adminService: AdminService, private router: Router) { }
  ngOnDestroy(): void {
    console.log('AdminsCategories Component Destroy')
    this.subscriber && this.subscriber.unsubscribe();
  }

  nameFocused: boolean = false
  focusName() { this.nameFocused = true }

  ngOnInit(): void {
    this.loading = true;
    this.adminService.getAllCategories(this.page, this.CategoriesPerPage).subscribe((response: any) => {
      this.categories = response.body.allCategories
      this.totalCategories = response.body.countCategories
      this.loading = false
    })
  }

  /** Search for Books */
  keyWords: string = "";
  Search(e: any) {
    this.loading = true;
    this.publicService.getCatSearchRes(this.keyWords).subscribe((response: any) => {
      this.categories = response.body
      this.loading = false;
    })
  }

  /** pagination */
  showPageIndex(pageIndex: any) {
    this.loading = true;
    this.page = pageIndex;
    this.subscriber = this.adminService.getAllCategories(this.page, this.CategoriesPerPage).subscribe((response: any) => {
      this.categories = response.body.allCategories
      this.totalCategories = response.body.countCategories
      this.loading = false
    })
  }

  closeResult: any;
  /* Insert - update Modals */
  open(content: any, caller: any, category: any) {
    this.actionLoading = false;
    this.success = false;
    this.failed = false;

    /* In case of updating Category - populate its data in the modal */
    caller.name != "add" && this.categoryForm.patchValue({ name: category.name });
    this.modalService.open(content).result.then((result) => {
      /* Check for the caller either update or insert and execute its method */
      caller.name == "add" ? this.insertCategory() : this.updateCategory(category);
      this.categoryForm.controls.name.setValue('')
      this.img = ''
    }, (reason) => {
      console.log(reason)
      this.categoryForm.controls.name.setValue('')
      this.img = ''
    });
  }

  /* Delete Confirmation Modal */
  confirm(content: any, categoryId: any) {
    this.actionLoading = false;
    this.success = false;
    this.failed = false;

    console.log(content)
    this.modalService.open(content).result.then((result) => {
      this.deleteCategory(categoryId)
    }, (reason) => {
      console.log(reason)
    });
  }

  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(4)]),
  })


  categoryPhoto: any
  invalidPhoto: boolean = false;
  img: any = ""
  onImgChange($event: any) {
    this.categoryPhoto = ""
    this.img = ""
    this.invalidPhoto = false;
    this.img = $event.target.files[0]
    if (this.img.size < 2048090) {
      convertToBase64(this.img).subscribe((data) => {
        this.categoryPhoto = data;
      })
    }
    else { this.invalidPhoto = true; }
  }

  getFormObject() {
    return {
      name: this.categoryForm.controls.name.value,
      photo: this.categoryPhoto,
    }
  }
  /****************** Insert - Update - Delete *******************/
  actionLoading: Boolean = false;
  success: Boolean = false;
  failed: Boolean = false;

  insertCategory() {
    this.actionLoading = true
    this.subscriber = this.adminService.insertCategory(this.getFormObject()).subscribe((response: any) => {
      this.onSuccessAction(201, response);
    }, (err) => {
      this.onFailureAction()
    })
  }

  deleteCategory(categoryId: any) {
    this.actionLoading = true

    this.subscriber = this.adminService.deleteCategory(categoryId).subscribe((response: any) => {
      this.onSuccessAction(200, response)
    }, (err) => {
      this.onFailureAction()
    })
  }

  updateCategory(category: any) {
    this.actionLoading = true
    this.subscriber = this.adminService.updateCategory(category._id, this.getFormObject()).subscribe((response: any) => {
      this.onSuccessAction(202, response)
    }, (err) => {
      this.onFailureAction()
    })
  }

  /** helper functions performs the success and failure actions of the requests */
  onSuccessAction(code: any, response: any) {
    console.log(response)
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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { PublicService } from 'src/app/services/public.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  subscriber: any
  invalidCred: boolean = false;
  SearchOption:string="All";
  keyWords:string="";
  constructor(private modalService: NgbModal,private userSevice : UserService, private authService: AuthService,private publicService:PublicService, private router: Router) { }

  ngOnDestroy(): void {
    console.log('Login Component Destroy')
    this.subscriber && this.subscriber.unsubscribe();
  }
  validatingForm: any;
  register: boolean = false;
  closeResult = '';
  isLoggedIn: boolean = false;

  myForm2 = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', Validators.required),
  })

  myForm = new FormGroup({
    fname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    Dob: new FormControl('', Validators.required)

  })
  ngOnInit() {
    console.log('onInit Triggered')
    if (this.authService.isLoggedIn()){
      this.isLoggedIn = true
      /** get user info to populate the profile photo and username */
      this.userSevice.getUserInfo().subscribe((response: any) => {
        console.log(response.body) 
      })
    }else{
      this.isLoggedIn=false;
    }
    this.publicService.categoryObservable.subscribe(cat => this.SearchOption = cat )
     this.publicService.searchedNameObservable.subscribe(name => this.keyWords = name)
  }
  chooseSearch(e:any){
    console.log(e.target.innerText)
    this.SearchOption= e.target.innerText
      }
    Search(e:any){
    this.publicService.searchCategory=this.SearchOption
     this.publicService.searchedName = this.keyWords
     this.publicService.updateSearch(this.SearchOption,this.keyWords)
     console.log("Yes")
     console.log( this.publicService.searchCategory)
     
    }
  open(content: any, e: any) {
    this.register = e.target.id == "SignIn" ? true : false;
    // console.log(this.register)
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  get FnameStatus() {
    return this.myForm.controls.fname.valid
  }
  get LnameStatus() {
    return this.myForm.controls.lname.valid
  }
  get UsernameStatus() {
    return this.myForm.controls.username.valid
  }
  get EmailStatus() {
    return this.myForm.controls.email.valid
  }
  get PasswordStatus() {
    return this.myForm.controls.password.valid
  }
  get DateStatus() {
    return this.myForm.controls.Dob.valid
  }
  get UsernameStatus2() {
    return this.myForm2.controls.username.valid

  }

  get PasswordStatus2() {
    return this.myForm2.controls.password.valid
  }
  submitForm() {
    /* const newStudent: Student = {
       id: this.myService.maxId + 1,
       name: this.myForm.controls.name.value,
       city: this.myForm.controls.name.value,
       email: this.myForm.controls.name.value
     }*/

  }

  submitForm2() {
    const loginInfo = {
      username: this.myForm2.controls.username.value,
      password: this.myForm2.controls.password.value,
    }
    console.log('login Form Submitted')
    this.subscriber = this.authService.login(loginInfo).subscribe((success: boolean) => {

      console.log(success)
      success ? this.ngOnInit() : this.invalidCred = true;

      // if (success) {
      //    this.router.navigate(['/']);
      // }
      // else {
      //   this.invalidCred = true;
      // }
    },
      (err) => {
        console.log(err)
      }, () => {
        // this.router.navigate(['/']);
      })
    console.log(loginInfo)
  }
  signOut() {
    this.authService.logout().subscribe((loggedOut) => {
      loggedOut && this.ngOnInit()
    })
  }
}

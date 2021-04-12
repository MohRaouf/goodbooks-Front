import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal ,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  subscriber: any
  invalidCred: boolean = false;
  constructor(private modalService:NgbModal,private authService: AuthService, private router: Router) { }

  ngOnDestroy(): void {
    console.log('Login Component Destroy')
    this.subscriber && this.subscriber.unsubscribe();
  }
  validatingForm: any;
  register:boolean=false;
  closeResult = '';
  myForm2 = new FormGroup({
     
    userName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    
    password: new FormControl('', Validators.required),
 
} )
myForm = new FormGroup({
  fname: new FormControl('', [Validators.required, Validators.minLength(3)]) ,
   lname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    userName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    Dob:new FormControl('',Validators.required)
  
} )
  ngOnInit() {
  
  }
  open(content:any,e:any) {
    this.register=e.target.id=="SignIn"?true:false;
    console.log(this.register)
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
    return this.myForm.controls.userName.valid
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
    return this.myForm2.controls.userName.valid
    
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
  this.subscriber = this.authService.login(loginInfo).subscribe((success:boolean) => {
    
    console.log(success)
    this.router.navigate(['/user']) ? success  : this.invalidCred = true;
    

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

}
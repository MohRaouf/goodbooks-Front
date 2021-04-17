import { Component, OnDestroy, OnInit } from '@angular/core';
import { loggedUserServices } from 'src/app/services/loggedUser.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})

export class UserSettingsComponent implements OnInit, OnDestroy {
  user={fname:"", lname:"", dob:"", gender:"", username:"", email:"", bookshelf:[]}
  constructor(    
    private userData: loggedUserServices,
    ) { }
    subscriber:any;

    ngOnDestroy(): void {
      // console.log("destroy");
      // this.subscriber.unsubscribe();
    }
  
  ngOnInit(): void {    
    console.log("############################ USER SETTINGS ####################################\n")
    this.subscriber=this.userData.getUser()
    .subscribe((data:any)=>{
      console.log("USER DATA:", data)
        if(data.status == 200){
        this.user = data.body.result
      }
  },(err)=>{
      console.log("ERR")
      console.log(err)
    })
  }

}

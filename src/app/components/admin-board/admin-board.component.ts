import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css']
})
export class AdminBoardComponent implements OnInit {

  subscriber:any;

  constructor(private authService: AuthService, private router: Router) { }
  user :string ="null"
  ngOnInit(): void {
    this.router.navigate(['/admin/books']);

    // this.subscriber = this.adminService.getAllBooks({name:"newBook",author:"unknow",category:"none",description:"this is a new Book"}).subscribe((response: any) => {
    //   console.log(response)

    //   // if (response.status == 201) {
    //   // }
    //   // else {
    //   // }
    // },
    //   (err) => {
    //     console.log(err)
    //   }, () => {
    //     // this.router.navigate(['/']);
    //   })
  }
  signOut(){
    this.authService.logout().subscribe((loggedOut)=>{
      console.log(loggedOut)
      loggedOut && this.router.navigate(['/admins/login'])
    })
  }

}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css']
})
export class AdminBoardComponent implements OnInit {

  subscriber:any;

  constructor(private authService: AuthService,private adminService: AdminService, private router: Router) { }
  ngOnInit(): void {
    this.adminService.getAdminInfo().subscribe((response: any) => {
      console.log(response.body) 
      // this.router.navigate(['/admin/books']);
    })
  }
  signOut(){
    this.authService.logout().subscribe((loggedOut)=>{
      console.log(loggedOut)
       this.router.navigate(['/admins/login'])
    })
  }
}

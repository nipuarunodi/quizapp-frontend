import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(        
    private userService: UserService,
    private route:Router
    ) { }
  email = '';
  password = '';

  ngOnInit(): void {
    this.userService.nextMessage(false);
  }

  userLogin(){
    var params = {
      email:  this.email,
      password: this.password 
    }

    this.userService.userLogin(params).subscribe((data: any) => {
      if(!data.status){
         alert(data.message);
      }else{
        localStorage.setItem('token', data.token);
        this.route.navigate(['/quiz/home']);
      }
     });

  }

  userRegister(){
    this.route.navigate(['/user/register']);
  }

}

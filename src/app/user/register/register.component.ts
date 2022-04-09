import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private userService: UserService,
    private route: Router
  ) { }

  email = '';
  password = '';
  name= '';

  ngOnInit(): void {
    this.email = '';
    this.password = '';
    this.name= '';
  }

  userLogin(){
    this.route.navigate(['/user/login']);

  }

  userRegister(){
    var params = {
      name: this.name,
      email:  this.email,
      password: this.password 
    }
    this.userService.userRegister(params).subscribe((data: any) => {
     if(!data.status){
        alert(data.message);
     }else{
      this.route.navigate(['/user/login']);
     }
    });

  }

}

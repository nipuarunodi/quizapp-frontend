import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quiz-app';

  constructor(        
    private userService: UserService,
    private route:Router
    ) { }

  isLoggedIn = false;
    
  ngOnInit(): void {
    this.userService.isLoggedIn.subscribe(message => this.isLoggedIn = message)
  }

  login(){
    this.route.navigate(['/user/login']);
  }

  logout(){
    localStorage.removeItem('token');
    this.route.navigate(['/user/login']);
  }
}

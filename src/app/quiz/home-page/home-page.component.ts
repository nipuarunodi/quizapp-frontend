import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private route:Router
  ) { }

  ngOnInit(): void {
  }

  level1(){
    this.route.navigate(['/quiz/questions/1']);
  }

  level2(){
    this.route.navigate(['/quiz/questions/2']);
  }

  level3(){
    this.route.navigate(['/quiz/questions/3']);
  }

  level4(){
    this.route.navigate(['/quiz/questions/4']);
  }

  level5(){
    this.route.navigate(['/quiz/questions/5']);
  }

  leaderboard(){
    this.route.navigate(['/quiz/leaderboard']);
  }

}

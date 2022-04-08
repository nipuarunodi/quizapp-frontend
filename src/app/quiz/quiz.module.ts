import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';


@NgModule({
  declarations: [
    HomePageComponent,
    QuizPageComponent,
    LeaderboardComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule
  ]
})
export class QuizModule { }

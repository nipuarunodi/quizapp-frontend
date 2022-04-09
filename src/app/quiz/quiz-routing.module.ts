import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { QuizPageComponent } from './quiz-page/quiz-page.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'questions/:levelId',
    component: QuizPageComponent
  },
  {
    path: 'leaderboard',
    component: LeaderboardComponent
  },
  {
    path: '',
    component: HomePageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }

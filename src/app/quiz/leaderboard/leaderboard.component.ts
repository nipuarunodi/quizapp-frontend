import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  constructor(private quizService: QuizService, private route: Router) {}

  scores = [];

  ngOnInit(): void {
    this.getAllScores();
  }

  getAllScores() {
    this.quizService.getAllScores().subscribe((data: any) => {
      if (!data.status) {
        alert(data.message);
      } else {
        data.message.map((score: any) => {
          if (this.scores.length == 0) {
            this.scores.push(score);
          } else {
            for (let index = 0; index < this.scores.length; index++) {
              if (score.userId == this.scores[index].userId) {
                this.scores[index].score += score.score;
              } else {
                this.scores.push(score);
              }
            }
          }
        });
      }
    });
  }

  homepage() {
    this.route.navigate(['/quiz/home']);
  }

}

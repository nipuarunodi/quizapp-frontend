import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../quiz.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss'],
})
export class QuizPageComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private quizService: QuizService,
    private userService: UserService
  ) {}

  levelId = 0;
  questions = [];
  displayIndex = 0;
  totalQuestions = 0;
  correctAnswers = 0;
  totalFullMarks = 0;
  totlaMarks = 0;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      this.levelId = parameter.levelId;
      this.correctAnswers = 0;
      this.getQuestions(this.levelId);
    });
  }

  shuffle(array: any[]) {
    var j, x, i;
    for (i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = array[i];
      array[i] = array[j];
      array[j] = x;
    }
    return array;
  }

  getQuestions(levelId: any) {
    var URL = '';
    switch (levelId) {
      case '1':
        URL =
          'https://opentdb.com/api.php?amount=10&category=19&difficulty=easy';
        break;
      case '2':
        URL =
          'https://opentdb.com/api.php?amount=10&category=19&difficulty=medium&type=multiple';
        break;
      case '3':
        URL =
          'https://opentdb.com/api.php?amount=15&category=19&difficulty=medium';
        break;
      case '4':
        URL =
          'https://opentdb.com/api.php?amount=10&category=19&difficulty=hard&type=multiple';
        break;
      case '5':
        URL =
          'https://opentdb.com/api.php?amount=15&category=19&difficulty=hard';
        break;
      default:
        URL =
          'https://opentdb.com/api.php?amount=10&category=19&difficulty=easy&type=multiple';
        break;
    }
    this.quizService.getQuestions(URL).subscribe((data: any) => {
      this.questions = data.results.map((question: any) => {
        var answers = question.incorrect_answers;
        answers.push(question.correct_answer);
        return {
          question: question.question,
          correct_answer: question.correct_answer,
          answers: this.shuffle(answers),
          type: question.type,
        };
      });
      this.totalQuestions = this.questions.length;
      this.totalFullMarks = this.totalQuestions * Number(this.levelId); 
    });
  }

  checkAnswer(question, selectedAnswer) {
    if (question.correct_answer == selectedAnswer) {
      this.correctAnswers += 1;
    }
    if (this.questions.length > this.displayIndex) {
      this.displayIndex += 1;
    }
    this.totlaMarks = this.correctAnswers * Number(this.levelId);
  }

  navigatetoLeaderBoard() {
    const helper = new JwtHelperService();
    var token = localStorage.getItem('token');
    const decodedToken = helper.decodeToken(token);
    this.totlaMarks = this.correctAnswers * Number(this.levelId);
    this.userService.getUser(decodedToken._id).subscribe((data: any) => {
      if (!data.status) {
        alert(data.message);
      } else {
        var params = {
          userId: decodedToken._id,
          email: data.message.email,
          name: data.message.name,
          level: this.levelId,
          score: this.totlaMarks,
        };

        this.quizService.saveLevelScore(params).subscribe((data: any) => {
          if (!data.status) {
            alert(data.message);
          } else {
            this.route.navigate(['/quiz/leaderboard']);
          }
        });
      }
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }
  SERVER_URL = 'http://localhost:5000'

  getQuestions(URL:any){
    return this.http.get(URL);
  }

  saveLevelScore(params:any){
    return this.http.post(this.SERVER_URL + '/score/create', params);
  }

  getAllScores(){
    return this.http.get(this.SERVER_URL + '/score');
  }
}

import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface Question {
  text: string;
  answers: Array<string>;
  correctAnswer: string;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  public questions$!: Observable<Question[]>;
  public currentQuestion$ = new Subject<Question>();

  constructor(private firestore: Firestore, private activeteRoute: ActivatedRoute) {
    activeteRoute.paramMap.subscribe((params) => {
      const quizid = params.get('quizid');

      const questions = collection(firestore, `quizes/${quizid}/questions`);
      this.questions$ = collectionData(questions, { idField: 'uid' }) as Observable<Question[]>;

      this.questions$.subscribe((questions) => {
        this.currentQuestion$.next(questions[0]);
      });
    });
  }

  ngOnInit(): void {}
}

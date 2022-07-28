import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  public questions$!: Observable<any[]>;

  constructor(private firestore: Firestore, private activeteRoute: ActivatedRoute) {
    activeteRoute.paramMap.subscribe((params) => {
      const quizid = params.get('quizid');

      const questions = collection(firestore, `quizes/${quizid}/questions`);
      this.questions$ = collectionData(questions, { idField: 'uid' });
    });
  }

  ngOnInit(): void {}
}

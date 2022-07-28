import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  public questions$: Observable<any[]>;

  constructor(private firestore: Firestore) {
    const questions = collection(firestore, 'quizes/hKQPv0pxOUTg6SMtX46g/questions');
    this.questions$ = collectionData(questions, { idField: 'uid' });
  }

  ngOnInit(): void {}
}

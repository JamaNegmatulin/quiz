import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
})
export class QuizListComponent implements OnInit {
  public quizes: any[] = [];

  constructor(private firestore: Firestore, private router: Router) {}

  ngOnInit(): void {
    const quizesRef = collection(this.firestore, 'quizes');
    collectionData(quizesRef, { idField: 'uid' }).subscribe((data) => {
      this.quizes = data;
    });
  }
}

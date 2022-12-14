import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { QuizFinishDialogComponent } from './quiz-finish-dialog/quiz-finish-dialog.component';

export interface Question {
  text: string;
  answers: Array<string>;
  correctAnswer: string;
  userAnswer: boolean;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  public currentQuestion?: Question;
  public currentQuestionIndex: number = 0;
  public questions: Question[] = [];
  public currectAnswersCount = 0;

  constructor(private firestore: Firestore, private activeteRoute: ActivatedRoute, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.activeteRoute.paramMap.subscribe((params) => {
      console.log('url поменяли', params);

      const quizid = params.get('quizid');

      console.log('quized сейчас равно', params);

      console.log('начинаем делать запрос к базе');
      this.fetchAllQuestions(quizid);
    });
  }

  fetchAllQuestions(quizid: string | null) {
    //создаём ссылку в коллекции questions в firebase
    const questionsRef = collection(this.firestore, `quizes/${quizid}/questions`);
    console.log('создаём ссылку к questions, questionsRef равно', questionsRef);

    //делаем запрос к коллекции в firebase
    console.log('делаем запрос к коллекции');
    collectionData(questionsRef, { idField: 'uid' }).subscribe((questions) => {
      // Охраняем вопросы в переменную questions
      this.questions = questions as Question[];

      console.log('запрос закончился, question равно', this.questions);

      //берём первый вопрос и сохраняем его в переменную currentQuestion
      //currentQuestionIndex = 0
      this.currentQuestion = this.questions[this.currentQuestionIndex];

      console.log('currentQuestionIndex равно', this.currentQuestionIndex);
      console.log('currentQuestion равно', this.currentQuestion);
    });
  }

  answerToQuestion(answer: string) {
    if (this.currentQuestion) {
      this.currentQuestion.userAnswer = answer == this.currentQuestion.correctAnswer;
      if (answer == this.currentQuestion.correctAnswer) {
        this.currectAnswersCount = this.currectAnswersCount + 1;
      }
    }

    //Увеличиваем индекс текущего вопроса на 1
    this.currentQuestionIndex = this.currentQuestionIndex + 1;
    this.currentQuestion = this.questions[this.currentQuestionIndex];
    console.log('Увеличиваем индекс текущего вопроса на 1');
    console.log('currentQuestionIndex равно', this.currentQuestionIndex);
    console.log('currentQuestion равно', this.currentQuestion);

    if (this.currentQuestionIndex >= this.questions.length) {
      this.dialog.open(QuizFinishDialogComponent);
    }
  }
}

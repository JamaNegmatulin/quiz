import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';


@NgModule({
  declarations: [
    QuizComponent,
    QuizListComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule
  ]
})
export class QuizModule { }

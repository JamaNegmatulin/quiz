import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { QuizFinishDialogComponent } from './quiz-finish-dialog/quiz-finish-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [QuizComponent, QuizListComponent, QuizFinishDialogComponent],
  imports: [CommonModule, QuizRoutingModule, MatDialogModule],
})
export class QuizModule {}

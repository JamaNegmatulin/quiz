import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { QuizComponent } from './quiz.component';

const routes: Routes = [
  { path: 'list', component: QuizListComponent },
  { path: ':quizid', component: QuizComponent },
  { path: '', pathMatch: 'full', redirectTo: 'list' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizRoutingModule {}

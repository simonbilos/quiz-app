import { Routes } from "@angular/router";
import { QuizComponent } from "./quiz/quiz.component";
import { QuizSelectorComponent } from "./quiz-selector/quiz-selector.component";

export const routes: Routes = [
  { path: "", component: QuizSelectorComponent },
  { path: "quiz", component: QuizComponent },
];

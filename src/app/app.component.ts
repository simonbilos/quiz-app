import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { QuizComponent } from "./quiz/quiz.component";
import { QuizSelectorComponent } from "./quiz-selector/quiz-selector.component";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, QuizComponent, QuizSelectorComponent],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  title = "quiz-app";
}

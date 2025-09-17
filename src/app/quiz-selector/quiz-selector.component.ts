import { Component, signal } from "@angular/core";
import { Router } from "@angular/router";
import { QuizComponent } from "../quiz/quiz.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-quiz-selector",
  imports: [QuizComponent, RouterOutlet],
  templateUrl: "./quiz-selector.component.html",
})
export class QuizSelectorComponent {
  quizzes = signal([
    { name: "General knowledge", link: "assets/general-knowledge.json" },
    { name: "Music knowledge", link: "assets/music-knowledge.json" },
    { name: "TBA", link: "" },
    { name: "TBA", link: "" },
  ]);

  constructor(private router: Router) {}

  onClick(quiz: string) {
    this.router.navigate(["/quiz"], { queryParams: { file: quiz } });
  }
}

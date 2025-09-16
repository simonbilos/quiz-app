import { Component, signal } from "@angular/core";
import { QuizComponent } from "../quiz/quiz.component";

@Component({
  selector: "app-quiz-selector",
  imports: [QuizComponent],
  templateUrl: "./quiz-selector.component.html",
})
export class QuizSelectorComponent {
  quizzes = signal([
    { name: "General knowledge", link: "/assets/general-knowledge.json" },
    { name: "Music knowledge", link: "/assets/music-knowledge.json" },
    { name: "TBA", link: "" },
    { name: "TBA", link: "" },
  ]);

  onClick(quiz: string) {}
}

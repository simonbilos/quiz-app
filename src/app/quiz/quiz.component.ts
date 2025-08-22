import { Component, signal, inject, effect } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { QuizQuestionComponent } from "../quiz-question/quiz-question.component";

interface Question {
  question: string;
  answers: QuizAnswer[];
}

interface QuizAnswer {
  answer: string;
  isCorrect: boolean;
}

@Component({
  selector: "app-quiz",
  imports: [QuizQuestionComponent],
  templateUrl: "./quiz.component.html",
})
export class QuizComponent {
  private http = inject(HttpClient);
  questions = signal<Question[]>([]);

  constructor() {
    effect(() => {
      this.http
        .get<Question[]>("/assets/quiz-question.json")
        .subscribe((data) => this.questions.set(data));
    });
  }
}

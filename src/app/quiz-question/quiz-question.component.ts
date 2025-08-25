import { Component, effect, input, output, signal } from "@angular/core";

interface Question {
  question: string;
  answers: QuizAnswer[];
}

interface QuizAnswer {
  answer: string;
  isCorrect: boolean;
}

interface QuizResponse {
  selectedAnswer?: QuizAnswer;
  skip: boolean;
}
@Component({
  selector: "app-quiz-question",
  imports: [],
  templateUrl: "./quiz-question.component.html",
})
export class QuizQuestionComponent {
  colors = signal(["#fe3758", "#44a1e5", "#ffbf08", "#67bd3b"]);
  question = input.required<Question>();
  selectedIndex = signal<number | null>(null);

  constructor() {
    effect(() => {
      const q = this.question();
      if (q) {
        this.selectedIndex.set(null);
      }
    });
  }

  response = output<QuizResponse>();

  onSelect(answer: QuizAnswer, i: number) {
    this.response.emit({ selectedAnswer: answer, skip: false });
    this.selectedIndex.set(i);
  }
}

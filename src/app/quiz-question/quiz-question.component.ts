import { Component, input, output, signal } from "@angular/core";

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

  response = output<QuizResponse>();

  onSelect(answer: QuizAnswer) {
    this.response.emit({ selectedAnswer: answer, skip: false });
  }

  onSkip() {
    this.response.emit({ skip: true });
  }
}

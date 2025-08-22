import { Component, signal, inject, effect, computed } from "@angular/core";
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

interface QuizResponse {
  selectedAnswer?: QuizAnswer;
  skip: boolean;
}

@Component({
  selector: "app-quiz",
  imports: [QuizQuestionComponent],
  templateUrl: "./quiz.component.html",
})
export class QuizComponent {
  private http = inject(HttpClient);
  questions = signal<Question[]>([]);
  currentIndex = signal<number>(0);
  correctAnswers = signal<number>(0);
  skippedQuestions = signal<number>(0);

  currentQuestion = computed(() => this.questions()[this.currentIndex()]);

  constructor() {
    effect(() => {
      this.http
        .get<Question[]>("/assets/quiz-question.json")
        .subscribe((data) => {
          const shuffledQuestions = this.shuffle(data).map((question) => ({
            ...question,
            answers: this.shuffle(question.answers),
          }));
          this.questions.set(shuffledQuestions);
        });
    });
  }

  onResponse(event: QuizResponse) {
    this.countAnswers(event);
    this.currentIndex.update((i) => i + 1);
  }

  countAnswers(event: QuizResponse) {
    if (event.selectedAnswer?.isCorrect) {
      this.correctAnswers.update((i) => i + 1);
    }
    if (event.skip) {
      this.skippedQuestions.update((i) => i + 1);
    }
  }

  showResult = computed(() => this.currentIndex() >= this.questions().length);

  // for shuffle I am going to use Fisher-Yates shuffle
  shuffle(questions: any[]) {
    const arr = [...questions];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}

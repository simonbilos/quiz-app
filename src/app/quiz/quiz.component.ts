import {
  Component,
  signal,
  inject,
  effect,
  computed,
  input,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
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

type AnswerState = "correct" | "wrong" | "skipped" | "unanswered";

@Component({
  selector: "app-quiz",
  imports: [QuizQuestionComponent],
  templateUrl: "./quiz.component.html",
})
export class QuizComponent {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);

  questions = signal<Question[]>([]);
  currentIndex = signal<number>(0);
  correctAnswers = signal<number>(0);
  skippedQuestions = signal<number>(0);
  userResponse = signal<QuizResponse>({ skip: true });
  answerStates = signal<AnswerState[]>([]);

  currentQuiz = signal(this.route.snapshot.queryParamMap.get("file") ?? "");

  currentQuestion = computed(() => this.questions()[this.currentIndex()]);
  showResult = computed(() => this.currentIndex() >= this.questions().length);

  constructor() {
    effect(() => {
      const file = this.currentQuiz();
      if (!file) return;

      this.http.get<Question[]>(file).subscribe((data) => {
        const shuffledQuestions = this.shuffle(data).map((question) => ({
          ...question,
          answers: this.shuffle(question.answers),
        }));
        this.questions.set(shuffledQuestions);
        this.answerStates.set(
          Array(shuffledQuestions.length).fill("unanswered")
        );
      });
    });
  }

  nextquestion() {
    this.countAnswers(this.userResponse());
    this.currentIndex.update((i) => i + 1);
    this.userResponse.set({ skip: true });
  }

  countAnswers(event: QuizResponse) {
    const idx = this.currentIndex();
    this.answerStates.update((states) => {
      const newStates = [...states];
      if (event.skip) {
        newStates[idx] = "skipped";
        this.skippedQuestions.update((i) => i + 1);
      } else if (this.correctQuestion(event)) {
        newStates[idx] = "correct";
        this.correctAnswers.update((i) => i + 5);
      } else {
        newStates[idx] = "wrong";
        this.correctAnswers.update((i) => i - 2);
      }

      return newStates;
    });
  }

  // for shuffle I am going to use Fisher-Yates shuffle
  shuffle(questions: any[]) {
    const arr = [...questions];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  correctQuestion(event: QuizResponse) {
    return event.selectedAnswer?.isCorrect;
  }

  onResponse(event: QuizResponse) {
    this.userResponse.set(event);
  }
}

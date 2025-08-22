import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-start",
  imports: [],
  templateUrl: "./start.component.html",
})
export class StartComponent {
  constructor(private router: Router) {}

  startQuiz() {
    this.router.navigate(["/quiz"]);
  }
}

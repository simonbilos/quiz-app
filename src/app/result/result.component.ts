import { input } from "@angular/core";
import { Component } from "@angular/core";

@Component({
  selector: "app-result",
  imports: [],
  templateUrl: "./result.component.html",
})
export class ResultComponent {
  correctAnswers = input<number>();
}

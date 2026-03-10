import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from "./features/theme-toggle/theme-toggle.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThemeToggleComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('fp-alpha-assessment');
}

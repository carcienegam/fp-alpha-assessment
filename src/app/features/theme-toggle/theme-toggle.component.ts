import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-theme-toggle',
    standalone: true,
    imports: [MatButtonModule, MatIconModule],
    templateUrl: './theme-toggle.component.html',
    styleUrl: './theme-toggle.component.scss'
})

export class ThemeToggleComponent {
    isDark = false;

    toggle(){
        this.isDark = !this.isDark;
        document.documentElement.classList.toggle('dark', this.isDark);
    }
}
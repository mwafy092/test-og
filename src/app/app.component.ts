import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
declare global {
  interface Window {
    FB: any;
    fbAsyncInit: any;
  }
}
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}

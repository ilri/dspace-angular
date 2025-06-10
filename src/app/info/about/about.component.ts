import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ds-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
  ],
})
/**
 * Component displaying the About page
 */
export class AboutComponent {
}

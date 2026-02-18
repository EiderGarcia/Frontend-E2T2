import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  template: `<h2 class="section-title">{{ text }}</h2>`,
  styleUrls: ['./section-title.component.scss'],
  standalone: true,
})
export class SectionTitleComponent {
  @Input() text = '';
}
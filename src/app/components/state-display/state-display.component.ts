import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-state-display',
  template: `
    @if (loading) {
      <p class="state-msg">Loading...</p>
    } @else if (error) {
      <p class="state-msg error">{{ error }}</p>
    } @else if (empty) {
      <p class="state-msg">{{ emptyText }}</p>
    }
  `,
  styleUrls: ['./state-display.component.scss'],
  standalone: true,
})
export class StateDisplayComponent {
  @Input() loading = false;
  @Input() error = '';
  @Input() empty = false;
  @Input() emptyText = 'No data found.';
}
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss'],
  standalone: true,
})
export class ModalWrapperComponent {
  @Input() title = '';
  @Output() closed = new EventEmitter<void>();
}
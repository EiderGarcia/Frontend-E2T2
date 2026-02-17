import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IonButton, IonModal, IonContent, IonGrid, IonRow, IonCol, IonToolbar, IonButtons } from "@ionic/angular/standalone";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [IonButton, IonGrid, IonRow, IonCol, IonToolbar, IonButtons],
})
export class TableComponent{

  @Input() columns: string[] = [];
  @Input() data: any[] = [];

  @Output() add = new EventEmitter<void>();
  @Output() delete = new EventEmitter<any>();

  onAdd() {
    this.add.emit();
  }

  onDelete(row: any) {
    this.delete.emit(row);
  }
}

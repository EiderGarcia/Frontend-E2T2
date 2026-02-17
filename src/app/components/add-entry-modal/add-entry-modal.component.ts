import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { EquipmentService, Equipment } from '../../services/API/equipment';
import { ConsumableService, Consumable } from '../../services/API/consumables';

@Component({
  selector: 'app-add-entry-modal',
  templateUrl: './add-entry-modal.component.html',
  styleUrls: ['./add-entry-modal.component.scss'],
  standalone: true,
  imports: [IonContent, IonButton, IonItem, IonLabel, IonInput, FormsModule]
})
export class AddEntryModalComponent {

  @Input() type: 'equipments' | 'consumables' = 'equipments';

  // Form fields
  name: string = '';
  brand: string = '';
  batch?: string;
  stock?: number;
  expiration_date?: string;

  constructor(
    private modalCtrl: ModalController,
    private equipmentService: EquipmentService,
    private consumableService: ConsumableService
  ) {}

  async addEntry() {
    if (this.type === 'equipments') {
      const newEquipment: Equipment = { name: this.name, brand: this.brand };
      this.equipmentService.add(newEquipment).subscribe(() => this.modalCtrl.dismiss());
    } else {
      const newConsumable: Consumable = {
        name: this.name,
        brand: this.brand,
        batch: this.batch || '',
        stock: this.stock || 0,
        expiration_date: this.expiration_date || ''
      };
      this.consumableService.add(newConsumable).subscribe(() => this.modalCtrl.dismiss());
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}

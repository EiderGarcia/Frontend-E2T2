import { Component, OnInit, Inject } from '@angular/core';

import { IonContent, IonHeader, IonToolbar, IonTitle, IonButton } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TableComponent } from '../../components/table/table.component';
import { AddEntryModalComponent } from '../../components/add-entry-modal/add-entry-modal.component';
import { EquipmentService } from '../../services/API/equipment';
import { ConsumableService } from '../../services/API/consumables';



@Component({
  selector: 'app-ikasle-home',
  templateUrl: './ikasle-home.page.html',
  styleUrls: ['./ikasle-home.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    NavbarComponent,
    TableComponent,
  ]
})

export class IkasleHomePage implements OnInit {
  selectedTable: string = 'equipments';
  tableData: any[] = [];
  tableColumns: string[] = [];

  constructor(
  
    private Consumable: ConsumableService,
    private Equipment: EquipmentService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.loadData();
  }

  onNavbarSelect(selection: string) {
    this.selectedTable = selection;
    this.loadData();
  }

  loadData() {
    if (this.selectedTable === 'equipments') {
      this.Equipment.getAll().subscribe(data => {
        this.tableData = data;
        this.tableColumns = ['name', 'brand'];
      });
    } else {
      this.Consumable.getAll().subscribe(data => {
        this.tableData = data;
        this.tableColumns = ['name', 'brand', 'batch', 'stock', 'expiration_date'];
      });
    }
  }

  async onAdd() {
    const modal = await this.modalCtrl.create({
      component: AddEntryModalComponent,
      componentProps: { type: this.selectedTable }
    });
    modal.onDidDismiss().then(() => this.loadData());
    await modal.present();
  }

  onDelete(row: any) {
    if (this.selectedTable === 'equipments') {
      this.Equipment.delete(row.id).subscribe(() => this.loadData());
    } else {
      this.Consumable.delete(row.id).subscribe(() => this.loadData());
    }
  }
}

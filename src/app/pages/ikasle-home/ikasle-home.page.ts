import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TableComponent } from '../../components/table/table.component';
import { AddEntryModalComponent } from '../../components/add-entry-modal/add-entry-modal.component';
import { AppointmentModalComponent } from '../../components/appointment-modal/appointment-modal.component';
import { EquipmentService } from '../../services/API/equipment';
import { ConsumableService } from '../../services/API/consumables';
import { ServiceEntityService } from '../../services/API/service';
import { AppointmentApiService, Appointment } from '../../services/API/appointment';
import { ClientApiService } from '../../services/API/client';
import { StudentApiService } from '../../services/API/student';
import { UserApiService } from '../../services/API/user';
import { ScheduleApiService } from '../../services/API/schedule';
import { GroupApiService } from '../../services/API/group';
import { ShiftApiService } from '../../services/API/shift';
import { ModalType } from '../../components/add-entry-modal/add-entry-modal.component';

@Component({
  selector: 'app-ikasle-home',
  templateUrl: './ikasle-home.page.html',
  styleUrls: ['./ikasle-home.page.scss'],
  standalone: true,
  imports: [
    IonContent, CommonModule, NavbarComponent, TableComponent,
    AddEntryModalComponent, AppointmentModalComponent,
  ]
})
export class IkasleHomePage implements OnInit {
  selectedTable: ModalType = 'appointments';
  tableData: any[] = [];
  tableColumns: string[] = [];

  showModal = false;
  editingRow: any = null;
  showDetailModal = false;
  selectedAppointment: Appointment | null = null;

  constructor(
    private consumableService: ConsumableService,
    private equipmentService: EquipmentService,
    private serviceService: ServiceEntityService,
    private appointmentService: AppointmentApiService,
    private clientService: ClientApiService,
    private studentService: StudentApiService,
    private userService: UserApiService,
    private scheduleService: ScheduleApiService,
    private groupService: GroupApiService,
    private shiftService: ShiftApiService,
  ) {}

  ngOnInit() { this.loadData(); }

  onNavbarSelect(selection: string) {
    this.selectedTable = selection as ModalType;
    this.loadData();
  }

  loadData() {
    const configs: Record<ModalType, { obs: any; cols: string[] }> = {
      equipments:   { obs: this.equipmentService.getAll(),   cols: ['name', 'brand'] },
      consumables:  { obs: this.consumableService.getAll(),  cols: ['name', 'brand', 'batch', 'stock', 'expiration_date'] },
      services:     { obs: this.serviceService.getAll(),     cols: ['name', 'price', 'home_price', 'duration'] },
      appointments: { obs: this.appointmentService.getAll(), cols: ['name', 'date', 'start_time', 'end_time', 'seat'] },
      clients:      { obs: this.clientService.getAll(),      cols: ['name', 'surname', 'phone', 'email', 'home_client'] },
      students:     { obs: this.studentService.getAll(),     cols: ['name', 'surname'] },
      users:        { obs: this.userService.getAll(),        cols: ['username', 'email', 'rol'] },
      schedules:    { obs: this.scheduleService.getAll(),    cols: ['day', 'start_date', 'end_date', 'start_time', 'end_time'] },
      groups:       { obs: this.groupService.getAll(),       cols: ['name'] },
      shifts:       { obs: this.shiftService.getAll(),       cols: ['type'] },
    };
    const { obs, cols } = configs[this.selectedTable];
    obs.subscribe((data: any[]) => {
      this.tableData = data;
      this.tableColumns = cols;
    });
  }

  openAddModal() { this.editingRow = null; this.showModal = true; }
  openEditModal(row: any) { this.editingRow = row; this.showModal = true; }
  onModalClosed() { this.showModal = false; this.editingRow = null; this.loadData(); }

  onRowClick(row: any) {
    if (this.selectedTable === 'appointments') {
      this.selectedAppointment = row;
      this.showDetailModal = true;
    }
  }

  onDelete(row: any) {
    const deletes: Record<ModalType, () => any> = {
      equipments:   () => this.equipmentService.delete(row.id),
      consumables:  () => this.consumableService.delete(row.id),
      services:     () => this.serviceService.delete(row.id),
      appointments: () => this.appointmentService.delete(row.id),
      clients:      () => this.clientService.delete(row.id),
      students:     () => this.studentService.delete(row.id),
      users:        () => this.userService.delete(row.id),
      schedules:    () => this.scheduleService.delete(row.id),
      groups:       () => this.groupService.delete(row.id),
      shifts:       () => this.shiftService.delete(row.id),
    };
    deletes[this.selectedTable]().subscribe(() => this.loadData());
  }
}
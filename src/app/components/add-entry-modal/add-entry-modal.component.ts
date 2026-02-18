import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EquipmentService, Equipment } from '../../services/API/equipment';
import { ConsumableService, Consumable } from '../../services/API/consumables';
import { ServiceEntityService, ServiceEntity } from '../../services/API/service';
import { AppointmentApiService, Appointment } from '../../services/API/appointment';
import { ClientApiService, Client } from '../../services/API/client';
import { StudentApiService, Student } from '../../services/API/student';
import { UserApiService, User } from '../../services/API/user';
import { ScheduleApiService, Schedule } from '../../services/API/schedule';
import { GroupApiService, Group } from '../../services/API/group';
import { ShiftApiService, Shift } from '../../services/API/shift';
import { ModalWrapperComponent } from '../modal-wrapper/modal-wrapper.component';

export type ModalType =
  | 'equipments' | 'consumables'
  | 'services' | 'appointments'
  | 'clients' | 'students' | 'users'
  | 'schedules' | 'groups' | 'shifts';

@Component({
  selector: 'app-add-entry-modal',
  templateUrl: './add-entry-modal.component.html',
  styleUrls: ['./add-entry-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ModalWrapperComponent],
})
export class AddEntryModalComponent implements OnInit {
  @Input() type: ModalType = 'equipments';
  @Input() editData: any = null;
  @Output() closed = new EventEmitter<void>();

  isEdit = false;
  errorMessage = '';

  // equipment / consumable
  name = ''; brand = ''; batch = ''; stock?: number; expiration_date = '';
  // service
  price?: number; home_price?: number; duration?: number;
  // appointment
  appt_name = ''; seat?: number; date = ''; start_time = '';
  end_time = ''; comment = ''; client_id?: number;
  availableClients: Client[] = [];
  // client
  c_name = ''; c_surname = ''; c_phone = ''; c_email = '';
  c_home_client = false;
  // student
  s_name = ''; s_surname = '';
  // user
  u_username = ''; u_email = ''; u_rol = ''; u_password = '';
  // schedule
  sc_day?: number; sc_start_date = ''; sc_end_date = '';
  sc_start_time = ''; sc_end_time = ''; sc_group_id?: number;
  availableGroups: Group[] = [];
  // group
  g_name = '';
  // shift
  sh_type = ''; sh_student_id?: number;
  availableStudents: Student[] = [];

  get typeLabel(): string {
    const map: Record<ModalType, string> = {
      equipments: 'Equipment', consumables: 'Consumable',
      services: 'Service', appointments: 'Appointment',
      clients: 'Client', students: 'Student', users: 'User',
      schedules: 'Schedule', groups: 'Group', shifts: 'Shift',
    };
    return map[this.type];
  }

  constructor(
    private equipmentService: EquipmentService,
    private consumableService: ConsumableService,
    private serviceService: ServiceEntityService,
    private appointmentService: AppointmentApiService,
    private clientService: ClientApiService,
    private studentService: StudentApiService,
    private userService: UserApiService,
    private scheduleService: ScheduleApiService,
    private groupService: GroupApiService,
    private shiftService: ShiftApiService,
  ) {}

  ngOnInit() {
    if (this.editData) {
      this.isEdit = true;
      this.populateForm(this.editData);
    }
    // load dropdowns
    this.clientService.getAll().subscribe({
      next: (data) => this.availableClients = data,
      error: () => {}
    });
    this.groupService.getAll().subscribe({
      next: (data) => this.availableGroups = data,
      error: () => {}
    });
    this.studentService.getAll().subscribe({
      next: (data) => this.availableStudents = data,
      error: () => {}
    });
  }

  populateForm(d: any) {
    // equipment / consumable
    this.name = d.name ?? '';
    this.brand = d.brand ?? '';
    this.batch = d.batch ?? '';
    this.stock = d.stock;
    this.expiration_date = d.expiration_date ?? '';
    // service
    this.price = d.price;
    this.home_price = d.home_price;
    this.duration = d.duration;
    // appointment
    this.appt_name = d.name ?? '';
    this.seat = d.seat;
    this.date = d.date ?? '';
    this.start_time = d.start_time ?? '';
    this.end_time = d.end_time ?? '';
    this.comment = d.comment ?? '';
    this.client_id = d.client?.id;
    // client
    this.c_name = d.name ?? '';
    this.c_surname = d.surname ?? '';
    this.c_phone = d.phone ?? '';
    this.c_email = d.email ?? '';
    this.c_home_client = d.home_client ?? false;
    // student
    this.s_name = d.name ?? '';
    this.s_surname = d.surname ?? '';
    // user
    this.u_username = d.username ?? '';
    this.u_email = d.email ?? '';
    this.u_rol = d.rol ?? '';
    // schedule
    this.sc_day = d.day;
    this.sc_start_date = d.start_date ?? '';
    this.sc_end_date = d.end_date ?? '';
    this.sc_start_time = d.start_time ?? '';
    this.sc_end_time = d.end_time ?? '';
    this.sc_group_id = d.group?.id;
    // group
    this.g_name = d.name ?? '';
    // shift
    this.sh_type = d.type ?? '';
    this.sh_student_id = d.student?.id;
  }

  submit() {
    this.errorMessage = '';
    const actions: Record<ModalType, () => void> = {
      equipments:   () => this.submitEquipment(),
      consumables:  () => this.submitConsumable(),
      services:     () => this.submitService(),
      appointments: () => this.submitAppointment(),
      clients:      () => this.submitClient(),
      students:     () => this.submitStudent(),
      users:        () => this.submitUser(),
      schedules:    () => this.submitSchedule(),
      groups:       () => this.submitGroup(),
      shifts:       () => this.submitShift(),
    };
    actions[this.type]();
  }

  private submitEquipment() {
    if (!this.name || !this.brand) { this.errorMessage = 'Name and brand are required.'; return; }
    const payload: Equipment = { name: this.name, brand: this.brand };
    const obs = this.isEdit
      ? this.equipmentService.update(this.editData.id, payload)
      : this.equipmentService.add(payload);
    obs.subscribe({ next: () => this.closed.emit(), error: () => this.errorMessage = 'Error saving.' });
  }

  private submitConsumable() {
    if (!this.name || !this.brand) { this.errorMessage = 'Name and brand are required.'; return; }
    const payload: Consumable = {
      name: this.name, brand: this.brand, batch: this.batch,
      stock: this.stock ?? 0, expiration_date: this.expiration_date,
    };
    const obs = this.isEdit
      ? this.consumableService.update(this.editData.id, payload)
      : this.consumableService.add(payload);
    obs.subscribe({ next: () => this.closed.emit(), error: () => this.errorMessage = 'Error saving.' });
  }

  private submitService() {
    if (!this.name || this.price == null || this.home_price == null || this.duration == null) {
      this.errorMessage = 'All fields are required.'; return;
    }
    const payload: ServiceEntity = {
      name: this.name, price: this.price,
      home_price: this.home_price, duration: this.duration,
    };
    const obs = this.isEdit
      ? this.serviceService.update(this.editData.id, payload)
      : this.serviceService.add(payload);
    obs.subscribe({ next: () => this.closed.emit(), error: () => this.errorMessage = 'Error saving.' });
  }

  private submitAppointment() {
    if (!this.appt_name || !this.date || !this.start_time || !this.end_time || this.seat == null) {
      this.errorMessage = 'Name, seat, date and times are required.'; return;
    }
    const payload: Appointment = {
      name: this.appt_name, seat: this.seat, date: this.date,
      start_time: this.start_time, end_time: this.end_time,
      comment: this.comment,
      client: this.client_id ? { id: this.client_id } : undefined,
    };
    const obs = this.isEdit
      ? this.appointmentService.update(this.editData.id, payload)
      : this.appointmentService.add(payload);
    obs.subscribe({ next: () => this.closed.emit(), error: () => this.errorMessage = 'Error saving.' });
  }

  private submitClient() {
    if (!this.c_name || !this.c_surname || !this.c_phone || !this.c_email) {
      this.errorMessage = 'All fields are required.'; return;
    }
    const payload: Client = {
      name: this.c_name, surname: this.c_surname,
      phone: this.c_phone, email: this.c_email,
      home_client: this.c_home_client,
    };
    const obs = this.isEdit
      ? this.clientService.update(this.editData.id, payload)
      : this.clientService.add(payload);
    obs.subscribe({ next: () => this.closed.emit(), error: () => this.errorMessage = 'Error saving.' });
  }

  private submitStudent() {
    if (!this.s_name || !this.s_surname) {
      this.errorMessage = 'Name and surname are required.'; return;
    }
    const payload: Student = { name: this.s_name, surname: this.s_surname };
    const obs = this.isEdit
      ? this.studentService.update(this.editData.id, payload)
      : this.studentService.add(payload);
    obs.subscribe({ next: () => this.closed.emit(), error: () => this.errorMessage = 'Error saving.' });
  }

  private submitUser() {
    if (!this.u_username || !this.u_email || !this.u_rol) {
      this.errorMessage = 'Username, email and role are required.'; return;
    }
    if (!this.isEdit && !this.u_password) {
      this.errorMessage = 'Password is required.'; return;
    }
    const payload: User = {
      username: this.u_username, email: this.u_email,
      rol: this.u_rol, password: this.u_password,
    };
    const obs = this.isEdit
      ? this.userService.update(this.editData.id, payload)
      : this.userService.add(payload);
    obs.subscribe({ next: () => this.closed.emit(), error: () => this.errorMessage = 'Error saving.' });
  }

  private submitSchedule() {
    if (this.sc_day == null || !this.sc_start_date || !this.sc_end_date ||
        !this.sc_start_time || !this.sc_end_time) {
      this.errorMessage = 'All fields are required.'; return;
    }
    const payload: Schedule = {
      day: this.sc_day,
      start_date: this.sc_start_date,
      end_date: this.sc_end_date,
      start_time: this.sc_start_time,
      end_time: this.sc_end_time,
      group: this.sc_group_id ? { id: this.sc_group_id } : undefined,
    };
    const obs = this.isEdit
      ? this.scheduleService.update(this.editData.id, payload)
      : this.scheduleService.add(payload);
    obs.subscribe({ next: () => this.closed.emit(), error: () => this.errorMessage = 'Error saving.' });
  }

  private submitGroup() {
    if (!this.g_name) { this.errorMessage = 'Name is required.'; return; }
    const payload: Group = { name: this.g_name };
    const obs = this.isEdit
      ? this.groupService.update(this.editData.id, payload)
      : this.groupService.add(payload);
    obs.subscribe({ next: () => this.closed.emit(), error: () => this.errorMessage = 'Error saving.' });
  }

  private submitShift() {
    if (!this.sh_type) { this.errorMessage = 'Type is required.'; return; }
    const payload: Shift = {
      type: this.sh_type,
      student: this.sh_student_id ? { id: this.sh_student_id } : undefined,
    };
    const obs = this.isEdit
      ? this.shiftService.update(this.editData.id, payload)
      : this.shiftService.add(payload);
    obs.subscribe({ next: () => this.closed.emit(), error: () => this.errorMessage = 'Error saving.' });
  }

  closeModal() { this.closed.emit(); }
}
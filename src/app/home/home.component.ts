import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceModel } from "../models/device.model";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { DeviceService } from "../services/device.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('deviceForm') deviceForm: NgForm;

  devices: Observable<DeviceModel[]> = this.deviceService.getDevices();

  newDevice: DeviceModel = {
    ip: '',
    name: ''
  }
  constructor(private router: Router, private  deviceService: DeviceService) { }

  ngOnInit(): void {
  }

  addDevice() {
    this.deviceService.addDevice({...this.newDevice});
    this.deviceForm.resetForm();
  }

  async viewDevice(device: DeviceModel) {
    await this.router.navigateByUrl(`/device/${device.name}`);
  }
}

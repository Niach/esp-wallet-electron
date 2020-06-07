import { Injectable } from '@angular/core';
import { DeviceModel } from "../models/device.model";
import { BehaviorSubject, Observable } from "rxjs";

const DEVICES_KEY = "DEVICES";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private devices: BehaviorSubject<DeviceModel[]> = new BehaviorSubject<DeviceModel[]>([]);

  constructor() { }

  public getDevices(): Observable<DeviceModel[]> {
    return this.devices.asObservable();
  }

  public loadDevices() {
    const devices = localStorage.getItem(DEVICES_KEY);
    if (devices) {
      this.devices.next(JSON.parse(devices));
    }
  }

  public saveDevices() {
    localStorage.setItem(DEVICES_KEY, JSON.stringify(this.devices.getValue()));
  }

  public addDevice(device: DeviceModel) {
    const newDevices = this.devices.getValue();
    newDevices.push(device);
    this.devices.next(newDevices);
    this.saveDevices();
  }

  public getDevice(name: string): DeviceModel {
    return this.devices.getValue().find(device => device.name == name);
  }
}

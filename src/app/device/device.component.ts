import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DeviceService } from "../services/device.service";
import { DeviceModel } from "../models/device.model";
import { AccountService } from "../services/account.service";
import { Observable } from "rxjs";
import { AccountModel } from "../models/account.model";

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  device: DeviceModel;
  accounts$: Observable<AccountModel[]>;


  constructor(private activatedRoute: ActivatedRoute, private deviceService: DeviceService, private accountService: AccountService) { }

  async ngOnInit() {
    const name = this.activatedRoute.snapshot.params?.name;
    this.device = this.deviceService.getDevice(name);
    if(this.device) {

      await Promise.all([0, 1, 2].map(i => this.accountService.loadAccount(this.device, i, 5)));
      this.accounts$ = this.accountService.getAccounts(this.device);
    }

  }

}

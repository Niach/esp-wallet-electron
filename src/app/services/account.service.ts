import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { DeviceModel } from "../models/device.model";
import { AccountModel } from "../models/account.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accounts: BehaviorSubject<{[device: string]: AccountModel[]}> = new BehaviorSubject<{[device: string]: AccountModel[]}>({});

  constructor(private httpClient: HttpClient) { }

  public async loadAccount(device: DeviceModel, accountNumber: number, numberOfAddresses: number) {
    const promises: Promise<string>[] = [];
    for (let i = 0; i < numberOfAddresses; i++) {
      const addressPromise = this.httpClient.get<string>(`http://${device.ip}/address?account=${accountNumber}&offset=${i}`, {
        responseType: 'text' as any
      }).toPromise();
      promises.push(addressPromise);
    }
    const addresses: string[] = await Promise.all(promises);
    const accountsMap = this.accounts.getValue();
    const accounts = accountsMap[device.name] ? accountsMap[device.name] : [];

    accounts[accountNumber] = {
      addresses: addresses.map(address => {
        return {
          value: address
        };
      })
    }

    accountsMap[device.name] = accounts;

    this.accounts.next(accountsMap);
  }

  public getAccounts(device: DeviceModel): Observable<AccountModel[]> {
    return this.accounts.asObservable().pipe(
        map(accounts => {
          return accounts[device.name];
        })
    );
  }


}

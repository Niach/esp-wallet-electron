import { Injectable } from '@angular/core';
import * as bitcoin from 'bitcoinjs-lib';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor() { }

  public createTransaction(from: string, to: string, utxos: any, satoshiAmount: number) {
      const psbt = new bitcoin.Psbt();

  }
}

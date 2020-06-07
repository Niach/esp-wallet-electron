import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

const URL = 'https://blockstream.info/api/';

@Injectable({
  providedIn: 'root'
})
export class BlockstreamApiService {

  constructor(private httpClient: HttpClient) { }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as crypto from 'crypto-js'
import {MyResponse} from "../../MyResponse";

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient) {
  }


  makeSignedGetRequest() {
    let url = 'https://gsq7cb6hl6.execute-api.us-east-1.amazonaws.com/snapshot/listallresouces'
    const accessKey = '****';
    const secretKey = '****/';
    const region = 'us-east-1';
    const service = 'API-GATEWAY';

    const headers = new HttpHeaders();
    const timestamp = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
    const date = timestamp.substr(0, 8);

    // Step 1: Create canonical request
    const canonicalRequest = `GET\n${url}\n\nhost:${url.split('/')[2]}\n\nhost\n`;

    // Step 2: Create string to sign
    const credentialScope = `${date}/${region}/${service}/aws4_request`;
    const stringToSign = `AWS4-HMAC-SHA256\n${timestamp}\n${credentialScope}\n${crypto.SHA256(canonicalRequest).toString(crypto.enc.Hex)}`;

    // Step 3: Calculate signature
    const kDate = crypto.HmacSHA256(date, `AWS4${secretKey}`).toString(crypto.enc.Hex);
    const kRegion = crypto.HmacSHA256(region, kDate).toString(crypto.enc.Hex);
    const kService = crypto.HmacSHA256(service, kRegion).toString(crypto.enc.Hex);
    const kSigning = crypto.HmacSHA256('aws4_request', kService).toString(crypto.enc.Hex);
    const signature = crypto.HmacSHA256(stringToSign, kSigning).toString(crypto.enc.Hex);

    // Step 4: Add signature to headers
    headers.set('Authorization', `AWS4-HMAC-SHA256 Credential=${accessKey}/${credentialScope}, SignedHeaders=host, Signature=${signature}`);

   return this.http.get<MyResponse>(url, {headers})

   //  let response=this.http.get(url, {headers}).pipe((res));

  }

}

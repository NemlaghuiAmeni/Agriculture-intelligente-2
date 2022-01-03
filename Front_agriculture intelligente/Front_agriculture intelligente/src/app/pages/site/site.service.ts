import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Site} from '../../model/site';
import {HttpClient} from '@angular/common/http';
import {Ligne} from '../../model/ligne';
import {Device} from '../../model/device';
@Injectable({
  providedIn: 'root'})
export class SiteService {
url = 'http://localhost:3000/api/v1/lignes/deleteLigne';
urlupdate = 'http://localhost:3000/api/v1/lignes/updateLigne/';
  constructor(private http: HttpClient) { }
  findByName(name: any): Observable<Site[]> {
    return this.http.get<Site[]>('http://localhost:3000/api/v1/sites/getSiteByName');
  }
  deleteligne(id) {
    return this.http.delete(this.url + '/' + id);
  }
  getAllLines(): Observable<Ligne[]> {
    return this.http.get<Ligne[]>('http://localhost:3000/api/v1/lignes/getLigneByUser');
  }
  updateLigne(ligne: Ligne) {
    return this.http.patch(this.urlupdate, ligne);
  }
  getAllsites(): Observable<Site[]> {
    return this.http.get<Site[]>('http://localhost:3000/api/v1/sites/getSiteByUser');
  }
  getAlldevices(): Observable<Device[]> {
    return this.http.get<Device[]>('http://localhost:3000/api/v1/devices/findbyuser');
  }
}

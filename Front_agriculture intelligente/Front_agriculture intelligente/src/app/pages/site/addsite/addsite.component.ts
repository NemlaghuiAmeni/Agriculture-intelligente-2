import { Component, OnInit } from '@angular/core';
import {MapboxLanguage} from '@mapbox/mapbox-gl-language';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../../../environments/environment';

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
const Swal = require('sweetalert2');

import {Router} from '@angular/router';

import {Site} from '../../../model/site';
@Component({
  selector: 'ngx-addsite',
  templateUrl: './addsite.component.html',
  styleUrls: ['./addsite.component.scss']})
export class AddsiteComponent implements OnInit {
  MapboxLanguage = require('@mapbox/mapbox-gl-language');
  map: mapboxgl.Map;
  public el = new mapboxgl.Marker();
  private Latiude: number;
  private Longitude: number;
  public data: Array<Site>;
  public data1;
  constructor(private http: HttpClient ,
              private router: Router,
    private formBuilder: FormBuilder) {

  }
  ok = this.http.get('http://localhost:3000/api/v1/sites/getSiteByUser').subscribe(data => {
    const resSTR = JSON.stringify(data);
    const resJSON = JSON.parse(resSTR);
    this.data = resJSON;
    this.data1 = data;
    this.data1.forEach(item => {
      const popup = new mapboxgl.Popup({ offset: 20 }).setHTML(
        '<h2 class="text-info">' + item.name + '</h2>' ,
      );
      // create the popup
      new mapboxgl.Marker({ 'color': 'grey'}).setLngLat([item.lng, item.lat]).setPopup(popup).addTo(this.map);
    });
  });
  siteUrl = 'http://localhost:3000/api/v1/sites/addSite';
  // token = localStorage.getItem('token');
  // headers = new HttpHeaders().set('Authorization', 'Bearer' + token);
  addForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
  });
  submitted = false;
  onSubmit() {
    this.submitted = true ;
   /* const options = {
      params: new HttpParams().append('token', localStorage.getItem('token')),
    };
    const headers = new HttpHeaders(
      { Authorization: 'Bearer' + ' ' + localStorage.getItem('token') });
    console.log(headers);*/
    this.http.post(this.siteUrl,
      {
        name: this.addForm.get('name').value,
        description: this.addForm.get('description').value,
        lng : this.Longitude,
        lat : this.Latiude,
      }).subscribe(data => {
      const resSTR = JSON.stringify(data);
      const resJSON = JSON.parse(resSTR);
     // console.log(resJSON);
      if (resJSON.status === 'err') {
        Swal.fire(
          'error!',
          'Please check your data',
          'error',
        );
      } else { Swal.fire(
        'Success!',
        'Site has been added.',
        'success',
      );
        this.addForm.reset();
        this.Latiude = null ;
        this.Longitude = null ;
        this.router.navigate(['/pages/allsite']);
      }
    }, error => {
    });
  }

  ngOnInit() {
    (mapboxgl as typeof mapboxgl).accessToken
      = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 6,
      center: [9.196506147691451 , 33.792635314317465],
    });
    // Add map controls
    this.map.on('click', hello => {
      this.Longitude = hello.lngLat.lng;
      this.Latiude = hello.lngLat.lat;
      this.el.setLngLat([hello.lngLat.lng, hello.lngLat.lat])
        .addTo(this.map);
    });
    const mapboxLanguage = new this.MapboxLanguage({
      defaultLanguage: 'en',
    });

    this.map.addControl(mapboxLanguage);
    this.map.addControl(
      new MapboxGeocoder({
        countries: 'tn',
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: 'Enter an address or place name',

      }));
  }

}

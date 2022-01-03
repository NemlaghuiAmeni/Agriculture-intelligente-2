import { Component, OnInit } from '@angular/core';
import {MapboxLanguage} from '@mapbox/mapbox-gl-language';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../../../environments/environment';
const Swal = require('sweetalert2');
import {Router} from '@angular/router';
import {Ligne} from '../../../model/ligne';
import {Device} from '../../../model/device';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
@Component({
  selector: 'ngx-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss'],
})
export class AddDeviceComponent implements OnInit {
  map: mapboxgl.Map;
  public el = new mapboxgl.Marker();
  private Latitude: number;
  private Longitude: number;
  constructor(private http: HttpClient ,  private router: Router, private formBuilder: FormBuilder) { }
  selectedOption1: any;
  selectedOption2: any;
  addForm = new FormGroup({
    name: new FormControl(),
    code: new FormControl(),
  });
  finddevice = 'http://localhost:3000/api/v1/devices/findbyuser';
  deviceurl = 'http://localhost:3000/api/v1/devices/addDevice';
  findLigneByUser = 'http://localhost:3000/api/v1/lignes/getLigneByUser';
  findSiteByUser = 'http://localhost:3000/api/v1/sites/getSiteByUser';
  options1 = [];
  options2 = [];
  final: any;
  submitted = false;
  test1 = this.http.get(this.findSiteByUser, {}).subscribe(data => {
    const resSTR = JSON.stringify(data);
    const resJSON = JSON.parse(resSTR);
    this.options1 = resJSON;
    // console.log(this.options);
  });
  test2 = this.http.get(this.findLigneByUser, {}).subscribe(data => {
    const resSTR = JSON.stringify(data);
    const resJSON = JSON.parse(resSTR);
    this.final = resJSON;
    this.options2 = this.final;
    // console.log(this.options2);
  });
  public data: Array<Device>;
  public data1;
  public item;
  ok = this.http.get('http://localhost:3000/api/v1/devices/findbyuser').subscribe(data => {
    const resSTR = JSON.stringify(data);
    const resJSON = JSON.parse(resSTR);
    this.data = resJSON;
    this.data1 = data;
    this.data1.forEach(item => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        '<h2 class="text-info">' + item.name + '</h2>',
      );
      // create the popup
      new mapboxgl.Marker({ color: 'grey', symbol: 'camera1'})
        .setLngLat([item.lng, item.lat]).setPopup(popup).addTo(this.map);
    });
  });
  onSubmit() {
    this.submitted = true ;

    this.http.post(this.deviceurl,
      {
        name: this.addForm.get('name').value,
        code: this.addForm.get('code').value,
        lng : this.Longitude,
        lat : this.Latitude,
        siteId: this.selectedOption1._id,
        siteName: this.selectedOption1.name,
        ligneId: this.selectedOption2._id,
        ligneName: this.selectedOption2.name,
      }).subscribe(data => {
      const resSTR = JSON.stringify(data);
      const resJSON = JSON.parse(resSTR);
      //   console.log(resJSON);
      // console.log(resJSON);
      if (resJSON.status === 'err') {
        Swal.fire(
          'error!',
          'Please check your data',
          'error',
        );
      } else { Swal.fire(
        'Success!',
        'Device has been added.',
        'success',
      );
        this.addForm.reset();
        this.Latitude = null ;
        this.Longitude = null ;
        this.router.navigate(['/pages/alldevice']);
      }
    }, error => {
    });
  }
  ngOnInit(): void {
    (mapboxgl as typeof mapboxgl).accessToken
      = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/rania123/ckmlsw5sf0w2a17qipgxunzxt',
      zoom: 8,
      center: [10.196506147691451 , 36.792635314317465],
    });
    // Add map controls
    this.map.on('click', hello => {
      this.Longitude = hello.lngLat.lng;
      this.Latitude = hello.lngLat.lat;
      this.el.setLngLat([hello.lngLat.lng, hello.lngLat.lat])
        .addTo(this.map);
    });
    const geocoder = new MapboxGeocoder({
      countries: 'tn',
      marker: {
        color: 'orange'},
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: 'Enter an address or place name',
    });
    this.map.addControl(
      geocoder);
  }

}

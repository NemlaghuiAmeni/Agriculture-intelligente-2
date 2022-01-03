import { Component, OnInit } from '@angular/core';
import {MapboxLanguage} from '@mapbox/mapbox-gl-language';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../../../environments/environment';
const Swal = require('sweetalert2');
import {Router} from '@angular/router';
import {Ligne} from '../../../model/ligne';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

@Component({
  selector: 'ngx-addligne',
  templateUrl: './addligne.component.html',
  styleUrls: ['./addligne.component.scss']})
export class AddligneComponent implements OnInit {
  map: mapboxgl.Map;
  public el = new mapboxgl.Marker();
  private Latitude: number;
  private Longitude: number;
  constructor(private http: HttpClient ,  private router: Router, private formBuilder: FormBuilder) {
  }
  selectedOption: any;
  addForm = new FormGroup({
    ligne: new FormControl(),
  });

  public data: Array<Ligne>;
  public data1;

  public item;
  ligneUrl = 'http://localhost:3000/api/v1/lignes/addLigne';
  findSiteByUser = 'http://localhost:3000/api/v1/sites/getSiteByUser';
  options = [];
  submitted = false;
  ok = this.http.get('http://localhost:3000/api/v1/lignes/getLigneByUser').subscribe(data => {
    const resSTR = JSON.stringify(data);
    const resJSON = JSON.parse(resSTR);
    this.data = resJSON;
    this.data1 = data;
    this.data1.forEach(item => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        '<h2 class="text-info">' + item.name + '</h2>' ,
      );
      // create the popup
      new mapboxgl.Marker({ 'color': 'grey'}).setLngLat([item.lng, item.lat]).setPopup(popup).addTo(this.map);
    });
  });
  test = this.http.get(this.findSiteByUser, {}).subscribe(data => {
  const resSTR = JSON.stringify(data);
  const resJSON = JSON.parse(resSTR);
  this.options = resJSON;
 // console.log(this.options);

  });
  onSubmit() {
    this.submitted = true ;

    this.http.post(this.ligneUrl,
      {
        name: this.addForm.get('ligne').value,
        lng : this.Longitude,
        lat : this.Latitude,
        siteId: this.selectedOption._id,
        siteName: this.selectedOption.name,
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
        'Ligne has been added.',
        'success',
      );
        this.addForm.reset();
        this.Latitude = null ;
        this.Longitude = null ;
        this.router.navigate(['/pages/allligne']);
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




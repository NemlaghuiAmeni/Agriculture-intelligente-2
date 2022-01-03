
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../../../environments/environment';
import {Console} from 'console';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import {HttpClient, HttpParams} from '@angular/common/http';
import AnimatedPopup from 'mapbox-gl-animated-popup';


@Component({
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss'] ,
})
export class MapboxComponent implements OnInit {
   map: mapboxgl.Map;
 /* option = {
    params: new HttpParams().append('token', localStorage.getItem('token')),
  }; */
  MapboxLanguage = require('@mapbox/mapbox-gl-language');
  private Latiude: number;
  private Longitude: number;
  siteUrl = 'http://localhost:3000/api/v1/sites/getSiteByUser';
  ligneUrl = 'http://localhost:3000/api/v1/lignes/getLigneByUser';
  deviceUrl = 'http://localhost:3000/api/v1/devices/findbyuser';
  constructor(private http: HttpClient) { }
  private data1:  Array<any> ;
  public  test ;
  private data2:  Array<any> ;
  public  test2 ;
  private data3:  Array<any> ;
  public  test3 ;
  private l: Array <any>;
  private dev: Array <any>;
  ngOnInit() {
    this.http.get(this.siteUrl,
      {
      }).subscribe(data => {
      const resSTR = JSON.stringify(data);
      const resJSON = JSON.parse(resSTR);
      this.data1 = resJSON ;
      this.data1.forEach(item => {

        // create the popup
        const popup = new AnimatedPopup({
          offset: 20,
          openingAnimation: {
            duration: 1000,
            easing: 'easeOutBack'},
          closingAnimation: {
            duration: 300,
            easing: 'easeInBack'}}).setHTML(
          '<h2 class="text-info">' + item.name + '</h2>' + '<h5 class="text-basic"> ',
         // + 'Lignes : ' + item.lignesId.length + '</h5>',
        );
        new mapboxgl.Marker({ 'color': 'blue'}).setLngLat([item.lng, item.lat]).setPopup(popup).addTo(this.map);
      });

    });
    this.http.get(this.ligneUrl,
      {
      }).subscribe(dataa => {
      const resSTR = JSON.stringify(dataa);
      const resJSON = JSON.parse(resSTR);
      this.data2 = resJSON;
      const alllignes = this.data2.map(ligne => {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [ligne.lng, ligne.lat]},
          properties: {
            id: ligne._id,
            name: ligne.name,
            siteName: ligne.siteName,
            icon: 'shop'}};
      });
      console.log(alllignes);
      this.l = alllignes;
      // console.log(this.data2);
      this.l.forEach(item => {

        // create the popup
        const popup = new AnimatedPopup({
          offset: 20,
          openingAnimation: {
            duration: 1000,
            easing: 'easeOutBack'},
          closingAnimation: {
            duration: 300,
            easing: 'easeInBack'}}).setHTML(
          '<h2 class="text-info">' + 'Ligne :' + item.properties.name +
          '</h2>' + '<h5 class="text-basic"> ' + 'Site : ' + item.properties.siteName + '</h5>',
          // + 'Lignes : ' + item.lignesId.length + '</h5>',
        );
        new mapboxgl.Marker({ 'color': 'grey' }).setLngLat(item.geometry.coordinates).setPopup(popup).addTo(this.map);
      });

    });

    this.http.get(this.deviceUrl).subscribe(dataaa => {
      const resSTR = JSON.stringify(dataaa);
      const resJSON = JSON.parse(resSTR);
      this.data3 = resJSON;
      const alldevices = this.data3.map(device => {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [device.lng, device.lat]},
          properties: {
            code: device.code,
            name: device.name,
            state: device.state,
            ligneName: device.ligneName,
            icon: 'marker'}};
      });
      console.log(alldevices);
      this.dev = alldevices;
      this.dev.forEach(item => {
        const popup = new AnimatedPopup({
          offset: 20,
          openingAnimation: {
            duration: 1000,
            easing: 'easeOutBack'},
          closingAnimation: {
            duration: 300,
            easing: 'easeInBack'}}).setHTML(
          '<h2 class="text-info">' + item.properties.name + '</h2>'
          + '<h6 class="text-info">' + item.properties.code + '</h6>'
          + '<h6 class="text-info">' + item.properties.ligneName + '</h6>');
        if ( item.properties.state === true) {
          new mapboxgl.Marker({'color': 'green'}).setLngLat(item.geometry.coordinates).setPopup(popup).addTo(this.map);
          console.log(true);   }
        else {
          new mapboxgl.Marker({'color': 'red'}).setLngLat(item.geometry.coordinates).setPopup(popup).addTo(this.map);
          console.log(false);
        }});

    });

    this.showMap();

  }
  /*forwardGeocoder() {
    const matchingFeatures = [];
    for (let i = 0; i < this.l.length; i++) {
      const feature = this.l[i];
      console.log(feature);
// handle queries with different capitalization than the source data by calling toLowerCase()
      feature['place_name'] = '🌲 ' + feature.properties.name;
      feature['center'] = feature.geometry.coordinates;
      feature['place_type'] = ['park'];
        matchingFeatures.push(feature);
    }
    return matchingFeatures;
  }*/
  stylestreet() {
    this.map.setStyle('mapbox://styles/mapbox/light-v10');
  }
  stylesatelit() {
    this.map.setStyle('mapbox://styles/rania123/ckmlsw5sf0w2a17qipgxunzxt');
  }
  showMap() {
    (mapboxgl as typeof mapboxgl).accessToken = environment.mapbox.accessToken;
     this.map = new mapboxgl.Map({
      container: 'map',
     style: 'mapbox://styles/rania123/ckmlsw5sf0w2a17qipgxunzxt',
      zoom: 6,
      center: [9.196506147691451 , 33.792635314317465],
    });
   //  this.map.addControl(new mapboxgl.NavigationControl());
  //  mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/
    //  mapbox-gl-rtl-text/v0.1.0/mapbox-gl-rtl-text.js');
   const mapboxLanguage = new this.MapboxLanguage({
      defaultLanguage: 'en',
    });

   this.map.addControl(mapboxLanguage);
    const geocoder = new MapboxGeocoder({
      countries: 'tn',
      marker: {
        color: 'orange'},
      accessToken: mapboxgl.accessToken,
    //  localGeocoder: this.forwardGeocoder,
      mapboxgl: mapboxgl,
      placeholder: 'Enter an address or place name',
    });
    this.map.addControl(
      geocoder);
  }}

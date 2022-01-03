import {Component, OnDestroy} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';
import {HttpClient} from '@angular/common/http';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent  {

  private alive = true;

  statusCards: string;
  lightCard: CardSettings = {
    title: 'Light',
    iconClass: 'nb-lightbulb',
    type: 'primary',
  };
  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.lightCard,
        type: 'warning',
      },

    ],
    dark: this.commonStatusCardsSet,
  };
  public canvasWidth = 200;
  public needleValue = 65;
  public centralLabel = '';
  public name = 'Consom chart';
  public bottomLabel = 'Kwh';
  public optionss = {
    hasNeedle: true,
    needleColor: 'gray',
    needleUpdateSpeed: 1000,
    arcColors: ['rgb(44, 151, 222)', 'lightgray'],
    arcDelimiters: [30],
    rangeLabel: ['0', '100'],
    needleStartValue: 50,
  };
  constructor(private themeService: NbThemeService,
              private solarService: SolarData, private http: HttpClient) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        // this.statusCards = this.statusCardsByThemes[theme.name];
      });

    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        //  this.solarValue = data;
      });
  }

  findSiteByUser = 'http://localhost:3000/api/v1/sites/getSiteByUser';
  options: any;
  selectedOption: any;
  lignes = [];
  test = this.http.get(this.findSiteByUser, {}).subscribe(data => {
    const resSTR = JSON.stringify(data);
    const resJSON = JSON.parse(resSTR);
    this.options = resJSON;
    this.options.forEach(item => {
      console.log('options name ' + item.name);
     // console.log(item.lignesId.length);
    });
   });
  onChange(event, id) {
    console.log('OnChange: ' + id) ;
    console.log('state: ' + event) ;

    this.http.patch('http://localhost:3000/api/v1/devices/update/' + id,
      {state: event} ).subscribe(data => { console.log(event);
    }); }
  filteredOptions: any;
  filter() {
    console.log('filter function is called');
    console.log('selected site: ' + this.selectedOption._id);
    console.log(this.options);
    if (!this.selectedOption._id) {
      return this.filteredOptions = this.options;
    } this.filteredOptions = this.options.filter(it => this.selectedOption._id === it._id);
    }
}

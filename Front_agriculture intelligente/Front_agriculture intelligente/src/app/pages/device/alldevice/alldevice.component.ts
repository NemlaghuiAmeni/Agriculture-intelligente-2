import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {SiteService} from '../../site/site.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {Ligne} from '../../../model/ligne';
import {Device} from '../../../model/device';
const Swal = require('sweetalert2');

@Component({
  selector: 'ngx-alldevice',
  templateUrl: './alldevice.component.html',
  styleUrls: ['./alldevice.component.scss']})
export class AlldeviceComponent implements OnInit {

  constructor(private http: HttpClient, private service: SiteService,
              private modalService: NgbModal, private router: Router,
              private form: FormBuilder) { }

  closeResult: string;
  devurl = 'http://localhost:3000/api/v1/devices/updateDevice/';
  private device: Device[];
  public data: Array<Device>;
  public data1;
  public final;
  public item;
  state: boolean;
  ok = this.http.get('http://localhost:3000/api/v1/devices/findbyuser').subscribe(data => {
    const resSTR = JSON.stringify(data);
    const resJSON = JSON.parse(resSTR);
    this.data = resJSON;
    this.data1 = data;
    // console.log(this.data1[0].state);
    // console.log(this.data1.siteName);
  });
  editForm: any;
  openEdit(targetModal, final) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'});
    this.editForm.patchValue( {
      // id: final._id,
      code: final.code,
      name: final.name,
      lng: final.lng,
      lat: final.lat,
    });
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  // 6059af26f3d2ae0b74f8ab27
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  onEditConfirm(event): void {
    this.http.patch('http://localhost:3000/api/v1/devices/updateDevice/',
      {
        code: event.newData.code,
        name: event.newData.name,
      }).subscribe(
      res => {
        event.confirm.resolve(event.newData);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your zone information has been updated',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else {
        }
      });
  }
  onSave(id) {
    const editURL = 'http://localhost:3000/api/v1/devices/updateDevice/' + id ;
    // console.log(this.editForm.value);
    this.http.patch(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  onDeleteConfirm(id): void {
    // console.log(id);
    this.http.delete('http://localhost:3000/api/v1/devices/delete/' + id).subscribe(
      data => {
         console.log('result from delete: ' + data);
        if (data === 'success') {
          Swal.fire(
            'Deleted!',
            'Your site has been deleted.',
            'success',
          );

        } else {
          Swal.fire(
            'Deleted!',
            'Your site has been deleted.',
            'success',
          );

        }
      });
    this.fetchData();
    // event.confirm.resolve();

  }
  onChange(state, code) {
    console.log('state: ' + state) ;
    console.log('code: ' + code) ;
    this.http.patch('http://localhost:3000/api/v1/devices/updateStatebycode/' + code,
      {state} ).
    subscribe(data => { console.log(state); });
  }


  ngOnInit() {
    this.fetchData();
    this.editForm = this.form.group({
      code: [''],
      name: [''],
      lng: [''],
      lat: [''],
    } );
  }

  fetchData() {
    this.service.getAlldevices().subscribe(data => {
      const resSTR = JSON.stringify(data);
      const resJSON = JSON.parse(resSTR);
      this.data = resJSON;
      this.data1 = data;
      // this.final = this.data1.lignes;
    });
  }
}

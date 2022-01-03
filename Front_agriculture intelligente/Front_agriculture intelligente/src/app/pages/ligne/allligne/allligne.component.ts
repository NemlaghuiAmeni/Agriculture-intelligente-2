import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Ligne} from '../../../model/ligne';
import {SiteService} from '../../site/site.service';
import {Observable} from 'rxjs';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from '@angular/forms';

const Swal = require('sweetalert2');
@Component({
  selector: 'ngx-allligne',
  templateUrl: './allligne.component.html',
  styleUrls: ['./allligne.component.scss']})
export class AllligneComponent implements OnInit {
  constructor(private http: HttpClient, private service: SiteService,
              private modalService: NgbModal, private router: Router,
              private form: FormBuilder) {
  }
  closeResult: string;
ligneurl = 'http://localhost:3000/api/v1/lignes/updateLigne/';

  public data: Array<Ligne>;
  public data1;
  public final;
  public item;
  public devices;
  ok = this.http.get('http://localhost:3000/api/v1/lignes/getLigneByUser').subscribe(data => {
    const resSTR = JSON.stringify(data);
    const resJSON = JSON.parse(resSTR);
    this.data = resJSON;
    this.data1 = data;
   // this.devices = this.data1.devices;
  // console.log(this.devices);

  });
  editForm: any;
  openEdit(targetModal, final) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'});
    this.editForm.patchValue( {
     // id: final._id,
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
    this.http.patch('http://localhost:3000/api/v1/lignes/updateLigne/',
      {
       // id: event.newData._id,
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
    const editURL = 'http://localhost:3000/api/v1/lignes/updateLigne/' + id ;
   // console.log(this.editForm.value);
    this.http.patch(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  onDeleteConfirm(id): void {
    // console.log(id);
    this.http.delete('http://localhost:3000/api/v1/lignes/deleteLigne/' + id).subscribe(
      data => {
     //   console.log('result from delete: ' + data);
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
  onChange(event, id) {
    console.log('OnChange: ' + id) ;
    console.log('state: ' + event) ;

    this.http.patch('http://localhost:3000/api/v1/devices/update/' + id,
      {state: event} ).subscribe(data => { console.log(event);
    }); }



  ngOnInit() {
    this.fetchData();
    this.editForm = this.form.group({
      id: [''],
      name: [''],
      lng: [''],
      lat: [''],
    } );
  }

  fetchData() {
    this.service.getAllLines().subscribe(data => {
      const resSTR = JSON.stringify(data);
      const resJSON = JSON.parse(resSTR);
      this.data = resJSON;
      this.data1 = data;
      for (let i = 0; i < this.data1.length; i++) {
        for (let j = 0; j < this.data1[i].devices.length; j++) {
      console.log(this.data1[i].devices[j].state);
    }}});
  }
}

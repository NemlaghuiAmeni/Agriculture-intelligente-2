import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';

import {Site} from '../../../model/site';
import {Observable} from 'rxjs';
import {SiteService} from '../site.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {Ligne} from '../../../model/ligne';

const Swal = require('sweetalert2');

@Component({
  selector: 'ngx-allsite',
  templateUrl: './allsite.component.html',
  styleUrls: ['./allsite.component.scss'],
})
export class AllsiteComponent {
  private Site: Site[];

  constructor(private http: HttpClient, private service: SiteService,
  private modalService: NgbModal, private router: Router,
  private form: FormBuilder) {
  }
  closeResult: string;
  siteurl = 'http://localhost:3000/api/v1/sites/updateSite/';
  private site: Site[];
  public data: Array<Site>;
  public data1;
  public final;
  public item;
  ok = this.http.get('http://localhost:3000/api/v1/sites/getSiteByUser',
    {}).subscribe(data => {
    const resSTR = JSON.stringify(data);
    const resJSON = JSON.parse(resSTR);
    this.data = resJSON;
    this.data.forEach(item => {
    //  item.nbrLigne = item.lignesId.length;
      // console.log(item.lignesId.length);
    });
     console.log(data);
    this.data1 = this.data;
  });


  editForm: any;
  openEdit(targetModal, data1) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'});
    this.editForm.patchValue( {
      // id: final._id,
      name: data1.name,
      description: data1.description,
      lng: data1.lng,
      lat: data1.lat,
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
    this.http.patch('http://localhost:3000/api/v1/sites/updateSite/',
      {
        // id: event.newData._id,
        name: event.newData.name,
        description: event.newData.description,
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
    const editURL = 'http://localhost:3000/api/v1/sites/updateSite/' + id ;
     console.log(this.editForm.value);
    this.http.patch(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  onDeleteConfirm(id): void {
    // console.log(id);
    this.http.delete('http://localhost:3000/api/v1/sites/deleteSite/' + id).subscribe(
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

  }

  ngOnInit() {
    this.fetchData();
    this.editForm = this.form.group({
      id: [''],
      name: [''],
      description: [''],
      lng: [''],
      lat: [''],
    } );
  }

  fetchData() {
    this.http.get('http://localhost:3000/api/v1/sites/getSiteByUser',
      {}).subscribe(data => {
      const resSTR = JSON.stringify(data);
      const resJSON = JSON.parse(resSTR);
      this.data = resJSON;
      this.data.forEach(item => {
        //  item.nbrLigne = item.lignesId.length;
        // console.log(item.lignesId.length);
      });
      console.log(data);
      this.data1 = this.data;
      console.log(this.data1);

    });
  }
}

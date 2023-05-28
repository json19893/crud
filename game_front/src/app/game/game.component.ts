import { Component, Inject, OnInit, QueryList, ViewChild, ViewChildren, } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { pointService } from '../services/poinst.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { gameModel } from '../model/gameModel'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
const EXCEL_EXTENSION = '.xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats- officedocument.spreadsheetml.sheet;charset=UTF-8';
interface game {
  id: number;
  nombre: string;
  descripcion: string;
  fechaCreacion: Date;
  fechaRegistro: Date;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],

})

export class GameComponent implements OnInit {
  modelGame: gameModel | undefined;

  dataSource = new MatTableDataSource<game>;
  ELEMENT_DATA: game[] = [];
  columnsToDisplay = ['nombre', 'descripcion', 'fechaCreacion', 'fechaRegistro','acciones'];
  color: ThemePalette = 'primary';
  formRegister: FormGroup | any;
  @ViewChild('paginator') paginator: MatPaginator | undefined;
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private service: pointService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog

  ) {
    this.formRegister = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required,]),
      fechaCreacion: new FormControl('', [Validators.required,])
    });
  }

  ngOnInit() {
    this.getGame();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);

  }

  getGame() {
    this.service.getAllGame().subscribe(
      res => {
        this.ELEMENT_DATA = res;
        this.dataSource = new MatTableDataSource<game>(this.ELEMENT_DATA);
        this.dataSource!.paginator = this.paginator!;
        this.spinner.hide();
      },
      err => 
      this._snackBar.open("ocurrio un error al consultar el servicio: "+ err, "cerrar",{
        duration: 3000
      }))
  }
  agregar() {
    if (!this.formRegister.valid) {
      return;
    }
    const fechaActual = new Date();
    this.modelGame = new gameModel(0, this.formRegister.value.nombre, this.formRegister.value.descripcion, this.formRegister.value.fechaCreacion, fechaActual)
    console.log("data::: "+this.modelGame)
    this.service.putGame(this.modelGame ).subscribe(
      res => {
       this.getGame()
        this._snackBar.open(res.sms, "cerrar",{
          duration: 3000
        });
      },
      err => 
      this._snackBar.open("ocurrio un error al consultar el servicio: "+ err, "cerrar",{
        duration: 3000
      }))
  }
  deleteGame(id:any){
    this.service.deleteGame(id).subscribe(
      res => {
       this.getGame()
       this._snackBar.open(res.sms, "cerrar",{
        duration: 3000
      });
      },
      err => 
      this._snackBar.open("ocurrio un error al consultar el servicio: "+ err, "cerrar",{
        duration: 3000
      }))
  }
  editGame(id:any){
   localStorage.setItem("idGame",id);

   const dialogRef = this.dialog.open(EditGameDialog);

   dialogRef.afterClosed().subscribe(result => {
     console.log(`Dialog result: ${result}`);
     this.getGame();
   });
  }
  
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.dataSource!.paginator = this.paginator!;
  }



  ExportTOExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.ELEMENT_DATA);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'homologacion': worksheet },
      SheetNames: ['homologacion']
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx', type: 'array'
    });
    this.saveAsExcelFile(excelBuffer, "Relacion de alumnos");

  }
  saveAsExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() +
      EXCEL_EXTENSION);
  }

}

@Component({
  selector: 'editDialog-app',
  templateUrl: 'editDialog.html',
  styleUrls: ['./game.component.css'],
})

export class EditGameDialog  implements OnInit {
  formRegister: FormGroup | any;
  idGame:any
  nombre:any
  descripcion:any
  fecha:any
  modelGame: gameModel | undefined;
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private service: pointService,
    private _snackBar: MatSnackBar,

  ) {
    this.idGame= localStorage.getItem("idGame")
    this.getByidGame( this.idGame);
    this.nombre= localStorage.getItem("nombre")
    this.descripcion= localStorage.getItem("descripcion")
    this.fecha=localStorage.getItem("fecha")
    this.formRegister = new FormGroup({
      nombre: new FormControl(this.nombre),
      descripcion: new FormControl(this.descripcion),
      fechaCreacion: new FormControl(this.fecha)
    });
  }

  ngOnInit() {
    this.idGame= localStorage.getItem("idGame")
    this.getByidGame( this.idGame);
  }

  getByidGame(id:any){
    
    localStorage.removeItem("nombre")
    localStorage.removeItem("descripcion")
    localStorage.removeItem("fecha")
    this.service.getByidGame(id).subscribe(
      res => {

      localStorage.setItem("nombre",res.nombre)
      localStorage.setItem("descripcion",res.descripcion)
      localStorage.setItem("fecha",res.fechaCreacion)

      this.nombre= localStorage.getItem("nombre")
      this.descripcion= localStorage.getItem("descripcion")
      this.fecha=localStorage.getItem("fecha")
      },
      err => 
      this._snackBar.open("ocurrio un error al consultar el servicio: "+ err, "cerrar",{
        duration: 3000
      }))
  }

  agregar() {
    this.idGame= localStorage.getItem("idGame")
    if (!this.formRegister.valid) {
      return;
    }

    this.nombre= localStorage.getItem("nombre")
    this.descripcion= localStorage.getItem("descripcion")
    this.fecha=localStorage.getItem("fecha")
  let nom=  this.formRegister.value.nombre==null?this.nombre: this.formRegister.value.nombre;
  let des=  this.formRegister.value.descripcion==null?this.descripcion: this.formRegister.value.descripcion;
  let fe=  this.formRegister.value.fechaCreacion==null?this.fecha:this.formRegister.value.fechaCreacion;

  alert(nom+" "+ des+" "+ fe);
    const fechaActual = new Date();
    this.modelGame = new gameModel(  this.idGame,nom ,des,fe, fechaActual)
    this.service.editGame(this.modelGame ).subscribe(
      res => {
        this._snackBar.open(res.sms, "cerrar",{
          duration: 3000
        });
        //setInterval(() =>   window.location.reload(), 1000);
      },
      err => 
      this._snackBar.open("ocurrio un error al consultar el servicio: "+ err, "cerrar",{
        duration: 3000
      }))
 
  }
}



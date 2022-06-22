import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Clientes } from './clientes';
import { Contactos } from './contactos';
import { ClientesService } from './clientes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ContactosAngular';
  infoContent = '';
  dataSourceClient!: MatTableDataSource<Clientes>;
  dataSourceContact!: MatTableDataSource<Contactos>;

  clientes!:Clientes[];
  contactos!:Contactos[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private clientesService:ClientesService, private router: Router, private activatedRoute: ActivatedRoute){
    this.clientesService.getClientes().subscribe(clientes => {
      this.dataSourceClient= new MatTableDataSource(clientes);
      this.dataSourceClient.paginator = this.paginator;
      this.dataSourceClient.sort = this.sort;
    });
  }

  displayedColumns: string[] = ['num_cliente', 'nombre_cliente', 'rfc_cliente', 'calle','cod_postal','ciudad','estado','pais','Contactos', 'Action'];
  displayedColumnsCo: string[] = ['nombre_contacto', 'apellido_paterno', 'apellido_materno','correo','num_telefono','id_cliente','Action'];

  getContactos(id:number){
    this.clientesService.getContactos(id).subscribe(contactos =>{
      this.dataSourceContact=new MatTableDataSource(contactos);
      this.dataSourceContact.paginator = this.paginator;
      this.dataSourceContact.sort = this.sort;
    });
  }

  cliente: Clientes={
    id_cliente:0,
    num_cliente:0,
    nombre_cliente:'',
    rfc_cliente:'',
    calle:'',
    cod_postal:0,
    ciudad:'',
    estado:'',
    pais:''
  }
  contacto : Contactos={
    idcontactos: 0,
    nombre_contacto:'',
    apellido_paterno:'',
    apellido_materno:'',
    correo:'',
    num_telefono:0,
    id_cliente:0
  }

  addCliente(){
    delete this.cliente.id_cliente;
    console.log(this.cliente);
    this.clientesService.addCliente(this.cliente).subscribe(
      res => {
        console.log(res);
      },
      err => console.error(err)
    )
  }
  addContact(element:Clientes){
    delete this.contacto.idcontactos;
    console.log(this.contacto);
    console.log(element);
    this.contacto.id_cliente = element.id_cliente!;
    console.log(this.contacto.id_cliente);
    this.clientesService.addContacto(this.contacto, element.id_cliente!).subscribe(
      res => {
        console.log(res);
      },
      err => console.error(err)
    )
  }

  editCliente(element:Clientes){
    console.log(element);
    this.clientesService.updateCliente(element.id_cliente!, element)
      .subscribe(
        res => {
          console.log(res);
        },
        err => console.error(err)
      )
  }
  editContact(element:Contactos){
    console.log(element);
    this.clientesService.updateContacto(element.id_cliente!, element, element.idcontactos!)
      .subscribe(
        res => {
          console.log(res);
        },
        err => console.error(err)
      )
  }

  test(id:number){
    console.log(id);
  }

  getCliente():void{}

  deleteCliente(id: number):void{
    this.clientesService.deleteCliente(id).
    subscribe(
      res => {
        console.log(res);
      },
      err => console.error(err)
    )
  }
  deleteContact(id:number, idCo:number):void{
    this.clientesService.deleteContacto(id, idCo).
    subscribe(
      res => {
        console.log(res);
      },
      err => console.error(err)
    )
  }
  ngAfterViewInit() {

  }

  ngOnInit(): void {
  }

 applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSourceClient.filter = filterValue.trim().toLowerCase();
   if (this.dataSourceClient.paginator) {
     this.dataSourceClient.paginator.firstPage();
   }
 }

 openDialog(element:any): void {
   element = element;
   console.log(element);


 }
}

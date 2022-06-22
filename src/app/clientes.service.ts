import { Injectable } from '@angular/core';
import { Clientes } from './clientes';
import { Contactos } from './contactos';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { catchError,map,Observable,of,tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private clientesURL='http://localhost:3000/clientes';
  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getClientes():Observable<Clientes[]>{
    return this.http.get<Clientes[]>(this.clientesURL).pipe(
      tap(_ => this.log('Fetched Clientes')),
      catchError(this.handleError<Clientes[]>('getClientes', []))
      );
  }

  getCliente(id:number):Observable<Clientes>{
    const url = `${this.clientesURL}/${id}`;
    return this.http.get<Clientes>(url).pipe(
      tap(_ => this.log(`fetched Cliente id=${id}`)),
      catchError(this.handleError<Clientes>(`getCliente id=${id}`))
    );
   }

   addCliente(cliente:Clientes):Observable<Clientes>{
    return this.http.post<Clientes>(this.clientesURL,cliente,this.httpOptions).pipe(
      tap((cliente: Clientes) => this.log(`added Clientes w/ id=${cliente.id_cliente}`)),
      catchError(this.handleError<Clientes>('addCliente'))
    );
   }

   updateCliente(id:number, cliente:Clientes):Observable<any>{
    const url = `${this.clientesURL}/${id}`;
    return this.http.put(url, cliente, this.httpOptions).pipe(
      tap(_ => this.log(`updated Cliente id=${cliente.id_cliente}`)),
      catchError(this.handleError<any>('updateCliente')));
   }

   deleteCliente(id:number):Observable<any>{
    const url = `${this.clientesURL}/${id}`;
    return this.http.delete<any>(url).pipe(
      tap(_ => this.log(`deleted Cliente id=${id}`)),
      catchError(this.handleError<any>(`deleteCliente id=${id}`))
    );
   }

   getContactos(id:number):Observable<Contactos[]>{
    const url = `${this.clientesURL}/${id}/contacto`;
    return this.http.get<Contactos[]>(url).pipe(
      tap(_ => this.log('Fetched Contactos')),
      catchError(this.handleError<Contactos[]>(`getContactos`, []))
      );
  }

  getContacto(id:number, idCo:number):Observable<Contactos>{
    const url = `${this.clientesURL}/${id}/contacto/${idCo}`;
    return this.http.get<Contactos>(url).pipe(
      tap(_ => this.log('Fetched Contactos')),
      catchError(this.handleError<Contactos>(`getContactos idCo=${idCo}`))
      );
  }

  addContacto(contacto:Contactos, id:number):Observable<Contactos>{
    const url = `${this.clientesURL}/${id}/contacto`;
    return this.http.post<Contactos>(url,contacto,this.httpOptions).pipe(
      tap((contacto: Contactos) => this.log(`added Contacto w/ id=${contacto.idcontactos}`)),
      catchError(this.handleError<Contactos>('addContacto'))
    );
   }

   updateContacto(id:number, contacto:Contactos, idCo:number):Observable<any>{
    const url = `${this.clientesURL}/${id}/contacto/${idCo}`;
    return this.http.put(url, contacto, this.httpOptions).pipe(
      tap(_ => this.log(`updated Contacto id=${contacto.idcontactos}`)),
      catchError(this.handleError<any>('updateContacto')));
   }

   deleteContacto(id:number, idCo:number):Observable<any>{
    const url = `${this.clientesURL}/${id}/contacto/${idCo}`;
    return this.http.delete<any>(url).pipe(
      tap(_ => this.log(`deleted Contacto id=${idCo}`)),
      catchError(this.handleError<any>(`deleteContacto id=${idCo}`))
    );
   }


  private log(message: string) {
    console.log(`ClientesService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

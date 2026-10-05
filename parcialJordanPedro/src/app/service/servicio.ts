import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '../model/pedido';

@Injectable({
    providedIn : 'root'
})
export class Servicio {

    API_URL= "http://localhost:3000/pedidos";
    pedido :Pedido[]=[]

    constructor( private hhtp : HttpClient){
        this.pedido=[];
    }

    getProducto(){
        return this.hhtp.get<Pedido[]>(this.API_URL);
    }

    getById(id : string){
        return this.hhtp.get<Pedido>(`${this.API_URL}/${id}`)
    }

    delete(id: string){
        return this.hhtp.delete(`${this.API_URL}/${id}`)
    }

    postProducto(prod : Pedido){ 
        return this.hhtp.post<Pedido>(this.API_URL, prod)
    }
  
}

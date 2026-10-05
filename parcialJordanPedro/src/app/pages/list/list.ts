import { Component, computed, OnInit, Signal, signal } from '@angular/core';
import { Servicio } from '../../service/servicio';
import { RouterLink } from '@angular/router';
import { Pedido } from '../../model/pedido';

@Component({
  imports: [RouterLink],
  selector: 'app-list',
  styleUrl: './list.css',
  templateUrl: './list.html',
})
export class List  implements OnInit{

producto = signal <Pedido[]>([])


termino =signal('')
filtro = computed(()=>this.producto().filter(b => b.plato.toLowerCase().includes(this.termino())))
numero = signal(0)
constructor(public servicio : Servicio){}


ngOnInit(): void {
  this.mostrar();

}

mostrar(){
  this.servicio.getProducto().subscribe({
    next : (data) => {this.producto.set(data)},
    error : (e) => console.log(e)
  })
}

calculadora(){
return this.filtro().forEach(element => this.numero.update(c => c + element.cantidad * element.precioUnitario));
}


eliminar(id: string){
  if(confirm("estas seguro de eliminar?")){
this.servicio.delete(id).subscribe({
  next : () => {alert("Eliminado Correctamente")
    this.mostrar();
  },error : (e)=> {alert("Error al eliminar")
    console.log(e)
  }
})
  }
}

filtrar(event : Event){
  this.termino.set((event.target as HTMLInputElement).value.toLowerCase())
}
}

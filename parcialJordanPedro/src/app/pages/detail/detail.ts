import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Servicio } from '../../service/servicio';
import { Pedido } from '../../model/pedido';

@Component({
  imports: [RouterLink],
  selector: 'app-detail',
  styleUrl: './detail.css',
  templateUrl: './detail.html',
})
export class Detail implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(Servicio);

  pedido = signal<Pedido>({   
    cliente: '',
    plato: "" ,
    cantidad : 0, 
    precioUnitario : 0,
    estado : "" ,
    fecha : "",
    id : "" });
    
  cuenta = computed(() => this.pedido()?.cantidad * this.pedido()?.precioUnitario)

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getById(id);
    }
  }

  getById(id: string) {
    this.service.getById(id).subscribe({
      next: (data) => this.pedido.set(data),
      error: (e) => {
        console.log(e);
        alert('Error al extraer datos');
      },
    });
  }

  

}
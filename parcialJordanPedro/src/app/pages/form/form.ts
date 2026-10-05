import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Servicio } from '../../service/servicio';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-form',
  styleUrl: './form.css',
  templateUrl: './form.html',
})
export class Form implements OnInit {

  Pform : FormGroup
  
    cliente : FormControl   
    plato : FormControl
    cantidad : FormControl 
    precioUnitario : FormControl
    estado : FormControl 
    fecha : FormControl
  id : string | null=null


  private service : Servicio= inject(Servicio)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

constructor(){
 this.cliente = new FormControl('',[Validators.required, Validators.minLength(3)])
  this.plato = new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(20)] )
  this.cantidad = new FormControl('',[Validators.required , Validators.pattern('^[0-9]+$'), Validators.min(0)])
  this.fecha = new FormControl('',Validators.required )
  this.estado= new FormControl('',[Validators.required])
  this.precioUnitario= new FormControl('',[Validators.required, Validators.min(1)])

 
 this.Pform = new FormGroup({
    cliente : this.cliente,
    plato :  this.plato,
    cantidad : this.cantidad,
    fecha : this.fecha,
    estado : this.estado,
    precioUnitario :this.precioUnitario
  })
}

ngOnInit(): void {
  this.id= this.route.snapshot.params['id'];
  if( this.id){
    this.service.getById(this.id).subscribe({
      next : (data) => {this.Pform.patchValue(data);},
      error : (e) => { alert ("error al obtener datos")
        console.log(e);
      }
    })
  }
}

onSubmit(){
  if(this.Pform.invalid){
          alert('Formulario inválido. Por favor, complete todos los campos correctamente.');
        return;
    }

    const  pData = this.Pform.value;

    if(this.id){
  
      this.service.postProducto(pData).subscribe({
        next : (data) => {alert("Agregado correctamente")
          this.router.navigate([''])
        },
        error : (e) => {alert("error al agregar")
          console.log(e);
        }
      });
    }

  }


}

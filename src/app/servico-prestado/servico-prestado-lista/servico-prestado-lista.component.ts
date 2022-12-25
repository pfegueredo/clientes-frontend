import { Component, OnInit } from '@angular/core';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { ServicoPrestadoBusca } from './servico-prestadoBusca';

@Component({
  selector: 'app-servico-prestado-lista',
  templateUrl: './servico-prestado-lista.component.html',
  styleUrls: ['./servico-prestado-lista.component.css']
})
export class ServicoPrestadoListaComponent implements OnInit {

  nome!: string;
  mes!: number ;
  meses?: number[];
  lista!: ServicoPrestadoBusca[];
  message!: string;

  constructor(
    private service: ServicoPrestadoService
  ) { 
    this.meses = [1,2,3,4,5,6,7,8,9,10,11,12];
  }

/*
 listarPokemons(){
    this.pokemonService.getPokemons()
    .subscribe(resultado => {
      const res =  ((resultado));
      console.log(res);
      const values = Object.values(res);
      this.pokemons.push(values[3]);
      console.log('Pokemons:', this.pokemons);
     } );
   }
 }
*/


  ngOnInit(): void {
  }
  
  pesquisar() {
    //let message = null;

    this.service.buscar(this.nome, this.mes)
    .subscribe(response => this.lista = response)
    if (this.lista?.length <= 0) {
      this.message = "Nenhum registro encontrado.";
    } else {
      this.message = "Registros retornados";
    }
      //  const res:any = ((resultado));
        //console.log(res);
        //const values = Object.values(res);
       // this.lista = res);
      }
    //  .subscribe(response => this.lista = response)
     // }
    }

  //console.log(this.nome, this.mes)
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from '../../clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes?: Cliente[] = [];
  clienteSelecionado!: Cliente;
  mensagemSucesso?: string;
  mensagemErro?: string;

  constructor(
    private service: ClientesService,
    private router2: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.service.getClientes().subscribe(resposta => this.clientes = resposta);
  }

  novoCadastro() {
    this.router2.navigate(['/clientes/form'])
  }

  preparaDelecao(cliente: Cliente) {
    this.clienteSelecionado = cliente;
  }

  deletarCliente() {
  this.service
    .deletar(this.clienteSelecionado)
    .subscribe( 
      resposta => {
        this.mensagemSucesso = 'Cliente deletado com sucesso!'
        this.ngOnInit();
      },
      erroFalha => this.mensagemErro = 'Ocorreu um erro ao deletar o cliente.'
      )  
  }
}

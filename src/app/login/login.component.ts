import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './usuario';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username!: string;
  password!: string;
  //loginError?: boolean;
  cadastrando?: boolean;
  mensagemSucesso?: string | null;
  errors?: String[] | undefined;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  onSubmit() {
    this.authService
          .tentarLogar(this.username,  this.password)
          .subscribe(response => {
              const access_token = JSON.stringify(response);
              // Armazenar o token
              localStorage.setItem('access_token', access_token)
              //console.log(response)
              //console.log(this.username)
              //console.log(this.password)
              this.router.navigate(['/home'])
          }, errorResponse => {
              this.errors = ['Usuário e/ou senha incorretos(ss).']
              //console.log(errorResponse)
          })
    //console.log(`User: ${this.username}, Pass: ${this.password}`);
  }

  preparaCadastrar(event:any) {
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro() {
    this.cadastrando = false;
  }

  cadastrar() {
    const usuario: Usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;
    this.authService
      .salvar(usuario)
      .subscribe( response => {
        this.mensagemSucesso = "Cadastro realizado com sucesso! Efetue o login."
       // this.loginError = false;
      //  this.cadastrando = false;
      //  this.username = '';
      //  this.password = '';
        //this.errors = [];
      }, errorResponse => {
        this.mensagemSucesso = null;
        this.errors = errorResponse.error.errors;
      })
      
  }
}

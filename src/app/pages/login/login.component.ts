import { RetornoToken } from './../../models/RetornoToken';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './service/auth.service';
import { Observable, catchError, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup = new FormGroup({});
  senhaForte:RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;

  aoMenosUmDigito:RegExp = /\d/;                        // deve conter ao menos um dígito
  aoMenosMinuscula:RegExp = /[a-z]+/;                   // deve conter ao menos uma letra minúscula
  aoMenosumaMaiuscula:RegExp = /[A-Z]+/;                // deve conter ao menos uma letra maiúscula
  aoMenosUmCaracterEspecial:RegExp = /[^a-zA-Z 0-9]+/;  // deve conter ao menos um caractere especial
  aoMenos8caracteres:RegExp = /^[0-9a-zA-Z$*&@#]{8,}$/; // deve conter ao menos 8 dos caracteres mencionados

  hide: boolean = true;
  focoNaSenha:boolean = false;

  objetoToken:Observable<RetornoToken>=new Observable<RetornoToken>();

  oToken:RetornoToken | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,

    ) {
  }

  ngOnInit(): void {
    this.criarForm();
  }

  criarForm(){
    this.formLogin = this.formBuilder.group({
      email: new FormControl('', [Validators.email, Validators.required ]),
      password: new FormControl('',
      [
        Validators.required,
        Validators.min(3),
        Validators.pattern(this.aoMenos8caracteres),
        Validators.pattern(this.aoMenosMinuscula),
        Validators.pattern(this.aoMenosUmCaracterEspecial),
        Validators.pattern(this.aoMenosUmDigito),
        Validators.pattern(this.aoMenosumaMaiuscula),
      ])
    });
  }

  loginEntrar(){
    debugger
    this.focoSenha(true);

    if(this.formLogin.valid && !this.formLogin.get('password')?.invalid){
      this.fazAutenticacaoLogin();
    }
    else{
      this.toastr.error("Verifique as mensagens de erro no formulário", "Formulário inválido");
    }

  }

  fazAutenticacaoLogin(){
    let msg:string = "";

    this.authService.autenticaLogin(this.formLogin.value)
    .pipe(
      catchError((erro) => {

        if(erro.status == 504){
          msg = "Erro de acesso ao servidor!!";
        }
        else{
          msg = "Algo deu errado!!";
        }
        this.toastr.error(msg, "Erro");
        return of([]);
      })
    )
    .subscribe((result) => {
      this.oToken = result as RetornoToken;

      if(this.oToken.access_token != undefined){
        localStorage.setItem('token', this.oToken.access_token);
        this.toastr.success("Login realizado com sucesso", "Tudo certo!");
        this.router.navigate(['']);
      }
    });
  }

  printEmail(){
    console.info(this.formLogin.get('email')?.value);
  }

  getErrorMessageEmail() {
    if (this.formLogin.get('email')?.hasError('required')) {
      return 'Campo email é obrigatório';
    }

    return this.formLogin.get('email')?.hasError('email')?'Email inválido' : '';
  }

  focoSenha(altera:boolean){
    this.focoNaSenha = altera;
  }

  getErrorPassword(){
    if (this.formLogin.get('password')?.hasError('required')) {
      return '* Campo senha é obrigatório';
    }
    const senha:string = this.formLogin.get('password')?.value;

    let match = this.senhaForte.exec(senha);
    console.log(match);

    return '';
  }

 get emailInput() { return this.formLogin.get('email'); }
 get passwordInput() { return this.formLogin.get('password'); }

}

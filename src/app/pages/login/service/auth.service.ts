import { LoginEntryDTO } from './../../../models/LoginEntryDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';
import { RetornoToken } from 'src/app/models/RetornoToken';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private readonly BASE_API = '/api';//url API reduzida. O resto está no arquivo de proxy
  private readonly BASE_API = environment.BASE_URL;

  constructor(private httpClient: HttpClient) { }

  /**
* @description Método que faz login passando dados no header (para endpoint padrão do spring security, sem LoginController)
**/
  autenticaLogin(form : Partial<LoginEntryDTO>):Observable<RetornoToken>{
    var data = new URLSearchParams();
    if(form.email && form.password){
      data.append('userName', form.email);
      data.append('password', form.password);
    }
    data.append('grant_type', 'password');

    var teste = `Is production? ${environment.production}`;
    console.info(teste)

    let clientId = environment.CLIENT_ID;//"myclientid";
    let clientSecret = environment.CLIENT_SECRET;//"myclientsecret";
    let headers = new HttpHeaders();

    headers = headers.append("Authorization", "Basic " + btoa(`${clientId}:${clientSecret}`));
    headers = headers.append("Content-Type", 'application/x-www-form-urlencoded;charset=UTF-8');
    headers = headers.append("Access-Control-Allow-Origin", '*');

    const body = `username=${data.get('userName')}&password=${data.get('password')}&grant_type=password`;

    const obtencao = this.httpClient.post<RetornoToken>(`${this.BASE_API}/oauth/token`, body, {headers : headers}).pipe(first());

    return obtencao;
  }

}

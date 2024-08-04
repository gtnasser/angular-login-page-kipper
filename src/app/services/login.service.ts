import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/LoginResponse.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient: HttpClient
  ) { }

  login(name: string, password: string){
    return this.httpClient.post<LoginResponse>(
      "/login",
      {name, password}
    )
    // vamos tipar esta resposta criando em LoginResponse.ts
    // e usar o retorno do observable para armazenar o token no Session Storage
    // usamos o tap para transformar em sincrono
    .pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.name)
      })
    )
  }
}

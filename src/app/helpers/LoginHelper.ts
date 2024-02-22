export class LoginHelper{


  public tokenExpired (token: string):boolean{
    //debugger
    if(token == undefined || token == ""){
      return false;
    }

    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;

    //console.log(`Expira token: ${expiry - Math.floor((new Date).getTime() / 1000)}`)
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  public tempoRestanteEmSegundos(token: string){
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;

    return (expiry - Math.floor((new Date).getTime() / 1000));
  }

}



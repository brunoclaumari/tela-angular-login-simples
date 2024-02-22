import { Component, OnInit } from '@angular/core';
import { LoginHelper } from 'src/app/helpers/LoginHelper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tempo:number = 0;

  ngOnInit(): void {
    setInterval(()=>{
      var token = localStorage.getItem('token');
      if(token)
        this.tempo = LoginHelper.prototype.tempoRestanteEmSegundos(token)
      else
        this.tempo = 0;
    },1000);
  }

}

import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  credentials : CredenciaisDTO = {
    email:"",
    senha:""
  }

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    public auth : AuthService
    ) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }
 
  login() {
    this.auth.authenticate(this.credentials)
      .subscribe(response =>{
        console.log(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriaPage');
        
      },
      error =>{});
  }

}

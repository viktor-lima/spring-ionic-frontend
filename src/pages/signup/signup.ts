import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup : FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder : FormBuilder) {

      this.formGroup = this.formBuilder.group({
        name:['noé', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email:['noe@gmail.com', [Validators.required, Validators.email]],
        tipo:['1', [Validators.required]],
        cpfOuCnpj:['55623215840',[Validators.required,Validators.minLength(11), Validators.maxLength(14)]],
        senha:['123',[Validators.required]],
        logradouro: ['Rua Viva',[Validators.required]],
        numero: ['22',[Validators.required]],
        complemento: ['casa',[]],
        bairro: ['centro',[]],
        cep: ['48985333',[Validators.required]],
        telefone1: ['8459861524',[Validators.required]],
        telefone2: ['',[]],
        telefone3: ['',[]],
        estadoId:[null,[Validators.required]],
        cidadeId:[null,[Validators.required]],
      });
      
  }

  signupUser(){
    console.log("enviou o form");
  }

}

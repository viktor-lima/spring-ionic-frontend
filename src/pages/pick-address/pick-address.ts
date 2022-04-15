import { Component } from '@angular/core';
import { t } from '@angular/core/src/render3';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';
import { ClienteService } from '../../services/domain/ciente.service';
import { StorageService } from '../../services/storage.service';

/**
 * Generated class for the PickAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];

  pedido : PedidoDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public cartService:  CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos'];

          let cart = this.cartService.getCart();

          this.pedido = {
            cliente: {id: response['id']},
            enderecoDeEntrega: null,
            pagamento: null,
            items: cart.items.map(x => {return {quantidade: x.qtd , produto: {id:x.produto.id}}})
          };

        },
          error => {
            if (error.status == 403)
              this.navCtrl.setRoot('HomePage');
          });
    }
    else
      this.navCtrl.setRoot('HomePage');
  }

  nextPage(item: EnderecoDTO){
    this.pedido.enderecoDeEntrega = {id:item.id};
    this.navCtrl.push('PaymentPage', {pedido: this.pedido});
  }

}

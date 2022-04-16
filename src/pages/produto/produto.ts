import { Component } from '@angular/core';
import { InfiniteScroll, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

/**
 * Generated class for the ProdutoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage {

  items: ProdutoDTO[] = [];
  page: number = 0;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadingData();
  }

  loadingData() {
    let categoria_id = this.navParams.get('categoria_id');
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoria_id, this.page, 10)
      .subscribe(response => {
        let start = this.items.length;
        this.items = this.items.concat(response['content']);
        let and = this.items.length-1;
        console.log(this.page);
        console.log(this.items);
        this.loadImageUrls(start, and);
        loader.dismiss();
      },
        error => {
          loader.dismiss();
        });
  }

  loadImageUrls(start: number, and: number) {
    for (var i = start; i < and; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`
        },
          error => { });
    }
  }

  showDatails(produto_id: string) {
    this.navCtrl.push('ProdutoDetailPage', { produto_id: produto_id });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();
    return loader;
  }

  doRefresh(event) {
    this.page=0;
    this.items = [];
    this.loadingData();
    setTimeout(() => {
      event.complete();
    }, 1000);
  }

  doInfinite(event) {
    this.page++;
    this.loadingData();
    setTimeout(() => {
      event.complete();
    }, 800);
  }
}

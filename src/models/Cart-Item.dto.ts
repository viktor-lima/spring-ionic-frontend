import { ProdutoDTO } from "./produto.dto";


export interface CartItem{
    qtd : number;
    produto : ProdutoDTO;
}
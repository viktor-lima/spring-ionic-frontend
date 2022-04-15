import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelper } from "angular2-jwt";
import { API_CONFIG } from "../config/api.config";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { localUser } from "../models/local_user";
import { CartService } from "./domain/cart.service";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService{

    jwtHelper : JwtHelper =  new JwtHelper();

    constructor(
        public http: HttpClient,
        public storage : StorageService,
        public cartService : CartService){

    }

    authenticate(credentials : CredenciaisDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`, 
            credentials,
            {
                observe : 'response',
                responseType: 'text'
            }
        )
    }

    refreshTokem(){
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`, 
            {},
            {
                observe : 'response',
                responseType: 'text'
            }
        )
    }

    successfullLogin(AuthorizationValue : string){
        let tok = AuthorizationValue.substring(7);
        let user : localUser = {
            token : tok,
            email: this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);

        this.cartService.createOrClearCart();
    }

    logout(){
        this.storage.setLocalUser(null);
    }

}
import { Injectable } from '@angular/core';
//import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../shared/user.class';
import { auth } from 'firebase/app';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged: any = false;

  constructor(public afAuth: AngularFireAuth, public toastCtrl: ToastController) {     
    afAuth.authState.subscribe(user => (this.isLogged = user))
  }
  //loginGoogle
  async loginGoogle(){
    try{
      return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider)
    }
    catch(error){console.log(error)}
  }

    //loginFacebook
  async loginFacebook(){
    try{
      return this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
    }
    catch(error){console.log(error)}
  }

  //Login
  async onLogin (user:User){
    try{
      return await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
    }catch (error){
      console.log('Error on login user', error);
    }
  }
  //Registro

  async onRegister(user:User){
try{
  return await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
}catch(error){
  console.log('Error on register', error);
}
  }
}

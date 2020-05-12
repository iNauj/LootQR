import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private router: Router, private authSvc: AuthService, private afAuth: AngularFireAuth, public toastCtrl: ToastController) { }
  

  ngOnInit() {

  
  }

  async presentToast(error) {
    const toast = await this.toastCtrl.create({
      message: error,
      duration: 2000
    });
    toast.present();
  }

  onGoogleLogin(){
    try {
      this.authSvc.loginGoogle();
    } catch (error) {
      console.log(error);
      this.presentToast(error);
    }
    
  }

  onFacebookLogin(){
    try {
      this.authSvc.loginFacebook();
    } catch (error) {
      console.log(error)
    }
  }

  goToLogout(){
    console.log("Logout!");
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/menu');
  }

  goToLogin(){
    
    this.router.navigateByUrl('/login');
  }

}


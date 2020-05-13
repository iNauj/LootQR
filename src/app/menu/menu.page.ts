import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  picture;
  name;
  email;

  constructor(private router: Router, private authSvc: AuthService, private afAuth: AngularFireAuth, private platform: Platform, private googlePlus: GooglePlus, private fb: Facebook) { }
  

  ngOnInit() {

  
  }

  goToLoginGoogle() {
    if (this.platform.is('android')) {
      
      this.loginGoogleAndroid();
    } else {
      this.loginGoogleWeb();
    }
  }
  
  async loginGoogleAndroid() {
    const res = await this.googlePlus.login({'webClientId': '896355826422-429ms5h3gq1ofkhlfulgq26ed1fph6of.apps.googleusercontent.com','offline': true});
    const resConfirmed = await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken));
    const user = resConfirmed.user;
    this.picture = user.photoURL;
    this.name = user.displayName;
    this.email = user.email;
  }

  async loginGoogleWeb(){
    const res = await this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    const user = res.user;
    console.log(user);
    this.picture = user.photoURL;
    this.name = user.displayName;
    this.email = user.email;
   
  }
  goToLoginFacebook(){

  if (this.platform.is('android')) {

    this.loginFacebookAndroid();

  } else {

    this.loginFacebookWeb();

  }
}

  async loginFacebookAndroid() {

    const res: FacebookLoginResponse = await this.fb.login(['public_profile', 'email']);
    const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
    const resConfirmed = await this.afAuth.auth.signInWithCredential(facebookCredential);
    const user = resConfirmed.user;
    this.picture = user.photoURL;
    this.name = user.displayName;
    this.email = user.email;

  }

  async loginFacebookWeb() {

    const res = await this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    const user = res.user;
    console.log(user);
    this.picture = user.photoURL;
    this.name = user.displayName;
    this.email = user.email;

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


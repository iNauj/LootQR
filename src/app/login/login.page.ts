import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user.class';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app'
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User = new User();
  items: Observable <any[]>;
  constructor(db: AngularFirestore, public afAuth: AngularFireAuth, private router: Router, private authSvc: AuthService, public toastCtrl: ToastController) {
    this.items = db.collection('items').valueChanges();
  }


  ngOnInit() {
  }

  async presentToast(error) {
    const toast = await this.toastCtrl.create({
      message: error,
      duration: 2000
    });
    toast.present();
  }

  async onLogin(){
const user = await this.authSvc.onLogin(this.user);
if(user){
  console.log('Successfully logged in!');
  
  this.router.navigateByUrl('/home');
}
  }

  goToLoginGoogle(){
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.router.navigateByUrl('/');
  }

  goToLogout(){
    console.log("Logout!");
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/login');
  }
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user.class';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  picture;
  user: User = new User();
  items: Observable <any[]>;
  constructor(db: AngularFirestore, public afAuth: AngularFireAuth, private router: Router, private authSvc: AuthService) {
    this.items = db.collection('items').valueChanges();
  }


  ngOnInit() {
  }


  async onLogin(){
const user = await this.authSvc.onLogin(this.user);
if(user){
  console.log('Successfully logged in!');
  this.router.navigateByUrl('/home'); 
    }
  }

}
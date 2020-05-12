import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private router: Router, private authSvc: AuthService, private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  goToLogout(){
    console.log("Logout!");
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/login');
  }

}


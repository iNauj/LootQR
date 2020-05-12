import { Component } from '@angular/core';  
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  scannedData: any;
  encodedData: '';
  encodeData: any;
  user: any;
  constructor(public barcodeCtrl: BarcodeScanner, private router: Router, private afAuth: AngularFireAuth) { }

  goToChecks(){
    
    var user = this.afAuth.auth.currentUser; {
      if (user) {
       
        var name, email, photoUrl, uid, emailVerified;
        
        if (user != null) {
          name = user.displayName;
          email = user.email;
          photoUrl = user.photoURL;
          emailVerified = user.emailVerified;
          uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                           // this value to authenticate with your backend server, if
                           // you have one. Use User.getToken() instead.
        }
        console.log(name);
        console.log(email)
        console.log(photoUrl);
        console.log(emailVerified);
        console.log(uid);
        ;
       this.goToBarcodeScan();
      } else {
        // No user is signed in.
        console.log("No user is signed in");
        this.router.navigateByUrl('/menu');
      }
    };
  }

    goToBarcodeScan() { 
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: false,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Por favor apunte al QR.',
      resultDisplayDuration: 500,
      formats: 'QR_CODE,PDF_417 ',
      orientation: 'portrait',
    };

    this.barcodeCtrl.scan(options).then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scannedData = barcodeData;

    }).catch(err => {
      console.log('Error', err);
    });

  }


  goToUserMenu() {
    this.router.navigateByUrl('/menu');
    }
}
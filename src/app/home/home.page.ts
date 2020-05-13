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
      
      barcodeData = this.scannedData;
      console.log('Barcode data', barcodeData);
      console.log('Barcode data:::::::' + barcodeData);

    }).catch(err => {
      console.log('Error', err);
    });
  }


  goToUserMenu() {
    this.router.navigateByUrl('/menu');
    }
}
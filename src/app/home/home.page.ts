import { Component } from '@angular/core';  
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from '@ionic/angular';



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
  msg;
  num: string;
  
  constructor(public barcodeCtrl: BarcodeScanner, private router: Router, private afAuth: AngularFireAuth, private toastCtrl: ToastController) { }

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
  
  async showLongToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1500,
    });
    toast.present();
  }

  goToBarcodeScan() { 
      
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: false,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Por favor apunte al QR.',
      resultDisplayDuration: 0,
      formats: 'QR_CODE,PDF_417 ',
      orientation: 'portrait',
    };

    this.barcodeCtrl.scan(options)
    
    .then(barcodeData => {

      console.log('Qr Escaneado', barcodeData.text);
      this.scannedData = barcodeData;
      var msg = barcodeData.text;
      console.log(msg);
      this.showLongToast('Paquete añadido correctamente.');
    })

    .catch(msg => {
      console.log('Error', msg);
      this.showLongToast(msg);
    });
  }

  goToUserMenu() {
    this.router.navigateByUrl('/menu');
  }
}
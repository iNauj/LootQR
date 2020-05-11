import { Component } from '@angular/core';  
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  scannedData: any;
  encodedData: '';
  encodeData: any;
  login: number;
  constructor(public barcodeCtrl: BarcodeScanner, private router: Router) { }

  goToBarcodeScan() {
    var login;
    login = 1;
    if(login != 1){
      this.router.navigate(['/login']);
    }else{
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
}

  goToUserMenu() {
    this.router.navigate(['/login']);
    }
}
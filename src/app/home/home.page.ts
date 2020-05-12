import { Component } from '@angular/core';  
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  
})
export class HomePage {
  scannedData: any;
  encodedData: '';
  encodeData: any;
  constructor(public barcodeCtrl: BarcodeScanner, private router: Router) { }

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
    this.router.navigateByUrl('/login');
    }
}
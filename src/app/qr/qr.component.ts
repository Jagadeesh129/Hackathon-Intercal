import { Component } from '@angular/core';
import { CanvasService } from '../service/canvas.service';

@Component({
  selector: 'app-qr',
  standalone: true,
  imports: [],
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})
export class QrComponent {

  constructor(private canvasService: CanvasService) { }

  addQrCode() {
    this.canvasService.addQrCode();
  }
}

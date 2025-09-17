import { Component } from '@angular/core';
import { CanvasService } from '../service/canvas.service';

@Component({
  selector: 'app-circle',
  standalone: true,
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css'],
})
export class CircleComponent {
  constructor(private canvasService: CanvasService) {}

  addCircle() {
    this.canvasService.addCircle();
  }
}

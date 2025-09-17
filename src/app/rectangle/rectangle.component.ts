import { Component } from '@angular/core';
import { CanvasService } from '../service/canvas.service';

@Component({
  selector: 'app-rectangle',
  standalone: true,
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.css']
})
export class RectangleComponent {

  constructor(private canvasService: CanvasService) {}

  addRectangle() {
    this.canvasService.addRectangle();
  }
}

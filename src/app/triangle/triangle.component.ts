import { Component } from '@angular/core';
import { CanvasService } from '../service/canvas.service';

@Component({
  selector: 'app-triangle',
  standalone: true,
  templateUrl: './triangle.component.html',
  styleUrls: ['./triangle.component.css']
})
export class TriangleComponent {

  constructor(private canvasService: CanvasService) {}

  addTriangle() {
    this.canvasService.addTriangle();
  }
}
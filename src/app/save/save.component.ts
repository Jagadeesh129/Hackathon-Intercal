import { Component } from '@angular/core';
import { CanvasService } from '../service/canvas.service';

@Component({
  selector: 'app-save',
  standalone: true,
  imports: [],
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css']
})
export class SaveComponent {

  constructor(private canvasService: CanvasService) { }

  saveCanvas() {
    const canvasJson = this.canvasService.getCanvasAsJSON();
    console.log(canvasJson);
  }
}

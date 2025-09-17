import { Component } from '@angular/core';
import { CanvasService } from '../service/canvas.service';

@Component({
  selector: 'app-text',
  standalone: true,
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css'],
})
export class TextComponent {
  constructor(private canvasService: CanvasService) {}

  addText() {
    this.canvasService.addText();
  }
}

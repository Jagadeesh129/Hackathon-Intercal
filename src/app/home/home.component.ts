import { Component, HostListener, OnInit } from '@angular/core';
import { TextComponent } from '../text/text.component';
import { CanvasService } from '../service/canvas.service';
import { PropertiesPanelComponent } from '../properties-panel/properties-panel.component';

import { SaveComponent } from '../save/save.component';

import { QrComponent } from '../qr/qr.component';
import { CircleComponent } from '../circle/circle.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TextComponent, PropertiesPanelComponent, SaveComponent, QrComponent, CircleComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private canvasService: CanvasService) {}

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      this.canvasService.deleteSelected();
    }

    if (event.ctrlKey && event.key === 'z') {
      this.canvasService.undo();
    }

    if (event.ctrlKey && event.key === 'y') {
      this.canvasService.redo();
    }
  }

  ngOnInit() {
    this.canvasService.init('myCanvas');
  }
}

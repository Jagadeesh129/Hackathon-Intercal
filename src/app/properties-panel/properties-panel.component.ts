import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CanvasService } from '../service/canvas.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-properties-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './properties-panel.component.html',
  styleUrls: ['./properties-panel.component.css']
})
export class PropertiesPanelComponent implements OnInit, OnDestroy {
  selectedObject: any = null;
  private subscription: Subscription = new Subscription();

  // Properties to bind to UI
  fillColor: string = '';
  strokeColor: string = '';
  strokeWidth: number = 1;
  opacity: number = 1;
  width: number = 0;
  height: number = 0;
  fontSize: number = 0;
  radius: number = 0;

  constructor(private canvasService: CanvasService) { }

  ngOnInit(): void {
    this.subscription.add(this.canvasService.selectedObject$.subscribe(obj => {
      this.selectedObject = obj;
      this.updatePanelProperties();
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updatePanelProperties(): void {
    if (this.selectedObject) {
      console.log('Selected Object:', this.selectedObject);
      console.log('Selected Object Fill:', this.selectedObject.fill);
      console.log('Selected Object Stroke:', this.selectedObject.stroke);

      this.fillColor = this.convertToHex(this.selectedObject.fill) || '';
      this.strokeColor = this.convertToHex(this.selectedObject.stroke) || '';
      this.strokeWidth = this.selectedObject.strokeWidth || 1;
      this.opacity = this.selectedObject.opacity || 1;

      // Specific properties based on object type
      if (this.selectedObject.type === 'textbox') {
        this.fontSize = this.selectedObject.fontSize || 0;
        this.width = this.selectedObject.width || 0;
        this.height = this.selectedObject.height || 0;
      } else if (this.selectedObject.type === 'circle') {
        this.radius = this.selectedObject.radius || 0;
      } else if (this.selectedObject.type === 'rect' || this.selectedObject.type === 'triangle') {
        this.width = this.selectedObject.width || 0;
        this.height = this.selectedObject.height || 0;
      }
    } else {
      this.resetPanelProperties();
    }
  }

  resetPanelProperties(): void {
    this.fillColor = '';
    this.strokeColor = '';
    this.strokeWidth = 1;
    this.opacity = 1;
    this.width = 0;
    this.height = 0;
    this.fontSize = 0;
    this.radius = 0;
  }

  onFillColorChange(event: Event): void {
    this.canvasService.updateObjectProperty('fill', (event.target as HTMLInputElement).value);
  }

  onStrokeColorChange(event: Event): void {
    this.canvasService.updateObjectProperty('stroke', (event.target as HTMLInputElement).value);
  }

  onStrokeWidthChange(event: Event): void {
    this.canvasService.updateObjectProperty('strokeWidth', parseFloat((event.target as HTMLInputElement).value));
  }

  onOpacityChange(event: Event): void {
    this.canvasService.updateObjectProperty('opacity', parseFloat((event.target as HTMLInputElement).value));
  }

  onWidthChange(event: Event): void {
    this.canvasService.updateObjectProperty('width', parseFloat((event.target as HTMLInputElement).value));
  }

  onHeightChange(event: Event): void {
    this.canvasService.updateObjectProperty('height', parseFloat((event.target as HTMLInputElement).value));
  }

  onFontSizeChange(event: Event): void {
    this.canvasService.updateObjectProperty('fontSize', parseFloat((event.target as HTMLInputElement).value));
  }

  onRadiusChange(event: Event): void {
    this.canvasService.updateObjectProperty('radius', parseFloat((event.target as HTMLInputElement).value));
  }

  // Helper function to convert color names to hex
  private convertToHex(color: string): string {
    if (!color) {
      return '';
    }
    // Check if it's already a hex color
    if (color.startsWith('#')) {
      return color;
    }
    // Use a temporary DOM element to convert named colors to RGB, then to hex
    const div = document.createElement('div');
    div.style.color = color;
    document.body.appendChild(div);
    const rgb = window.getComputedStyle(div).color;
    document.body.removeChild(div);

    // Convert rgb(r, g, b) to #RRGGBB
    const rgbMatch = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (rgbMatch) {
      const toHex = (c: string) => {
        const hex = parseInt(c).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };
      return '#' + toHex(rgbMatch[1]) + toHex(rgbMatch[2]) + toHex(rgbMatch[3]);
    }
    return ''; // Return empty if conversion fails
  }
}
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare const fabric: any;

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  private canvas: any;
  private history: any[] = [];
  private historyIndex = -1;
  private _selectedObject = new BehaviorSubject<any>(null);
  public selectedObject$ = this._selectedObject.asObservable();

  constructor() {}

  init(canvasId: string) {
    this.canvas = new fabric.Canvas(canvasId, {
      backgroundColor: '#fff',
      selection: true,
    });

    this.saveState();

    this.canvas.on('object:added', () => this.saveState());
    this.canvas.on('object:modified', () => this.saveState());
    this.canvas.on('object:removed', () => this.saveState());

    this.canvas.on('selection:created', (e: any) => this.setSelectedObject(e.selected[0]));
    this.canvas.on('selection:updated', (e: any) => this.setSelectedObject(e.selected[0]));
    this.canvas.on('selection:cleared', () => this.setSelectedObject(null));

    return this.canvas;
  }

  addText() {
    const text = new fabric.Textbox('', {
      left: 100,
      top: 100,
      fontSize: 20,
      fill: 'blue',
      width: 200,
      editable: true,
      textAlign: 'center',
    });
    this.canvas.add(text).setActiveObject(text);
    this.canvas.renderAll();
    text.enterEditing();
    text.hiddenTextarea?.focus();
  }

  addCircle() {
    const circle = new fabric.Circle({
      left: 150,
      top: 150,
      radius: 50,
      fill: 'transparent',
      stroke: 'black',
      strokeWidth: 2,
    });
    this.canvas.add(circle).setActiveObject(circle);
    this.canvas.renderAll();
  }

  addRectangle() {
    const rect = new fabric.Rect({
      left: 200,
      top: 200,
      width: 150,
      height: 100,
      fill: '#fff',
      stroke: 'black',
      strokeWidth: 2,
    });
    this.canvas.add(rect).setActiveObject(rect);
    this.canvas.renderAll();
  }

  addTriangle() {
    const triangle = new fabric.Triangle({
      left: 250,
      top: 250,
      width: 100,
      height: 100,
      fill: '#fff',
      stroke: 'black',
      strokeWidth: 2,
    });
    this.canvas.add(triangle).setActiveObject(triangle);
    this.canvas.renderAll();
  }

  deleteSelected() {
    const selected = this._selectedObject.getValue();
    if (selected) {
      if (selected.isEditing) {
        return;
      }
      this.canvas.remove(selected);
      this.canvas.discardActiveObject();
      this.canvas.renderAll();
      this._selectedObject.next(null); // Clear selection after deletion
      this.saveState();
    }
  }

  private setSelectedObject(obj: any) {
    this._selectedObject.next(obj);
  }

  updateObjectProperty(property: string, value: any) {
    const selected = this._selectedObject.getValue();
    if (selected) {
      selected.set(property, value);
      // If fill color is set, make object visible
      if (property === 'fill' && value !== '' && value !== 'transparent') {
        selected.set('opacity', 1);
      }
      this.canvas.renderAll();
      this.saveState();
    }
  }

  private saveState() {
    if (this.history.length > this.historyIndex + 1) {
      this.history = this.history.slice(0, this.historyIndex + 1);
    }
    const json = this.canvas.toJSON();
    this.history.push(json);
    this.historyIndex = this.history.length - 1;
  }

  undo() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.loadState();
    }
  }

  redo() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      this.loadState();
    }
  }

  private loadState() {
    const json = this.history[this.historyIndex];
    this.canvas.loadFromJSON(json, () => {
      this.canvas.renderAll();
      this.canvas.discardActiveObject();
    });
  }

  getCanvasAsJSON() {
    return JSON.stringify(this.canvas.toJSON());
  }

  addQrCode() {
    fabric.Image.fromURL('/image.png', (img: any) => {
      img.set({
        left: 100,
        top: 100,
        scaleX: 0.5,
        scaleY: 0.5,
      });
      this.canvas.add(img).setActiveObject(img);
      this.canvas.renderAll();
    });
  }
}

import { Component } from '@angular/core';
import { CircleComponent } from '../circle/circle.component';
import { TextComponent } from '../text/text.component';

declare const fabric: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CircleComponent, TextComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  canvas: any;
  selectedObject: any = null;
  isPlacingText = false;
  pendingTextId: string | null = null;

  ngOnInit() {
    this.canvas = new fabric.Canvas('myCanvas', {
      backgroundColor: '#fff',
      selection: true
    });

    // Listen for selection
    this.canvas.on('selection:created', (e: any) => this.setActive(e.selected[0]));
    this.canvas.on('selection:updated', (e: any) => this.setActive(e.selected[0]));
    this.canvas.on('selection:cleared', () => this.setActive(null));

    // Listen for canvas click
    this.canvas.on('mouse:down', (opt: any) => {
      if (this.isPlacingText && this.pendingTextId) {
        const pointer = this.canvas.getPointer(opt.e);

        const text = new fabric.Textbox('Edit me', {
          left: pointer.x,
          top: pointer.y,
          fontSize: 20,
          fill: 'blue',
          width: 200,       // fixed width → wrapping works
          editable: true,
          textAlign: 'center'
        });
        (text as any).id = this.pendingTextId;

        this.canvas.add(text).setActiveObject(text);
        this.canvas.renderAll();

        // 🔑 Immediately enter edit mode
        text.enterEditing();
        text.hiddenTextarea?.focus();

        // reset mode
        this.isPlacingText = false;
        this.pendingTextId = null;
        this.canvas.defaultCursor = 'default';
      }
    });


  }

  setActive(obj: any) {
    this.selectedObject = obj;
  }

  printCanvas() {
    const json = this.canvas.toJSON();
    console.log("Canvas JSON:", JSON.stringify(json, null, 2));
  }


  requestText(data: any) {
    this.isPlacingText = true;
    this.pendingTextId = data.id;
    this.canvas.defaultCursor = 'crosshair'; // visual feedback
  }

  updateProperties(updated: any) {
    if (this.selectedObject) {
      this.selectedObject.set(updated);
      this.canvas.renderAll();
    }
  }
}

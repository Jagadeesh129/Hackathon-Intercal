import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-text',
  standalone: true,
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent {
  private textCounter = 0;
  @Output() textRequest = new EventEmitter<any>();

  addText() {
    this.textCounter++;
    const textId = `text-${this.textCounter}`;
    this.textRequest.emit({ id: textId });
  }
}

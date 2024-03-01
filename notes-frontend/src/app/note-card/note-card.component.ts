import { Component, ViewChild, ElementRef, OnInit, Renderer2, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit{

  @Input() title: string;
  @Input() body: string;
  @Input() link: string;

  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('truncator') truncator: ElementRef<HTMLElement>;
  @ViewChild('bodyText') bodyText: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    // work out if there is a text overflow and if so, then hide the truncator

    let style= window.getComputedStyle(this.bodyText.nativeElement, null);
    let viewableHeight = parseInt(style.getPropertyValue("height"), 10);

    if (this.bodyText.nativeElement.scrollHeight > viewableHeight){
      // if there is a text overflow, show the fade out truncator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    }else {
      // else if there is NO text overflow, show the fade out truncator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }
}

  onXButtonClick(){
    this.deleteEvent.emit();
  }

}

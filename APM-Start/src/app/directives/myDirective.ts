import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'myFirstDirective'
})
export class MyFirstDirective{
  /**
   *
   */
  constructor(private el: ElementRef) {
    el.nativeElement.innerHTML = 'This is my first Directive';

  }
}

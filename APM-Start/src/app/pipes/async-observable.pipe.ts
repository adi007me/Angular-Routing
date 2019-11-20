import { Component } from "@angular/core";
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'async-observable-pipe',
  template: '<div><code>observable|async</code>: Time : {{ time | async }}</div>'
})
export class AsyncObservablePipeComponent {
  p = new Promise((resolve, reject) => {
    resolve(100);
  });

  constructor() {
    this.p.then(n => console.log(n));

    this.p.then(n => console.log(n));
  }

  time = new Observable<string>((observer: Observer<string>) => {
    setInterval(() => {
      observer.next(new Date().toString())
    }, 1000);
  });
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit, OnDestroy {
  private id: number;
  private unsubscribeparamMap$: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.unsubscribeparamMap$ = this.route.paramMap.subscribe((params: ParamMap) => {
      console.log(params.get('id'));

      this.id = +params.get('id');
    });
    this.id = +this.route.snapshot.paramMap.get('id');

    // this.router.navigate(['/hero', '2']);

    // this.id = +this.route.snapshot.paramMap.get('id');

    console.log(this.unsubscribeparamMap$);

  }

  ngOnDestroy() {
    console.log('On Destroy');
    this.unsubscribeparamMap$.unsubscribe();
  }

  goBack() {
    this.router.navigate(['/heroes', {
      id: this.id,
      foo: 'bar'
    }]);
  }

}

import { Component, inject, VERSION } from '@angular/core';
import { delay, map, Observable, of, share, startWith } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  provideNgxLoaderConfig,
  withNonFlickerLoader,
} from '@code-workers.io/ngx-loader';

@Component({
  selector: 'ngx-loader-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    provideNgxLoaderConfig(
      withNonFlickerLoader({ suspenseThreshold: 500, suspenseTime: 6000 })
    ),
  ],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  constructor(private http: HttpClient) {}

  loading$: Observable<boolean> = this.fetch().pipe(
    startWith(true),
    map(() => false)
  );

  data = this.fetch();

  fetch() {
    return this.http
      .get('https://jsonplaceholder.typicode.com/posts/1')
      .pipe(delay(4000), share());
  }
}

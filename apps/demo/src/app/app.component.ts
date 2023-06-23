import {Component, inject, VERSION} from '@angular/core';
import {delay, map, Observable, of, share, startWith} from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'ngx-loader-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  constructor(private http: HttpClient) {
  }

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

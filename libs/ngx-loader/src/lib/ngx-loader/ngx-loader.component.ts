import { ChangeDetectionStrategy, Component, ContentChild, Inject, Input, Optional, TemplateRef } from '@angular/core';
import { NGX_LOADER_CONFIG_TOKEN, NgxLoaderConfig } from '../ngx-loader-config.token';

@Component({
  selector: 'ngx-loader',
  template: `
    <ng-container>
      <div class="container">
        <ng-container *ngTemplateOutlet="content"> </ng-container>

        <ng-container *ngIf="show">
          <div class="overlay" [ngClass]="backdropClass ? backdropClass : 'default-backdrop'">
            <div class="loader-container">
              <ng-container *ngIf="loaderTemplate">
                <ng-container *ngTemplateOutlet="loaderTemplate"> </ng-container>
              </ng-container>
              <ng-container *ngIf="config?.loaderComponent && !loaderTemplate">
                <ng-container *ngComponentOutlet="config?.loaderComponent!"> </ng-container>
              </ng-container>
              <ng-container *ngIf="!config?.loaderComponent && !loaderTemplate">
                <div>Loading ...</div>
              </ng-container>
            </div>
          </div>
        </ng-container>

      </div>
    </ng-container>
  `,
  styles: [
    `
      .container {
        width: max-content;
        height: max-content;
        position: relative;
      }
      .overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 9999999;

        top: 0;
        left: 0;
        display: grid;
        place-items: center;
      }
      .default-backdrop {
        background: linear-gradient(
          180deg,
          rgba(30, 41, 59, 0.4) 0%,
          rgba(30, 41, 59, 0.2) 35%,
          rgba(30, 41, 59, 0.2) 100%
        );
      }

      .loader-container {
        position: absolute;
        z-index: 9999999;
        /* display: grid;
      place-items: center; */
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxLoaderComponent {
  @ContentChild(TemplateRef)
  content: TemplateRef<unknown> | null = null;

  @Input() show: boolean = false;
  @Input() loaderTemplate: TemplateRef<unknown> | null = null;
  @Input() backdropClass: string | null = this.config?.backdropClass ?? null;

  constructor(@Optional() @Inject(NGX_LOADER_CONFIG_TOKEN) public readonly config: NgxLoaderConfig | null) {}
}

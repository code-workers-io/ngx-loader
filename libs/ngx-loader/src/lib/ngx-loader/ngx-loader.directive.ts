import {
  ComponentRef,
  Directive,
  EmbeddedViewRef,
  Inject,
  Input,
  ModuleWithProviders,
  NgModule,
  OnDestroy,
  OnInit,
  Optional,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { combineLatest, Observable, startWith, Subscription } from 'rxjs';
import {
  NGX_LOADER_CONFIG_TOKEN,
  NgxLoaderConfig,
} from '../ngx-loader-config.token';
import {
  NgxLoaderWrapperComponent,
  NgxLoaderWrapperComponentModule,
} from './ngx-loader-wrapper.component';
import { deriveLoadingState } from './derive-loading-state';
import {
  NON_FLICKER_LOADER_FEATURE,
  NonFlickerLoaderFeatureConfig,
} from '../config/with-non-flicker-loader';

interface NgxLoaderDirectiveContext<T> {
  $implicit: T;
}

@Directive({
  selector: '[ngxLoader]',
})
export class NgxLoaderDirective<T> implements OnInit, OnDestroy {
  private sub = new Subscription();
  private embeddedViewRef!: EmbeddedViewRef<NgxLoaderDirectiveContext<T>>;
  private compRef!: ComponentRef<NgxLoaderWrapperComponent>;
  // the data
  @Input() ngxLoader!: Observable<T>;
  @Input() ngxLoaderLoaderTemplate!: TemplateRef<NgxLoaderDirectiveContext<T>>;
  @Input() ngxLoaderBackdropClass: string | null =
    this.config?.backdropClass ?? null;

  constructor(
    @Optional()
    @Inject(NGX_LOADER_CONFIG_TOKEN)
    public readonly config: NgxLoaderConfig | null,
    private readonly templateRef: TemplateRef<NgxLoaderDirectiveContext<T>>,
    private readonly vcr: ViewContainerRef,
    @Optional()
    @Inject(NON_FLICKER_LOADER_FEATURE)
    private readonly nonFlickerLoaderConfig: NonFlickerLoaderFeatureConfig | null
  ) {}

  ngOnInit() {
    if (!this.nonFlickerLoaderConfig) {
      this.sub.add(
        this.ngxLoader.pipe(startWith(null)).subscribe((data) => {
          this.vcr.clear();
          if (data) {
            this.embeddedViewRef = this.vcr.createEmbeddedView(
              this.templateRef,
              {
                $implicit: data,
              }
            );
          } else {
            this.compRef = this.vcr.createComponent(NgxLoaderWrapperComponent);
            this.compRef.instance.content = this.templateRef;
            this.compRef.instance.loaderTemplate = this.ngxLoaderLoaderTemplate;
            this.compRef.instance.backdropClass = this.ngxLoaderBackdropClass;
            this.compRef.changeDetectorRef.detectChanges();
          }
        })
      );
    }
    if (this.nonFlickerLoaderConfig) {
      this.sub.add(
        combineLatest([
          this.ngxLoader.pipe(startWith(null)),
          deriveLoadingState(
            this.ngxLoader,
            this.nonFlickerLoaderConfig.suspenseThreshold,
            this.nonFlickerLoaderConfig.suspenseTime
          ),
        ]).subscribe(([data, loading]) => {
          if (loading) {
            this.vcr.clear();
            this.compRef = this.vcr.createComponent(NgxLoaderWrapperComponent);
            this.compRef.instance.content = this.templateRef;
            this.compRef.instance.loaderTemplate = this.ngxLoaderLoaderTemplate;
            this.compRef.instance.backdropClass = this.ngxLoaderBackdropClass;
            this.compRef.changeDetectorRef.detectChanges();
          }
          if (!loading && data) {
            this.vcr.clear();
            this.embeddedViewRef = this.vcr.createEmbeddedView(
              this.templateRef,
              {
                $implicit: data,
              }
            );
          }
        })
      );
    }
  }
  ngOnDestroy() {
    this.compRef.destroy();
    this.embeddedViewRef.destroy();
    this.sub.unsubscribe();
  }
}

@NgModule({
  imports: [CommonModule, NgxLoaderWrapperComponentModule],
  declarations: [NgxLoaderDirective],
  exports: [NgxLoaderDirective],
})
export class NgxLoaderDirectiveModule {
  static withConfig(
    options?: NgxLoaderConfig
  ): ModuleWithProviders<NgxLoaderDirectiveModule> {
    return {
      ngModule: NgxLoaderDirectiveModule,
      providers: [
        {
          provide: NGX_LOADER_CONFIG_TOKEN,
          useValue: options ?? null,
        },
      ],
    };
  }
}

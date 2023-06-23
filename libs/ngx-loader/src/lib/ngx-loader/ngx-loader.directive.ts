import {
  ComponentRef,
  Directive, EmbeddedViewRef,
  Inject,
  Input, ModuleWithProviders,
  NgModule,
  OnDestroy,
  OnInit,
  Optional,
  TemplateRef, ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable, startWith, Subscription} from 'rxjs';
import {
  NGX_LOADER_CONFIG_TOKEN,
  NgxLoaderConfig,
} from '../ngx-loader-config.token';
import {NgxLoaderWrapperComponent} from "./ngx-loader-wrapper.component";

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
  @Input() ngxLoaderLoaderTemplate!:
    | TemplateRef<NgxLoaderDirectiveContext<T>>;
  @Input() ngxLoaderBackdropClass: string | null =
    this.config?.backdropClass ?? null;

  constructor(
    @Optional()
    @Inject(NGX_LOADER_CONFIG_TOKEN)
    public readonly config: NgxLoaderConfig | null,
    private readonly templateRef: TemplateRef<NgxLoaderDirectiveContext<T>>,
    private readonly vcr: ViewContainerRef
  ) {}

  ngOnInit() {
    this.sub.add(this.ngxLoader.pipe(
      startWith(null)
    ).subscribe((data => {

      this.vcr.clear()
      if (data) {

        this.embeddedViewRef = this.vcr.createEmbeddedView(this.templateRef, {$implicit: data});
      } else {

        this.compRef = this.vcr.createComponent(NgxLoaderWrapperComponent)
        this.compRef.instance.content = this.templateRef;
        this.compRef.instance.loaderTemplate = this.ngxLoaderLoaderTemplate
        this.compRef.instance.backdropClass = this.ngxLoaderBackdropClass;
        this.compRef.changeDetectorRef.detectChanges();
      }
    })))
  }
  ngOnDestroy() {
    this.compRef.destroy();
    this.embeddedViewRef.destroy()
    this.sub.unsubscribe();
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [NgxLoaderDirective],
  exports: [NgxLoaderDirective],
})
export class NgxLoaderDirectiveModule {
  static withConfig( options?: NgxLoaderConfig ) : ModuleWithProviders<NgxLoaderDirectiveModule> {

    return({
      ngModule: NgxLoaderDirectiveModule,
      providers: [
        {
          provide: NGX_LOADER_CONFIG_TOKEN,
          useValue: options ?? null
        },
      ]
    });

  }
}

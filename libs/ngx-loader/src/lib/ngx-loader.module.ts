import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLoaderComponent } from './ngx-loader/ngx-loader.component';
import { NGX_LOADER_CONFIG_TOKEN, NgxLoaderConfig } from './ngx-loader-config.token';

@NgModule({
  imports: [CommonModule],
  declarations: [NgxLoaderComponent],
  exports: [NgxLoaderComponent],
})
export class NgxLoaderModule {
  static withConfig( options?: NgxLoaderConfig ) : ModuleWithProviders<NgxLoaderModule> {

    return({
      ngModule: NgxLoaderModule,
      providers: [
        {
          provide: NGX_LOADER_CONFIG_TOKEN,
          useValue: options ?? null
        },
      ]
    });

  }
}

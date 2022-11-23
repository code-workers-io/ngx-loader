import { InjectionToken, Type } from '@angular/core';


export interface NgxLoaderConfig {
  /**
   * The backdrop class to be applied to the overlay
   */
  backdropClass?: string;
  /**
   * The component to be used as the loader
   */
  loaderComponent?: Type<unknown>;
}

export const NGX_LOADER_CONFIG_TOKEN = new InjectionToken<NgxLoaderConfig>('ngx-loader-config');

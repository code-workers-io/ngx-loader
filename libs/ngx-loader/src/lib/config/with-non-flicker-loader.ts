import { makeFeature } from './features';
import { InjectionToken } from '@angular/core';

export interface NonFlickerLoaderFeatureConfig {
  suspenseThreshold: number;
  suspenseTime: number;
}

export const NON_FLICKER_LOADER_FEATURE =
  new InjectionToken<NonFlickerLoaderFeatureConfig>('NonFlickerLoaderFeature');
export function withNonFlickerLoader(cfg?: {
  suspenseThreshold: number;
  suspenseTime: number;
}) {
  return makeFeature('NonFlickerLoader', [
    {
      provide: NON_FLICKER_LOADER_FEATURE,
      useValue: cfg ?? { suspenseThreshold: 5000, suspenseTime: 10000 },
    },
  ]);
}

import { Provider } from '@angular/core';

type FeatureKind = 'NonFlickerLoader';

/**
 * @internal
 */
export interface Feature {
  kind: FeatureKind;
  providers: Provider[];
}

/**
 * @internal
 * @param kind
 * @param providers
 */
export function makeFeature(kind: FeatureKind, providers: Provider[]) {
  return {
    kind,
    providers,
  };
}

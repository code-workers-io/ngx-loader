import { Feature } from './features';
import { Provider } from '@angular/core';

export function provideNgxLoaderConfig(...features: Feature[]): Provider[] {
  return [...features.map((f) => f.providers)];
}

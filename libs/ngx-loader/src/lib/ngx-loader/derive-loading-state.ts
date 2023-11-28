import {
  combineLatest,
  distinctUntilChanged,
  map,
  merge,
  Observable,
  share,
  startWith,
  takeUntil,
  timer,
} from 'rxjs';

export function deriveLoadingState<T>(
  source$: Observable<T>,
  suspenseThreshold = 1000,
  suspenseTime = 2000
) {
  const result$ = source$.pipe(share());

  return merge(
    // ON in 1second
    timer(suspenseThreshold).pipe(
      map(() => true),
      takeUntil(result$)
    ),

    // OFF once we receive a result, yet at least in 2s
    //combineLatest(result$, timer(2000)).pipe(mapTo(false))
    combineLatest([result$, timer(suspenseThreshold + suspenseTime)]).pipe(
      map(() => false)
    )
  ).pipe(startWith(false), distinctUntilChanged());
}

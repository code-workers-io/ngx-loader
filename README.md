# @code-workers.io/ngx-loader

A nice lib to show an overlay loading indicator.

### Demo

[Demo link](https://stackblitz.com/edit/angular-ivy-tx6kkr?file=src/app/app.component.ts)

### Install
```bash
npm i @code-workers.io/ngx-loader
```

### Usage

Import the NgxLoaderModule in your app.module.ts

```typescript
import { NgxLoaderModule } from '@code-workers.io/ngx-loader';

@NgModule({
  imports: [
    NgxLoaderModule
  ]
})
export class AppModule { }
```

```typescript
<ngx-loader [show]='loading$ | async' [loaderTemplate]="myloader">
  <ng-template>
    <div> Some content I want to show</div>
  </ng-template>
</ngx-loader>

<ng-template #myloader> <my-spinner> </my-spinner> </ng-template
```

Optionally you can pass a config object to the module to customize a global loader component.

```typescript
import { NgxLoaderModule } from '@mikelgo/ngx-loader';

@NgModule({
  imports: [
    NgxLoaderModule.forRoot({
      loaderComponent: MyCustomLoaderComponent,
      backdropClass: 'my-custom-backdrop-class'
    })
  ]
})
export class AppModule { }
```

Finally you will use it like this:

```typescript
<ngx-loader [show]='loading$ | async'>
  <ng-template>
    <div> Some content I want to show</div>
  </ng-template>
</ngx-loader>

```

### Directive usage
Alternativly instead of using the `ngx-loader` component you can use a structural directive:
```
<div *ngxLoader="data; let result; loaderTemplate: myloader">
  <div >{{ result | json }}</div>
</div>
```

### API
`NgxLoaderComponent`
* `show` [boolean]: condition to hide or show the component
* `loaderTemplate` [TemplateRef]: template to render a custom loader
* `backdropClass` [string]: CSS class to apply for the backdrop background

`NgxLoaderConfig`
* `loaderComponent` [Type]: component to render a custom loader
* `backdropClass` [string]: CSS class to apply for the backdrop background



### Compatibility
Version 1.x.x is compatible with Angular 13.x.x.

## Running unit tests

Run `nx test ngx-loader` to execute the unit tests.

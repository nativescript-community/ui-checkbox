<!-- ⚠️ This README has been generated from the file(s) "blueprint.md" ⚠️-->
<!--  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      DO NOT EDIT THIS READEME DIRECTLY! Edit "bluesprint.md" instead.
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->
<h1 align="center">@nativescript-community/ui-checkbox</h1>
<p align="center">
		<a href="https://npmcharts.com/compare/@nativescript-community/ui-checkbox?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/@nativescript-community/ui-checkbox.svg" height="20"/></a>
<a href="https://www.npmjs.com/package/@nativescript-community/ui-checkbox"><img alt="NPM Version" src="https://img.shields.io/npm/v/@nativescript-community/ui-checkbox.svg" height="20"/></a>
	</p>

<p align="center">
  <b>NativeScript plugin for checkbox.</b></br>
  <sub><sub>
</p>

<br />


| <img src="https://github.com/nativescript-community/ui-checkbox/raw/master/images/demo-ios.gif" height="500" /> | <img src="https://github.com/nativescript-community/ui-checkbox/raw/master/images/demo-android.gif" height="500" /> |
| --- | ----------- |
| iOS Demo | Android Demo |


[](#table-of-contents)

## Table of Contents

* [Installation](#installation)
		* [Platform controls used:](#platform-controls-used)
* [API](#api)
* [Properties](#properties)
* [Events](#events)
* [API](#api-1)
* [Css Styling](#css-styling)
* [Styling [Android]](#styling-android)
	* [Angular Usage Sample:](#angular-usage-sample)
	* [NativeScript-Vue Usage Sample](#nativescript-vue-usage-sample)
* [Demos](#demos)
* [Demos and Development](#demos-and-development)
	* [Setup](#setup)
	* [Build](#build)
	* [Demos](#demos-1)
* [Questions](#questions)


[](#installation)

## Installation
Run the following command from the root of your project:

`ns plugin add @nativescript-community/ui-checkbox`

#### Platform controls used:

| Android                                                                                  | iOS                                                  |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [Android CheckBox](https://developer.android.com/reference/android/widget/CheckBox.html) | [BEMCheckBox](http://cocoapods.org/pods/BEMCheckBox) |


[](#api)

## API


[](#properties)

## Properties

- **checked** - boolean
- **text** - text to use with the checkbox
- **fillColor** - Color of the checkbox element
- **boxType** - Either 'square' (default) or 'circle'. It's recommended to use 'circle' for radiobuttons. Note that plugin version 3.0.0 switched the default for iOS to 'square' for alignment with Android. Still want `circle` on iOS and `square` on Android? Just make the `boxType` value conditional.


[](#events)

## Events

- **checkedChange** - Use a reference to the CheckBox component to grab it's `checked` property when this event fires to see the new value.


[](#api)

## API

- **toggle()** - Change the checked state of the view to the inverse of its current state.


[](#css-styling)

## Css Styling

- **color** - set the text label color
- **font-size** - checkbox is sized to text from here : default 15
- **border-width** - set the line width of the checkbox element: iOS only


[](#styling-android)

## Styling [Android]

- **checkStyle** - set to the name of your drawable
- **checkPadding** - set the padding of the checkbox

###

```XML
<Page
  xmlns="http://schemas.nativescript.org/tns.xsd"
  xmlns:CheckBox="@nstudio/nativescript-checkbox" loaded="pageLoaded">
  <ActionBar title="Native Checkbox" />
  <StackLayout>
    <CheckBox:CheckBox checked="checkProp" text="myCheckText" fillColor="myCheckColor" id="myCheckbox" />
    <CheckBox:CheckBox text="CheckBox Label" checked="false" />
  </StackLayout>
</Page>
```

###

```typescript

import { CheckBox } from '@nstudio/nativescript-checkbox';
import { topmost } from '@nativescript/core/ui/frame';

public toggleCheck() {
  const checkBox = topmost().getViewById('yourCheckBoxId');
  checkBox.toggle();
}

public getCheckProp() {
  const checkBox = topmost().getViewById('yourCheckBoxId');
  console.log('checked prop value = ' + checkBox.checked);
}

```

### Angular Usage Sample:

```typescript
import { TNSCheckBoxModule } from '@nstudio/nativescript-checkbox/angular';

@NgModule({
  imports: [TNSCheckBoxModule]
  // etc.
})
export class YourModule {}

// component:
export class SomeComponent {
  @ViewChild('CB1') FirstCheckBox: ElementRef;
  constructor() {}
  public toggleCheck() {
    this.FirstCheckBox.nativeElement.toggle();
  }

  public getCheckProp() {
    console.log(
      'checked prop value = ' + this.FirstCheckBox.nativeElement.checked
    );
  }
}
```

```html
<StackLayout>
  <CheckBox #CB1 text="CheckBox Label" checked="false"></CheckBox>
  <button (tap)="toggleCheck()" text="Toggle it!"></button>
  <button (tap)="getCheckProp()" text="Check Property"></button>
</StackLayout>
```

### NativeScript-Vue Usage Sample

In your `main.js` (The file where the root Vue instance is created) register the element

```js
Vue.registerElement(
  'CheckBox',
  () => require('@nstudio/nativescript-checkbox').CheckBox,
  {
    model: {
      prop: 'checked',
      event: 'checkedChange'
    }
  }
);
```

And in your template, use it as:

```html
<check-box :checked="isChecked" @checkedChange="isChecked = $event.value" />
```

Use `checked` instead of `v-model`. [See #99](https://github.com/nstudio/nativescript-checkbox/issues/99).



[](#demos)

## Demos
This repository includes Angular, Vue.js, and Svelte demos. In order to run these execute the following in your shell:
```shell
$ git clone https://github.com/@nativescript-community/ui-checkbox
$ cd ui-checkbox
$ npm i
$ npm run setup
$ npm run build # && npm run build.angular
$ cd demo-ng # or demo-vue or demo-svelte
$ ns run ios|android
```


[](#demos-and-development)

## Demos and Development


### Setup

To run the demos, you must clone this repo **recursively**.

```
git clone https://github.com/@nativescript-community/ui-checkbox.git --recursive
```

**Install Dependencies:**
```bash
npm i # or 'yarn install' or 'pnpm install'
```

**Interactive Menu:**

To start the interactive menu, run `npm start` (or `yarn start` or `pnpm start`). This will list all of the commonly used scripts.

### Build

```bash
npm run build

npm run build.angular # or for Angular
```

### Demos

```bash
npm run demo.[ng|react|svelte|vue].[ios|android]

npm run demo.svelte.ios # Example
```

[](#questions)

## Questions

If you have any questions/issues/comments please feel free to create an issue or start a conversation in the [NativeScript Community Discord](https://nativescript.org/discord).
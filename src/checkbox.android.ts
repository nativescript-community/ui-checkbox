import { Application, booleanConverter, Color, CssProperty, Device, fontSizeProperty, Property, Style, View } from '@nativescript/core';
import { BoxType } from './common';

export const checkedProperty = new Property<CheckBox, boolean>({
	name: 'checked',
	defaultValue: false,
	valueConverter: booleanConverter,
	valueChanged: onCheckedPropertyChanged,
});

export const textProperty = new Property<CheckBox, string>({
	name: 'text',
	defaultValue: '',
	valueChanged: onTextPropertyChanged,
});

export const fillColorProperty = new CssProperty<Style, string>({
	name: 'fillColor',
	cssName: 'fill-color',
	valueConverter: (v) => {
		return String(v);
	},
});

export const tintColorProperty = new CssProperty<Style, string>({
	name: 'tintColor',
	cssName: 'tint-color',
	defaultValue: '#0075ff',
	valueConverter: (v) => {
		return String(v);
	},
});

export class CheckBox extends View {
	checked: boolean;
	nativeViewProtected: androidx.appcompat.widget.AppCompatCheckBox |  androidx.appcompat.widget.AppCompatCheckBox; 
	private _boxType: string;
	private _checkStyle: string;
	private _checkPadding: string;
	private _checkPaddingLeft: string;
	private _checkPaddingTop: string;
	private _checkPaddingRight: string;
	private _checkPaddingBottom: string;

	constructor() {
		super();
	}


	set boxType(value: string) {
		this._boxType = value;
	}

	get boxType() {
		return this._boxType;
	}

	get checkStyle() {
		return this._checkStyle;
	}

	set checkStyle(style) {
		this._checkStyle = style;
	}

	set checkPadding(padding) {
		this._checkPadding = padding;
	}

	get checkPadding() {
		return this._checkPadding;
	}

	set checkPaddingLeft(padding) {
		this._checkPaddingLeft = padding;
	}

	get checkPaddingLeft() {
		return this._checkPaddingLeft;
	}

	set checkPaddingTop(padding) {
		this._checkPaddingTop = padding;
	}

	get checkPaddingTop() {
		return this._checkPaddingTop;
	}

	set checkPaddingRight(padding) {
		this._checkPaddingRight = padding;
	}

	get checkPaddingRight() {
		return this._checkPaddingRight;
	}

	set checkPaddingBottom(padding) {
		this._checkPaddingBottom = padding;
	}

	get checkPaddingBottom() {
		return this._checkPaddingBottom;
	}
	[checkedProperty.getDefault](): boolean {
		return false;
	}
	[checkedProperty.setNative](value: boolean) {
		this.nativeViewProtected.setChecked(Boolean(value));
	}
	[textProperty.getDefault](): string {
		return '';
	}
	[textProperty.setNative](value: string) {
		this.nativeViewProtected.setText(java.lang.String.valueOf(value));
	}
	[fontSizeProperty.getDefault]() {
		return { nativeSize: this.nativeViewProtected.getTextSize() };
	}
	[fontSizeProperty.setNative](value) {
		if (typeof value === 'number') {
			this.nativeViewProtected.setTextSize(value);
		} else {
			this.nativeViewProtected.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, value.nativeSize);
		}
	}

	get fontSize(): number {
		return (<any>this.style).fontSizeProperty;
	}
	set fontSize(size: number) {
		(this.style as any).fontSize = size;
	}

	get fillColor(): string {
		return (<any>this.style).fillColor;
	}
	set fillColor(color: string) {
		(this.style as any).fillColor = color;
		if (this.nativeViewProtected && Device.sdkVersion >= '21') {
			(this.nativeViewProtected).setSupportButtonTintList(android.content.res.ColorStateList.valueOf(new Color(color).android));
		}
	}

	// there is no difference between tint and fill on the android widget
	get tintColor(): string {
		return (this.style as any).fillColor;
	}

	set tintColor(color: string) {
		(this.style as any).fillColor = color;
	}

	createNativeView() {
    let view: androidx.appcompat.widget.AppCompatRadioButton | androidx.appcompat.widget.AppCompatCheckBox;
    if (BoxType[this.boxType] === BoxType.circle)
    {
      view = new androidx.appcompat.widget.AppCompatRadioButton(this._context, null);
    } else {
      view = new androidx.appcompat.widget.AppCompatCheckBox(this._context, null);
    }	

		if (this.checkPaddingLeft) {
			view.setPadding(parseInt(this.checkPaddingLeft), view.getPaddingTop(), view.getPaddingRight(), view.getPaddingBottom());
		}

		if (this.checkPaddingTop) {
			view.setPadding(view.getPaddingLeft(), parseInt(this.checkPaddingTop), view.getPaddingRight(), view.getPaddingBottom());
		}

		if (this.checkPaddingRight) {
			view.setPadding(view.getPaddingLeft(), view.getPaddingTop(), parseInt(this.checkPaddingRight), view.getPaddingBottom());
		}

		if (this.checkPaddingBottom) {
			view.setPadding(view.getPaddingLeft(), view.getPaddingTop(), view.getPaddingRight(), parseInt(this.checkPaddingBottom));
		}

		if (this.checkPadding) {
			const pads = this.checkPadding.toString().split(',');
			switch (pads.length) {
				case 1:
					view.setPadding(parseInt(pads[0]), parseInt(pads[0]), parseInt(pads[0]), parseInt(pads[0]));
					break;
				case 2:
					view.setPadding(parseInt(pads[0]), parseInt(pads[1]), parseInt(pads[0]), parseInt(pads[1]));
					break;
				case 3:
					view.setPadding(parseInt(pads[0]), parseInt(pads[1]), parseInt(pads[2]), parseInt(pads[1]));
					break;
				case 4:
					view.setPadding(parseInt(pads[0]), parseInt(pads[1]), parseInt(pads[2]), parseInt(pads[3]));
					break;
			}
		}

		if (this.style.color) {
			view.setTextColor(this.style.color.android);
		}

		if (!this.style.fontSize) {
			this.style.fontSize = 14;
		}

		view.setTextSize(this.style.fontSize);

		const typeface = this.style.fontInternal?.getAndroidTypeface();
		if (typeface) {
			view.setTypeface(typeface);
		}

		if (this._checkStyle) {
			const drawable = Application.android.context.getResources().getIdentifier(this._checkStyle, 'drawable', Application.android.context.getPackageName());
			view.setButtonDrawable(drawable);
		}

		if (view) {
			if (this.fillColor) {
				view.setSupportButtonTintList(android.content.res.ColorStateList.valueOf(new Color(this.fillColor).android));
			}
		}

		return view;
	}

	initNativeView() {
		const that = new WeakRef(this);
		this.nativeViewProtected.setOnCheckedChangeListener(
			new android.widget.CompoundButton.OnCheckedChangeListener({
				onCheckedChanged: (sender, isChecked) => {
					if (that.get()) {
						checkedProperty.nativeValueChange(that.get(), isChecked);
					}
				},
			})
		);
	}

	disposeNativeView() {
		this.nativeViewProtected.setOnCheckedChangeListener(null);
	}

	toggle(): void {
		this.nativeViewProtected.toggle();
	}

	_onCheckedPropertyChanged(checkbox: CheckBox, oldValue, newValue) {
		if (!this.nativeViewProtected) {
			return;
		}
		checkedProperty.nativeValueChange(this, newValue);
	}
	_onTextPropertyChanged(checkbox: CheckBox, oldValue, newValue) {
		if (!this.nativeViewProtected) {
			return;
		}
		textProperty.nativeValueChange(this, newValue);
	}
}

function onCheckedPropertyChanged(checkbox: CheckBox, oldValue, newValue) {
	checkbox._onCheckedPropertyChanged(checkbox, oldValue, newValue);
}
function onTextPropertyChanged(checkbox: CheckBox, oldValue, newValue) {
	checkbox._onTextPropertyChanged(checkbox, oldValue, newValue);
}

checkedProperty.register(CheckBox);
textProperty.register(CheckBox);
fillColorProperty.register(Style);
tintColorProperty.register(Style);
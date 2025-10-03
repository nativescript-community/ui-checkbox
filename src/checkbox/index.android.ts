import { Color } from '@nativescript/core';
import { BoxType, CheckBoxBase, checkedProperty, fillColorProperty, tintColorProperty } from './common';

export class CheckBox extends CheckBoxBase {
    nativeViewProtected: androidx.appcompat.widget.AppCompatCheckBox;
    checkStyle: string;
    ignoreChange = false;

    [checkedProperty.setNative](value: boolean) {
        this.ignoreChange = true;
        this.nativeViewProtected.setChecked(value);
        this.ignoreChange = false;
    }

    [fillColorProperty.setNative](value) {
        const color = !value || value instanceof Color ? value : new Color(value);
        this.nativeViewProtected.setButtonTintList(color ? android.content.res.ColorStateList.valueOf(color.android) : null);
    }
    [tintColorProperty.setNative](value) {
        this[fillColorProperty.setNative](value);
    }

    createNativeView() {
        let view: androidx.appcompat.widget.AppCompatRadioButton | androidx.appcompat.widget.AppCompatCheckBox;
        if (this.boxType === BoxType.circle) {
            view = new androidx.appcompat.widget.AppCompatRadioButton(this._context);
        } else {
            view = new androidx.appcompat.widget.AppCompatCheckBox(this._context);
        }

        if (this.checkStyle) {
            const drawable = this._context.getResources().getIdentifier(this.checkStyle, 'drawable', this._context.getPackageName());
            view.setButtonDrawable(drawable);
        }

        return view;
    }
    onCheckedChangeListener: android.widget.CompoundButton.OnCheckedChangeListener;
    initNativeView() {
        super.initNativeView();
        this.onCheckedChangeListener = new android.widget.CompoundButton.OnCheckedChangeListener({
            onCheckedChanged: (sender, isChecked) => {
                if (this.ignoreChange && this.isLoaded) {
                    checkedProperty.nativeValueChange(this, isChecked);
                }
            }
        });
        this.nativeViewProtected.setOnCheckedChangeListener(this.onCheckedChangeListener);
    }
    onLoaded() {
        super.onLoaded();
        this.nativeViewProtected?.setOnCheckedChangeListener(this.onCheckedChangeListener);
    }
    onUnloaded(): void {
        super.onUnloaded();
        this.nativeViewProtected?.setOnCheckedChangeListener(null);
    }

    disposeNativeView() {
        super.disposeNativeView();
        this.onCheckedChangeListener = null;
        this.nativeViewProtected.setOnCheckedChangeListener(null);
    }

    toggle(): void {
        this.nativeViewProtected.toggle();
    }
}

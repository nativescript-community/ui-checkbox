import { Color } from '@nativescript/core';
import { BoxType, CheckBoxBase, checkedProperty, fillColorProperty, tintColorProperty } from './common';

export class CheckBox extends CheckBoxBase {
    nativeViewProtected: androidx.appcompat.widget.AppCompatCheckBox;
    checkStyle: string;
    // checkPadding: string;
    // checkPaddingLeft: string;
    // checkPaddingTop: string;
    // checkPaddingRight: string;
    // checkPaddingBottom: string;
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

        // if (this.checkPaddingLeft) {
        //     view.setPadding(parseInt(this.checkPaddingLeft, 10), view.getPaddingTop(), view.getPaddingRight(), view.getPaddingBottom());
        // }

        // if (this.checkPaddingTop) {
        //     view.setPadding(view.getPaddingLeft(), parseInt(this.checkPaddingTop, 10), view.getPaddingRight(), view.getPaddingBottom());
        // }

        // if (this.checkPaddingRight) {
        //     view.setPadding(view.getPaddingLeft(), view.getPaddingTop(), parseInt(this.checkPaddingRight, 10), view.getPaddingBottom());
        // }

        // if (this.checkPaddingBottom) {
        //     view.setPadding(view.getPaddingLeft(), view.getPaddingTop(), view.getPaddingRight(), parseInt(this.checkPaddingBottom, 10));
        // }

        // if (this.checkPadding) {
        //     const pads = this.checkPadding.toString().split(',');
        //     switch (pads.length) {
        //         case 1:
        //             view.setPadding(parseInt(pads[0], 10), parseInt(pads[0], 10), parseInt(pads[0], 10), parseInt(pads[0], 10));
        //             break;
        //         case 2:
        //             view.setPadding(parseInt(pads[0], 10), parseInt(pads[1], 10), parseInt(pads[0], 10), parseInt(pads[1], 10));
        //             break;
        //         case 3:
        //             view.setPadding(parseInt(pads[0], 10), parseInt(pads[1], 10), parseInt(pads[2], 10), parseInt(pads[1], 10));
        //             break;
        //         case 4:
        //             view.setPadding(parseInt(pads[0], 10), parseInt(pads[1], 10), parseInt(pads[2], 10), parseInt(pads[3], 10));
        //             break;
        //     }
        // }
        if (this.checkStyle) {
            const drawable = this._context.getResources().getIdentifier(this.checkStyle, 'drawable', this._context.getPackageName());
            view.setButtonDrawable(drawable);
        }

        // if (view) {
        // if (this.fillColor) {
        //     view.setSupportButtonTintList(android.content.res.ColorStateList.valueOf(new Color(this.fillColor).android));
        // }
        // }
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

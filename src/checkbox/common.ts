import { CSSType, Color, Property, Style, View, booleanConverter } from '@nativescript/core';
import { CheckBoxInterface } from '.';
export enum BoxType {
    circle = 'circle',
    square = 'square'
}

export const tintColorProperty = new Property<CheckBoxBase, string>({
    name: 'tintColor',
    valueConverter: (v) => String(v)
});

export const fillColorProperty = new Property<CheckBoxBase, string>({
    name: 'fillColor',
    valueConverter: (v) => String(v)
});

export const checkedProperty = new Property<CheckBoxBase, boolean>({
    name: 'checked',
    defaultValue: false,
    valueConverter: booleanConverter
    // valueChanged: onCheckedPropertyChanged
});

@CSSType('CheckBox')
export abstract class CheckBoxBase extends View implements CheckBoxInterface {
    checked: boolean;
    boxType: any;
    fillColor: string | Color;
    tintColor: string | Color;

    abstract toggle(): void;
    _onCheckedPropertyChanged(checkbox: CheckBoxBase, oldValue, newValue) {
        if (!this.nativeViewProtected) {
            return;
        }
        checkedProperty.nativeValueChange(this, newValue);
    }
}
checkedProperty.register(CheckBoxBase);
fillColorProperty.register(CheckBoxBase);
tintColorProperty.register(CheckBoxBase);

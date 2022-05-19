import { Button, Color, CssProperty, Property, Style, booleanConverter } from '@nativescript/core';
import { CheckBoxInterface } from '.';
export enum BoxType {
    circle = 'circle',
    square = 'square'
}

export const cssProperty = (target: Object, key: string | symbol) => {
    Object.defineProperty(target, key, {
        get() {
            return this.style[key];
        },
        set(newVal) {
            this.style[key] = newVal;
        },
        enumerable: true,
        configurable: true
    });
};

export const tintColorProperty = new CssProperty<Style, string>({
    name: 'tintColor',
    cssName: 'tint-color',
    valueConverter: (v) => String(v)
});

export const fillColorProperty = new CssProperty<Style, string>({
    name: 'fillColor',
    cssName: 'fill-color',
    valueConverter: (v) => String(v)
});

export const checkedProperty = new Property<CheckBoxBase, boolean>({
    name: 'checked',
    defaultValue: false,
    valueConverter: booleanConverter
    // valueChanged: onCheckedPropertyChanged
});

export abstract class CheckBoxBase extends Button implements CheckBoxInterface {
    checked: boolean;
    boxType: any;
    @cssProperty fillColor: string | Color;
    @cssProperty tintColor: string | Color;

    abstract toggle(): void;
    _onCheckedPropertyChanged(checkbox: CheckBoxBase, oldValue, newValue) {
        if (!this.nativeViewProtected) {
            return;
        }
        checkedProperty.nativeValueChange(this, newValue);
    }
}
checkedProperty.register(CheckBoxBase);
fillColorProperty.register(Style);
tintColorProperty.register(Style);

import { View } from '@nativescript/core';

/**
 * Represents a CheckBox component.
 */
export class CheckBox extends View {
    /**
     * Gets the native [android widget](https://developer.android.com/reference/android/widget/CheckBox.html) that represents the user interface for this component. Valid only when running on Android OS.
     */
    android: any /* android.widget.CheckBox */;

    /**
     * Gets the ios Label with the checkbox as a subview
     */
    ios: any /* Label */;

    /**
     * Gets or sets if a switch is checked or not.
     */
    checked: boolean;

    fillColor: Color;
    tintColor: Color;

    /**
     * iOS only
     */
    onCheckColor: Color;

    /**
     * iOS only
     */
    onTintColor: Color;

    /**
     * iOS only
     */
    onFillColor: Color;

    /**
     * iOS only
     */
    boxType: number;

    /**
     * iOS only
     */
    lineWidth: number;

    /**
     * iOS only
     */
    onAnimationType: number;

    /**
     * iOS only
     */
    offAnimationType: number;

    /**
     * iOS only
     */
    animationDuration: number;

    /**
     * iOS only
     */
    hideBox: boolean;

    /**
     * Change the checked state of the view to the inverse of its current state.
     */
    toggle(): void;
}

export interface CheckBoxInterface {
    text?: string;
    checked: boolean;
    toggle(): void;
}

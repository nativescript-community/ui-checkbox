import { Button, Color, CssProperty, Property, Style, booleanConverter } from '@nativescript/core';
import { BoxType, CheckBoxBase, checkedProperty, cssProperty, fillColorProperty, tintColorProperty } from './common';
import { CheckBoxInterface } from '.';

const checkBoxBackgroundColorProperty = new CssProperty<Style, string>({
    name: 'checkBoxBackgroundColor',
    cssName: 'checkbox-background-color',
    valueConverter: (v) => String(v)
});

const onCheckColorProperty = new CssProperty<Style, string>({
    name: 'onCheckColor',
    cssName: 'on-check-color',
    defaultValue: '#ffffff',
    valueConverter: (v) => String(v)
});

const onTintColorProperty = new CssProperty<Style, string>({
    name: 'onTintColor',
    cssName: 'on-tint-color',
    valueConverter: (v) => String(v)
});

const onFillColorProperty = new CssProperty<Style, string>({
    name: 'onFillColor',
    cssName: 'on-fill-color',
    valueConverter: (v) => String(v)
});

const boxTypeProperty = new Property<CheckBox, BEMBoxType>({
    name: 'boxType',
    valueConverter: (v) => (BoxType[v] === BoxType.circle ? BEMBoxType.Circle : BEMBoxType.Square)
});

function getIOSColor(value: string | Color) {
    return (!value || value instanceof Color ? (value as Color) : new Color(value))?.ios;
}

export class CheckBox extends CheckBoxBase {
    boxType: BEMBoxType;
    @cssProperty onCheckColor: string | Color;
    @cssProperty checkBoxBackgroundColor: string | Color;
    @cssProperty onTintColor: string | Color;
    @cssProperty onFillColor: string | Color;

    _iosCheckbox: BEMCheckBox;
    private _delegate: BEMCheckBoxDelegateImpl;
    private _lineWidth: number = 1;
    private _hideBox: boolean;
    private _tint: string;
    private _animationDuration: number;
    private _onAnimationType: number;
    private _offAnimationType: number;

    createNativeView() {
        const view = super.createNativeView() as UIButton;
        this._iosCheckbox = BEMCheckBox.alloc().initWithFrame(CGRectMake(0, 0, 80, 80));
        view.addSubview(this._iosCheckbox);
        return view;
    }

    [fillColorProperty.setNative](value: string | Color) {
        this._iosCheckbox.onFillColor = getIOSColor(value);
    }
    [onFillColorProperty.setNative](value: string | Color) {
        this._iosCheckbox.onFillColor = getIOSColor(value);
    }
    [tintColorProperty.setNative](value: string | Color) {
        this._iosCheckbox.tintColor = getIOSColor(value);
    }
    [onTintColorProperty.setNative](value: string | Color) {
        this._iosCheckbox.onTintColor = getIOSColor(value);
    }
    [onCheckColorProperty.setNative](value: string | Color) {
        this._iosCheckbox.onCheckColor = getIOSColor(value);
    }
    [checkBoxBackgroundColorProperty.setNative](value: string | Color) {
        this._iosCheckbox.offFillColor = getIOSColor(value);
    }
    [boxTypeProperty.setNative](value: any) {
        if (this.nativeViewProtected) {
            this._iosCheckbox.boxType = value;
        }
    }

    [checkedProperty.setNative](value: boolean) {
        this._iosCheckbox.setOnAnimated(value, true);
    }

    set checkedAnimated(value: boolean) {
        this._iosCheckbox.setOnAnimated(value, true);
    }

    set lineWidth(value: number) {
        this._iosCheckbox.lineWidth = value;
        this._lineWidth = value;
    }

    set hideBox(value: boolean) {
        this._iosCheckbox.hideBox = value;
        this._hideBox = value;
    }

    set animationDuration(value: number) {
        this._iosCheckbox.animationDuration = value;
        this._animationDuration = value;
    }

    set onAnimationType(value: number) {
        if (this._iosCheckbox) {
            this._iosCheckbox.onAnimationType = this._getAnimationType(value);
        } else this._onAnimationType = value;
    }

    set offAnimationType(value: number) {
        this._iosCheckbox.offAnimationType = this._getAnimationType(value);
        this._offAnimationType = value;
    }

    get nativeiOSCheckBox() {
        return this._iosCheckbox;
    }

    reload(value: boolean) {
        this._iosCheckbox.reload();
    }
    tapTimeout;
    initNativeView() {
        // allow label click to change the textbox
        this.addEventListener('tap', (args) => {
            //ensure we dont get 2 events if using UITapGestureRecognizer
            this.tapTimeout = setTimeout(() => {
                this.tapTimeout = null;
                const checkbox = args.object as CheckBox;
                checkbox.checked = !checkbox.checked;
            }, 10);
        });

        this._onAnimationType = 2;
        this._offAnimationType = 2;

        this._delegate = BEMCheckBoxDelegateImpl.initWithOwner(new WeakRef(this));
        let fontSize;

        if (!this.style.fontSize) {
            fontSize = 15;
        } else {
            fontSize = this.style.fontSize;
        }

        this._iosCheckbox.delegate = this._delegate;
        // positioning
        this._iosCheckbox.frame = CGRectMake(0, 0, fontSize, fontSize);
        this._iosCheckbox.center = CGPointMake(this._iosCheckbox.center.x, fontSize / 2 + 3);
        this.style.paddingLeft = fontSize + (fontSize > 20 ? 10 : 5);
        this.style.textAlignment = 'left';

        // if (this._onCheckColor) {
        //     this._iosCheckbox.onCheckColor = new Color(this._onCheckColor).ios;
        // }

        // if (this._onFillColor) {
        //     this._iosCheckbox.onFillColor = new Color(this._onFillColor).ios;
        // }

        // if (this._onTintColor) {
        //     this._iosCheckbox.onTintColor = new Color(this._onTintColor).ios;
        // }

        // if (this._fillColor) {
        //     this._iosCheckbox.onFillColor = new Color(this._fillColor).ios;
        // }

        // if (this._tintColor) {
        //     this._iosCheckbox.tintColor = new Color(this._tintColor).ios;
        // }

        if (typeof this._lineWidth !== 'undefined') {
            this.lineWidth = this._lineWidth;
        }
        if (typeof this._hideBox !== 'undefined') {
            this.hideBox = this._hideBox;
        }

        this.boxType = this.boxType === 0 ? BEMBoxType.Circle : BEMBoxType.Square;

        if (typeof this._animationDuration !== 'undefined') {
            this.animationDuration = this._animationDuration;
        }
        if (typeof this._onAnimationType !== 'undefined') {
            this.onAnimationType = this._onAnimationType;
        }
        if (typeof this._offAnimationType !== 'undefined') {
            this.offAnimationType = this._offAnimationType;
        }
    }

    disposeNativeView() {
        this._iosCheckbox.delegate = null;
        this._iosCheckbox = null;
        this.removeEventListener('tap');
    }

    toggle() {
        this.checked = !this.checked;
    }

    private _getAnimationType(value: number) {
        switch (value) {
            case 1:
                return BEMAnimationType.Stroke;
            case 2:
                return BEMAnimationType.Fill;
            case 3:
                return BEMAnimationType.Bounce;
            case 4:
                return BEMAnimationType.Flat;
            case 5:
                return BEMAnimationType.Stroke;
            case 6:
                return BEMAnimationType.Fade;
            default:
                return BEMAnimationType.Stroke;
        }
    }

    // _onCheckedPropertyChanged(checkbox: CheckBox, oldValue, newValue) {
    //     if (!this._iosCheckbox) {
    //         return;
    //     }
    //     checkedProperty.nativeValueChange(this, newValue);
    // }
}

@NativeClass()
class BEMCheckBoxDelegateImpl extends NSObject implements BEMCheckBoxDelegate {
    static ObjCProtocols = [BEMCheckBoxDelegate];

    private _owner: WeakRef<CheckBox>;

    /* static ObjCExposedMethods = {
     "didTapCheckBox": { returns: interop.types.void, params: [NSObject] }
     };*/

    static initWithOwner(owner: WeakRef<CheckBox>): BEMCheckBoxDelegateImpl {
        const delegate = BEMCheckBoxDelegateImpl.new() as BEMCheckBoxDelegateImpl;
        delegate._owner = owner;
        return delegate;
    }

    animationDidStopForCheckBox(checkBox: BEMCheckBox): void {
        // TODO: Maybe trigger event later?
    }

    didTapCheckBox(checkBox: BEMCheckBox): void {
        const owner = this._owner.get();
        if (owner) {
            if (owner.tapTimeout) {
                clearTimeout(owner.tapTimeout);
                owner.tapTimeout = null;
            }
            checkedProperty.nativeValueChange(owner, checkBox.on);
        }
    }
}

function onCheckedPropertyChanged(checkbox: CheckBox, oldValue, newValue) {
    checkbox._onCheckedPropertyChanged(checkbox, oldValue, newValue);
}

boxTypeProperty.register(CheckBox);
onTintColorProperty.register(Style);
onCheckColorProperty.register(Style);
checkBoxBackgroundColorProperty.register(Style);

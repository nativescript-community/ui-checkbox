import { Color, Property, booleanConverter } from '@nativescript/core';
import { BoxType, CheckBoxBase, checkedProperty, fillColorProperty, tintColorProperty } from './common';

const checkBoxBackgroundColorProperty = new Property<CheckBox, string>({
    name: 'checkBoxBackgroundColor',
    valueConverter: (v) => String(v)
});

const onCheckColorProperty = new Property<CheckBox, string>({
    name: 'onCheckColor',
    defaultValue: '#ffffff',
    valueConverter: (v) => String(v)
});

const onTintColorProperty = new Property<CheckBox, string>({
    name: 'onTintColor',
    valueConverter: (v) => String(v)
});

const onFillColorProperty = new Property<CheckBox, string>({
    name: 'onFillColor',
    valueConverter: (v) => String(v)
});

const boxTypeProperty = new Property<CheckBox, BEMBoxType>({
    name: 'boxType',
    valueConverter: (v) => (BoxType[v] === BoxType.circle ? BEMBoxType.Circle : BEMBoxType.Square)
});

const lineWidthProperty = new Property<CheckBox, number>({
    name: 'lineWidth',
    valueConverter: parseFloat
});
const onAnimationTypeProperty = new Property<CheckBox, number>({
    name: 'onAnimationType',
    defaultValue: 2,
    valueConverter: (v) => parseFloat(v)
});
const offAnimationTypeProperty = new Property<CheckBox, number>({
    name: 'offAnimationType',
    defaultValue: 2,
    valueConverter: (v) => parseFloat(v)
});
const animationDurationProperty = new Property<CheckBox, number>({
    name: 'animationDuration',
    valueConverter: parseFloat
});
const hideBoxProperty = new Property<CheckBox, boolean>({
    name: 'hideBox',
    valueConverter: booleanConverter
});

function getIOSColor(value: string | Color) {
    return (!value || value instanceof Color ? (value as Color) : new Color(value))?.ios;
}

function _getAnimationType(value: number) {
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

export class CheckBox extends CheckBoxBase {
    boxType: BEMBoxType;
    onCheckColor: Color;
    checkBoxBackgroundColor: Color;
    onTintColor: Color;
    onFillColor: Color;

    nativeViewProtected: BEMCheckBox;
    private _delegate: BEMCheckBoxDelegateImpl;

    createNativeView() {
        this.style['css:width'] = 25;
        this.style['css:height'] = 25;
        const view = BEMCheckBox.alloc().initWithFrame(CGRectMake(0, 0, 25, 25));
        view.onAnimationType = BEMAnimationType.Fill;
        view.offAnimationType = BEMAnimationType.Fill;
        return view;
    }

    [fillColorProperty.setNative](value: string | Color) {
        if (this.nativeViewProtected) {
            this.nativeViewProtected.onFillColor = getIOSColor(value);
        }
    }
    [onFillColorProperty.setNative](value: string | Color) {
        if (this.nativeViewProtected) {
            this.nativeViewProtected.onFillColor = getIOSColor(value);
        }
    }
    [tintColorProperty.setNative](value: string | Color) {
        if (this.nativeViewProtected) {
            this.nativeViewProtected.tintColor = getIOSColor(value);
        }
    }
    [onTintColorProperty.setNative](value: string | Color) {
        if (this.nativeViewProtected) {
            this.nativeViewProtected.onTintColor = getIOSColor(value);
        }
    }
    [onCheckColorProperty.setNative](value: string | Color) {
        if (this.nativeViewProtected) {
            this.nativeViewProtected.onCheckColor = getIOSColor(value);
        }
    }
    [checkBoxBackgroundColorProperty.setNative](value: string | Color) {
        if (this.nativeViewProtected) {
            this.nativeViewProtected.offFillColor = getIOSColor(value);
        }
    }
    [boxTypeProperty.setNative](value: any) {
        if (this.nativeViewProtected) {
            this.nativeViewProtected.boxType = value === 0 ? BEMBoxType.Circle : BEMBoxType.Square;
        }
    }

    [checkedProperty.setNative](value: boolean) {
        if (this.nativeViewProtected) {
            this.nativeViewProtected.setOnAnimated(value, true);
        }
    }

    [lineWidthProperty.setNative](value) {
        if (this.nativeViewProtected) {
            this.nativeViewProtected.lineWidth = value;
        }
    }
    [hideBoxProperty.setNative](value) {
        if (this.nativeViewProtected) {
            this.nativeViewProtected.hideBox = value;
        }
    }
    [animationDurationProperty.setNative](value) {
        if (this.nativeViewProtected) {
            this.nativeViewProtected.animationDuration = value;
        }
    }

    [onAnimationTypeProperty.setNative](value) {
        if (this.nativeViewProtected) {
            this.nativeViewProtected.onAnimationType = _getAnimationType(value);
        }
    }

    [offAnimationTypeProperty.setNative](value) {
        if (this.nativeViewProtected) {
            this.nativeViewProtected.offAnimationType = _getAnimationType(value);
        }
    }
    // [onAnimationTypeProperty.defaultValue](value) {
    //     return 2;
    // }

    // [offAnimationTypeProperty.defaultValue](value) {
    //     return 2;
    // }

    reload() {
        this.nativeViewProtected.reload();
    }
    initNativeView() {
        super.initNativeView();
        this._delegate = BEMCheckBoxDelegateImpl.initWithOwner(new WeakRef(this));

        this.nativeViewProtected.delegate = this._delegate;
    }

    disposeNativeView() {
        super.disposeNativeView();
        this.nativeViewProtected.delegate = null;
    }

    toggle() {
        this.checked = !this.checked;
    }
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
            checkedProperty.nativeValueChange(owner, checkBox.on);
        }
    }
}

boxTypeProperty.register(CheckBox);
onTintColorProperty.register(CheckBox);
onCheckColorProperty.register(CheckBox);
checkBoxBackgroundColorProperty.register(CheckBox);
lineWidthProperty.register(CheckBox);
hideBoxProperty.register(CheckBox);
onAnimationTypeProperty.register(CheckBox);
offAnimationTypeProperty.register(CheckBox);
animationDurationProperty.register(CheckBox);

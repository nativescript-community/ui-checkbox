import { CheckBox } from '..';
let installed = false;
export default {
    install(Vue) {
        if (!installed) {
            installed = true;
            Vue.registerElement('CheckBox', () => CheckBox, {
                model: {
                    prop: 'checked',
                    event: 'checkedChange'
                }
            });
        }
    }
};

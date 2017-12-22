import {
    defineWidget,
    log,
    runCallback,
} from 'widget-base-helpers';
import template from "./OfflineOpenFormButtonES6.template.html";


export default defineWidget('OfflineOpenFormButtonES6', template, {

    _contextObj: null,

    constructor() {
        this.log = log.bind(this);
        this.runCallback = runCallback.bind(this);
    },

    postCreate() {
        log.call(this, 'postCreate', this._WIDGET_VERSION);
        console.log(this.testNode);
    },

    update(obj, callback) {
        this._contextObj = obj;
        console.log(this._contextObj);
        const button = this.domNode.parentElement.querySelector(".mx-name-" + this.targetButtonName);
        if (button) {
            this.connect(button, "click", () => {
                const ctx = new mendix.lib.MxContext();
                ctx.setTrackObject(this._contextObj);
                mx.ui.openForm(this.form, {
                    location: this.placeholder,
                    context: ctx,
                    callback: () => {
                        console.log("showing form " + this.form);
                    },
                });
            });
        } else {
            console.error(`Could not find the element with class: .mx-name-${this.targetButtonName}. ` +
                `Please ensure that it is a sibling of the widget and check your configuration.`);
        }

        if (callback && "function" === typeof callback) {
            callback();
        }
    },
});
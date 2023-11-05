"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.autobinddecorator = void 0;
function autobinddecorator(target, _2, descriptor) {
    var originalMethod = descriptor.value;
    var adjDescriptor = {
        configurable: true,
        get: function () {
            var boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
exports.autobinddecorator = autobinddecorator;
function validate(validateInput) {
    if (validateInput.required && String(validateInput.value).trim() === '') {
        return false;
    }
    if (validateInput.minLength != null && typeof validateInput.value === "string" && validateInput.value.length < validateInput.minLength) {
        return false;
    }
    if (validateInput.maxLength != null && typeof validateInput.value === "string" && validateInput.value.length > validateInput.maxLength) {
        return false;
    }
    if (validateInput.min != null && typeof validateInput.value === "number" && validateInput.value < validateInput.min) {
        return false;
    }
    if (validateInput.max != null && typeof validateInput.value === "number" && validateInput.value > validateInput.max) {
        return false;
    }
    return true;
}
exports.validate = validate;

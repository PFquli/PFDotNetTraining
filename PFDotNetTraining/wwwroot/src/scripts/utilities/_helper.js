"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ready = (fn) => {
    if (document.readyState !== 'loading') {
        fn();
    }
    else {
        document.addEventListener('DOMContentLoaded', fn);
    }
};
exports.default = ready;

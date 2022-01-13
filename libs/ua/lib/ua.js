var testUa = function (reg) { return new RegExp(reg.toLowerCase()).test(navigator.userAgent.toLowerCase()); };
export var getUserAgent = function () { return navigator.userAgent; };
export var isIOS = function () { return testUa('iP(hone|od|ad)'); };
export var isIPhone = function () { return testUa('iP(hone|od)'); };
export var isIPad = function () { return testUa('iPad'); };
export var isAndroid = function () { return testUa('Android'); };
//# sourceMappingURL=ua.js.map
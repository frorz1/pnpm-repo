const testUa = (reg: string) => new RegExp(reg.toLowerCase()).test(navigator.userAgent.toLowerCase())

export const getUserAgent = () => navigator.userAgent

export const isIOS = () => testUa('iP(hone|od|ad)')

export const isIPhone = () => testUa('iP(hone|od)')

export const isIPad = () => testUa('iPad')

export const isAndroid = () => testUa('Android')
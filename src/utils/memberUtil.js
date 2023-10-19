
function isLogin() {
    if (null != window.sessionStorage.getItem('mbrLoginId') && "" != window.sessionStorage.getItem('mbrLoginId')) {
        return true;
    } else {
        return false;
    }
};

export { isLogin }

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var a = this.xml("GET", 'https://easy-mock.com/mock/5d4051f1a2727f0f8a090aad/example/getType', true)
        cc.log('打印')
        cc.log(a)
    },
    xml(type, url, l) {
        var xhr = new XMLHttpRequest()
        xhr.open(type, url, l);
        xhr.send();
        return xhr.responseText
    },

    // update (dt) {},
});

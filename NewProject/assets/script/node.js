
cc.Class({
    extends: cc.Component,

    properties: {
        lantianNode: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        gamec = this
    },

    start() {

    },
    random(lower, upper) {
        return Math.floor(Math.random() * (upper - lower)) + lower;
    },
    click() {
        var x = this.random(1, 100)
        var y = this.random(1, 100)
        this.lantianNode.setPosition(cc.v2(x, y))
    }
    // update (dt) {},
});

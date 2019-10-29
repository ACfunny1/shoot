cc.Class({
    extends: cc.Component,

    properties: {
        airHead: [cc.Node],
        airPlane: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        airPlaneAnimCtl = this
    },

    start() {

    },
    airHeadAnim() {
        var airHead1 = cc.repeatForever(
            cc.sequence(
                cc.scaleTo(0.5, 0.1),
                cc.callFunc(function () {
                    this.airHead[0].setScale(1)
                }, this)
            ))

        var airHead2 = cc.repeatForever(
            cc.sequence(
                cc.scaleTo(0.8, 0.1),
                cc.callFunc(function () {
                    this.airHead[1].setScale(1)
                }, this)
            ))
        var airHead3 = cc.repeatForever(
            cc.sequence(
                cc.scaleTo(1.1, 0.1),
                cc.callFunc(function () {
                    this.airHead[2].setScale(1)
                }, this)
            ))
        this.airHead[0].runAction(airHead1)
        this.airHead[1].runAction(airHead2)
        this.airHead[2].runAction(airHead3)
    },

    airPlaneAnim() {
        this.airPlane.setPosition(cc.v2(0, -939))
        var airPlaneAct = cc.sequence(
            cc.delayTime(0.1),
            cc.moveTo(0.6, cc.v2(0, -429))
        )
        this.airPlane.runAction(airPlaneAct)
    },
    log() {
        cc.log('插件可以使用')
    }
    // update (dt) {},
});

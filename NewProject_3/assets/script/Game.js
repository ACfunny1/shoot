cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //读取保存记录，应用到金币处
        local.getUserData()
        coinAnimCtl.topCoNum.string = local.getUserGold()

        logoAnimCtl.PreSet()
        airPlaneAnimCtl.airPlaneAnim()
        airPlaneAnimCtl.airHeadAnim()
        airPlaneAnimCtl.shootHeadAnim()
        airPlaneAnimCtl.shootHead.active = false

        touchEventCtl.setOpacity()
        touchEventCtl.touchStrat()
        touchEventCtl.touchMove()
        touchEventCtl.touchAway()

        resetLogoCtl.Hp.opacity = 0
    },


    // update (dt) {},
});
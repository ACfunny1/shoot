cc.Class({
    extends: cc.Component,

    properties: {
        logo: cc.Node,
        setting: cc.Node,
        coin: cc.Node,
        bottom: cc.Node,
        bg: cc.Node,
        level: cc.Node,
        shotTip: cc.Node,
        airPlane: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        resetLogoCtl = this
    },
    stopLogoAnim() {
        var logoNode = this.logo.getComponents('logoAnim')[0]
        this.reset(logoNode.fireBar)
        logoNode.fireBar.setScale(0, 0)
        this.reset(logoNode.bingDu1)
        this.reset(logoNode.bingDu2)
        this.reset(logoNode.BDcircle1)
        this.reset(logoNode.BDcircle2)
        this.reset(logoNode.shotTip)
        //var a = logoNode.bingDu1.getPosition()
        //var b = logoNode.bingDu2.getPosition()
        //cc.log('a:' + a + 'b:' + b)
        //a:(263.5,43.8)  b:(269.3,25.9)
        logoNode.bingDu1.setPosition(cc.v2(263.5, 43.8))
        logoNode.bingDu2.setPosition(cc.v2(269.3, 25.9))
        logoNode.bingDu1.setScale(0.1, 0.1)
        logoNode.bingDu2.setScale(0.1, 0.1)
    },
    startLogoAnim() {
        var logoNode = this.logo.getComponents('logoAnim')[0]
        logoNode.flicker()
    },
    outLogoAnim() {
        //点击节流
        if (gameScene == 1) return
        this.ComponentOutAnim()
        gameScene = 1
        //进入游戏，显示射击头
        airPlaneAnimCtl.shootHead.active = true
    },
    resetLogoAnim() {

        var logoNode = this.logo.getComponents('logoAnim')[0]
        this.logo.setPosition(cc.v2(-21.9, 451.3))
        this.setting.setPosition(cc.v2(-435, 402))
        this.coin.setPosition(cc.v2(368, -1))
        this.bottom.setPosition(cc.v2(0, -737))
        this.bg.setScale(cc.v2(1.2, 1.2))

        this.level.setPosition(cc.v2(-56, 67))
        this.level.setScale(cc.v2(1, 1))

        this.shotTip.active = true

        this.airPlane.setScale(cc.v2(1, 1))
        this.airPlane.setPosition(cc.v2(0, -429))

        touchEventCtl.setOpacity()
        //游戏场景变成0
        gameScene = 0
        //非游戏场景，不显示射击头
        airPlaneAnimCtl.shootHead.active = false
    },

    //
    ComponentOutAnim() {
        var logoNode = this.logo.getComponents('logoAnim')[0]
        //var a = this.logo.getPosition()
        //cc.log(a)
        //Vec2 { x: -21.9, y: 451.3 }

        var logoOutAct = cc.sequence(
            cc.delayTime(0.2),
            cc.moveBy(0.6, cc.v2(0, -40)).easing(cc.easeExponentialInOut()),
            cc.moveBy(0.2, cc.v2(0, 600)).easing(cc.easeExponentialInOut()),
        )
        var setOutAct = cc.sequence(
            cc.delayTime(0.8),
            cc.moveBy(0.6, cc.v2(-75, 0)).easing(cc.easeExponentialInOut()),
        )
        var coinOutAct = cc.sequence(
            cc.delayTime(0.8),
            cc.moveBy(0.6, cc.v2(155, 0)).easing(cc.easeExponentialInOut()),
        )
        var bottomOutAct = cc.sequence(
            cc.delayTime(0.8),
            cc.moveBy(0.6, cc.v2(0, -141)).easing(cc.easeExponentialInOut()),
        )
        var bgOutAct = cc.sequence(
            cc.delayTime(0.8),
            cc.scaleTo(0.6, 1)
        )
        var levelOutAct = cc.sequence(
            cc.delayTime(0.8),
            cc.spawn(
                cc.moveBy(0.6, cc.v2(0, 511)),
                cc.scaleTo(0.6, 0.5)
            )
        )
        var shotTipOutAct = cc.sequence(
            cc.delayTime(0.8),
            cc.callFunc(function () {
                this.shotTip.active = false
            }, this)
        )

        var airPlaneAct = cc.sequence(
            cc.delayTime(0),
            cc.scaleTo(0.8, 0.8)
        )

        this.logo.runAction(logoOutAct)
        this.setting.runAction(setOutAct)
        this.coin.runAction(coinOutAct)
        this.bottom.runAction(bottomOutAct)
        this.bg.runAction(bgOutAct)
        this.level.runAction(levelOutAct)
        this.shotTip.runAction(shotTipOutAct)
        this.airPlane.runAction(airPlaneAct)
    },

    //初始化（停止动画）
    reset(node) {
        node.stopAllActions()
        node.setScale(1, 1)
        node.opacity = 255
    },


});

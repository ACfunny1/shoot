cc.Class({
    extends: cc.Component,

    properties: {
        logo: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    },

    test(target, data) {
        var logoNode = this.logo.getComponents('logoAnim')[0]
        if (data === 'stopLogoAnim') {
            this.reset(logoNode.fireBar)
            logoNode.fireBar.setScale(0, 0)
            this.reset(logoNode.bingDu1)
            this.reset(logoNode.bingDu2)
            this.reset(logoNode.BDcircle1)
            this.reset(logoNode.BDcircle2)
            /*var a = logoNode.bingDu1.getPosition()
            var b = logoNode.bingDu2.getPosition()
            cc.log('a:' + a + 'b:' + b)
            a:(263.5,43.8)  b:(269.3,25.9)*/
            logoNode.bingDu1.setPosition(cc.v2(263.5, 43.8))
            logoNode.bingDu2.setPosition(cc.v2(269.3, 25.9))
            logoNode.bingDu1.setScale(0.1, 0.1)
            logoNode.bingDu2.setScale(0.1, 0.1)
        }
        if (data === 'startLogoAnim') {
            logoNode.flicker()
        }
        if (data === 'outLogoAnim') {
            /*var a = this.logo.getPosition()
            cc.log(a)
            Vec2 { x: -21.9, y: 451.3 }*/

            var act = cc.sequence(
                cc.delayTime(0.2),
                cc.moveBy(0.5, cc.v2(0, -20)),
                cc.moveBy(0.5, cc.v2(0, 500))
            )

            this.logo.runAction(act)
        }
    },

    //初始化（停止动画）
    reset(node) {
        node.stopAllActions()
        node.setScale(1, 1)
        node.opacity = 255
    },

    /*start() {

    },*/

});

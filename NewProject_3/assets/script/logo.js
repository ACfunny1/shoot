// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        fireFlicker: cc.Node,
        fireBar: cc.Node,
        bingDu1: cc.Node,
        bingDu2: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var flicker = cc.sequence(
            cc.fadeOut(0.5),
            cc.fadeIn(0.5),
            cc.fadeOut(0.5),
            cc.fadeIn(0.5),
            cc.callFunc(this.barAction,this),
            )

        this.fireFlicker.runAction(flicker)
    },
    
    start () {

    },

    barAction () {
        var bar = cc.sequence(
            cc.scaleTo(0.4,1,1),
            cc.delayTime(0.1),
            cc.callFunc(this.bingDuAct,this)
            )
        this.fireBar.runAction(bar)
    },

    bingDuAct () {
        //1.420,191   2.439,-23.8
        var act = cc.spawn(
            cc.moveTo(0.3,cc.v2(420,191)),
            cc.scaleTo(0.3,1,1)
        )
        var act2 = cc.spawn(
            cc.moveTo(0.3,cc.v2(439,-23.8)),
            cc.scaleTo(0.3,1,1)
        )
        this.bingDu1.runAction(act)
        this.bingDu2.runAction(act2)
    }
    // update (dt) {},
});

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
        BDuWeiba1: cc.Node,
        BDuWeiba2: cc.Node,
        BDcircle1: cc.Node,
        BDcircle2: cc.Node,
        XGT: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.XGT.active = false
        var flicker = cc.sequence(
            cc.fadeOut(0.5),
            cc.fadeIn(0.5),
            cc.fadeOut(0.5),
            cc.fadeIn(0.5),
            cc.callFunc(this.barAction, this),
        )

        this.fireFlicker.runAction(flicker)
        cc.log(123)
    },

    start() {
        // cc.log(this.init()) 
    },

    randomNum(lower, upper) {
        return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    },

    barAction() {
        var bar = cc.sequence(
            cc.scaleTo(0.4, 1, 1),
            cc.delayTime(0.1),
            cc.callFunc(this.bingDuAct, this),
            cc.callFunc(this.allFlicker(this.fireBar), this)
        )
        this.fireBar.runAction(bar)
    },

    bingDuAct() {
        //1.420,191   2.439,-23.8
        var act = cc.spawn(
            cc.moveTo(0.1, cc.v2(420, 191)),
            cc.scaleTo(0.2, 1, 1)
        )

        var act2 = cc.spawn(
            cc.moveTo(0.1, cc.v2(439, -23.8)),
            cc.scaleTo(0.2, 1, 1),
        )

        var acts = cc.sequence(
            act,
            cc.callFunc(this.BDweibaActive, this),
            cc.spawn(
                cc.callFunc(this.allFlicker(this.BDcircle1), this),
                cc.callFunc(this.BDshake(this.bingDu1, 420, 191), this)
            )

            //cc.callFunc(this.BDshake(this.bingDu1),this)
        )

        var act2s = cc.sequence(
            act2,
            cc.callFunc(this.BDweibaActive, this),
            cc.spawn(
                cc.callFunc(this.allFlicker(this.BDcircle2), this),
                cc.callFunc(this.BDshake(this.bingDu2, 439, -23.8), this)
            )
        )

        this.bingDu1.runAction(acts)
        this.bingDu2.runAction(act2s)
    },

    BDweibaActive() {
        this.BDuWeiba1.active = false,
            this.BDuWeiba2.active = false
    },

    allFlicker(target) {
        var allFlicker = cc.repeatForever(
            cc.sequence(
                cc.fadeOut(0.5),
                cc.fadeIn(0.5)
            )
        )

        target.runAction(allFlicker)
    },

    BDshake(target, x, y) {
        //x上限354，下限500 y上141，下260
        var cx
        var cy
        var a = target.position
        var moveAction = cc.moveBy(0.5, cx, cy);
        var shanke = cc.repeatForever(cc.sequence(
            cc.callFunc(function () {
                cx = this.randomNum(1, 60);
                cy = this.randomNum(1, 60);
                moveAction = cc.moveBy(0.5, cx, cy);
                target.runAction(moveAction)
            }, this),
            cc.moveTo(0.5, cc.v2(x, y))
        ))
        target.runAction(shanke)
    },


    /*update (dt) {
        cc.log(this.BDshake.cx)
    }*/
});

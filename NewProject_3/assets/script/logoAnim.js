cc.Class({
    extends: cc.Component,

    properties: {
        fireFlicker: cc.Node,//动画 闪烁的火焰
        fireBar: cc.Node,//动画 火焰进度条
        bingDu1: cc.Node,
        bingDu2: cc.Node,
        BDuWeiba1: cc.Node,
        BDuWeiba2: cc.Node,
        BDcircle1: cc.Node,
        BDcircle2: cc.Node,
        XGT: cc.Node//效果图
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.XGT.active = false
        this.flicker()
    },

    start() {

    },

    randomNum(lower, upper) {
        return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    },

    //闪烁火焰的动画
    flicker() {
        var flicker = cc.sequence(
            cc.fadeOut(0.5),
            cc.fadeIn(0.5),
            cc.fadeOut(0.5),
            cc.fadeIn(0.5),
            cc.callFunc(this.barAction, this),
        )
        this.fireFlicker.runAction(flicker)
    },

    barAction() {//火焰进度条
        var bar = cc.sequence(
            cc.scaleTo(0.4, 1, 1),
            cc.delayTime(0.1),
            cc.callFunc(this.bingDuAct, this),
            //cc.callFunc(this.allFlicker(this.fireBar), this)
        )
        this.fireBar.runAction(bar)
    },

    bingDuAct() {//病毒的动画
        //第一部分弹出动画
        var act = cc.spawn(
            cc.moveTo(0.1, cc.v2(420, 191)),
            cc.scaleTo(0.2, 1, 1)
        )
        var act2 = cc.spawn(
            cc.moveTo(0.1, cc.v2(439, -23.8)),
            cc.scaleTo(0.2, 1, 1),
        )
        //第二部分动画尾巴消失，闪烁晃动
        var acts = cc.sequence(
            act,
            cc.callFunc(this.BDweibaActive, this),
            cc.spawn(
                cc.callFunc(this.allFlicker(this.BDcircle1), this),
                cc.callFunc(this.BDshake(this.bingDu1, 420, 191), this)
            )
        )
        var act2s = cc.sequence(
            act2,
            cc.callFunc(this.BDweibaActive, this),
            cc.spawn(
                cc.callFunc(this.allFlicker(this.BDcircle2), this),
                cc.callFunc(this.BDshake(this.bingDu2, 439, -23.8), this),
                cc.callFunc(this.allFlicker(this.fireBar), this)//火焰进度条的闪烁
            ),
        )

        this.bingDu1.runAction(acts)
        this.bingDu2.runAction(act2s)
    },
    //动画病毒尾巴消失
    BDweibaActive() {
        this.BDuWeiba1.active = false,
            this.BDuWeiba2.active = false
    },
    //闪烁
    allFlicker(target) {
        var allFlicker = cc.repeatForever(
            cc.sequence(
                cc.fadeOut(0.5),
                cc.fadeIn(0.5)
            )
        )

        target.runAction(allFlicker)
    },
    //晃动
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

    ok() {
        cc.log('ok')
    }
    /*update (dt) {
        
    }*/
});

cc.Class({
    extends: cc.Component,

    properties: {
        blackBg: cc.Node,
        shoot: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        touchEventCtl = this
    },

    //触摸点击事件，触发移出
    touchStrat() {
        var _this = this
        this.blackBg.on(cc.Node.EventType.TOUCH_START, function (event) {
            resetLogoCtl.outLogoAnim()
            this.blackBg.runAction(cc.fadeOut(0.1))
            if (gameScene == 1) {
                this.shoot = setInterval(function () {
                    airPlaneBulletCtl.click()
                }, airPlaneBulletCtl.bulletShootSpeed)
            }
        }, this);
    },
    //触摸松开事件，触发黑色遮罩
    touchAway() {
        this.blackBg.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.blackBg.runAction(cc.fadeIn(0.5))
            gameScene = 2
            clearInterval(this.shoot)
        }, this);
    },

    //触摸移动事件,获取触摸点坐标
    touchMove() {
        this.blackBg.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            //获取到的坐标，是按照左下角0,0来计算的，而需要的坐标却是按中心点0,0计算的
            //不能直接拿来使用
            var pos = event.getLocation()
            var newX = pos.x - 500
            var newY = pos.y - 800
            airPlaneAnimCtl.airPlane.setPosition(cc.v2(newX, newY))

        }, this);
    },

    //设置透明度
    setOpacity() {
        this.blackBg.opacity = 0
    }
    // update (dt) {},
});

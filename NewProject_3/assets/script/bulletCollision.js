//子弹碰撞
cc.Class({
    extends: cc.Component,

    properties: {
        bullet: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //获取碰撞检测系统
        var manager = cc.director.getCollisionManager();
        //默认碰撞检测系统是禁用的，如果需要使用则需要以下方法开启碰撞检测系统
        manager.enabled = true;
        //默认碰撞检测系统的 debug 绘制是禁用的，如果需要使用则需要以下方法开启 debug 绘制：
        //manager.enabledDebugDraw = true;
    },

    //当碰撞产生的时候调用
    onCollisionEnter() {
        cc.log('打到墙壁')
        this.bullet.opacity = 0
    },

    //当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
    //onCollisionStay(){ }

    //当碰撞结束后调用
    //onCollisionExit(){}
});

cc.Class({
    extends: cc.Component,

    properties: {
        parent: cc.Node,
        bullet: cc.Prefab,
        bulletSpeed: 0,//子弹速度
        bulletDis: 0,//子弹每次移动的距离
        bulletShootSpeed: 0,//子弹发射的速度（创建预制体的速度，毫秒）
        lifeTime: 0,//xx毫秒后回收进对象池
        airPlane: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        airPlaneBulletCtl = this

        this.pool = new cc.NodePool()
        var count = 100//对象池中子弹数量
        for (var i = 0; i < count; i++) {
            var bullet = cc.instantiate(this.bullet)
            this.pool.put(bullet)
        }
    },

    //射一列子弹的创建方法
    createBulletNode(node, offsetX) {
        var _this = this
        var node = null
        if (this.pool.size() > 0) {
            node = this.pool.get()
            //cc.log(this.pool)
        } else {
            cc.log('池子里没有啦')
            return null
        }
        node.parent = this.parent
        var pos = this.airPlane.position
        //airPlane的坐标其实在下方的屏幕外（因为有个动画是从外面飞进来）
        node.position = cc.v2(pos.x + offsetX, pos.y + 600)

        var act = cc.repeatForever(
            cc.moveBy(this.bulletSpeed, cc.v2(0, this.bulletDis))
        )
        node.runAction(act)

        setTimeout(function () {
            node.stopAction(act)
            _this.pool.put(node)
            //node.opacity = 255
        }, this.lifeTime)
    },

    //bullteCount控制子弹列数，数字几就是几列
    clickShoot(bulletCount) {
        if (bulletCount == 1) {
            this.createBulletNode(this.bullet)
        }
        if (bulletCount == 3) {
            this.createBulletNode(this.bullet, -30)
            this.createBulletNode(this.bullet, 0)
            this.createBulletNode(this.bullet, +30)
        }

    },

    update(dt) {
    }

});

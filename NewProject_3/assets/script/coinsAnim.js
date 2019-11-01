cc.Class({
    extends: cc.Component,

    properties: {
        coinCount: 10,
        point: [],//结果
        coinNode: cc.Prefab,
        parent: cc.Node,
        cnode: cc.Node,
        topCoin: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.getPoint(400, 0, 0, this.coinCount)
        cc.log('元周节点')
        cc.log(this.point)
        this.pool = new cc.NodePool()

    },

    start() {

    },

    getPoint(r, ox, oy, count) {
        /*
    * 求圆周上等分点的坐标
    * ox,oy为圆心坐标
    * r为半径
    * count为等分个数
    */
        var radians = (Math.PI / 180) * Math.round(360 / count), //弧度
            i = 0;
        for (; i < count; i++) {
            var x = ox + r * Math.sin(radians * i),
                y = oy + r * Math.cos(radians * i);
            this.point.unshift({ x: x, y: y }); //为保持数据顺时针
        }
    },

    /*node:需要复制的Prefab节点
        x,y定义position
        t定义每个金币moveTo目标点的差距时间
    */

    createNode(node, x, y, t) {
        var node = null
        if (this.pool.size() > 0) {
            node = this.pool.get()
            //cc.log(this.pool)
        } else {
            cc.log('池子里没有啦')
            return null
        }
        node.parent = this.parent
        node.position = cc.v2(x, y)
        var moveAct = cc.sequence(
            cc.delayTime(0.15),
            cc.moveTo(0.5 + t, cc.v2(-758.6, 730.2)),
            cc.callFunc(function () {
                var act = cc.sequence(
                    cc.scaleTo(0.2, 1.5),
                    cc.scaleTo(0.2, 1)
                )
                this.topCoin.runAction(act)
            }, this),
            cc.callFunc(function () {
                //回收
                this.pool.put(this.parent.children[0])
            }, this)
        )
        node.runAction(moveAct)

    },

    clickAnim() {
        //左上角金币的坐标-758.6,730.2
        cc.log('对象池:')
        cc.log(this.pool)
        var t = 0
        var act = cc.sequence(
            cc.callFunc(function () {
                for (var i = 0; i < this.coinCount; i++) {
                    if (this.pool.size() <= 0) {
                        var jinbi = cc.instantiate(this.coinNode)
                        this.pool.put(jinbi)
                    }
                    this.createNode(jinbi, this.point[i].x + Math.floor(Math.random() * 200), this.point[i].y + Math.floor(Math.random() * 200), t)
                    t += 0.02
                }
            }, this),
            cc.callFunc(function () {

            }, this)
        )
        this.cnode.runAction(act)

    }
    // update (dt) {},
});

cc.Class({
    extends: cc.Component,

    properties: {
        coinCount: 10,
        point: [],//结果
        coinNode: cc.Prefab,
        parent: cc.Node,
        cnode: cc.Node,
        jinbi: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.getPoint(200, 0, 0, this.coinCount)
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

    createNode(node, x, y) {
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

    },

    clickAnim() {
        //左上角金币的坐标-758.6,730.2

        cc.log('对象池:')
        cc.log(this.pool)

        var act = cc.sequence(
            cc.callFunc(function () {
                for (var i = 0; i < this.coinCount; i++) {
                    this.jinbi = cc.instantiate(this.coinNode)
                    this.pool.put(this.jinbi)
                    this.createNode(this.jinbi, this.point[i].x, this.point[i].y)
                    /*cc.log('创建好了')
                    cc.log(this.pool)*/

                    //移动至左上角的动画
                    var moveAct = cc.sequence(
                        cc.moveTo(0.5, cc.v2(-758.6, 730.2)),
                        cc.callFunc(function () {
                            cc.log('回收入对象池')
                            //
                        }, this)
                    )

                    this.jinbi.runAction(moveAct)
                }
            }, this),
            cc.delayTime(0.2),
            //youwenti----------------------------------------------
            cc.callFunc(function () {
                for (var i = 0; i < this.coinCount; i++) {
                    this.pool.put(this.parent.children[0])
                }
            }, this)
        )
        this.cnode.runAction(act)
        cc.log('zuizhong')
        cc.log(this.pool)
    }
    // update (dt) {},
});

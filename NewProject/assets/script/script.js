cc.Class({
    extends: cc.Component,

    properties: {
        picNode: cc.Prefab,
        parentNode: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //初始化对象池，放入5个节点
        this.pool = new cc.NodePool()
        var count = 5
        for (var i = 0; i < count; i++) {
            let node = cc.instantiate(this.picNode)
            this.pool.put(node)
        }
        cc.log('对象池：')
        cc.log(this.pool)
    },

    createNode() {
        let node = null
        if (this.pool.size() > 0) {
            node = this.pool.get()
        } else {
            cc.log('池子里没有啦')
            return null
        }
        node.parent = this.parentNode
        gamec.click()
    },

    killNode() {
        this.pool.put(gamec.lantianNode)
        //cc.log(gamec.lantianNode)
    }

    // update (dt) {},
});

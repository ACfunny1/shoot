cc.Class({
    extends: cc.Component,

    properties: {
        LevelNode: [cc.Node],
        nodePos: [],
        nodeScale: [],
        nodeOpacity: [],
        LevelNum: [cc.Node],
        boss: [cc.Node]
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        logoAnimCtl = this
    },

    PreSet() {
        //最两边的两个关卡节点透明
        this.LevelNode[4].opacity = 0
        this.LevelNode[0].opacity = 0
        this.get()
        //把所有boss节点关闭
        for (var i = 0; i < this.boss.length; i++) {
            this.boss[i].active = false
            if (Number(this.LevelNum[i].getComponents('cc.Label')[0].string) <= 0) {
                this.LevelNode[i].opacity = 0
            }
        }
    },

    //获取每个关卡节点的position，scale，opacity
    get(node) {
        for (var i = 0; i < this.LevelNode.length; i++) {
            this.nodePos[i] = this.LevelNode[i].position
            this.nodeScale[i] = this.LevelNode[i].scale
            this.nodeOpacity[i] = this.LevelNode[i].opacity
        }
        cc.log(this.nodePos)
        cc.log(this.nodeScale)
        cc.log(this.nodeOpacity)
    },

    //点击升级控制关卡数字和boss图标显示
    numAndBoss() {
        for (var i = 0; i < this.LevelNum.length; i++) {
            this.LevelNum[i].getComponents('cc.Label')[0].string =
                Number(this.LevelNum[i].getComponents('cc.Label')[0].string) + 1

            if (Number(this.LevelNum[i].getComponents('cc.Label')[0].string) % 3 == 0) {
                this.boss[i].active = true
            } else if (Number(this.LevelNum[i].getComponents('cc.Label')[0].string) <= 0) {
                this.LevelNode[i].opacity = 0
            } else {
                this.boss[i].active = false
            }
        }
    },
    //点击升级触发的事件
    LevelUp() {
        var nodeAct1 = cc.sequence(
            cc.spawn(
                cc.moveBy(0.5, cc.v2(-100, 0)),
                cc.fadeOut(0.5),
            ),
            cc.fadeIn(0),
            cc.moveTo(0, this.nodePos[1]),
            cc.callFunc(this.numAndBoss, this),
        )

        var nodeAct2 = cc.sequence(
            cc.spawn(
                cc.moveBy(0.5, cc.v2(-165, 0)),
                cc.scaleTo(0.5, 0.6),
            ),
            cc.moveTo(0, this.nodePos[2]),
            cc.scaleTo(0, this.nodeScale[2])
        )

        var nodeAct3 = cc.sequence(
            cc.spawn(
                cc.moveBy(0.5, cc.v2(-165, 0)),
                cc.scaleTo(0.5, 1),
            ),
            cc.moveTo(0, this.nodePos[3]),
            cc.scaleTo(0, this.nodeScale[3])
        )

        var nodeAct4 = cc.sequence(
            cc.spawn(
                cc.moveBy(0.5, cc.v2(-100, 0)),
                cc.fadeIn(0.5),
            ),
            cc.fadeOut(0),
            cc.moveTo(0, this.nodePos[4])
        )

        this.LevelNode[1].runAction(nodeAct1)
        this.LevelNode[2].runAction(nodeAct2)
        this.LevelNode[3].runAction(nodeAct3)
        this.LevelNode[4].runAction(nodeAct4)
    }
    // update (dt) {},
});
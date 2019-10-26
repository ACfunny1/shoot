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

    start() {

    },
    get(node) {
        for (var i = 0; i < this.LevelNode.length; i++) {
            this.nodePos[i] = this.LevelNode[i].position
            this.nodeScale[i] = this.LevelNode[i].scale
            this.nodeOpacity[i] = this.LevelNode[i].opacity
        }
        cc.log(this.nodePos)
        cc.log(this.nodeScale)
        cc.log(this.nodeOpacity)
        cc.log('新的' + this.nodePos[0])
    },


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


        /*var arrowAct1 = cc.sequence(
            cc.spawn(
                cc.moveBy(0.5,cc.v2(-120,0)),
                cc.scaleTo(0.5,0.9),
                cc.fadeIn(0)
            ),
            this.reset(this.LevelNode[5],5,5)
        )

        var arrowAct2 = cc.sequence(
            cc.spawn(
                cc.moveBy(0.5,cc.v2(-117,0)),
                cc.scaleTo(0.5,0.5),
            ),
            this.reset(this.LevelNode[6],6,6)
        )*/
        this.LevelNode[1].runAction(nodeAct1)
        this.LevelNode[2].runAction(nodeAct2)
        this.LevelNode[3].runAction(nodeAct3)
        this.LevelNode[4].runAction(nodeAct4)
        /*this.LevelNode[5].runAction(arrowAct1)
        this.LevelNode[6].runAction(arrowAct2)*/
    }
    // update (dt) {},
});
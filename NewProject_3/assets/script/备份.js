cc.Class({
    extends: cc.Component,

    properties: {
        LevelNode: [cc.Node],
        nodePos: [],
        nodeScale: [],
        LevelNum: [cc.Label]
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.LevelNode[4].opacity = 0
        this.LevelNode[0].opacity = 0
       // this.LevelNode[7].opacity = 0
        this.get()
    },

    start() {

    },
    get(node){
        for(var i=0; i<this.LevelNode.length;i++){
            this.nodePos[i] = this.LevelNode[i].position
            this.nodeScale[i] = this.LevelNode[i].scale
        }
        cc.log(this.nodePos)
        cc.log(this.nodeScale)
        cc.log('新的'+this.nodePos[0])
    },
    
    reset(node,pos,scal,opa){
        var reset = cc.spawn(
            cc.moveTo(0,this.nodePos[pos]),
            cc.scaleTo(0,this.nodeScale[scal]),
            opa
        )
        node.runAction(reset)
        return reset
    },

    num(){
        for(var i=0 ; i<this.LevelNum.length ; i++){
            this.LevelNum[i].string++
        }
    },

    LevelUp() {
        var nodeAct1 = cc.sequence(
            cc.spawn(
                cc.moveBy(0.5,cc.v2(-100,0)),
                cc.fadeOut(0.5),
            ),
            
            this.reset(this.LevelNode[1],1,1,cc.fadeIn(0)),
        )

        var nodeAct2 = cc.sequence(
            cc.spawn(
                cc.moveBy(0.5,cc.v2(-165,0)),
                cc.scaleTo(0.5,0.6),
            ),
            this.reset(this.LevelNode[2],2,2)
        )

        var nodeAct3 = cc.sequence(
            cc.spawn(
                cc.moveBy(0.5,cc.v2(-165,0)),
                cc.scaleTo(0.5,1),
            ),
            this.reset(this.LevelNode[3],3,3)
        )
        
        var nodeAct4 = cc.sequence(
            cc.spawn(
                cc.moveBy(0.5,cc.v2(-100,0)),
                cc.fadeIn(0.5),
            ),
            this.reset(this.LevelNode[4],4,4,cc.fadeOut(0))
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

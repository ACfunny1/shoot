//JSON.stringify()对象或数组转为 JSON字符串
//JSON.parse 解析JSON字符串
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        local = this
    },

    loadUserData() {
        var userData = {
            userGold: gold,
            userPower: power,
            userDiamond: diamond
        }
        cc.sys.localStorage.setItem('userData', JSON.stringify(userData))
    },
    getUserData() {
        var value = JSON.parse(cc.sys.localStorage.getItem('userData'))
        cc.log('读取保存记录')
        cc.log(value)
    },
    getUserGold() {
        var value = JSON.parse(cc.sys.localStorage.getItem('userData'))
        return value.userGold
    },
    getUserPower() {
        var value = JSON.parse(cc.sys.localStorage.getItem('userData'))
        return value.userPower
    },
    getUserDiamond() {
        var value = JSON.parse(cc.sys.localStorage.getItem('userData'))
        return value.userDiamond
    }
    // update (dt) {},
});


cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    },
    xml() {
        var obj = {
            name: 'nancy',
            age: 25
        }

        var xhr = new XMLHttpRequest()
        xhr.open('post', 'http://localhost:2000/heroAdd', true)
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    //成功了
                    console.log(xhr.responseText)
                } else {
                    console.log('服务器异常')
                }
            }
        }
        xhr.send(this.array(obj))
    },


    array(data) {
        var arr = []
        var newData
        for (var index in data) {
            var str = index + '=' + data[index]
            arr.push(str)
        }

        newData = arr.join("&")
        return newData
    }
    // update (dt) {},
});

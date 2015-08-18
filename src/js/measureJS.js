/**
    javascript性能度量工具，主要负责不同功能的时间段记录
    提供两种模式：
    record与time-timeEnd
    record是从对象初始化开始及时
    time-timeEnd是记录 时间段 的作用

    @class MeasureJS
    @constructor MeasureJS

    @author nirizhe 
    @date 2015-07-19
*/
function MeasureJS() {
    this.init();
}

MeasureJS.prototype = {
    constructor: MeasureJS,

    /**
     * timers数组
     * @property timers
     * @type {Array}
     * @default []
     */
    timers: [],

    init: function() {
        this.start = this.getTime();
        this.addDefaultEvent();
    },

    addDefaultEvent: function () {
        var _this = this;

        document.addEventListener('DOMContentLoaded', function () {
            _this.record('DOMContentLoaded');
        });

        window.onload = function () {
            _this.record('window.load');
        };
    },

    getTime: function() {
        return new Date().getTime();
    },

    /**
     * 核心方法，在需要的地方计时的地方记录一个
     * 
     * @method record
     * @example
     *     measuresJS.record('name1')
     * @author nirizhe
     * @param  {String}   name 记录位置的名称
     * @return this;
     */
    record: function(name, note) {
        this.timers.push({
            type: 'main-line',
            name: name,
            time: this.getTime() - this.start,
            note: note || '无'
        });

        return this;
    },

    getTimer: function(name) {

        return this.grep(this.timers, function(obj) {
            return name === obj.name;
        });
    },

    grep: function(arr, callback) {
        if (!arr instanceof Array || !callback) {
            return [];
        }

        var i = 0,
            len = arr.length,
            _array = [];

        for (; i < len; i++) {
            if (callback(arr[i])) {
                _array.push(arr[i]);
            }
        }

        return _array;
    },

    /**
     * 返回拼接好的，分行显示的字符串
     * @method getString
     * @return {String} str
     */
    getString: function() {
        var timers = this.timers,
            tempTimer,
            str = '';

        while(timers.length) {
            tempTimer = timers.shift();
            str += tempTimer.name + ': ' +
                tempTimer.time + 'ms\n';

            /*
            加入type = snippet的过滤，
            如果msg存在，说明snippet没有闭合
             */
            if (tempTimer.msg && tempTimer.type === 'snippet') {
                str += tempTimer.msg + '\n';
            }
        }

        return str;
    },

    /**
     * 模仿console.time的行为
     * @method time
     * @example
     *     obj.time('aaa'); 
     *     ....do a lot of things
     *     obj.timeEnd('aaa');
     * @param  {String} name 
     * @param  {String} note 备注
     * @return {this}      
     */
    time: function(name, note) {

        var timers = this.timers,
            i = 0,
            len = timers.length;

        //如果重复的话，就别添加了    
        for(; i <len; i++) {
            if(timers[i].name === name) {
                return this;
            }
        }
        this.timers.push({
            type: 'snippet',
            name: name,
            time: this.getTime(),
            note: note || '无',
            msg: 'not cloesed' //如果只有开始，那么这么就会打出没有闭合的提示
        });
        return this;
    },

    /**
     * 与time配合使用
     * @method timeEnd
     * @param  {String} name 
     * @return {this}      
     */
    timeEnd: function(name) {
        var timers = this.timers,
            i = 0,
            len = timers.length,
            tempTimer;

        for (; i < len; i++) {
            tempTimer = timers[i];

            if (tempTimer.type === 'snippet' &&
                tempTimer.name === name) {
                tempTimer.time = this.getTime() - tempTimer.time;
                tempTimer.msg = '';
            }
        }
        return this;

    }
};

(function (_window) {
    _window.Util = {
        generateUUID: function (){
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random()*16)%16 | 0;
                d = Math.floor(d/16);
                return (c=='x' ? r : (r&0x7|0x8)).toString(16);
            });
            return uuid;
        },
        now: Date.now || function() {
            return new Date().getTime();
        },
        debounce: function(func, wait, immediate) {
            var self = this;
            var timeout, args, context, timestamp, result;

            var later = function() {
                // 据上一次触发时间间隔
                var last = self.now() - timestamp;

                // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
                if (last < wait && last > 0) {
                    timeout = setTimeout(later, wait - last);
                } else {
                    timeout = null;
                    // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
                    if (!immediate) {
                        result = func.apply(context, args);
                        if (!timeout) context = args = null;
                    }
                }
            };

            return function() {
                context = this;
                args = arguments;
                timestamp = self.now();
                var callNow = immediate && !timeout;
                // 如果延时不存在，重新设定延时
                if (!timeout) timeout = setTimeout(later, wait);
                if (callNow) {
                    result = func.apply(context, args);
                    context = args = null;
                }

                return result;
            };
        },
        noop: function(){}
    }
})(window);

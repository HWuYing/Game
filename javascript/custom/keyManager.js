/**
 * Created by Administrator on 2016/2/25.
 */
app.LoadFile('keyManager',function(){
    var keyMan = null , Event = app.Event;
    function keyManager(){
        this.proxyKeyDowCache = null;
        this.proxyKeyUpCache = null;
        this.proxyKeyPressCache = null;
        this.bodyEvent = null;
    }

    keyManager.prototype.__init__ = function(){
        this.bodyEvent = Event(document.body);
        return this;
    };

    keyManager.prototype.keyEvent = function(){
        var typeCache = {};
        return function(type , listenArr) {
            if(typeCache.hasOwnProperty(type)) return;
            this.bodyEvent || this.__init__();
            typeCache[type] = this.bodyEvent.addEvent(type, function (event) {
                var keyCode = event.keyCode;
                for(var i = 0 , ii = listenArr.length ; i < ii ;i++){
                    listenArr[i].bind(this)(keyCode);
                }
            });
        }
    }();

    keyManager.prototype.listenKeyDown = function(fn){
        this.proxyKeyDowCache = this.proxyKeyDowCache ||[];
        this.keyEvent('keydown' , this.proxyKeyDowCache);
        if(typeof fn == 'function')this.proxyKeyDowCache.push(fn);
        return this;
    };

    keyManager.prototype.listenKeyUp = function(fn){
        this.proxyKeyUpCache = this.proxyKeyUpCache ||[];
        this.keyEvent('keyup' , this.proxyKeyUpCache);
        if(typeof fn == 'function')this.proxyKeyUpCache.push(fn);
        return this;
    };

    keyManager.prototype.listenKeyPress = function(fn){
        this.proxyKeyPressCache = this.proxyKeyPressCache ||[];
        this.keyEvent('keypress',this.proxyKeyPressCache);
        if(typeof fn == 'function')this.proxyKeyPressCache.push(fn);
        return this;
    };

    return  keyMan || (keyMan = new keyManager().__init__());
});
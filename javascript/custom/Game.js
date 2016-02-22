/**
 * Created by Administrator on 2016/2/21.
 */
app.LoadFile({key: 'Game'}, function () {
    var DIVIDESIZE = {Xsize: null, YSize: null}, GameCache = [], si = null,
        DRAWSTATE = false, RunTime = 30;

    function Run() {
        if (DRAWSTATE) return;
        for (var i = 0, ii = GameCache.length; i < ii; i++) GameCache[i].drawGameModel();
    }

    function Game(canvas, XSize, YSize) {
        this.Context = canvas.getContext('2d');
        this.width = canvas.width = canvas.offsetWidth;
        this.height = canvas.height = canvas.offsetHeight;
        this.size = {
            XSize: this.width / XSize,
            YSize: this.height / YSize
        };

        DIVIDESIZE.Xsize = XSize;
        DIVIDESIZE.YSize = YSize;
    }

    Game.prototype.GameModelCache = {};
    Game.prototype.Resize = function () {
        this.size.XSize = this.canvas.offsetWidth / DIVIDESIZE.Xsize;
        this.size.YSize = this.canvas.offsetHeight / DIVIDESIZE.YSize;
    };

    Game.prototype.putGameModel = function (model) {
        if (!this.GameModelCache.hasOwnProperty(model.position))
            this.GameModelCache[model.position] = [];
        this.GameModelCache[model.position].push(model);
        model.setSize(this.size);
    };

    Game.prototype.drawGameModel = function () {
        var keys = Object.keys(this.GameModelCache).sort(), models;
        if(DRAWSTATE){
            DRAWSTATE = true;
            return ;
        }
        for (var i = 0, ii = keys.length; i < ii; i++) {
            models = this.GameModelCache[keys[i]];
            for (var j = 0, jj = models.length; j < jj; j++) {
                models[j].draw(this.Context);
            }
        }
        DRAWSTATE = false;
    };

    function BuildGame(canvas, XSize, YSize) {
        var g = new Game(canvas, XSize, YSize);
        GameCache.push(g);
        return g;
    };

    BuildGame.config = function(options){
        if (typeof options.runTime == 'number') BuildGame.setRunTime(options.runTime);
        return this;
    };
    BuildGame.Run = function () {
        if (si == null) si = setInterval(Run, RunTime);
    };
    BuildGame.stop = function () {
        if (si != null) {
            clearInterval(si);
            si = null;
        }
    };
    BuildGame.setRunTime = function (runTime) {
        RunTime = runTime;
    };
    BuildGame.Game = Game;
    return BuildGame;
});
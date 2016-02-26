/**
 * Created by Administrator on 2016/2/21.
 */
app.LoadFile({key: 'BulletModel', fileList: ['custom/GameModel/moveModel/MoveModel.js','custom/GameModel/obstacle/ObstacleModel.js']
}, function (MoveModel,ObstacleModel) {
    var TackCache = [];
    function BulletModel(point , position) {
        MoveModel.call(this, point[0]-1, point[1]-1, 6, 6 , position||10);
        this.Tack = null;
    }
    BulletModel.extend(MoveModel);
    BulletModel.prototype.draw = function(ctx){
        if(this.drawState == false) return;
        this.move();
        ctx.save();
        ctx.fillStyle = "#ffffff";
        ctx.beginPath(this.point[1]);
        ctx.arc(this.point[0],this.point[1], this.size[0]/3,0,2*Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    };
    /**
     * 界面上所以Tack集合
     */
    BulletModel.addTack = function(TackModel){
        if(!!TackModel.BulletCachePid) return;
        TackModel.BulletCachePid = TackCache.length;
        TackCache.push(TackModel);
    };
    /**
     *移除指定Tack
     */
    BulletModel.removeTack = function(TackModel){
        TackCache[TackModel.BulletCachePid] = null;
        delete TackModel.BulletCachePid;
    };
    /**
     * 是否达到移动最大值
     * @returns {boolean}
     */
    BulletModel.prototype.moveMaxMove = function(){
        return this.point[0] < 0 || this.point[0] > this.maxMove[0] || this.point[1] < 0 || this.point[1] > this.maxMove[1];
    };
    /**
     * 移动函数
     * @returns {BulletModel}
     */
    BulletModel.prototype.move = function(){
        this.point[0]+=this.distance[0]*this.moveVector[0];
        this.point[1]+=this.distance[1]*this.moveVector[1];
        if(this.moveMaxMove())this.putClearModel(this).removeTackCache();
        this.detectionTackHit().ObstacleDetection(); //打中Tack否
        return this;
    };

    /**
     * 打中Tack调用
     * @param TackHit
     * @returns {BulletModel}
     * @constructor
     */
    BulletModel.prototype.HitTack = function(TackHit){
        BulletModel.removeTack(TackHit); // 将Tack从缓存中移除
        TackHit.bulletHit(); //坦克中弹
        this.removeTackCache(null).putClearModel(this); // 放入缓存 等待清理
        return this;
    };

    /**
     * 打中障碍物
     * @returns {BulletModel}
     * @constructor
     */
    BulletModel.prototype.HitObstacle = function(){
        this.removeTackCache(null).putClearModel(this);
        return this;
    };


    /**
     * 障碍物检测
     * @returns {BulletModel}
     */
    BulletModel.prototype.ObstacleDetection = function(){
        var mapCol , map;
        for(var i = 0 , ii = this.Map.length ; i< ii ; i++){
            mapCol = this.Map[i];
            for(var j = 0 , jj = mapCol.length ; j < jj ;j++){
                map = mapCol[j];
                if(map instanceof ObstacleModel && this.collisionDetection(map)){
                    this.HitObstacle();
                    if(map.bulletHit(this)) mapCol[j] = 0;
                }
            }
        }
        return this;
    };

    /**
     * 是否打中Tack
     * @returns {BulletModel}
     */
    BulletModel.prototype.detectionTackHit = function(){
        var TackIte , key , kk;
        for(key = 0 , kk =  TackCache.length ; key < kk ; key++){
            TackIte = TackCache[key];
            if(TackIte != null && this.Tack.__proto__ != TackIte.__proto__ && this.collisionDetection(TackIte)){
                this.HitTack(TackIte);
                break;
            }
        }
        return this;
    };
    /**
     * 将子弹从坦克缓存中移除
     * @param Tack
     * @returns {BulletModel}
     */
    BulletModel.prototype.removeTackCache = function(Tack){
        this.Tack = Tack;
        this.removeTackCache = function(){
            if(!Tack || Tack.BulletCache.length == 0) return this;
            this.drawState = false;
            for(var i = Tack.BulletCache.length-1; i >= 0 ; i--){
                if(Tack.BulletCache[i] == this){
                    Tack.BulletCache.splice(i, 1);
                    break;
                }
            }
            return this;
        };
        return this;
    };

    /**
     * 设置子弹速度数组
     * @param direction
     * @param speed
     * @returns {BulletModel}
     */
    BulletModel.prototype.setDistance = function(speed , relativeSpeed){
        var  DIRECTION = this.DIRECTION;
        relativeSpeed = relativeSpeed|| 0;
        switch (this.direction) {
            case DIRECTION.UPPER :
                this.distance[1] = -(speed+relativeSpeed)*this.moveVector[1];
                break;
            case DIRECTION.ALSO :
                this.distance[0] = (speed+relativeSpeed)*this.moveVector[0];
                break;
            case DIRECTION.LOWER :
                this.distance[1] = (speed+relativeSpeed)*this.moveVector[1];
                break;
            case DIRECTION.LEFT :
                this.distance[0] = -(speed+relativeSpeed)*this.moveVector[0];
                break;
        }
        return this;
    };
    /**
     * 从写设置相对值
     * @returns {BulletModel}
     */
    BulletModel.prototype.setSize = function(){
        return this;
    };

    BulletModel.prototype.collisionDetection = function(model){
        var point1 = [this.point[0],this.point[1]] , point2 = [model.point[0]+model.size[0]/2,model.point[1]+model.size[1]/2],
            nowWidth = Math.abs(point1[0]-point2[0]),nowHeight = Math.abs(point1[1]-point2[1]),
            minWidth =  Math.abs(this.size[0] + model.size[0] /2) , minHeight =  Math.abs(this.size[1] + model.size[1]/2);
        if(nowWidth >= minWidth || nowHeight >= minHeight) return false;
        return true;
    };
    return BulletModel;
});
/**
 * Created by Administrator on 2016/2/21.
 */
app.LoadFile({
    key: 'TackModel', fileList: ['custom/GameModel/moveModel/MoveModel.js',
        'custom/GameModel/moveModel/Bullet/BulletModel.js']
}, function (MoveModel, BulletModel) {
    var imgReact = {
        UPPER: [23, 302, 38, 38],
        ALSO: [24, 218, 35, 35],
        LOWER: [23, 50, 38, 38],
        LEFT: [24, 133, 35, 38]
    };

    function TackModel(x, y, XSize, YSize, position) {
        MoveModel.call(this, x, y, XSize, YSize, position);
        this.Image = null; // 图片
        this.react = null;//剪切图片
        this.BulletCache = []; //所有子弹集合
        this.BullSpeed = 5; //子弹速度
        this.FireInterval = 30; //发射间隔
        this.FireCount = 29; //记录间隔时间

        this.FireBulletKey = 'UP'; //子弹发射状态

        this.DIRECTIONDistance = [0, 0];//当前方向上移动速度
    }

    TackModel.extend(MoveModel);
    /**
     * 绘制坦克
     * @param ctx
     * @returns {TackModel}
     */
    TackModel.prototype.draw = function (ctx) {
        if (!this.Image || this.drawState == false) return this;
        ctx.save();
        if (this.react) ctx.drawImage(this.Image, this.react[0], this.react[1], this.react[2], this.react[3],
            this.point[0], this.point[1], this.size[0], this.size[1]);
        else ctx.drawImage(this.Image, this.point[0], this.point[1], this.size[0], this.size[1]);
        ctx.restore();
        this.drawCallBack();
        return this;
    };

    /**
     * 绘制完成后调用
     * @returns {TackModel}
     */
    TackModel.prototype.drawCallBack = function () {
        this.move().testingFireBull();
        return this;
    };

    TackModel.prototype.testingFireBull = function(){
        var _self = this;
        this.FireCount++;
        if (_self.FireBulletKey == 'DOWN' && _self.BulletCache.length <= 3 && _self.FireCount >= _self.FireInterval) {
            _self.FireCount = 0;
            _self.FireBullet();
            setTimeout(function () {
                _self.FireBullet();
            }, 100);
        }
        return this;
    };

    /**
     * 通过方向 获取移动速度
     * @returns {TackModel}
     */
    TackModel.prototype.moveDistancePoint = function () {
        var DIRECTION = this.DIRECTION;
        this.DIRECTIONDistance[0] = 0;
        this.DIRECTIONDistance[1] = 0;
        switch (this.direction) {
            case DIRECTION.UPPER:
                this.DIRECTIONDistance[1] = -this.distance[1] * this.moveVector[1];
                break;
            case DIRECTION.ALSO:
                this.DIRECTIONDistance[0] = this.distance[0] * this.moveVector[0];
                break;
            case DIRECTION.LOWER:
                this.DIRECTIONDistance[1] = this.distance[1] * this.moveVector[1];
                break;
            case DIRECTION.LEFT:
                this.DIRECTIONDistance[0] = -this.distance[0] * this.moveVector[0];
                break;
        }
        return this;
    };


    /**
     * 障碍物检测
     * @param point
     * @returns {TackModel}
     */
    TackModel.prototype.ObstacleDetection = function (point) {

        return this;
    };
    /**
     * 边界检测
     * @param point
     * @returns {TackModel}
     */
    TackModel.prototype.BoundaryDetection = function (point) {
        if (point[0] > this.maxMove[0] - this.size[0]) point[0] = this.maxMove[0] - this.size[0];
        else if (point[0] < 0) point[0] = 0;
        if (point[1] > this.maxMove[1] - this.size[1]) point[1] = this.maxMove[1] - this.size[1];
        else if (point[1] < 0) point[1] = 0;
        return this;
    };

    /**
     * 移动调用函数
     * @returns {TackModel}
     */
    TackModel.prototype.move = function () {
        var point = [this.point[0], this.point[1]];
        if (this.DIRECTIONDistance[0] == 0 && this.DIRECTIONDistance[1] == 0) return this;
        point[0] += this.DIRECTIONDistance[0];
        point[1] += this.DIRECTIONDistance[1];
        this.BoundaryDetection(point).ObstacleDetection(point);
        this.point[0] = point[0];
        this.point[1] = point[1];
        return this;
    };

    /**
     * 获取发射子弹位置
     * @returns {Array}
     */
    TackModel.prototype.getFireBulletPoint = function () {
        var point = [], thisPointCenter = [this.point[0] + this.size[0] / 2, this.point[1] + this.size[1] / 2],
            DIRECTION = this.DIRECTION;
        switch (this.direction) {
            case DIRECTION.UPPER :
                point = [thisPointCenter[0], thisPointCenter[1] - this.size[1] / 2];
                break;
            case DIRECTION.ALSO :
                point = [thisPointCenter[0] + this.size[0] / 2, thisPointCenter[1]];
                break;
            case DIRECTION.LOWER :
                point = [thisPointCenter[0], thisPointCenter[1] + this.size[1] / 2];
                break;
            case DIRECTION.LEFT :
                point = [thisPointCenter[0] - this.size[0] / 2, thisPointCenter[1]];
                break;
        }
        return point;
    };

    /**
     * 发射子弹
     * @returns {TackModel}
     */
    TackModel.prototype.FireBullet = function () {
        var bullet = new BulletModel(this.getFireBulletPoint()).setDirection(this.direction)
            .setDistance(this.BullSpeed, 0);
//            .setDistance(this.BullSpeed, Math.abs(this.DIRECTIONDistance[0] / this.moveVector[0] || this.DIRECTIONDistance[1] / this.moveVector[1]));
        this.BulletCache.push(bullet);
        bullet.removeTackCache(this);
        this.Game.putGameModel(bullet);
        return this;
    };

    /**
     * 键盘事件获取函数
     * @returns {TackModel}
     */
    TackModel.prototype.proxyKeyFn = function (type) {
        var _self = this , keyCodeDIRECTION = {38: 'UPPER', 39: 'ALSO', 40: 'LOWER', 37: 'LEFT'},
            keyFns = {
                "keydown": function (keyCode) {
                    if (keyCode == 83)_self.FireBulletKey = 'DOWN';
                    else if (keyCodeDIRECTION[keyCode])_self.setDirection(keyCodeDIRECTION[keyCode]);
                    return this;
                },
                "keyup": function (keyCode) {
                    if (keyCode == 83)_self.FireBulletKey = 'UP';
                    else if (keyCodeDIRECTION[keyCode]) _self.stopMove();
                    return this;
                }
            };
        return keyFns[type];
    };

    /**
     * 停止移动
     * @returns {TackModel}
     */
    TackModel.prototype.stopMove = function () {
        this.DIRECTIONDistance[0] = 0;
        this.DIRECTIONDistance[1] = 0;
        return this;
    };
    /**
     * 设置移动方向
     * @param direction
     * @returns {TackModel}
     */
    TackModel.prototype.setDirection = function (direction) {
        this.direction = this.DIRECTION[direction] || this.DIRECTION.UPPER;
        this.reactImg.apply(this, imgReact[direction]).moveDistancePoint();
        return this;
    };

    /**
     * 中弹以后处理
     * @returns {TackModel}
     */
    TackModel.prototype.bulletHit = function(){
        this.drawState = false;
        this.putClearModel(this);
        return this;
    };
    return TackModel;
});
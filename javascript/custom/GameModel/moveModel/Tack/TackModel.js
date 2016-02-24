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
        this.Game = null; //渲染的canvas封装对象
        this.BulletCache = []; //所有子弹集合
        this.BullSpeed = 18; //子弹速度
        this.FireInterval = 30; //发射间隔
        this.FireCount = 29; //记录间隔时间
    }

    TackModel.extend(MoveModel);
    /**
     * 绘制坦克
     * @param ctx
     * @returns {TackModel}
     */
    TackModel.prototype.draw = function (ctx) {
        if (!this.Image) return;
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
        var _self = this;
        this.move();
        this.FireCount++;
        if (this.BulletCache.length <= 3 && this.FireCount >= this.FireInterval) {
            this.FireCount = 0;
            this.FireBullet();
            setTimeout(function () {
                _self.FireBullet();
            }, 30);
        }
        return this;
    };
    /**
     * 通过方向 获取移动速度
     * @returns {number[]}
     */
    TackModel.prototype.moveDistancePoint = function () {
        var distance = [0, 0], DIRECTION = this.DIRECTION;
        switch (this.direction) {
            case DIRECTION.UPPER:
                distance[1] = -Math.abs(this.distance[1] * this.moveVector[1]);
                break;
            case DIRECTION.ALSO:
                distance[0] = Math.abs(this.distance[0] * this.moveVector[0]);
                break;
            case DIRECTION.LOWER:
                distance[1] = Math.abs(this.distance[1] * this.moveVector[1]);
                break;
            case DIRECTION.LEFT:
                distance[0] = -Math.abs(this.distance[0] * this.moveVector[0]);
                break;
        }
        return distance;
    };


    /**
     * 检测障碍物
     * @constructor
     */
    TackModel.prototype.ObstacleDetection = function (point) {

    };

    /**
     * 检测边界
     * @param point
     * @constructor
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
        var distance = this.moveDistancePoint(), point = [this.point[0], this.point[1]];
        point[0] += distance[0];
        point[1] += distance[1];
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
     * 获取子弹速度
     * @returns {number[]}
     */
    TackModel.prototype.getBulletDistance = function () {
        var distance = [0, 0], DIRECTION = this.DIRECTION;
        switch (this.direction) {
            case DIRECTION.UPPER :
                distance = [0, -this.BullSpeed*this.moveVector[0]];
                break;
            case DIRECTION.ALSO :
                distance = [this.BullSpeed*this.moveVector[1], 0];
                break;
            case DIRECTION.LOWER :
                distance = [0, this.BullSpeed*this.moveVector[1]];
                break;
            case DIRECTION.LEFT :
                distance = [-this.BullSpeed*this.moveVector[0], 0];
                break;
        }
        return distance;
    };

    TackModel.prototype.FireBullet = function () {
        var bullet = new BulletModel(this.getFireBulletPoint()).setDirection(this.direction), bulletDistance = this.getBulletDistance();
        bullet.setDistance(bulletDistance[0], bulletDistance[1]);
        this.BulletCache.push(bullet);
        bullet.removeTackCache(this);
        this.Game.putGameModel(bullet);
        return this;
    };

    /**
     * 设置移动方向
     * @param direction
     * @returns {TackModel}
     */
    TackModel.prototype.setDirection = function(direction){
        this.direction = this.DIRECTION[direction] || this.DIRECTION.UPPER;
        this.reactImg.apply(this, imgReact[direction]);
        return this;
    };

    return TackModel;
});
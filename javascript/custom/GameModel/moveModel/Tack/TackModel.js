/**
 * Created by Administrator on 2016/2/21.
 */
app.LoadFile({key: 'TackModel', fileList: ['custom/GameModel/moveModel/MoveModel.js', 'custom/GameModel/moveModel/Bullet/BulletModel.js']
}, function (MoveModel, BulletModel) {
    var DIRECTION = BulletModel.prototype.DIRECTION;

    function TackModel(x, y, XSize, YSize, position) {
        MoveModel.call(this, x, y, XSize, YSize, position);
        this.Image = null; // 图片
        this.react = null;//剪切图片
        this.Game = null; //渲染的canvas封装对象
        this.BulletCache = []; //所有子弹集合
        this.BullSpeed = 8;
        this.FireInterval = 20;
        this.FireCount = 0;
    }

    TackModel.extend(MoveModel);
    TackModel.prototype.draw = function (ctx) {
        if (!this.Image) return;
        ctx.save();
        if (this.react) ctx.drawImage(this.Image, this.react[0], this.react[1], this.react[2], this.react[3],
            this.point[0], this.point[1], this.size[0], this.size[1]);
        else ctx.drawImage(this.Image, this.point[0], this.point[1], this.size[0], this.size[1]);
        ctx.restore();
        this.drawCallBack();
    };
    TackModel.prototype.drawCallBack = function(){
        var _self = this;
        this.move();
        this.FireCount++;
        if(this.FireCount == this.FireInterval){
            this.FireCount = 0;
            this.FireBullet();
            setTimeout(function(){_self.FireBullet();},30);
        }
    };
    TackModel.prototype.move = function () {
        if (this.point[0] > this.maxMove[0] - this.size[0]) this.moveVector[0] = -Math.abs(this.moveVector[0]);
        else if (this.point[0] < 0) this.moveVector[0] = Math.abs(this.moveVector[0]);
        if (this.point[1] > this.maxMove[1] - this.size[1]) this.moveVector[1] = -Math.abs(this.moveVector[1]);
        else if (this.point[1] < 0)this.moveVector[1] = Math.abs(this.moveVector[1]);
        this.point[0] += this.moveVector[0] * this.distance[0];
        this.point[1] += this.moveVector[1] * this.distance[1];
        return this;
    };
    TackModel.prototype.getFireBulletPoint = function () {
        var point = [] , thisPointCenter = [this.point[0] + this.size[0] / 2 , this.point[1] + this.size[1] / 2];
        switch (this.direction) {
            case DIRECTION.UPPER : point = [thisPointCenter[0] , thisPointCenter[1] - this.size[1] / 2]; break;
            case DIRECTION.ALSO :  point = [thisPointCenter[0] + this.size[0] / 2 , thisPointCenter[1]]; break;
            case DIRECTION.LOWER : point = [thisPointCenter[0], thisPointCenter[1] + this.size[1] / 2 ]; break;
            case DIRECTION.LEFT : point = [thisPointCenter[0] - this.size[0] / 2 , thisPointCenter[1]]; break;
        }
        return point;
    };

    TackModel.prototype.getBulletDistance = function(){
        var distance = [0,0];
        switch (this.direction) {
            case DIRECTION.UPPER : distance = [0 , -this.BullSpeed]; break;
            case DIRECTION.ALSO : distance = [this.BullSpeed , 0]; break;
            case DIRECTION.LOWER : distance = [0, this.BullSpeed]; break;
            case DIRECTION.LEFT : distance = [-this.BullSpeed , 0]; break;
        }
        return distance;
    };

    TackModel.prototype.setGame = function (Game) {
        this.Game = Game;
        return this;
    };
    TackModel.prototype.FireBullet = function () {
        var bullet = new BulletModel(this.getFireBulletPoint()).setDirection(this.direction) , bulletDistance = this.getBulletDistance();
        bullet.setDistance(bulletDistance[0], bulletDistance[1]);
        this.BulletCache.push(bullet);
        bullet.removeTackCache(this);
        this.Game.putGameModel(bullet);
        return this;
    };
    return TackModel;
});
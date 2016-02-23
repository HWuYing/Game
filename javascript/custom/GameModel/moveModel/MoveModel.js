/**
 * Created by Administrator on 2016/2/21.
 */
app.LoadFile({key: 'MoveModel', fileList: ['custom/GameModel/BaseModel.js']
}, function (BaseModel) {
    var DIRECTION = {UPPER: 'upper', ALSO: 'also', LOWER: "lower", LEFT: 'left'};
    function MoveModel(x, y, XSize, YSize,position) {
        BaseModel.call(this, x, y, XSize, YSize,position);
        this.moveVector = [1,1];
        this.maxMove = [];
        this.distance = [0,0];//移动速度
        this.direction = DIRECTION.UPPER; //移动方向
        this.Map = null;
    }
    MoveModel.extend(BaseModel);
    MoveModel.prototype.DIRECTION = DIRECTION;
    MoveModel.prototype.move=function(){};
    MoveModel.prototype.resizeMoveVector = function(size){
        this.moveVector[0] *= size.XSize;
        this.moveVector[1] *= size.YSize;
        return this;
    };
    MoveModel.prototype.setMap = function(map){
        this.Map = map;
        return this;
    };
    MoveModel.prototype.setMaxMove = function(maxX , maxY){
        this.maxMove[0] = maxX;
        this.maxMove[1] = maxY;
        return this;
    };
    MoveModel.prototype.setDistance = function(xDis,yDis){
        this.distance[0] = xDis;
        this.distance[1] = yDis;
        return this;
    };
    //设置移动方向
    MoveModel.prototype.setDirection = function(direction){
        this.direction = this.DIRECTION[direction] || this.DIRECTION.UPPER;
        return this;
    };
    return MoveModel;
});
/**
 * Created by Administrator on 2016/2/21.
 */
app.LoadFile({key: 'MoveModel', fileList: ['custom/GameModel/BaseModel.js']
}, function (BaseModel) {
    var DIRECTION = {UPPER: 'upper', ALSO: 'also', LOWER: "lower", LEFT: 'left'};
    function MoveModel(x, y, XSize, YSize,position) {
        BaseModel.call(this, x, y, XSize, YSize,position);
        this.moveVector = [1,1]; //单位向量
        this.maxMove = [1,1]; //最大边界
        this.distance = [0,0];//移动速度
        this.direction = DIRECTION.UPPER; //移动方向
        this.Map = null; //地图
        this.Game = null; //渲染的canvas封装对象
    }
    MoveModel.extend(BaseModel);
    MoveModel.prototype.DIRECTION = DIRECTION;
    MoveModel.prototype.move=function(){};
    /**
     * 设置移动单位向量
     * @param size
     * @returns {MoveModel}
     */
    MoveModel.prototype.resizeMoveVector = function(size){
        this.moveVector[0] *= size.XSize;
        this.moveVector[1] *= size.YSize;
        return this;
    };

    /**
     * 设置地图
     * @param map
     * @returns {MoveModel}
     */
    MoveModel.prototype.setMap = function(map){
        this.Map = map;
        return this;
    };
    /**
     * 设置最大边界
     * @param maxX
     * @param maxY
     * @returns {MoveModel}
     */
    MoveModel.prototype.setMaxMove = function(maxX , maxY){
        this.maxMove[0] = maxX;
        this.maxMove[1] = maxY;
        return this;
    };
    /**
     * 设置移动速度
     * @param xDis
     * @param yDis
     * @returns {MoveModel}
     */
    MoveModel.prototype.setDistance = function(xDis,yDis){
        this.distance[0] = xDis;
        this.distance[1] = yDis;
        return this;
    };
    /**
     * 设置移动方向
     * @param direction
     * @returns {MoveModel}
     */
    MoveModel.prototype.setDirection = function(direction){
        this.direction = this.DIRECTION[direction] || direction;
        return this;
    };

    /**
     * 设置对应Canvas
     * @param Game
     * @returns {MoveModel}
     */
    MoveModel.prototype.setGame = function (Game) {
        this.Game = Game;
        return this;
    };
    return MoveModel;
});
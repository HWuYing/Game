/**
 * Created by Administrator on 2016/2/21.
 */
app.LoadFile({key: 'MoveModel', fileList: ['custom/GameModel/BaseModel.js']
}, function (BaseModel) {
    function MoveModel(x, y, XSize, YSize,position) {
        BaseModel.call(this, x, y, XSize, YSize,position);
        this.moveVector = [1,1];
        this.maxMove = [];
    }
    MoveModel.extend(BaseModel);
    MoveModel.prototype.move=function(){};
    MoveModel.prototype.resizeMoveVector = function(size){
        this.moveVector[0] *= size.XSize;
        this.moveVector[1] *= size.YSize;
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
    return MoveModel;
});
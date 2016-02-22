/**
 * Created by Administrator on 2016/2/21.
 */
app.LoadFile({key: 'ObstacleModel', fileList: ['custom/GameModel/BaseModel.js']
}, function (BaseModel) {
    function ObstacleModel(x, y, XSize, YSize) {
        BaseModel.call(this, x, y, XSize, YSize);
        this.angle = null;
    }
    ObstacleModel.extend(BaseModel);
    ObstacleModel.prototype.moveCtxCenter = function(ctx){
        this.pointO = this.pointO || [this.point[0] + this.size[0]/2,this.point[1]+this.size[1]/2];
        this.translate(ctx , this.pointO);
        return this;
    };
    return ObstacleModel;
});
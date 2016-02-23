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
    return ObstacleModel;
});
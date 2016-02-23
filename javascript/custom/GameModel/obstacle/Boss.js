/**
 * Created by Administrator on 2016/2/23.
 */
app.LoadFile({key: 'Boss', fileList: ['custom/GameModel/obstacle/ObstacleModel.js']
}, function (ObstacleModel) {
    function Boss(x, y, XSize, YSize) {
        ObstacleModel.call(this, x, y, XSize, YSize);
        this.Image = null;
        this.react = null;
    }
    Boss.extend(ObstacleModel);
    Boss.prototype.draw = function(ctx){
        if(!this.Image) return;
        ctx.save();
        if(this.react) ctx.drawImage(this.Image,this.react[0],this.react[1],this.react[2],this.react[3],
            this.point[0],this.point[1],this.size[0],this.size[1]);
        else ctx.drawImage(this.Image,this.point[0],this.point[1],this.size[0],this.size[1]);
        ctx.restore();
    };
    return Boss;
});
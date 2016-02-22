/**
 * Created by Administrator on 2016/2/21.
 */
app.LoadFile({key: 'SteelPlate', fileList: ['custom/GameModel/obstacle/ObstacleModel.js']
}, function (ObstacleModel) {
    function SteelPlate(x, y, XSize, YSize) {
        ObstacleModel.call(this, x, y, XSize, YSize);
        this.Image = null;
        this.react = null;
    }
    SteelPlate.extend(ObstacleModel);
    SteelPlate.prototype.draw = function(ctx){
        if(!this.Image) return;
        ctx.save();
        if(this.angle != null) this.moveCtxCenter(ctx).rotate(ctx,this.angle).translate(ctx,[-this.pointO[0],-this.pointO[1]]);
        if(this.react) ctx.drawImage(this.Image,this.react[0],this.react[1],this.react[2],this.react[3],
            this.point[0],this.point[1],this.size[0],this.size[1]);
        else ctx.drawImage(this.Image,this.point[0],this.point[1],this.size[0],this.size[1]);
        ctx.restore();
    };
    SteelPlate.prototype.reactImg = function(x,y,dx,dy){
        this.react = this.react || [];
        this.react[0] = x;
        this.react[1] = y;
        this.react[2] = dx;
        this.react[3] = dy;
        return this;
    };
    SteelPlate.prototype.setImgSrc = function(src){
        var image = new Image() , _self = this;
        image.onload = function(){
            _self.Image = image;
        };
        image.src = src;
        return this;
    };

    return SteelPlate;
});
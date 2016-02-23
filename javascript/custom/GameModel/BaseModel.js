/**
 * Created by Administrator on 2016/2/21.
 */
app.LoadFile('BaseModel',function(){
    function  BaseModel(x , y , XSize , YSize , position){
        this.point = [x , y];
        this.size = [XSize , YSize];
        this.position = position || 1;
    }
    BaseModel.prototype.draw = function(canvas){};
    BaseModel.prototype.translate = function(ctx,point){
        point = point || [0 , 0];
        ctx.translate(point[0],point[1]);
        return this;
    };
    BaseModel.prototype.rotate = function(ctx , angle){
        ctx.rotate(angle||this.angle||0);
        return this;
    };
    BaseModel.prototype.setSize = function(size){
        this.size[0] *=size.XSize;
        this.size[1] *=size.YSize;
        this.point[0]*=size.XSize;
        this.point[1] *=size.YSize;
        return this;
    };
    BaseModel.prototype.setRotate = function(angle){
        this.angle = angle * Math.PI / 180;
        return this;
    };

    BaseModel.prototype.setImgSrc = function(src){
        var image = new Image() , _self = this;
        image.onload = function(){
            _self.Image = image;
        };
        image.src = src;
        return this;
    };
    BaseModel.prototype.reactImg = function(x,y,dx,dy){
        this.react = this.react || [];
        this.react[0] = x;
        this.react[1] = y;
        this.react[2] = dx;
        this.react[3] = dy;
        return this;
    };
    return BaseModel;
});
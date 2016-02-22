/**
 * Created by Administrator on 2016/2/21.
 */
app.LoadFile({key: 'TackModel', fileList: ['custom/GameModel/moveModel/MoveModel.js']
}, function (MoveModel) {
    function TackModel(x, y, XSize, YSize , position) {
        MoveModel.call(this, x, y, XSize, YSize , position);
        this.Image = null;
        this.react = null;
        this.distance = [1,1];
    }
    TackModel.extend(MoveModel);
    TackModel.prototype.draw = function(ctx){
        if(!this.Image) return;
        ctx.save();
        if(this.react) ctx.drawImage(this.Image,this.react[0],this.react[1],this.react[2],this.react[3],
            this.point[0],this.point[1],this.size[0],this.size[1]);
        else ctx.drawImage(this.Image,this.point[0],this.point[1],this.size[0],this.size[1]);
        ctx.restore();
        this.move();
    };
    TackModel.prototype.reactImg = function(x,y,dx,dy){
        this.react = this.react || [];
        this.react[0] = x;
        this.react[1] = y;
        this.react[2] = dx;
        this.react[3] = dy;
        return this;
    };
    TackModel.prototype.setImgSrc = function(src){
        var image = new Image() , _self = this;
        image.onload = function(){
            _self.Image = image;
        };
        image.src = src;
        return this;
    };
    TackModel.prototype.move = function(){
        if(this.point[0] > this.maxMove[0]-this.size[0]) this.moveVector[0] = -Math.abs(this.moveVector[0]);
        else if(this.point[0] <0 ) this.moveVector[0] = Math.abs(this.moveVector[0]);
        if(this.point[1] > this.maxMove[1]-this.size[1]) this.moveVector[1] = -Math.abs(this.moveVector[1]);
        else if(this.point[1] <0)this.moveVector[1] = Math.abs(this.moveVector[1]);
        this.point[0] += this.moveVector[0] * this.distance[0];
        this.point[1] += this.moveVector[1] * this.distance[1];
        return this;
    };
    TackModel.prototype.setDistance = function(xDis,yDis){
        this.distance[0] = xDis;
        this.distance[1] = yDis;
        return this;
    };
    return TackModel;
});
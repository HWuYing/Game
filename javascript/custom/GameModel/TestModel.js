/**
 * Created by Administrator on 2016/2/21.
 */
app.LoadFile({key:'TestModel',fileList:['custom/GameModel/BaseModel.js']
},function(BaseModel){
    function TestModel(x , y , XSize , YSize){
        BaseModel.call(this , x , y , XSize , YSize);
        this.addX = 10;
        this.addY = 10;
    }
    TestModel.extend(BaseModel);
    TestModel.prototype.draw = function(ctx){
        ctx.save();
        ctx.lineWidth = '1';
        ctx.rect(this.point[0] , this.point[1] , this.size[0] , this.size[1]);
        ctx.stroke();
        ctx.restore();
        this.move();
    };
    TestModel.prototype.move = function(){
        if(this.point[0] > 1438 - this.size[0]) this.addX = -10;
        if(this.point[0] < 0) this.addX= 10;
        if(this.point[1] > 774 - this.size[1]) this.addY = -10;
        if(this.point[1] < 0) this.addY = 10;
        this.point[0] += this.addX;
        this.point[1] += this.addY;
    };
    return TestModel;
});
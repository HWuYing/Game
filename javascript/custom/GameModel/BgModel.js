/**
 * Created by Administrator on 2016/2/21.
 */
app.LoadFile({key: 'BgModel', fileList: ['custom/GameModel/BaseModel.js']
}, function (BaseModel) {

    var DrayType = {
        solidColor: function (ctx) {
            ctx.fillStyle = this.options.fillStyle;
            ctx.fillRect(this.point[0], this.point[1], this.size[0], this.size[1]);
        },
        solidColor_init_: function (options) {
            this.options.fillStyle = options.fillStyle || '#000';
        },
        picture: function (ctx) {

        },
        picture_init_:function(options){

        }
    };


    function BgModel(x, y, XSize, YSize) {
        BaseModel.call(this, x, y, XSize, YSize);
        this.options = {};
    }

    BgModel.extend(BaseModel);
    BgModel.prototype.draw = function (ctx) {
        ctx.save();
        if (typeof this.type == 'function')this.type(ctx);
        ctx.restore();
    };
    BgModel.prototype.drawType = function (type, options) {
        this.type = DrayType[type];
        typeof DrayType[type + '_init_'] == 'function' ? typeof DrayType[type + '_init_'].call(this , options) : (this.type.options = options);
        return this;
    };
    BgModel.prototype.move = function () {
//        if(this.point[0] > 1438 - this.size[0]) this.addX = -10;
//        if(this.point[0] < 0) this.addX= 10;
//        if(this.point[1] > 774 - this.size[1]) this.addY = -10;
//        if(this.point[1] < 0) this.addY = 10;
//        this.point[0] += this.addX;
//        this.point[1] += this.addY;
    };
    return BgModel;
});
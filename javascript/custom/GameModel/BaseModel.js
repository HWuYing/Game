/**
 * Created by Administrator on 2016/2/21.
 */
app.LoadFile({key: 'BaseModel', fileList: ['custom/Game.js']}, function (Game) {
    function BaseModel(x, y, XSize, YSize, position) {
        this.point = [x , y];
        this.size = [XSize , YSize];
        this.position = position || 1;
        this.drawState = true; // 是否在canvas中绘制
    }

    //清除不需要的缓存
    BaseModel.prototype.clearModelCache = [];
    //页面分成多少份
    BaseModel.prototype.getDividesize = function(){
        return Game.getDividesize();
    };
    //绘制模型到canvas
    BaseModel.prototype.draw = function (canvas) {
    };
    //移动绘制远点
    BaseModel.prototype.translate = function (ctx, point) {
        point = point || [0 , 0];
        ctx.translate(point[0], point[1]);
        return this;
    };
    //旋转
    BaseModel.prototype.rotate = function (ctx, angle) {
        ctx.rotate(angle || this.angle || 0);
        return this;
    };
    /**
     * 设置相对值
     * @param size
     * @returns {BaseModel}
     */
    BaseModel.prototype.setSize = function (size) {
        this.size[0] *= size.XSize;
        this.size[1] *= size.YSize;
        this.point[0] *= size.XSize;
        this.point[1] *= size.YSize;
        return this;
    };
    /**
     * 设置旋转角度
     * @param angle
     * @returns {BaseModel}
     */
    BaseModel.prototype.setRotate = function (angle) {
        this.angle = angle * Math.PI / 180;
        return this;
    };

    /**
     * 设置图片地址
     * @param src
     * @returns {BaseModel}
     */
    BaseModel.prototype.setImgSrc = function (src) {
        var image = new Image() , _self = this;
        image.onload = function () {
            _self.Image = image;
        };
        image.src = src;
        return this;
    };
    /**
     * 设置图片切割位置
     * @param x
     * @param y
     * @param dx
     * @param dy
     * @returns {BaseModel}
     */
    BaseModel.prototype.reactImg = function (x, y, dx, dy) {
        this.react = this.react || [];
        this.react[0] = x;
        this.react[1] = y;
        this.react[2] = dx;
        this.react[3] = dy;
        return this;
    };
    /**
     * 从Game中移除model
     * @param GameArr
     * @returns {BaseModel}
     */
    BaseModel.prototype.removeModel = function (GameArr) {
        this.removeModel = function () {
            for (var i = GameArr.length - 1; i >= 0; i--) {
                if (GameArr[i] === this) {
                    GameArr.splice(i, 1);
                    break;
                }
            }
            return this;
        };
        return this;
    };
    /**
     * 移除model
     * @returns {BaseModel}
     */
    BaseModel.prototype.removeGameDraw = function () {
        this.removeModel(null);
        return this;
    };
    /**
     * 清理不需要的模型
     * @returns {BaseModel}
     */
    BaseModel.prototype.clearAbandonedModel = function () {
        Game.stop();
        for (var i = this.clearModelCache.length - 1; i >= 0; i--) {
            this.clearModelCache[i].removeGameDraw();
            this.clearModelCache.splice(i, 1);
        }
        Game.Run();
        return this;
    };
    /**
     * 添加不需要的模型到缓存 方便一次性清理
     * @param model
     * @returns {BaseModel}
     */
    BaseModel.prototype.putClearModel = function (model) {
        this.clearModelCache.push(model);
        if (this.clearModelCache.length > 1500) this.clearAbandonedModel();
        return this;
    };

    /**
     * 碰撞检测
     * @param model
     * @returns {boolean}
     */
    BaseModel.prototype.collisionDetection = function(model){
        var point1 = [this.point[0]+this.size[0]/2,this.point[1]+this.size[1]/2] , point2 = [model.point[0]+model.size[0]/2,model.point[1]+model.size[1]/2],
            nowWidth = Math.abs(point1[0]-point2[0]),nowHeight = Math.abs(point1[1]-point2[1]),
            minWidth =  Math.abs((this.size[0] + model.size[0])/2) , minHeight =  Math.abs((this.size[1] + model.size[1])/2);
        if(nowWidth >= minWidth || nowHeight >= minHeight) return false;
        return true;
    };

    return BaseModel;
});
/**
 * Created by Administrator on 2016/2/21.
 */
app.LoadFile({key: 'ComputerTack', fileList: ['custom/GameModel/moveModel/Tack/TackModel.js']
}, function (TackModel) {
    function ComputerTack(x, y, XSize, YSize , position) {
        TackModel.call(this, x, y, XSize, YSize , position);
    }
    ComputerTack.extend(TackModel);
    /**
     * 检测边界
     * @param point
     * @constructor
     */
    ComputerTack.prototype.BoundaryDetection = function (point) {
        /*{UPPER: 'upper', ALSO: 'also', LOWER: "lower", LEFT: 'left'}*/
        if (point[0] > this.maxMove[0] - this.size[0]){
            this.setDirection('LOWER');
            point[0] = this.maxMove[0] - this.size[0];
        }
        else if (point[0] < 0){
            this.setDirection('UPPER');
            point[0] = 0;
        }
        if (point[1] > this.maxMove[1] - this.size[1]){
            this.setDirection('LEFT');
            point[1] = this.maxMove[1] - this.size[1];
        }
        else if (point[1] < 0){
            this.setDirection('ALSO');
            point[1] = 0;
        }
        return this;
    };
    return ComputerTack;
});
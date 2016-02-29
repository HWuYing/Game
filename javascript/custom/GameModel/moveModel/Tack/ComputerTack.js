/**
 * Created by Administrator on 2016/2/21.
 */
app.LoadFile({key: 'ComputerTack', fileList: ['custom/GameModel/moveModel/Tack/TackModel.js']
}, function (TackModel) {
    function ComputerTack(x, y, XSize, YSize , position) {
        TackModel.call(this, x, y, XSize, YSize , position);
        this.FireBulletKey = 'DOWN';
    }
    ComputerTack.extend(TackModel);
    /**
     * 绘制完成后调用
     * @returns {ComputerTack}
     */
    ComputerTack.prototype.drawCallBack = function () {
        this.move().testingFireBull().randomKey();
        return this;
    };

    ComputerTack.prototype.randomKey = function(){
        var keyDownFn = this.proxyKeyFn('keydown'), oldKey, FireBulletCount = 0 ,
            keyUpFn = this.proxyKeyFn('keyup') , directionCount = 0
            , directionNumber = 10;
        this.randomKey = function(){
            var keyCode , FireBulletKeyCode = Math.floor(Math.random() * 100 % 5 + 81);
            directionCount++,FireBulletCount++;
            if(FireBulletKeyCode == 83 && FireBulletCount >= 100){
                keyDownFn(FireBulletKeyCode);
                FireBulletCount = 0;
            }else keyUpFn(FireBulletKeyCode);
            if(directionCount >= directionNumber) {
                directionCount = 0;
                directionNumber = Math.floor(Math.random() * 100) % 20 + 50;
                keyCode = Math.floor(Math.random() * 40) % 4 + 37;
                if (oldKey) keyUpFn(oldKey);
                keyDownFn(keyCode);
                oldKey = keyCode;
            }
            return this;
        };
        this.randomKey();
        return this;
    };
    return ComputerTack;
});
/**
 * Created by Administrator on 2016/2/21.
 */
app.LoadFile({key: 'ComputerTack', fileList: ['custom/GameModel/moveModel/Tack/TackModel.js']
}, function (TackModel) {
    function ComputerTack(x, y, XSize, YSize , position) {
        TackModel.call(this, x, y, XSize, YSize , position);
    }
    ComputerTack.extend(TackModel);
    return ComputerTack;
});
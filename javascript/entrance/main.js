/**
 * Created by Administrator on 2016/2/21.
 */
(function () {
    app.LoadFile(['custom/Game.js', 'custom/GameModel/BgModel.js',
        'custom/GameModel/moveModel/Tack/TackModel.js',
        'custom/GameModel/moveModel/Tack/ComputerTack.js',
        'custom/GameModel/obstacle/SteelPlate.js',
        'custom/GameModel/obstacle/Brick.js',
        'custom/GameModel/obstacle/Boss.js',
        'custom/keyManager.js'], function (Game, BgModel, TackModel ,ComputerTack, SteelPlate, Brick, Boss,keyManager) {
        var cGame, baseUrl = app.getValue('baseUrl'), MapArr = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0],
            [0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0],
            [0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0],
            [0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0],
            [0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 1, 1, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0],
            [0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 1, 1, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0],
            [0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0],
            [0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0],
            [0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 2, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2],
            [1, 1, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0],
            [0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0],
            [0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0],
            [0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0],
            [0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0],
            [0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0],
            [0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 9, 9, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 9, 9, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        app.regValue('MapArr', MapArr);
        function createGameModel(GameType, row, col) {
            var GameModelRealization;
            switch (GameType) {
                case 0:
                    break;
                case 1:
                    GameModelRealization = new SteelPlate(col * 15, row * 15, 15, 15, 2).setImgSrc(baseUrl + 'images/za-001.png');
                    break;
                case 2:
                    GameModelRealization = new Brick(col * 15, row * 15, 15, 15, 2).setImgSrc(baseUrl + 'images/qiang.png');
                    break;
                case 9:
                    GameModelRealization = new Boss(col * 15, row * 15, 30, 30, 2).setImgSrc(baseUrl + 'images/BOSS.png');
                    break;
            }
            return GameModelRealization;
        }

        Game.config({runTime: 20});
        cGame = Game(document.querySelector('#main'), 390, 390);
        cGame.putGameModel(new BgModel(0, 0, 390, 390, 1).drawType('solidColor', {}));
        /*{UPPER: 'upper', ALSO: 'also', LOWER: "lower", LEFT: 'left'}*/
        var Tack001 = new TackModel(120 , 360 , 30, 30, 20).setDistance(3, 3)
            .setImgSrc(baseUrl + 'images/Tack.png').setGame(cGame).setMap(MapArr).setDirection('UPPER');
        cGame.putGameModel(Tack001);
        keyManager.listenKeyDown(Tack001.proxyKeyFn('keydown')).listenKeyUp(Tack001.proxyKeyFn('keyup'));
        (function () {
            for (var i = 0; i < 1; i++) {
                cGame.putGameModel(new ComputerTack(i * 30 % 360, (i + 1) * 330 % 360, 30, 30, 20).setDistance((i + 1) * 3, (i + 1) * 3)
                    .setImgSrc(baseUrl + 'images/Tack.png').setGame(cGame).setMap(MapArr).setDirection('UPPER'));
            }
        })();
        (function () {
            var arr, GameModelRealization;
            for (var i = 0, ii = MapArr.length; i < ii; i++) {
                arr = MapArr[i];
                for (var j = 0, jj = arr.length; j < jj; j++) {
                    if ((arr[j] == 9 && (MapArr[i - 1][j] == 9 || arr[j - 1] == 9)) || arr[j] == 0)continue;
                    GameModelRealization = createGameModel(arr[j], i, j);
                    if (arr[j] != 9) arr[j] = GameModelRealization;
                    if (GameModelRealization)cGame.putGameModel(GameModelRealization);
                }
            }
        })();

        Game.Run();
        //setTimeout(Game.stop, 1000);
    });
})();

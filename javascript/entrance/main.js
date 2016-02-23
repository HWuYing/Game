/**
 * Created by Administrator on 2016/2/21.
 */
(function(){
    app.LoadFile(['custom/Game.js' , 'custom/GameModel/BgModel.js',
        'custom/GameModel/moveModel/Tack/ComputerTack.js',
        'custom/GameModel/obstacle/SteelPlate.js'],function(Game,BgModel,ComputerTack,SteelPlate){
        var panArr = [
            [0 , 0 , 1 , 1 , 0 , 0 , 1 , 1 , 0 , 0,1 , 1 , 0 , 0 , 1 , 1 , 0 , 0 , 0 , 1, 0 , 1 , 0 , 0 , 1 , 1],
            [0 , 0 , 1 , 1 , 0 , 0 , 1 , 1 , 0 , 0,1 , 1 , 0 , 0 , 1 , 1 , 0 , 0 , 0 , 1, 0 , 1 , 0 , 0 , 1 , 1],
<<<<<<< HEAD
            [0 , 0 , 1 , 1 , 0 , 0 , 0 , 0 , 0 , 0,1 , 0 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , 1, 0 , 1 , 0 , 0 , 1 , 1],
            [0 , 0 , 1 , 0 , 0 , 0 , 1 , 1 , 0 , 0,1 , 1 , 0 , 0 , 1 , 1 , 0 , 0 , 0 , 1, 0 , 1 , 0 , 0 , 1 , 1],
            [0 , 0 , 1 , 1 , 0 , 0 , 1 , 1 , 0 , 0,1 , 1 , 0 , 0 , 1 , 1 , 0 , 0 , 0 , 1, 0 , 1 , 0 , 0 , 1 , 1],
            [0 , 0 , 1 , 1 , 0 , 0 , 1 , 1 , 0 , 0,0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0, 0 , 1 , 0 , 0 , 1 , 1],
            [0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0,1 , 1 , 0 , 0 , 1 , 1 , 0 , 0 , 0 , 1, 0 , 1 , 0 , 0 , 1 , 1],
            [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0,1 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1, 0 , 1 , 0 , 0 , 1 , 1],
            [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0,1 , 1 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , 1, 0 , 1 , 0 , 0 , 1 , 1],
            [0 , 0 , 1 , 1 , 0 , 0 , 1 , 1 , 0 , 0,1 , 1 , 0 , 0 , 1 , 1 , 0 , 0 , 0 , 1, 0 , 1 , 0 , 0 , 1 , 1],
            [0 , 0 , 1 , 1 , 0 , 0 , 1 , 1 , 0 , 0,1 , 1 , 0 , 0 , 1 , 1 , 0 , 0 , 0 , 1, 0 , 1 , 0 , 0 , 1 , 1],
            [0 , 0 , 1 , 1 , 0 , 0 , 1 , 1 , 0 , 0,1 , 1 , 0 , 0 , 1 , 0 , 0 , 0 , 0 , 1, 0 , 1 , 0 , 0 , 1 , 1],
            [0 , 0 , 1 , 1 , 0 , 0 , 1 , 1 , 0 , 0,1 , 1 , 0 , 0 , 1 , 1 , 0 , 0 , 0 , 1, 0 , 0 , 0 , 0 , 1 , 1]
=======
            [0 , 0 , 1 , 1 , 0 , 0 , 1 , 1 , 0 , 0,1 , 1 , 0 , 0 , 1 , 1 , 0 , 0 , 0 , 1, 0 , 1 , 0 , 0 , 1 , 1],
            [0 , 0 , 1 , 1 , 0 , 0 , 1 , 1 , 0 , 0,1 , 1 , 0 , 0 , 1 , 1 , 0 , 0 , 0 , 1, 0 , 1 , 0 , 0 , 1 , 1],
            [0 , 0 , 1 , 1 , 0 , 0 , 1 , 1 , 0 , 0,1 , 1 , 0 , 0 , 1 , 1 , 0 , 0 , 0 , 1, 0 , 1 , 0 , 0 , 1 , 1],
            [0 , 0 , 1 , 1 , 0 , 0 , 1 , 1 , 0 , 0,1 , 1 , 0 , 0 , 1 , 1 , 0 , 0 , 0 , 1, 0 , 1 , 0 , 0 , 1 , 1],
            [0 , 0 , 1 , 1 , 0 , 0 , 1 , 1 , 0 , 0,1 , 1 , 0 , 0 , 1 , 1 , 0 , 0 , 0 , 1, 0 , 1 , 0 , 0 , 1 , 1],
            [0 , 0 , 1 , 1 , 0 , 0 , 1 , 1 , 0 , 0,1 , 1 , 0 , 0 , 1 , 1 , 0 , 0 , 0 , 1, 0 , 1 , 0 , 0 , 1 , 1],
            [0 , 0 , 1 , 1 , 0 , 0 , 1 , 1 , 0 , 0,1 , 1 , 0 , 0 , 1 , 1 , 0 , 0 , 0 , 1, 0 , 1 , 0 , 0 , 1 , 1],
            [0 , 0 , 1 , 1 , 0 , 0 , 1 , 1 , 0 , 0,1 , 1 , 0 , 0 , 1 , 1 , 0 , 0 , 0 , 1, 0 , 1 , 0 , 0 , 1 , 1],
            [0 , 0 , 1 , 1 , 0 , 0 , 1 , 1 , 0 , 0,1 , 1 , 0 , 0 , 1 , 1 , 0 , 0 , 0 , 1, 0 , 1 , 0 , 0 , 1 , 1],
            [0 , 0 , 1 , 1 , 0 , 0 , 1 , 1 , 0 , 0,1 , 1 , 0 , 0 , 1 , 1 , 0 , 0 , 0 , 1, 0 , 1 , 0 , 0 , 1 , 1],
            [0 , 0 , 1 , 1 , 0 , 0 , 1 , 1 , 0 , 0,1 , 1 , 0 , 0 , 1 , 1 , 0 , 0 , 0 , 1, 0 , 1 , 0 , 0 , 1 , 1]
>>>>>>> origin/master
        ];
        var cGame , baseUrl = app.getValue('baseUrl');
        function createGameModel(GameType , row , col){
            var GameModelRealization;
            switch (GameType){
                case 0:break;
                case 1:GameModelRealization = new SteelPlate(col*15,row*30,15,30,2).setImgSrc(baseUrl+'images/za.png');break;
            }
            return GameModelRealization;
        }
        Game.config({runTime:30});
        cGame = Game(document.querySelector('#main') , 390 , 390);
        cGame.putGameModel(new BgModel(0,0,400,400,1).drawType('solidColor' , {}));
        cGame.putGameModel(new ComputerTack(0,0,30,30,99).reactImg(24,48,37,37).setDistance(0,2).setImgSrc(baseUrl + 'images/Tack.png'));
        (function(){
            var arr , GameModelRealization;
            for(var i = 0 , ii = panArr.length ; i < ii ; i++){
                arr = panArr[i];
                for(var j = 0 , jj = arr.length ; j < jj;j++){
                    GameModelRealization = createGameModel(arr[j] , i ,j);
                    if(GameModelRealization)cGame.putGameModel(GameModelRealization);
                }
            }
        })();

        Game.Run();
//        setTimeout(Game.stop , 1000);
    });
})();

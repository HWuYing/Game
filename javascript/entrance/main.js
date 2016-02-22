/**
 * Created by Administrator on 2016/2/21.
 */
(function(){
    app.LoadFile(['custom/Game.js' , 'custom/GameModel/TestModel.js'],function(Game,TestModel){
        var cGame;
        Game.config({runTime:100});
        cGame = Game(document.querySelector('#main') , 400 , 400);
        cGame.putGameModel(new TestModel(0,0,30,30));
        Game.Run();
        setTimeout(Game.stop , 90000);
    });
})();

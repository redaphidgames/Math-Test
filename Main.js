/** @define {string} */
var BUILD = "debug";


(function(){

/**
* Main class of the app.
*/
function Main(){}

/**
* Entry point of the app.
*/
Main.main = function() {
	var main = new Main();
	var titleView;
	if (!window.HTMLCanvasElement)
	{
		alert("Your browser does not support HTML5 Canvas.");
		return;
	}
	else {
		main.initialize();
		main.start();
	} 
	// entry point
}

/**
* Initializes the basics of the app.
*/
Main.prototype.initialize = function() {
	/**
	* mainCanvas
	*/
	this.mainCanvas = document.getElementById("mainCanvas");
	/**
	* mainStage
	*/
	this.mainStage = new createjs.Stage(this.mainCanvas);
	this.mainStage.snapToPixelsEnabled = true;
	/*
	* createjs
	*/
	createjs.Ticker.addEventListener("tick", this.tick.bind(this));
	createjs.Ticker.setFPS(30);
	
	createjs.Touch.enable(this.mainStage);		//ios touchable
	
	this.titleView = new TitleView();
	this.titleView.setupView();
	this.titleView.playBtn.addEventListener("mousedown", this.playGame.bind(this));

	this.mainStage.addChild(this.titleView.viewContainer);
	
	this.gameView = new GameView();
	this.gameView.setupView();
	
	this.gameCtrl = new GameCtrl();
	this.gameCtrl.setView(this.gameView);
	this.gameCtrl.setMain(this);
	
	this.winView = new WinView();
	this.winView.setupView();
	this.winView.playBtn.addEventListener("mousedown", this.restartGame.bind(this));
	this.winView.menuBtn.addEventListener("mousedown", this.showMenu.bind(this));

	this.scores = [];
	this.mainStage.update();
}

Main.prototype.start = function() {
	
	this.mainStage.addChild(TitleView.viewContainer);
	//this.resizeCanvas();
}

Main.prototype.playGame = function() {
	
	this.mainStage.removeChild(this.titleView.viewContainer);
	this.mainStage.addChild(this.gameView.viewContainer);
	this.gameCtrl.setupGame();
}

Main.prototype.showWin = function() {
	this.mainStage.removeChild(this.gameView.viewContainer);
	this.winView.showView(this.scores);
	this.scores = [];
	this.mainStage.addChild(this.winView.viewContainer);
}
Main.prototype.showMenu = function() {
	this.mainStage.removeChild(this.winView.viewContainer);
	this.mainStage.addChild(this.titleView.viewContainer);
}

Main.prototype.restartGame = function() {
	this.mainStage.removeChild(this.winView.viewContainer);
	this.mainStage.addChild(this.gameView.viewContainer);
	this.gameCtrl.setupGame();
}
Main.prototype.saveScore = function (add1, add2, ans) {
	this.scores.push({a1:add1, a2:add2, an:ans});
}
Main.prototype.resizeCanvas = function () {

	//logIt("resizeCanvas>" + canvas.parentElement.clientWidth + "|" + jQuery( "article" ).width()+ "|" +  scale + "|" + exportRoot.bkgd);

	this.mainCanvas.width = this.mainCanvas.parentElement.clientWidth;
	this.mainCanvas.height = this.mainCanvas.parentElement.clientHeight; 
	var scale = this.mainCanvas.width / 720; 
	//this.mainStage.scaleX = this.mainStage.scaleY = scale;

}
/**
* Updates the stage on Ticker tick.
* @param event The recieved tick event.
*/
Main.prototype.tick = function(event)
{
	this.mainStage.update();
}

/**
* Expose class.
*/
window.Main = Main;

})();

var TitleView = function () {

	this.playBtn;
	this.viewContainer;
};

TitleView.prototype.setupView = function() {
	this.viewContainer = new createjs.Container();
	
	this.playBtn = new createjs.Shape();
	this.playBtn.graphics.beginFill("#556");
	this.playBtn.graphics.drawRect(0,0,320,50);

	this.viewContainer.addChild(this.playBtn);
	this.playBtn.x = 0;
	this.playBtn.y = 150;
	
	txt = new createjs.Text("Play", "20px Arial", "#fff");
	txt.x = this.playBtn.x + 25;
	txt.y = this.playBtn.y + 15;
	this.viewContainer.addChild(txt);
}

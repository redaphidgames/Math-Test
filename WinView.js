var WinView = function () {

	this.summary;
	this.playBtn;
	this.menuBtn;
	this.viewContainer;
};

WinView.prototype.setupView = function() {
	this.viewContainer = new createjs.Container();
	
	this.summary = new createjs.Text("YOU WON!", "16px Arial", "#ccd");
	this.summary.textAlign = "right";
	this.summary.x = 310;
	this.summary.y = 50;
	this.viewContainer.addChild(this.summary);
	
	this.playBtn = new createjs.Shape();
	this.playBtn.graphics.beginFill("#228");
	this.playBtn.graphics.drawRect(0,0,320,50);

	this.viewContainer.addChild(this.playBtn);
	this.playBtn.x = 0;
	this.playBtn.y = 150;
	
	txt = new createjs.Text("Play Again", "20px Arial", "#fff");
	txt.x = this.playBtn.x + 25;
	txt.y = this.playBtn.y + 15;
	this.viewContainer.addChild(txt);
	
	this.menuBtn = new createjs.Shape();
	this.menuBtn.graphics.beginFill("#228");
	this.menuBtn.graphics.drawRect(0,0,320,50);
	this.menuBtn.x = 0;
	this.menuBtn.y = this.playBtn.y + 60;
	this.viewContainer.addChild(this.menuBtn);
	
	txt = new createjs.Text("Menu", "20px Arial", "#fff");
	txt.x = this.menuBtn.x + 25;
	txt.y = this.menuBtn.y + 15;
	this.viewContainer.addChild(txt);
};

WinView.prototype.showView = function(scores) {
	
	this.summary.text = "";
	for (var i=0; i < scores.length; i++) {
		score = scores[i];
		if (score.a1 + score.a2 == score.an) {
			results = " [Correct!]";
		} else {
			results = " (" + score.an + ") [Wrong]";
		}
		ans = Number(score.a1) + Number(score.a2);
		this.summary.text += score.a1 + " + " + score.a2 + " = " + ans + results + "\n";
	}
}


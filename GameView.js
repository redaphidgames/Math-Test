var GameView = function () {

	this.RIGHT_MARGIN = 280;
	this.playBtn;
	this.viewContainer;
	this.targets;
	this.targetsContainer;
	this.addends;
	this.draggers = [];
};

GameView.prototype.setupView = function() {
	this.DRAGGER_SPACE = 2;
	this.viewContainer = new createjs.Container();
	
	this.addends = new createjs.Text("Addends", "60px Arial", "#DDD");
	this.addends.textAlign = "right";
	this.addends.x = this.RIGHT_MARGIN;
	this.addends.y = 50;
	this.viewContainer.addChild(this.addends);
	
	this.resultMsg = new createjs.Text("Drag numbers", "40px Arial", "#DDD");
	this.resultMsg.textAlign = "center";
	this.resultMsg.x = 160; 
	this.resultMsg.y = 390;
	this.viewContainer.addChild(this.resultMsg);

	this.targetsContainer = new createjs.Container();		//Holds drop targets
	this.viewContainer.addChild(this.targetsContainer);
	
	margin = 330 - this.RIGHT_MARGIN; //((window.BOX_SIZE + this.DRAGGER_SPACE) * 4) / 3;
	
	//Create draggers
	for (var i = 0; i < 10; i++) {
		
		cont = new createjs.Container();
		cont.name = "" + i;  				//set to digit
		d = new createjs.Shape();
		d.graphics.beginFill("#87d");
		d.graphics.drawRect(0,0,window.BOX_SIZE,window.BOX_SIZE);
		txt = new createjs.Text(i, "32px Arial", "#fff");
		txt.textAlign = "center";
		cont.addChild(d);
		txt.x =+ window.BOX_SIZE / 2;
		txt.y =  5;

		cont.addChild(txt);
		this.viewContainer.addChild(cont);
		if (i < 5) {
			cont.x = margin + i * ( window.BOX_SIZE + this.DRAGGER_SPACE);
		} else {
			cont.x = margin + (i - 5) * ( window.BOX_SIZE + this.DRAGGER_SPACE);
		}
		cont.y = 250 + (window.BOX_SIZE + 4) * Math.round(i/10);

		cont.origX = cont.x;  //to return after dragging;
		cont.origY = cont.y;
		
		cont.addEventListener("mousedown", function (evt) {
			// bump the target in front of its siblings:
			var o = evt.target.parent;
			o.parent.addChild(o);
			o.offset = {x: o.x - evt.stageX, y: o.y - evt.stageY};
		});

		// the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
		cont.addEventListener("pressmove", this.dragTest.bind(this));
		this.draggers[i] = cont;
	}
}
GameView.prototype.dragTest = function(evt) {
	
	var o = evt.target.parent;
	o.x = evt.stageX + o.offset.x;
	o.y = evt.stageY + o.offset.y - 30;
	
	//Show Rollover
	this.unRoll();  //Make sure nothing shows rolled over
	
	//Just check Y first
	if (o.y > this.targets[0].y - window.BOX_SIZE && o.y < this.targets[0].y + window.BOX_SIZE) {
		var targetNum = this.targets.length;
		for (var i = 0; i < targetNum; i++) {
			target = this.targets[i];
			if (o.x > target.x - window.BOX_SIZE && o.x < target.x + window.BOX_SIZE ) {
				//Check which is closer
				if (i == 0) {
					if (o.x < target.x + window.BOX_SIZE / 2) {
						this.rollOn(target);
						break;
					}
				} else if (i == this.targets.length - 1) {
					if (o.x > target.x - window.BOX_SIZE / 2) {
						this.rollOn(target);
						break;
					}
				} else if (o.x < target.x + (window.BOX_SIZE/2) ) {  //make sure is close to this target than next
					this.rollOn(target);
					break;
				}
			}
		}
	}
}
GameView.prototype.rollOn = function(target) {
	target.alpha = .5;
}
GameView.prototype.unRoll = function(func) {
	for (var i = 0; i < this.targets.length; i++) {
		this.targets[i].alpha = 1;
	}
}
GameView.prototype.setDropTest = function(func) {
	
	for (var i = 0; i < 10; i++) {
		this.draggers[i].addEventListener("pressup", func);
	}
}
GameView.prototype.setupLevel = function(add1, add2) {
	
	digs = this.numDigits(add1 + add2);
	this.addends.text = add1 + "\n+ " + add2;
	this.removeTargets();
	this.createTargets(digs);
	this.setMsg("Good luck");
}
GameView.prototype.removeTargets = function(digs) {
	this.targets = [];
	while (this.targetsContainer.numChildren > 0) {
		this.targetsContainer.removeChildAt(0);
	}
}
GameView.prototype.createTargets = function(digs) {
	
	for (var i=0; i < digs; i++) {
		
		t = new createjs.Shape();
		t.name = i;
		t.graphics.beginFill("#eee");
		t.graphics.drawRect(0,0, window.BOX_SIZE, window.BOX_SIZE);
		this.targetsContainer.addChild(t);
		t.x = this.RIGHT_MARGIN - ((digs - i) *  (window.BOX_SIZE + this.DRAGGER_SPACE));
		t.y = 180;

		t.textObj =  new createjs.Text("", "30px Arial", "#F22");
		t.textObj.textAlign = "center";
		t.textObj.x = t.x + window.BOX_SIZE / 2;
		t.textObj.y = t.y + 6;
		this.targetsContainer.addChild(t.textObj);
		
		this.targets[i] = t;
	}
}

GameView.prototype.dropTargetValue = function(dIdx, tIdx) {
	
	this.targets[tIdx].textObj.text = dIdx;
}

GameView.prototype.setMsg = function(msg) {
	this.resultMsg.text = msg;
}

GameView.prototype.returnDragger = function(dIdx) {
	dragger = this.draggers[dIdx];
	dragger.x = dragger.origX;
	dragger.y = dragger.origY;
}

GameView.prototype.numDigits = function(number) {
    digits = 0;
    if (number < 10) return(1); // remove this line if '-' counts as a digit
    while (number) {
        number = parseInt(number / 10);
        digits++;
    }
    return digits;
}


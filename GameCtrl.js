var GameCtrl = function () {

	this.LEVELS = 5;
	this.MAX_ADDEND = 11111;
	this.view;
	this.main;
	this.levelCtr;
};

GameCtrl.prototype.setView = function(view) {
	this.view = view;
	this.view.setDropTest(this.dropTest.bind(this));
}
GameCtrl.prototype.setupView = function() {
}
GameCtrl.prototype.setupGame = function() {
	this.createNewLevel();
	this.levelCtr = 0;
}
GameCtrl.prototype.createNewLevel = function() {
	this.setupLevel(this.genNum(), this.genNum());
}
GameCtrl.prototype.genNum = function() {
	return(Math.floor(Math.random() * 99 * Math.round(Math.random()) + 
		Math.random() * 555 * Math.round(Math.random()) + 
		Math.random() * 5555 * Math.round(Math.random()) +
		Math.random() * 55555 * Math.round(Math.random())
	) + 10);
}
GameCtrl.prototype.setMain = function(m) {
	this.main = m;
}
GameCtrl.prototype.dropTest = function(evt) {
	droppedWidth = evt.target.width;
	dropped = evt.target.parent;
	targets = this.view.targets;
	hit = false;
	this.view.unRoll();
	//Just check first one for y since in a row
	if (dropped.y > targets[0].y - window.BOX_SIZE && dropped.y < targets[0].y + window.BOX_SIZE) {
		for (var i = 0; i < targets.length; i++) {
			target = targets[i];

			if (dropped.x > target.x - window.BOX_SIZE && dropped.x < target.x + window.BOX_SIZE ) {
				//Check which is closer
				if (i == 0) {
					if (dropped.x < target.x + window.BOX_SIZE / 2) {
						this.finishDrop(dropped.name, i);
						hit = true;
						break;
					}
				} else if (i == targets.length - 1) {
					if (dropped.x > target.x - window.BOX_SIZE / 2) {
						this.finishDrop(dropped.name, i);
						hit = true;
						break;
					}
				} else {
					this.finishDrop(dropped.name, i);
					hit = true;
					break;
				}
			}
		}
		
	}
	this.view.returnDragger(dropped.name);
}
GameCtrl.prototype.finishDrop = function(dIdx, tIdx) {
	this.view.dropTargetValue(dIdx, tIdx);  //index is same as value
	this.checkAnswer();
	
}
GameCtrl.prototype.setupLevel = function(add1, add2) {
	//randomize here
	this.view.setupLevel(add1, add2);
	this.add1 = add1;
	this.add2 = add2;
	this.answer = add1 + add2;
	
}
GameCtrl.prototype.checkAnswer = function() {
	targets = this.view.targets;
	targetAnswer = 0;
	for (var i = 0; i < targets.length; i++) {
		if (!isNaN(targets[i].textObj.text) && targets[i].textObj.text != "") {
			targetAnswer += targets[i].textObj.text * Math.pow(10,  targets.length - i - 1);
		} else {
			//invalid number, just return
			return false;
		}
	}
	if (targetAnswer == this.answer) {
		this.view.setMsg("GOOD JOB !");
	} else {
		this.view.setMsg("WRONG");
	}
	setTimeout(this.checkLevel.bind(this), 2000);
	this.main.saveScore(this.add1, this.add2, targetAnswer);
	return true;
}
GameCtrl.prototype.checkLevel = function() {
	
	this.levelCtr++;
	if (this.levelCtr >= this.LEVELS) {
		this.main.showWin();
	} else {
		this.createNewLevel();
	}
}

//Access variables in view

// 歩兵
class Fu extends Frame {

	constructor(x, y, has_turn,field) {
		super(1, x, y, has_turn,field);
		this.nariText = "と";
	}

	// 歩兵のみ変更
	notFieldMove(){
		let move_cells = [];
		let fu_cells = [];
		for(let x = 0; x < 9; x++){
			// x座標に歩兵が存在を確認
			let is_fu = false;
			for(let y = 0; y < 9; y++){
				let frame = board[x][y]
				if(frame.type == 1 && frame.nari == false && board[x][y].turn == turn){
					is_fu = true;
				}
			}
			if(is_fu){
				fu_cells.push(x)
			}
		}
		for(let x = 0; x < 9; x++){
			if(fu_cells.includes(x) == false){
				for(let y = 0; y < 9; y++){
					if(board[x][y] == 0) {
						move_cells.push([x, y])
					}
				}

			}
		}
		return move_cells;
	}

	// 成りではない状態
	normalMove() {
		if(this.turn == 1) {
			var move_cell=[[this.x, (this.y - 1)]]
		}else{
			var move_cell =[ [this.x, (this.y + 1)]]
		}
		return this.checkCellFrame(move_cell);
	}

}

class Kyosha extends Frame {
	
	constructor(x, y, has_turn, field){
		super(2, x, y, has_turn,field);
		this.nariText = "香";
	}

	// 成りではない状態
	normalMove() {
		var move_cell = [];
		if(this.turn == 1) {
			let y = 1;
			while(y < 9 ){
				if(this.y  - y  >= 0){
					move_cell.push([this.x, (this.y - y)])
				}
				y++;
			}
		}else{
			let y = 1;
			while(y < 9){
				move_cell.push([this.x, (this.y + y)])
				y++;
			}
		}
		return this.checkCellFrame(move_cell);
	}
}

class Kema extends Frame {
	
	constructor(x, y, has_turn, field){
		super(3, x, y, has_turn,field);
		this.nariText = "桂";
	}

	// 成りではない状態
	normalMove() {
		var move_cell = [];
		if(this.turn == 1) {
			let first = [(this.x + 1), (this.y - 2)];
			let second = [(this.x - 1), (this.y - 2)];
			move_cell.push(first);
			move_cell.push(second);
		}else{
			let first = [(this.x + 1), (this.y + 2)];
			let second = [(this.x - 1), (this.y + 2)];
			move_cell.push(first);
			move_cell.push(second);
		}
		return this.checkCellFrame(move_cell);
	}
}

class Gin extends Frame {
	
	constructor(x, y, has_turn, field){
		super(4, x, y, has_turn,field);
		this.nariText = "銀";
	}

	// 成りではない状態
	normalMove() {
		var move_cell = [];
		if(this.turn == 1) {
			for(let x = -1; x <= 1; x++){
			for(let y = -1; y <= 1; y++){
				if(x == 0 && y == 0){ continue; }
				if(x == -1 && y == 0){ continue; }
				if(x == 1 && y == 0){ continue; }
				if(x == 0 && y == 1){ continue; }
				move_cell.push([(this.x + x), (this.y + y)])
			}
			}
		}else{
			for(let x = -1; x <= 1; x++){
			for(let y = -1; y <= 1; y++){
				if(x == 0 && y == 0){ continue; }
				if(x == -1 && y == 0){ continue; }
				if(x == 1 && y == 0){ continue; }
				if(x == 0 && y == -1){ continue; }
				move_cell.push([(this.x + x), (this.y + y)])
			}
			}
		}
		return this.checkCellFrame(move_cell);
	}
}

class Kin extends Frame {
	
	constructor(x, y, has_turn, field){
		super(5, x, y, has_turn,field);
		this.nariText = "金";
	}

	// 成りではない状態
	normalMove() {
		return this.kinMoveCell();
	}
}

class Hisha extends Frame {
	
	constructor(x, y, has_turn, field){
		super(6, x, y, has_turn,field);
		this.nariText = "飛";
	}

	// 成りではない状態
	normalMove() {
		var move_cell = [];
		for(let x = -1; x <= 1; x++){
		for(let y = -1; y <= 1; y++){
			if(x == 0 && y == 0){ continue; }
			if(x == -1 && y == -1){ continue; }
			if(x == 1 && y == 1){ continue; }
			if(x == -1 && y == 1){ continue; }
			if(x == 1 && y == -1){ continue; }
			let _x = this.x + x;
			let _y = this.y + y;
			while(_x < 9 && _x >= 0 &&  _y < 9 && _y >= 0) {
				move_cell.push([_x, _y])
				_x += x; _y += y;
			}
		}
		}
		return this.checkCellFrame(move_cell);
	}

	// 成りの状態
	nariMove(){
		var move_cell = [];
		for(let x = -1; x <= 1; x++){
		for(let y = -1; y <= 1; y++){
			if(x == 0 && y == 0){ continue; }
			// 縦横の4マスを追加
			if(x == -1 && y == -1){ 
				move_cell.push([(this.x + x), (this.y + y)])
				continue;
			}
			if(x == 1 && y == 1){ 
				move_cell.push([(this.x + x), (this.y + y)])
				continue;
			}
			if(x == -1 && y == 1){
				move_cell.push([(this.x + x), (this.y + y)])
				continue;
			}
			if(x == 1 && y == -1){
				move_cell.push([(this.x + x), (this.y + y)])
				continue; 
			}
			let _x = this.x + x;
			let _y = this.y + y;
			while(_x < 9 && _x >= 0 &&  _y < 9 && _y >=  0) {
				move_cell.push([_x, _y])
				_x += x; _y += y;
			}
		}
		}
		console.log(move_cell)
		return this.checkCellFrame(move_cell);
	}
}

class Kaku extends Frame {
	
	constructor(x, y, has_turn, field){
		super(7, x, y, has_turn,field);
		this.nariText = "角";
	}

	// 成りではない状態
	normalMove() {
		var move_cell = [];
		for(let x = -1; x <= 1; x++){
		for(let y = -1; y <= 1; y++){
			if(x == 0 && y == 0){ continue; }
			if(x == -1 && y == 0){ continue; }
			if(x == 1 && y == 0){ continue; }
			if(x == 0 && y == -1){ continue; }
			if(x == 0 && y == 1){ continue; }
			let _x = this.x + x;
			let _y = this.y + y;
			while(_x < 9 && _x >= 0 &&  _y < 9 && _y >= 0) {
				move_cell.push([_x, _y])
				_x += x; _y += y;
			}
		}
		}
		return this.checkCellFrame(move_cell);
	}

	// 成りの状態
	nariMove(){
		var move_cell = [];
		for(let x = -1; x <= 1; x++){
		for(let y = -1; y <= 1; y++){
			if(x == 0 && y == 0){ continue; }
			// 縦横の4マスを追加
			if(x == -1 && y == 0){ 
				move_cell.push([(this.x + x), (this.y + y)])
				continue;
			}
			if(x == 1 && y == 0){ 
				move_cell.push([(this.x + x), (this.y + y)])
				continue;
			}
			if(x == 0 && y == -1){
				move_cell.push([(this.x + x), (this.y + y)])
				continue;
			}
			if(x == 0 && y == 1){
				move_cell.push([(this.x + x), (this.y + y)])
				continue; 
			}
			let _x = this.x + x;
			let _y = this.y + y;
			while(_x < 9 && _x >= 0 &&  _y < 9 && _y >= 0) {
				move_cell.push([_x, _y])
				_x += x; _y += y;
			}
		}
		}
		return this.checkCellFrame(move_cell);
	}
}

class Ou extends Frame {
	
	constructor(x, y, has_turn, field){
		super(8, x, y, has_turn,field);
		this.nariText = "王";
	}

	// 成りではない状態
	normalMove() {
		var move_cell = [];
		for(let x = -1; x <= 1; x++){
		for(let y = -1; y <= 1; y++){
			if(x == 0 && y == 0){ continue; }
			let _x = this.x + x;
			let _y = this.y + y;
			move_cell.push([_x, _y])
		}
		}
		return this.checkCellFrame(move_cell);
	}

	// 成りにならないように制限　
	checkNari() {
	}
}

class Gyoku extends Frame {
	
	constructor(x, y, has_turn, field){
		super(9, x, y, has_turn,field);
		this.nariText = "玉";
	}

	// 成りではない状態
	normalMove() {
		var move_cell = [];
		for(let x = -1; x <= 1; x++){
		for(let y = -1; y <= 1; y++){
			if(x == 0 && y == 0){ continue; }
			let _x = this.x + x;
			let _y = this.y + y;
			move_cell.push([_x, _y])
		}
		}
		return this.checkCellFrame(move_cell);
	}

	// 成りにならないように制限　
	checkNari() {
	}
}


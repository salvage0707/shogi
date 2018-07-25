// 駒の基礎機能
class Frame {
	constructor(type, x, y, has_turn, field = true) {
		this.type = type;
		this.x = x;
		this.y = y;
		this.turn = has_turn;
		this.nari = false;
		this.field = field;
	}

	// 移動可能なマスを配列で返す
	// 子クラスでnormalMove(),nariMove()を作成
	checkMoveCell() {
		if(this.field){
			if(this.nari){
				return this.nariMove();
			}else{
				return this.normalMove();
			}
		} else {
			return this.notFieldMove();
		}
	}

	notFieldMove(){
		let move_cells = [];
		for(let x = 0; x < 9; x++){
		for(let y = 0; y < 9; y++){
			if(board[x][y] == 0) {
				move_cells.push([x, y])
			}
		}
		}
		return move_cells;
	}

	// 移動可能なますのチェック
	checkCellFrame(array){
		var num = 0;
		let my_frame = [];
		const self = this;
		array.forEach(function(ary){
			// ボードの外の場合
			if(ary[0] < 0 || ary[0] > 8 ||  ary[1] < 0 || ary[1] > 8){
				delete array[num];
				num++;
				return;
			}
		// 自分の駒の場合
	 		if(ary[0] < 9 && ary[1] < 9) {
	 			if(board[ary[0]][ary[1]].type >=  1 && board[ary[0]][ary[1]].turn == self.turn){
	 				delete array[num];
	 			}
	 		}
			num++;
		});
		// turnによって変更
		for(let x = -1; x <= 1; x++){
			for(let y = -1; y <=  1; y++){
				let _x = this.x + x; 
				let _y = this.y + y;
				// ボードの外の場合は次の処理
				if( _x < 0 || _x > 8 ){ continue; }
				if( _y < 0 || _y > 8 ){ continue; }
				if(x == 0 && y == 0){ continue; }
				// 駒に当たる座標を取得
				while(board[_x][_y] == 0){
					_x += x; _y += y;
					if(_x < 0 || _x > 8 || _y < 0 || _y > 8){
						var not_check = true;
							break;
					}
				}
				if(not_check){ not_check = false;  continue; }
				// 当たった後のマスを削除
				_x += x; _y += y;
				while(0 <= _x && _x  < 9 && 0 <= _y && _y  < 9 ){
					array = array.filter(function(val) {
						if(val[0] != _x || val[1] != _y){
							return true;
							}else {
							return false
						}
					});
					_x += x; _y += y;
				}
			}
		}
		return array;
	}

	// とっている駒かどうか
	nowField(){
		if(this.field){
			return this.checkMoveCell();
		} else {
			let _y = [];
			for(let x; x < 9; x++){
			for(let y; y < 9; y++){
				if(board[x][y] == 0){
					_y.push([x, y]);
				}
			}
			}
			return _y;
		}
	}	

	// 移動可能なますの色を変更
	displayCell(_click) {
		var self = this;
		const b = getId("board");
		let cells = this.checkMoveCell();
		console.log(cells)
		cells.forEach(function(cell){
			// 変更するますを代入
			const cell_num = 9 * cell[0] + cell[1];
			const change_cell = b.children[cell_num];
			// 他の駒の移動可能ますが表示されているか
			// 移動できるマス全ての色を変更する
			if(_click){
				removeMoveCell();
			} else {
				let input = document.getElementsByClassName("move")[0].cloneNode(true);
				input.onclick = function(){
					if(board[cell[0]][cell[1]] == 0) {
						self.move(cell[0], cell[1]);
						click = false;
					} else if(board[cell[0]][cell[1]].turn != self.turn) {
						self.move(cell[0], cell[1]);
						removeMoveCell();
					}
				}
				change_cell.appendChild(input)
			}
		});
	} 

	// 駒の移動
	move(x, y) {
		board[this.x][this.y] = 0;
		this.x = x;
		this.y = y;
		if(this.field){
			this.checkNari();
		}
		// 駒を取る処理
		if(board[x][y] == 0) {
		} else {
			if(board[x][y].turn != this.turn) {
				const type = board[x][y].type;
				if(board[x][y].turn == 1){
					addUserFrame(user2, type, turn);
				} else {
					addUserFrame(user1, type, turn);
				}
			}
		}
		board[x][y] = this;
		// 手駒からの移動
		if(this.field == false) {
			if(this.turn == 1) {
				const num = user1.has_frame.indexOf(this);
				delete user1.has_frame[num];
			} else {
				const num = user2.has_frame.indexOf(this);
				delete user2.has_frame[num];
			}
			this.field = true;
		}
		click = false;
		turn = 3 - turn;
		boardRun();
	}

	// なりかどうかを判定
	checkNari() {
		if(this.turn == 1 && this.y <= 2){
			this.nari = true;
		} else if(this.turn == 2 && this.y >= 6) {
			this.nari = true;
		}
	}

	// デフォルトで金の動きをする
	nariMove(){
		return this.kinMoveCell();
	}


	// 金の動きをするようにする
	kinMoveCell(){
		let move_cell =[];
		if(this.turn == 1) {
			for(let x = -1; x < 2; x++){
			for(let y = -1; y < 2; y++){
				// 元の駒の動きの制限
				if((x == -1 && y == 1) || (x == 1 && y == 1)){ continue; }
				// 自分がいるますの制限 
				if(x == 0&& y == 0){ continue; }
				let _x = this.x + x;
				let _y = this.y + y;
				// ボード外の移動を限　
				let input =[this.x + x,this.y + y];
				move_cell.push(input);
			}
			}
		}else{
			for(let x = -1; x < 2; x++){
			for(let y = -1; y < 2; y++){
				// 元の駒の動きの制限
				if((x == 1 && y == -1) || (x == -1 && y == -1)){
					continue;
				}
				// 自分がいるますの制限 
				if(x == 0&& y == 0){
					continue;
				}
				let _x = this.x + x;
				let _y = this.y + y;
				// ボード外の移動を限　
				if(_x >= 0 && _y >= 0){
					let input =[this.x + x,this.y + y];
					move_cell.push(input);
				}
			}
			}
		}
		return this.checkCellFrame(move_cell);
	}

}




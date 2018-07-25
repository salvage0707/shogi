// ボードを初期化
let turn = 1;
var board = [];
let piece;
var click = false;
const user1_name = prompt("ターン1のユーザー名を入力", "User1");
const user2_name = prompt("ターン2のユーザー名を入力", "User2");
var user1 = {name: user1_name,
						 has_frame: []};
var user2 = {name: user2_name,
						 has_frame: []};
// 駒を取得
onload = function(){
piece = [getId("cell"), 
				 getId("fu"),
				 getId("kyosha"),
				 getId("kema"),
				 getId("gin"),
				 getId("kin"),
				 getId("hisha"),
				 getId("kaku"),
				 getId("ou"),
				 getId("gyoku"),
				 ]
	for(let i = 0; i < 9 ; i++) {
		board[i] = [];
		for(let j = 0; j < 9; j++) {
			board[i][j] = 0;
		}
	}
	// 歩をセット
	for(let i = 0; i < 9; i++){
		board[i][6] = new Fu(i, 6, 1);
		board[i][2] = new Fu(i, 2, 2);
	}
	// 香車をセット
	board[8][0] = new Kyosha(8, 0, 2);
	board[0][0] = new Kyosha(0, 0, 2);
	board[0][8] = new Kyosha(0, 8, 1);
	board[8][8] = new Kyosha(8, 8, 1);
	// 桂馬
	board[1][0] = new Kema(1, 0, 2);
	board[7][0] = new Kema(7, 0, 2);
	board[1][8] = new Kema(1, 8, 1);
	board[7][8] = new Kema(7, 8, 1);
	// 銀
	board[2][0] = new Gin(2, 0, 2);
	board[6][0] = new Gin(6, 0, 2);
	board[2][8] = new Gin(2, 8, 1);
	board[6][8] = new Gin(6, 8, 1);
	// 金
	board[3][0] = new Kin(3, 0, 2);
	board[5][0] = new Kin(5, 0, 2);
	board[3][8] = new Kin(3, 8, 1);
	board[5][8] = new Kin(5, 8, 1);
	// 飛車
	board[1][1] = new Hisha(1, 1, 2);
	board[7][7] = new Hisha(7, 7, 1);
	// 角
	board[7][1] = new Kaku(7, 1, 2);
	board[1][7] = new Kaku(1, 7, 1);
	// 王
	board[4][0] = new Ou(4, 0, 2);
	// 玉
	board[4][8] = new Gyoku(4, 8, 1);
	// turnChange();
	// ボードを表示
	boardRun();
};

// ゲームを進行する
function boardRun() {
	// 現在のボードを削除
	removeBoard();
	// 最新のボードを表示
	showBoard();
	let message = getId("message");
	if(turn == 1){
		user = user1.name;
	} else {
		user = user2.name;
	} 
	let input = user + ":  Your Turn" 
	// ユーザーの持っている駒を表示
	showUserFrame();
	if (checkFinish()){
		let user;
		if(turn == 1){
			user = user2.name
		} else {
			user = user1.name
		} 
		input = user  +  "Win !!!!!!!!";
	}
		message.innerHTML = input;
};

// ボードを表示
function showBoard(){
	const b = getId("board");
	for(let x = 0; x <= 8; x++) { 
	for(let y = 0; y <= 8; y++) {
		// ボードに表示
		// ますが空かどうかで判断
			frame = useFrame(board[x][y]);
			setStyle(frame,x,y,b);
		// 特定のますのオブジェクトを取得
		let this_cell = board[x][y];
		// 現在のターンの状態で変化
		if(this_cell.turn == turn) {
			// ますに駒がある場合
			(function() {
				// 対象のますの番号を取得
				// const _x = x, _y = y;
				frame.onclick = function() {
					if(click) {
						this_cell.displayCell(click);
						click = false;
					} else {
						this_cell.displayCell(click);
						click = true;
					}
					// if(checkPiece(_x, _y,true)){
					// 	turnChange();
					// }
				}
			}());
		}
	}
	}
}

// ユーザーの持っている駒を表示
function showUserFrame() {
	const user_frame1 = user1.has_frame
	const user_frame2 = user2.has_frame
	const user1_board = getId("user1")
	const user2_board = getId("user2")
	helperShowUserFrame(user_frame1, user1_board);
	helperShowUserFrame(user_frame2, user2_board);
	function helperShowUserFrame(array, board){
		let x = 0;
		let y = 0;
		array.forEach(function(object){
			let frame = useFrame(object.type);
			let x_style = x * 70;
			if(y >= 1){
				frame.style.top = Math.floor(y) * 70 + "px"
			}
			frame.style.left = x_style + "px"; 
			// 現在のターンの状態で変化
			if(object.turn == turn) {
				frame.onclick = function(){
					if(click) {
						object.displayCell(click);
						click = false;
					} else {
						object.displayCell(click);
						click = true;
					}
				}
			}
			board.appendChild(frame);
			if(x < 3){
				x++;
			} else {
				x = 0;
				y++;
			}
		});
	}
}

// 対局が終了したかどうか
function checkFinish(){
	let finish = false;
	finish = gyokuOrOu();
	if(finish == false){
		finish = checkHands();
	}
	if(finish == false){
		const oute 	= checkOute();
	}
	return finish;
}

function gyokuOrOu(){
	let ou = true;
	let gyoku = true;
	// 王と玉が存在するか
	for(let x = 0;x < 9; x++){
	for(let y = 0;y < 9; y++){
		if(board[x][y].type == 8){
			ou = false;
		}
		if(board[x][y].type == 9){
			gyoku = false;
		}
	}
	}
	// どちらかが存在しなかったら、true
	if(ou || gyoku) {
		return true;
	}else {
		return false;
	}
}

function checkHands(){
	// 持ち手を確認
	if(turn == 1){
		if(user1.has_frame.length == 0){
			var no_hand1 = true;
		}	
	} else {
		if(user1.has_frame.length == 0){
			var no_hand1 = true;
		}	
	}

	let no_hand2 = true;
	var check_finish = false;
	for(let x = 0;x < 9; x++){
	for(let y = 0;y < 9; y++){
		if(board[x][y].turn == turn){
			if(board[x][y].checkMoveCell().length != 0){
				check_finish = true;
				no_hand = false;
				return;;
			}
		}
	}
	if(check_finish){ continue; }
	}

	if(no_hand1 && no_hand2){
		return true;
	} else {
		return false;
	}
}

// 王手の場合はtrue
function checkOute(){
	// ボードから王と玉を探す
	for(let x = 0;x < 9; x++){
	for(let y = 0;y < 9; y++){
		if(board[x][y].type == 8){ const ou = board[x][y]; }
		if(board[x][y].type == 9){ const gyoku = board[x][y]; }
	}
	}
	// 移動可能なマスを配列にする
	if(turn == 1){
		object = ou;
	} else {
		object = gyoku;
	}
	for(let x = 0;x < 9; x++){
	for(let y = 0;y < 9; y++){
		// ターンによって変更
		if(board[x][y].turn == (3 - turn)){
			board[x][y].checkMoveCell().forEach(function(cell){
				if(object.x == cell[0] && object.y == cell[1]){
				// 処理から抜ける
				const check_finish = true;	
				break;
				}
			});
		}
	if(check_finish){ break; }
	}
	if(check_finish){ break; }
	}
	if(check_finish){
		return true;
	} else {
		return false;
	}
}
	
// 裏返す処理
// function checkPiece(x, y, flip) {
// 	// 0,1でif文を分けるため
// 	let ret = 0;
// 	// 8方向に対して処理を行う	
// 	for(let dx = -1; dx <= 1; dx++){
// 	for(let dy = -1; dy <= 1; dy++){
// 		// ますが現在のますの場合は何もしない
// 		if(dx == 0 && dy == 0) { continue; }
// 		// nx,nyはチェックしているますの番号
// 		var nx = x + dx, ny = y + dy, n = 0;
// 		// ひっくり返すまでのます数をn
// 		// ひっくり返せるますまで数える
// 		while(board[nx][ny] == 3 - turn) {n++; nx += dx; ny += dy; }
// 		// ひっくり返せるますを確認
// 		if(n > 0 && board[nx][ny] == turn) {
// 			ret += n;
// 			if(flip) {
// 				// ひっくり返すますの座標を設定
// 				nx = x + dx; ny = y + dy;
// 				while(board[nx][ny] ==  3 - turn) {
// 					board[nx][ny] = turn;
// 					nx += dx; ny += dy;
// 				}
// 				// 現在ますをひっくり返す
// 				board[x][y] = turn;
// 			}
// 		}
// 	}
// 	}
// 	return ret;
// };
//
// // パスの確認
// function turnChange(){
// 	// パスの回数をカウント
// 	let black = 0, white = 0;
// 	// ターンによってメッセージを変える
// 	let message = ((turn == 2)?"black":"white");
// 	turn = 3 -turn;
// 	for(let x = 1; x<= 8; x++) {
// 	for(let y = 1; y<= 8; y++) {
// 		if(board[x][y] == 0 && checkPiece(x,y,false)){
// 			// メッセージを表示
// 			document.getElementById("message").innerHTML = message + "'s move";
// 			showBoard();
// 			return;
// 		}
// 	}
// 	}
// 	turn = 3 -turn;
// 	message += "pass<br>" + ((turn == 2)?"black":"white") + "'s move";
// 	for(let x = 1; x<= 8; x++) {
// 	for(let y = 1; y<= 8; y++) {
// 		if(board[x][y] == 0 && checkPiece(x,y,false)){
// 			// メッセージを表示
// 			document.getElementById("message").innerHTML = message + "'s move";
// 			return;
// 		}else{
// 			if(board[x][y] == 1) {black++;}else{white++;}
// 		}
// 	}
// 	}
//
// 	message = "black:" + black + "white;" + white + "<br>";
// 	if(black == white) {
// 		message += "draw";
// 	}else{
// 		message+= ((black < white)?"white win":"black win")
// 	}
// 	showBoard();
// }

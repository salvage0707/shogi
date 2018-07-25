// 便利関数を作成
// ウィンドウの指定のIDのDOMを取得
function getId(elementId){
	return document.getElementById(elementId);
};

// ボード内の指定の座標にhtmlを表示
function setStyle(frame,x, y, b) {
	const left_width = 200;
	const top_height = 100;
	frame.style.left = left_width + (x * 70) + "px";
	frame.style.top = top_height + (y * 70) + "px";
	// 対戦相手の駒の向きを変更
	if(board[x][y].turn == 2){
		frame.style.transform = "rotateX(180deg) scale(-1, 1)";
	}
	if(board[x][y].nari == true){
		frame.innerHTML = "<p>" + board[x][y].nariText + "</p>";
		frame.firstElementChild.style.color = "red";
	}
	b.appendChild(frame);
}

// 特定の駒のhtmlを取得
function useFrame(cell_num) {
	if(cell_num <= 9) {
		return piece[cell_num].cloneNode(true);
	}else {
		return piece[cell_num.type].cloneNode(true);
	}

}

// 現在の表示を削除
function removeBoard(){
	const b = getId("board");
	const user1 = getId("user1");
	const user2 = getId("user2");
	while(b.firstChild) {
		// 現在の表示を削除
		b.removeChild(b.firstChild);
	}
	while(user1.firstChild) {
		// 現在の表示を削除
		user1.removeChild(user1.firstChild);
	}
	while(user2.firstChild) {
		// 現在の表示を削除
		user2.removeChild(user2.firstChild);
	}

}

// 移動可能マスを全て削除
function removeMoveCell(){
	const b = getId("board");
	while(b.getElementsByClassName("move").length){
	let remove = b.getElementsByClassName("move")[0];
		remove.remove();
	}
}


function addUserFrame(user, type, user_turn){
	switch(type){
		case 1:
			user.has_frame.push(new Fu(1, 1,user_turn, false))
			break;
		case 2:
			user.has_frame.push(new Kyosha(1, 1,user_turn, false))
			break;
		case 3:
			user.has_frame.push(new Kema(1, 1,user_turn, false))
			break;
		case 4:
			user.has_frame.push(new Gin(1, 1,user_turn, false))
			break;
		case 5:
			user.has_frame.push(new Kin(1, 1,user_turn, false))
			break;
		case 6:
			user.has_frame.push(new Hisha(1, 1,user_turn, false))
			break;
		case 7:
			user.has_frame.push(new Kaku(1, 1,user_turn, false))
			break;
	}
}

  var NUM = 8;
  var CONNECT = 4;
  //check whether one wins or not!
  function check_board(res, row, col){
    console.log(res[row][col] + " res[row][col] != 0: " + (res[row][col] != 0) + " res[row][col] != 1: " + (res[row][col] != 1));
    if(res[row][col] != 0 && res[row][col] != 1) return false;
    //horizontal
    xy = [];
    var i = col;
    var j = col;
    var val = res[row][col];
    while(i > 0 && res[row][i-1] == val) i--;
    while(j < (NUM-1) && res[row][j+1] == val) j++;
    if((j-i+1) >= CONNECT){
      for(var x = i; x <= j; ++x) {
        xy.push(row);
        xy.push(x);
      }
      return true;
    }

    //vertical
    xy = [];
    i = row;
    j = row;
    while(i > 0 && res[i-1][col] == val) i--;
    while(j < (NUM-1) && res[j+1][col] == val) j++;
    if((j-i+1) >= CONNECT) {
      for(var y = i; y <= j; ++y){
        xy.push(y);
        xy.push(col);
      }
      return true;
    }

    // diagonal, top-left to bottom-right
    xy = [];
    i = 0;
    j = 0;
    while((row-i) >= 0 && (col-i) >= 0 && res[row-i][col-i] == val) {
      xy.push(row-i);
      xy.push(col-i);
      i++;
    }
    while((row+j) < NUM && (col+j) < NUM && res[row+j][col+j] == val) {
      xy.push(row+j);
      xy.push(col+j);
      j++;
    }
    if((j+i-1) >= CONNECT) {console.log("左上--右下"); return true;}

    // diagonal, top-right to bottom-left
    xy = [];
    i = 0;
    j = 0;
    while((row-i) >= 0 && (col+i) < NUM && res[row-i][col+i] == val) {
      xy.push(row-i);
      xy.push(col+i);
      i++;
    }
    while((row+j) < NUM && (col-j) >= 0 && res[row+j][col-j] == val) {
      xy.push(row+j);
      xy.push(col-j);
      j++;
    }
    if((j+i-1) >= CONNECT) {console.log("左下--右上"); return true;}

    return false;
  }
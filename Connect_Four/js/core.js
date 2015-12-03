  var CELL_SIDE = 60;//px, size of the cell
  var NUM = 10;//number of cells should be NUM * NUM
  var CONNECT = 4;//could be 4, 5, 6.

  $('#animation').css({height: CELL_SIDE, width: CELL_SIDE*NUM, position: 'relative'});//position relative here is VERY IMPORTANT!!!
  $('#flag').css({height: CELL_SIDE, width: CELL_SIDE*NUM});
  $('#board').css({height: CELL_SIDE*NUM, width: CELL_SIDE*NUM});

  var i = 0;
  var flags = [];//length = NUM
  var height = [];//length = NUM
  var animations = [];//length = NUM
  var cell = [];
  for(i = 0; i < NUM; ++i)
    cell[i] = [];
  var res = [];
  for(i = 0; i < NUM; ++i){
    res[i] = [];
    var j = 0;
    for(; j < NUM; ++j)
      res[i].push(-1);
  }

  var which = 0;//which player!
  var total = NUM*NUM;//total cells filled in!
  var inProcess = false;
  var xy = [];
  var player_img = $('#player_img');

  //build the animation area;
  for(i = 0; i < NUM; ++i){
    $('#animation').append("<div id='animation_" + i + "' style='position: absolute; left:" + i*CELL_SIDE +"px; width:" + CELL_SIDE +"px;height:" + CELL_SIDE + "px;'></div>");
    animations.push($('#animation_' + i));
  }

  //build the flag area;
  for(i = 0; i < NUM; ++i){
    $('#flag').append("<div id='flag_" + i + "' style='float:left; width:" + CELL_SIDE +"px;height:" + CELL_SIDE + "px; z-index:2;'></div>");
    flags.push($('#flag_' + i));
    height.push(0);
  }
  $('#flag').append("<div style='clear:both;'></div>");

  //build the board area;
  for(i = 0; i < NUM; ++i){
    $('#board').append("<div class='col' id='"+ i + "' style='height:" + (CELL_SIDE*NUM) + "px; width:" + CELL_SIDE  + "px;'></div>");
    var j = 0;
    for(; j < NUM; ++j){
      $('#' + i).append("<div id='" + j + "_" + i + "' class='cell' style='height:" + (CELL_SIDE) + "px;'></div>");
      cell[j][i] = $('#' + j + '_' + i);
    }
  }
  $('#board').append("<div style='clear:both;'></div>");

  //id of which col
  var id = -1;
  /*
   *mouseenter event
  */
  $('.col').mouseenter(function(e){
    id = $(this).attr('id');
    flags[id].css({background: 'url("img/pizza.png")', 'background-size': 'cover'});
  });

  /*
   *mouseleave event
  */
  $('.col').mouseleave(function(e){
    flags[id].css('background', '#FFFFFF');
  });

  /*
   *click event
  */
  $(".col").click(function(){
    var id = $(this).attr('id');
    //already full or the other play has not finished!
    if(height[id] >= NUM || inProcess == true) return;
    //create an img to fall down
    animations[id].html("<img class='img_responsive' src='img/yelp_" + which + ".png'/>");

    /*
     *lock starts! 
     *make sure player#1 can play ONLY after player#0 finishes!
    */
    //lock starts
    inProcess = true;
    animations[id].animate({marginTop: (NUM-height[id]+1)*CELL_SIDE,}, 500, function(){
      animations[id].css({'margin-top':0, }).empty();
      var row = NUM - 1 - height[id];
      var col = parseInt(id);

      cell[row][col].html("<img class='img_responsive' src='img/yelp_" + which + ".png'/>");
      res[row][col] = which;
      which = 1 - which;
      height[id]++;
      total--;

      if(check_board(res, row, col)){
        for(var k = 0; k < xy.length; k += 2){
          cell[xy[k]][xy[k+1]].css('background', '#00FFFF');
        }
        $('.col').unbind();
        player_img.prop('src', 'img/yelp_' + (1-which) + '.png');
        $('#info').text("player won! yes!");
        $('#reset').css('visibility', 'visible');
      }else{
        player_img.prop('src', 'img/yelp_' + which + '.png');
      }

      if(total <= 0) {
        $('.col').unbind();
        $('#player_img').remove();
        $('#info').text("The game ended in a draw!");
        $('#reset').css('visibility', 'visible');
        //$('#reset').css('visibility', 'visible');
      }
      //lock ends
      inProcess = false;
    });
  });

  //check whether one wins or not!
  function check_board(res, row, col){
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
    if((j+i-1) >= CONNECT) {return true;}

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
    if((j+i-1) >= CONNECT) {return true;}

    return false;
  }

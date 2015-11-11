//global variables
var startPos = 0,
    endPos = 0,
    parent = null,
    //is in edit or not
    isEdit = false,

    //this ID increments all the way up
    nextID = 1,
    //curent item's ID you click
    curID = -1,
    //the time line order of the items created/modified! IMPORTANT!
    order = null,

    //frequently used DOM Node
    txt = $('#txt'),
    new_btn = $('#new_btn'),
    list = $('#list'),
    body = $('body');

    var startY = 0,
        endY = 0;

//localStorage.clear();
/*
bind click, touchstart, touchend, touchmove to body,
mainly used for swip left to delete
*/
body.on('click', function(e) {
    e.stopPropagation();
    e.preventDefault();
    var target = e.target;
    if(target.className.indexOf('del-btn') > -1) {
        target.parentNode.remove();
        //1) delete form localstorage
        localStorage.removeItem(target.previousSibling.id);
        //2)delete from order, order is also in localstorage
        order = [];
        $('.container').each(function () { order.push(this.id);});
        localStorage["order"] = JSON.stringify(order);
    }
}, false);

//catch the startpos when touchsatrt
body.on('touchstart', function(e) {
    parent = e.target;
    while(parent && parent.className.indexOf('container') < 0) {
        parent = parent.parentNode;
        if(parent === document) {
            return;
        }
    }
    var touch = e.touches[0];
    startPos = touch.pageX;
    startY = touch.pageY;
    parent.className = 'container';
}, false);

//track the endpos to achieve consistent effect while swiping left
body.on('touchmove', function(e) {
    var touch = e.touches[0],
        offset = 0;
    if(parent.className != 'container') {
        return;
    }
    endPos = touch.pageX;
    endY = touch.pageY;
    offset = endPos - startPos;
    //only two final states: 0 or -80
    if(offset > 0) {
        offset = 0;
        if(parent.className.length > 0) {
            parent.className = parent.className + ' trans';
        } else {
            parent.className = 'trans';
        }
    } else if(Math.abs(offset) > 80) {
        offset = -80;
    }
    //update margin left
    parent.style.marginLeft = offset + 'px';
}, false);

//after touchend,
body.on('touchend', function(e) {
    var offset = -1;
    if(parent.className != 'container') {
        return;
    }
    offset = endPos - startPos;
    
    var temp = Math.abs(offset);
    if(offset < 0 && Math.abs(offset) > 40) offset = -80;
    else offset = 0;

    if(parent.className.length > 0) {
        parent.className = parent.className + ' trans';
    } else {
        parent.className = 'trans';
    }
    parent.style.marginLeft = offset + 'px';
    //this is identified as click! switch to edit page!
    //if(Math.abs(startY - endY) < 20) return;
    if(offset == 0) gotoEdit(parent.id);
}, false);


//initialization for refreshing page or new loading
nextID = localStorage.getItem("nextID");
if(nextID == null) nextID = 1;
//console.log("nextID : " + localStorage.getItem('nextID'));

order = JSON.parse(localStorage.getItem('order'));
//console.log(order);

//restore the list from history list, should be same!
var index;
for (index in order) {
    var itemTxt = localStorage.getItem(order[index]);
    var wholeItem = $("<div class='wrap'><div class='container'  id='" + order[index] + "'><div class='content'><h4>" + (itemTxt.length > 26 ? itemTxt.substring(0, 23) + "..." : itemTxt) + "</h4><p>" + localStorage.getItem("date" + order[index]) + "</p></div></div><button class='del-btn'>delete</button></div>");
    list.append(wholeItem);
    //console.log("localStorage.key : " + localStorage.key(i));
}

//go to edit view from lists view 
function gotoEdit(id){
    curID = id;
    list.css('display', 'none');
    txt.css('display', 'block');
    new_btn.text('Done');
    isEdit = !isEdit;
    txt.val(localStorage[id]);
    //txt.focus();
}

//the New/Done button tap events
$("#new_btn").tap(function(){
    //if is edit, then switch the text to "New"
    if(isEdit){
        if(txt.val().trim().length <= 0){
            if(curID != -1) ("#" + curID).parent().remove();
            showList();
        }
        else{
            var editContent = txt.val().trim();
            if(editContent.length > 0){
                localStorage.setItem(nextID, editContent);
                localStorage.setItem("date" + nextID, (new Date()));
                if(curID != -1) {
                    localStorage.removeItem(curID);
                    localStorage.removeItem("date" + curID);
                }
                console.log("nextID: " + nextID);
                ++nextID;
                localStorage.setItem("nextID", nextID);
            }
            showList();
            //delete old item only if its ID is not -1
            if(curID != -1) $("#" + curID).parent().remove();

            //add the new item from front
            var newItem = $("<div class='wrap'><div class='container'  id='" + (nextID-1) + "'><div class='content'><h4>" + (editContent.length > 26 ? editContent.substring(0, 23) + "..." : editContent) + "</h4><p>" + localStorage.getItem("date" + (nextID-1)) + "</p></div></div><button class='del-btn'>delete</button></div>");
            list.prepend(newItem);
        }
        
        //restore curID to -1
        curID = -1;

        //track the latest order
        order = [];
        $('.container').each(function () {
            //console.log("each div: " + this.id);
            order.push(this.id);
        });

        //store it to localstorage
        localStorage["order"] = JSON.stringify(order);
        
    }else{
        list.css('display', 'none');
        txt.css('display', 'block');
        if(curID == -1) txt.val("");
        else txt.val(localStorage.getItem(curID));
        txt.blur();
        new_btn.text('Done');
    }
    isEdit = !isEdit;
});

//show the list, hide the textarea
function showList(){
    txt.blur();
    txt.css('display', 'none');
    list.css('display', 'block');
    new_btn.text('New');
}

//show the textarea, hide the list
function showTxt(){
    list.css('display', 'none');
    txt.css('display', 'block');
    //txt.focus();
    new_btn.text('Done');
}

//restore the notes list when refresh the url
function restore(){
    for (var i = localStorage.length-1; i >= 0; --i){
        var itemTxt = localStorage.getItem(localStorage.key(i));
        var wholeItem = $("<div class='wrap'><div class='container'  id='" + localStorage.key(i) + "'><div class='content'><h4>" + (itemTxt.length > 26 ? itemTxt.substring(0, 23) + "..." : itemTxt) + "</h4><p>" + Date() + "</p></div></div><button class='del-btn'>delete</button></div>");
        if(!isNaN(localStorage.key(i))) list.prepend(wholeItem);
        //console.log("localStorage.key : " + localStorage.key(i));
    }

    //update next avaible ID!
    nextID = localStorage.getItem("nextID");
    //if null, which means no history notes, then set next avaible ID as 1
    if(nextID == null) nextID = 1;
    console.log("nextID : " + localStorage.getItem('nextID'));

    //parse order
    order = JSON.parse(localStorage.getItem('order'));
    console.log(order);    
}

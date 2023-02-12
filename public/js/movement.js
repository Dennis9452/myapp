

var tabIndex = 1;
var trid = "li";
var lastIndex = 0; //上一個index
var last9BoxIndex = 0; //九宮格最後移出的index
var isRightSide = false;

// 鍵盤事件
document.onkeydown = function(event){
  //event.preventDefault();
// 相容 Mozilla Firefox
  if (null == event) {
    event = window.event;
  }
  else if (event.keyCode <= 40 && event.keyCode >= 37) {
    event.preventDefault();
    keytd(event.keyCode);
  }
}
  // 實現切換功能主要程式碼
function keytd(key){
// 左
  if (key == 37) {
    tabIndex--;
    if(isRightSide){
      tabIndex = last9BoxIndex;
      console.log("tab_in"+tabIndex);
      //li.focus();
      document.getElementById(idlist[tabIndex]).focus();
      Focus(document.getElementById(idlist[tabIndex]));
      isRightSide = false;
    }
    else{
      if (null == document.getElementById(idlist[tabIndex]) || tabIndex%3 === 0) {
        ++tabIndex;
        document.getElementById(idlist[tabIndex]).focus();
        Focus(document.getElementById(idlist[tabIndex]));
        return;
      }
      document.getElementById(idlist[tabIndex]).focus();
      Focus(document.getElementById(idlist[tabIndex]));
      console.log(document.getElementById(idlist[tabIndex]));
    }
  }
  // 右
  else if (key == 39) {
    ++tabIndex;
    if (tabIndex%3 === 1 || null == document.getElementById(idlist[tabIndex])){
      --tabIndex;
        $("#player").focus();
        tabIndex = $("#player").attr('tabIndex') ;
        isRightSide = true;
        Focus("#player");
        last9BoxIndex = lastIndex;
    }
    else{
      document.getElementById(idlist[tabIndex]).focus();
      lastIndex = tabIndex;
      Focus(document.getElementById(idlist[tabIndex]));
    }
  }
  // 上
  else if (key == 38) {
    lastIndex = tabIndex;
    tabIndex = tabIndex - 3;  
    if (isRightSide){
      tabIndex = tabIndex + 3; 
      if(tabIndex - 1 <= lastLiIndex ){ //|| null == document.getElementById(trid + tabIndex)  
        $("#player").focus();
        Focus("#player");
      }
      else{
        tabIndex = tabIndex - 1;
        $("#player").focus();
        Focus("#player");
      }
    }
    else{
      if ((tabIndex%9===7 || tabIndex%9===8 || tabIndex%9===0) && tabIndex/9>=1)  {
        var body = $("#li"+tabIndex);
        //body.stop().animate({scrollTop:$("#li"+tabIndex).scrollTop()}, 500, 'swing');
        $("#li"+tabIndex).scrollTop();
        $("#"+trid + tabIndex).focus();
        Focus("#"+trid + tabIndex);
        //document.getElementById(idlist[tabIndex]).scrollTop;
      }
      if (null == document.getElementById(idlist[tabIndex])) {
        tabIndex = tabIndex + 3;
        $("#li"+tabIndex).scrollTop();
        return;
      }
      document.getElementById(idlist[tabIndex]).focus();
      Focus(document.getElementById(idlist[tabIndex]));
    }
  }
  // 下
  else if (key == 40) {
    lastIndex = tabIndex;
    tabIndex = tabIndex + 3;
    if (isRightSide){
      tabIndex = tabIndex - 3;
      if(tabIndex + 1 >= $("#banner").attr('tabIndex')){ 
        tabIndex = $("#banner").attr('tabIndex');
        $("#banner").focus();
        Focus("#banner");
        console.log("tab:"+tabIndex,"banner:"+$("#banner").attr('tabIndex'));
      }
    }
    else{
      if ((tabIndex%9===1 || tabIndex%9===2 || tabIndex%9===3) && tabIndex/9>=1) { 
        //body.stop().animate({scrollTop:$("#li"+tabIndex).scrollTop()}, 500, 'swing');
        // console.log($("#li"+tabIndex).scrollTop());
        //body.stop().animate({scrollTop:xtop}, 500, 'swing');
        $("#li"+(tabIndex)).scrollTop($("#li"+tabIndex));
        $("#li"+ tabIndex).focus();
        Focus("#"+trid + tabIndex);

        //document.getElementById(idlist[tabIndex]).scrollTop;
        //document.getElementById(idlist[tabIndex]).focus();
        //Focus(document.getElementById(idlist[tabIndex]));
      }
      else{
        document.getElementById(idlist[tabIndex]).focus();
        Focus(document.getElementById(idlist[tabIndex]));      }  
      if (null == document.getElementById(idlist[tabIndex]) || tabIndex>lastLiIndex) {
        tabIndex = tabIndex - 3;
        document.getElementById(idlist[tabIndex]).focus();
        Focus(document.getElementById(idlist[tabIndex]));
        tabIndex = lastIndex;
        return;
      }
    }
    //setcolor(trid + (tabIndex - 3), trid + tabIndex);
  }
}
  

function route(from,to){
  map_ini();
  var renderFLG=false;
  var directionsDisplay;
  var directionsService=new google.maps.DirectionsService();
  var mode;
  var currentDirections=null;
  var startSpot=from;
  var endSpot=to;
  if(!renderFLG){
    render();
  }
  calcRoute(startSpot,endSpot);

  //ルート検索結果の描画
  function render(){
    dbg("render:"+renderFLG);
    renderFLG=true;
    directionsDisplay=new google.maps.DirectionsRenderer({
      "map":map,
      "preserveViewport": true,
      "draggable": true
    });

    //右カラムにルート表示
    directionsDisplay.setPanel(document.getElementById("directions_panel"));
    //出発地点・到着地点マーカーが移動された時
    google.maps.event.addListener(directionsDisplay, 'directions_changed',function() {
      currentDirections=directionsDisplay.getDirections();
      var route=currentDirections.routes[0];
      var s="";
      for(var i=0; i<route.legs.length; i++) {
        var routeSegment=i+1;
        s+=route.legs[i].start_address+'to';
        s+=route.legs[i].end_address+'\n';
        s+=route.legs[i].distance.text;
      }
      dbg("directions_changed:"+s);
    });
    }

    //移動手段変更
    $("#mode").bind("change",function(){
      console.log("移動手段の変更");
        $(".button-group button").removeClass("active");
        calcRoute(startSpot,endSpot);
        $("#show").addClass("active");
    });

    //ルート計算
    function calcRoute(startSpot,endSpot){
      //ルート初期化
      $('#directions_panel').empty();
      switch($("#mode").val()){
        case "driving":
          mode=google.maps.DirectionsTravelMode.DRIVING;
          break;
        case "bicycling":
          mode=google.maps.DirectionsTravelMode.BICYCLING;
          break;
        case "transit":
          mode=google.maps.DirectionsTravelMode.TRANSIT;
          break;
        case "walking":
          mode=google.maps.DirectionsTravelMode.WALKING;
          break;
      }
      if(!renderFLG){
        render();
      }
      var request={
        origin:startSpot,
        destination:endSpot,
        travelMode:mode
      };
      //ルート描画
      directionsService.route(request, function(response, status) {
        if (status==google.maps.DirectionsStatus.OK) {
          dbg(response);
          directionsDisplay.setDirections(response);
        }else{
          dbg("status:"+status);
        }
        turn = turn_data(response);
      });
    }


    //ルート表示・非表示切り替え
    $(".button-group button").click(function(e){
        $(".button-group button").removeClass("active");
        var id=$(this).attr("id");
        if(id=="show"){
            calcRoute(startSpot,endSpot);
            $(this).addClass("active");
        }else{
            $(this).addClass("active");
            reset();
        }
    });

    //ルート削除
    function reset(){
      currentDirections=null;
      directionsDisplay.setMap(null);
      renderFLG=false;
    }
}

var dbg=function(str){
  try{
    if(window.console && console.log){
      //console.log(str);
    }
  }catch(err){
    //alert("error:"+err);
  }
}

//曲がり角の緯度経度測定
function turn_data(directionResult){
  var myRoute = directionResult.routes[0].legs[0]//曲がり角の個数
  var lats = [];//緯度データを入れる配列
  var lngs = [];//経度データを入れる配列
  var count = 0;//0からカウントしたい

  for(var i = 1;i < myRoute.steps.length;i++){//曲がり角の緯度・経度データをループで回して配列に格納
    var turn_lat = directionResult.routes[0].legs[0].steps[i].start_location.lat();
    var turn_lng = directionResult.routes[0].legs[0].steps[i].start_location.lng();
    lats[count] = turn_lat;
    lngs[count] = turn_lng;
    count++;
  }
  return[lats,lngs];
}

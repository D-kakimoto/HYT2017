function route(from,to){
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
    $("#directions_panel").empty();
    directionsDisplay.setPanel(document.getElementById("directions_panel"));
    /*出発地点・到着地点マーカーが移動された時
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
    });*/
    }

    //移動手段変更
    $("#mode").bind("change",function(){
        $(".button-group button").removeClass("active");
        calcRoute(startSpot,endSpot);
        $("#show").addClass("active");
    });

    //ルート計算
    function calcRoute(startSpot,endSpot){
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
        origin:startSpot,           //from
        destination:endSpot,        //to
        travelMode:mode             //移動手段
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
		      verification();
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

/*** 曲がり角と観光資源140地点との距離を測り，2km未満なら観光資源マーカーを表示する ***/
function verification(){
	var visibleCount = [];
	var num = 0;
	for (var i = 0; i < resource.length; i++) {
		//観光資源マーカーの緯度経度を取得
		var pos = resource[i].getPosition();
		var r_lat = pos.lat();
		var r_lng = pos.lng();

		var turn_num = turn[0].length;
		for (var j = 0; j < turn_num; j++) {
			var t_lat = turn[0][j];
			var t_lng = turn[1][j];

			var tmp_distance = location_distance(r_lat, r_lng, t_lat, t_lng);
			//2km未満で
			if (tmp_distance < 2000) {
				//長田さんのやつがTrueで
				if (Two_Distance(f_lat, f_lng, t_lat, t_lng, r_lat, r_lng)) {
					//初回にvisibleさせるときに
					if (resource[i].getVisible() == false) {
						//マーカー表示
						resource[i].setVisible(true);
						//何番目かを格納
//						visibleCount[num] = i;
//						num++;
					}
				}
			}
		}
	}
	/*** 関数呼び出し ***/
//	latlngEventLoop(visibleCount.length, 0, visibleCount);
}
/*** 長田さんのやつ ***/
function Two_Distance(lat1, lon1, lat2, lon2, lat3, lon3){//指定した場所A,B地点，曲がり角から2km以内の地点がA,B地点の真ん中にあるのか判別する関数
	//lat1,lon1 -> fromの緯度経度
	//lat2,lom2 -> toの緯度経度
	//lat3, lon3 -> マーカーの緯度経度

	var main_distance = location_distance(lat1, lon1, lat2, lon2);//スタート地点から目的地までの直線距離
	var start_minor_distance = location_distance(lat1, lon1, lat3, lon3);//スタート地点からマイナー地点までの直線距離
	var minor_goal_distance = location_distance(lat2, lon2, lat3, lon3);//マイナー地点から目的地までの直線距離


	//console.log("メイン:"+main_distance);
	//console.log("スタートからマイナー:"+start_minor_distance);
	//console.log("マイナーからゴール:"+minor_goal_distance);

	if(main_distance > start_minor_distance && main_distance > minor_goal_distance){
		//console.log("OK");
		return true;
	}else{
		//console.log("NO");
		return false;
	}

}

/*** 2秒置きにlatlngEvent()を"visibleCount.length"回分呼ぶ ***/
/*
function latlngEventLoop(maxCount, i, visibleCount) {
	if (i < maxCount) {
		var j = visibleCount[i]

		//マーカー表示されていて，
		if (resource[j].getVisible() == true) {
			//有名だったら
			console.log(latlngEvent(j));
			if (latlngEvent(j) == "有名") {
				//console.log("yuumei!");
				//マーカー非表示
				resource[j].setVisible(false);
			}
		}
		setTimeout(function(){
			latlngEventLoop(maxCount, ++i, visibleCount);
		}, 2000);
	}
}
*/

//マップのインスタンスを定義
var map;
var from,to;
var from_to_distance;
var f_lat, f_lng;
var t_lat,t_lng;
var via_lat,via_lng;
var turn;
//初期化処理でGoogle Mapsを表示
$(function(){
    var myCenter = new google.maps.LatLng(33.965,135.562);
    var mapProp = {
	     center:myCenter,
	     zoom:10,
	     minZoom:6,
	     mapTypeId : google.maps.MapTypeId.ROADMAP,
	     mapTypeControl: true
    };
    map = new google.maps.Map(document.getElementById("map_canvas"),mapProp);
});

//緯度経度を取得(入力：住所(文字列)→出力：geoCodeResults(オブジェクト))
function get_latlng(address,type){
    $.ajax({
        url: 'http://maps.googleapis.com/maps/api/geocode/json',
        data: {
            address:address
        }
    }).done(function(geoCodeResults, status){
        if(type == "from_set" || "to_set"){
          set_markers(geoCodeResults,address,type);
        }else if (type == "via_set"){
          console.log("デバッグ");
        }
    }).fail(function(data){
        console.log("ジオコーディングに失敗");
    });
}

//緯度経度に基づきマーカーを表示
function set_markers(geoCodeResults,address,type) {
  var ll = geoCodeResults.results[0].geometry.location;
  lat = ll.lat;
  lng = ll.lng;
  map.setCenter(ll);
  if(type=="from_set"){
    f_lat = lat;
    f_lng = lng;
  }else if(type=="to_set"){
    t_lat = lat;
    t_lng = lng;
  }
  from_to_distance = location_distance(f_lat,f_lng,t_lat,t_lng);
  //console.log(address+"の緯度、経度を取得："+lat+"、"+lng);
  /*
  var marker = new google.maps.Marker({
    title:address,
    position: ll,
    map:map
  });
  attachMessage(marker, address+"<br/>");
  */
}

//マーカーに吹き出しをつける
function attachMessage(marker, msg) {
    google.maps.event.addListener(marker, 'click', function(event) {
	new google.maps.InfoWindow({
	    content:msg
	}).open(marker.getMap(), marker);
    });
}

//出発地と目的地が送信された時の処理
window.onload=function(){
  var button = document.getElementById("button");
  var data_check_button = document.getElementById("data_check");
  // ボタンが押された時の処理
  button.onclick = function(){
    // フォームに入力された住所情報を取得
    from = document.getElementById("from").value;
    to = document.getElementById("to").value;
    if(from != "" && to != ""){
      get_latlng(from,"from_set");
      get_latlng(to,"to_set");
      route(from,to);
    }else{
      alert("未入力の値があります");
    }
  }
  data_check_button.onclick = function(){
    console.log("取得中データ表示");
    console.log("出発地:"+from);
    console.log("目的地:"+to);
    console.log("出発地から目的地の直線距離:"+from_to_distance);
    console.log("曲がり角の緯度経度:"+turn);
    console.log("観光客数に関するcsvデータ:"+get_tourist);
    console.log("RESASから取得した観光資源情報:"+resource);
  }
}

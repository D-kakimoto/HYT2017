var map;
var from = "和歌山市駅";
var to = "和歌山アドベンチャーワールド";

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
    get_latlng(from);
    get_latlng(to);
});

//緯度経度を取得(入力：住所(文字列)→出力：geoCodeResults(オブジェクト))
function get_latlng(address){
    $.ajax({
        url: 'http://maps.googleapis.com/maps/api/geocode/json',
        data: {
            address:address
        }
    }).done(function(geoCodeResults, status){
        set_markers(geoCodeResults,address);
    }).fail(function(data){
        console.log("ジオコーディングに失敗");
    });
}

//緯度経度に基づきマーカーを表示
function set_markers(geoCodeResults,address) {
  var ll = geoCodeResults.results[0].geometry.location;
  lat = ll.lat;
  lng = ll.lng;
  map.setCenter(ll);
  //console.log(address+"の緯度、経度を取得："+lat+"、"+lng);
  var marker = new google.maps.Marker({
    title:address,
    position: ll,
    map:map
  });
  attachMessage(marker, address+"<br/>");
}

//マーカーに吹き出しをつける
function attachMessage(marker, msg) {
    google.maps.event.addListener(marker, 'click', function(event) {
	new google.maps.InfoWindow({
	    content: msg
	}).open(marker.getMap(), marker);
    });
}

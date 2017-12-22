var resource = [];
var infowindow = [];
var json;
var resource_name = [];
set_resource();

function set_resource() {
  //マーカー配列
  //RESAS_APIからの読み込み
  $.ajax({
    url: "https://opendata.resas-portal.go.jp/api/v1/tourism/attractions?prefCode=30&cityCode=-", //観光資源
    type: "GET",
    headers: {
      "X-API-KEY": "aopG1WDpGAaaMtOYfNQ3hiJbpbkWOgcBXVum3Etb"
   //ここにAPIキー文字列を記述
    },
    async: "false",
    success: function(result_data) {
      json = result_data.result.data;
      for (var i = 0; i < json.length; i++ ) {
        var resource_latlng = {lat: json[i].lat, lng: json[i].lng};
        //マーカー追加
        resource[i] = new google.maps.Marker({
			position: resource_latlng, //マーカーを表示させる座標
			/*
			icon: {
			  fillColor: "#ffa020",                //塗り潰し色
				  fillOpacity: 0.8,                    //塗り潰し透過率
				  path: google.maps.SymbolPath.CIRCLE, //円を指定
				  scale: 5,                           //円のサイズ
				  strokeColor: "#ffa020",              //枠の色
				  strokeWeight: 0.8                  //枠の透過率
			},
			*/
			icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
			map: map, //マーカーを表示させる地図
//			title : json[i].resourceName, //マウスオーバーした際に表示させる文字列
			/*** 追加分 ***/
			visible: false,
			animation: google.maps.Animation.DROP
        });
		var content = '<h1>' + json[i].resourceName + '</h1>';
		infowindow[i] = new google.maps.InfoWindow({
			content: content,
			maxWidth: 200
		});
		/*** 関数呼び出し ***/
		markerClick(i);
    resource_name[i] = json[i].resourceName;
      }
    }
  });
}
/*** 新規追加 ***/
function markerClick(i) {
	resource[i].addListener('click', function() {	// マーカーをクリックしたとき
		infowindow[i].open(map, resource[i]);
    spot_info(i);
	});
}

//クリックしたら観光資源を出力するイベントを設定
function latlngEvent(i) {
    var pos = resource[i].getPosition(); // 緯度経度の取得
    var lat = pos.lat();
    var lng = pos.lng();
    var popular = reverseGeocoding(lat,lng,i);
}

/*クリックしたら観光資源を出力するイベントを設定
function latlngEvent(i) {
  resource[i].event.addListener('click', function(){ // マーカーをクリックしたとき
    var pos = resource[i].getPosition(); // 緯度経度の取得
    var lat = pos.lat();
    var lng = pos.lng();
	  console.log(resource[i].getTitle());
    var popular = reverseGeocoding(lat, lng);
  });
  return popular;
}
*/


// リバースジオコーディング
function reverseGeocoding(lat,lng,k) {
  var geocoder;
  var popular;
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(lat,lng);
  if (geocoder) {
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        for (var r = 0; r < results.length; r++) {
          var end = 0;
          var address = results[r].address_components;
          for (var i = 0; i < address.length; i++) {
            switch (address[i].types[0]) {
              case "locality":
              tourist(address[i].long_name,k);
              end = 1;
              break;
            }
          }
          if(end == 1){
            break;
          }
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
  }
}



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

//有名無名判定（まだ入れてない）
function tourist(str1,k){
  var popular;
  for(var i=0;i<get_tourist.length;i++){
    if(get_tourist[i]["市町村"] == str1){
      if(get_tourist[i]["h28"] > 1000000){
        popular=get_tourist[i]["h28"];
      }else{
        popular=get_tourist[i]["h28"];
      }
      break;
    }
    if(i == get_tourist.length - 1){
        popular="観光客数データなし";
    }
  }
  spot_info(k,popular);
}

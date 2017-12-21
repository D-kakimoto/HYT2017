//クリックしたら緯度経度を出力するイベント
function latlngEvent(i) {
  resource[i].addListener('click', function(){ // マーカーをクリックしたとき
    var pos = resource[i].getPosition(); // 緯度経度の取得
    var lat = pos.lat();
    var lng = pos.lng();
    //リバースジオコーディング
    var popular = reverseGeocoding(lat, lng);
  });
}

// リバースジオコーディング
function reverseGeocoding(lat,lng) {
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
              popular = tourist(address[i].long_name);
              end = 1;
              break;
            }
          }
          if(end == 1){
            break;
          }
        }
      }else{
        alert("Geocoder failed due to: " + status);
      }
    console.log(popular);
    });
  }
  return popular;
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
function tourist(str1){
  var popular;
  for(var i=0;i<get_tourist.length;i++){
    if(get_tourist[i]["市町村"] == str1){
      if(get_tourist[i]["h28"] > 700000){
        popular="有名";
      }else{
        popular="マイナー";
      }
      break;
    }
    if(i == get_tourist.length - 1){
        popular="マイナー";
    }
  }
  return popular;
}

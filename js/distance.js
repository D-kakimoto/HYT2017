//GPSなどの緯度経度の２点間の直線距離を求める（世界測地系）
//lat1, lon1 --- A地点の緯度経度
//lat2, lon2 --- B地点の緯度経度
function location_distance(lat1, lon1, lat2, lon2){
  var lat_average = deg2rad(lat1 + ((lat2 - lat1) / 2) );//２点の緯度の平均
  var lat_difference = deg2rad(lat1 - lat2);//２点の緯度差
  var lon_difference = deg2rad(lon1 - lon2);//２点の経度差
  var curvature_radius_tmp = 1 - 0.00669438 * Math.pow(Math.sin(lat_average),2);
  var meridian_curvature_radius = 6335439.327 / Math.sqrt(Math.pow(curvature_radius_tmp, 3));//子午線曲率半径
  var prime_vertical_circle_curvature_radius = 6378137 / Math.sqrt(curvature_radius_tmp);//卯酉線曲率半径
  //２点間の距離
  var distance = Math.pow(meridian_curvature_radius * lat_difference, 2) + Math.pow(prime_vertical_circle_curvature_radius * Math.cos(lat_average) * lon_difference, 2);
  distance = Math.sqrt(distance);
  distance_unit = Math.round(distance);
  /*
  if(distance_unit < 1000){//1000m以下ならメートル表記
    distance_unit = distance_unit+"m";
  }else{//1000m以上ならkm表記
    distance_unit = Math.round(distance_unit / 100);
    distance_unit = (distance_unit / 10)+"km";
  }
  */
  //hoge['distance']で小数点付きの直線距離を返す（メートル）
  //hoge['distance_unit']で整形された直線距離を返す（1000m以下ならメートルで記述 例：836m ｜ 1000m以下は小数点第一位以上の数をkmで記述 例：2.8km）
  /*** 返り値変更 ***/
  return distance;
}

function deg2rad (angle) {
  return angle * 0.017453292519943295 // (angle / 180) * Math.PI;
}
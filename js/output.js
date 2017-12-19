var map;

$(function(){ // 初期化処理でGoogle Mapsを表示
    var myCenter=new google.maps.LatLng(33.965,135.562);
    var mapProp = {
	center:myCenter,
	zoom:9,
	minZoom:6,
	mapTypeId : google.maps.MapTypeId.ROADMAP,
	mapTypeControl: true
    };
    map = new google.maps.Map(document.getElementById("map_canvas"),mapProp);
});

function read_csv(files){ // CSV（またはTSV）ファイルを読み込む
    var f = files[0];
    var reader = new FileReader();
    reader.readAsBinaryString(f);
    reader.onload = function(e){ // 読み込み後の処理
	// 文字コードをUNICODEに変換
	var binArray = str2Array(e.target.result);
	var uniArray = Encoding.convert(binArray, 'UNICODE');
	var result = Encoding.codeToString(uniArray);

	// CSV（またはTSV）を２次元配列化
	var csvval;
	if(f.name.match(/.csv$/)){ // csv file
	    csvval = $.csv(",","","¥n")(result);
	}else if(f.name.match(/.tsv$/)){ // tsv file
	    csvval = $.csv("¥t","","¥n")(result);
	}else{
	    csvval = [];
	}

	// 地図上にマーカーを作成
	var markers = [];
	for(var i = 0, n = 0;i < csvval.length;i++) {
	    var ttl = csvval[i][0]; //名称
	    var lng = csvval[i][1]; //経度
	    var lat = csvval[i][2]; //緯度
	    var cat = csvval[i][3]; //カテゴリー
	    var adr = csvval[i][4]; //住所
	    var prk = csvval[i][5]; //駐車場
	    var elv = csvval[i][6]; //昇降設備
	    if(cat.match(/医療/)){
		markers[n] = [];
		markers[n][0] = i;
		markers[n][1] = new google.maps.Marker({
		    title: ttl,
		    position: new google.maps.LatLng(lat,lng),
		    map: map
		});
		attachMessage(markers[n][1], ttl+"<br/>"+adr+"<br/>"+prk+"<br/>"+elv);
		n++;
	    }
	}
    };
}

function attachMessage(marker, msg) { // マーカーに吹き出しをつける
    google.maps.event.addListener(marker, 'click', function(event) {
	new google.maps.InfoWindow({
	    content: msg
	}).open(marker.getMap(), marker);
    });
}

function str2Array(str) {
    var array = [],i,il=str.length;
    for(i=0;i<il;i++) array.push(str.charCodeAt(i));
    return array;
}

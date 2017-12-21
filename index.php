<!DOCTYPE html>
<html lang="ja">
  <head>
    <title>チームサザン</title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <link rel="stylesheet" type="text/css" href="css/route.css" />
    <style>
      #map_canvas { float:left; width:70%; height:100%; }
      #side { float:right; width:30%; height:100%; }
      #side .inner { padding:10px; overflow:auto; }
    </style>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?key=AIzaSyBKrcan37P6VmQ8B6EEoCBSoiZW7g4ptug">//</script>
    <script tye="text/javascript" src="js/output.js">//</script>
    <script tye="text/javascript" src="js/resource.js">//</script>
    <script tye="text/javascript" src="js/get_tourist_csv.js">//</script>
    <script tye="text/javascript" src="js/distance.js">//</script>
    <script tye="text/javascript" src="js/popular.js">//</script>
    <script tye="text/javascript" src="js/route.js">//</script>
  </head>

  <body>
    <h1>寄り道支援アプリケーション</h1>
    <p><input type="button" value="取得中データ確認" id="data_check"></p>
    <form>
      <input type="text" name="from" id="from">
      <input type="text" name="to" id="to">
      <input type="button" value="マーカ表示" id="button">
    </form>
    <div id="map_canvas"></div>

    <div id="side">
      <div class="inner">
      <p>
         <label for="mode">モード：<select id="mode" name="mode">
            <option value="driving" selected>DRIVING（自動車）</option>
            <option value="bicycling">BICYCLING （自転車）</option>
            <option value="transit">TRANSIT（電車）</option>
            <option value="walking">WALKING（徒歩）</option>
         </select></label>
      </p>
      <div class="button-group">
         <button id="show" class="button active">ルート表示</button>
         <button id="hide" class="button">ルート非表示</button>
      </div>
      <div id="directions_panel" style="width:100%"></div>
   </div>
   </div>
   <br clear="all" />

  </body>
</html>

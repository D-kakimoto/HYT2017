<!DOCTYPE html>
<html lang="ja">
  <head>
    <title>チームサザン</title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?key=AIzaSyBKrcan37P6VmQ8B6EEoCBSoiZW7g4ptug">//</script>
    <script tye="text/javascript" src="js/jquery-2.2.4.min.js">//</script>
    <script tye="text/javascript" src="js/jquery_csv.js">//</script>
    <script tye="text/javascript" src="js/encoding.min.js">//</script>
    <script tye="text/javascript" src="js/output.js">//</script>
  </head>
  <body>
    <h1>寄り道支援アプリケーション</h1>
    <form>
      <input type="text" value="和歌山市駅" id="from">
      <input type="text" value="和歌山アドベンチャーワールド" id="to">
      <input type="button" value="マーカ表示" id="button">
    </form>
    <div style="width:500px;height:300px;" id="map_canvas"></div>
    <?php
    echo "こんにちは";
    ?>
  </body>
</html>

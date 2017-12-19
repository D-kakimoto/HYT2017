<!DOCTYPE html>
<html lang="ja">
  <head>
    <title>チームサザン</title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?key=AIzaSyCNwuP-YysGJfpc3tBq46H-674Hr1Vs_sM&sensor=false">//</script>
    <script tye="text/javascript" src="js/jquery-2.2.4.min.js">//</script>
    <script tye="text/javascript" src="js/jquery_csv.js">//</script>
    <script tye="text/javascript" src="js/encoding.min.js">//</script>
    <script tye="text/javascript" src="js/output.js">//</script>
  </head>
  <body>
    <h1>寄り道支援アプリケーション</h1>
    <input id="readbutton" type="file" onchange="read_csv(this.files)" />
    <div style="width:500px;height:300px;" id="map_canvas"></div>
    <?php
    echo "こんにちは";
    ?>
  </body>
</html>

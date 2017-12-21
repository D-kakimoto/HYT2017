<!DOCTYPE html>
<html lang="ja">
  <head>
    <title>チームサザン</title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?key=AIzaSyBKrcan37P6VmQ8B6EEoCBSoiZW7g4ptug">//</script>
    <script tye="text/javascript" src="js/output.js">//</script>
    <script tye="text/javascript" src="js/resource.js">//</script>
    <script tye="text/javascript" src="js/get_tourist_csv.js">//</script>
    <script tye="text/javascript" src="js/distance.js">//</script>
    <script tye="text/javascript" src="js/popular.js">//</script>
  </head>

  <body>
    <h1>寄り道支援アプリケーション</h1>
    <form>
      <input type="text" name="from" id="from">
      <input type="text" name="to" id="to">
      <input type="button" value="マーカ表示" id="button">
    </form>
    <div style="width:600px;height:400px;" id="map_canvas"></div>
  </body>
</html>

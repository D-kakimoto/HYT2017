var get_tourist;
//CSVデータの取得（すでに入れてると思います）
function get_tourist(){
  d3.csv("csv/tourist.csv", function(error, data) {
    get_tourist = data;
  });
}

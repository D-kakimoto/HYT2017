get_tourist();
function get_tourist(){
  d3.csv("csv/tourist.csv", function(error, data) {
    console.log(data);
  });
}

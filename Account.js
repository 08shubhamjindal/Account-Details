document.getElementById("next").addEventListener("click", function(){counter(1)});
document.getElementById("previous").addEventListener("click", function(){counter(-1)});

const url = 'http://starlord.hackerearth.com/bankAccount';
fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {
    console.log(data);
    localStorage.setItem('details', JSON.stringify(data));
    show_data(data, 1);
    document.getElementById("previous").disabled = true;
  })
  .catch(function(error) {
    console.log(error);
  });

const paginate = function (array, index, size) {
          index = Math.abs(parseInt(index));
          index = index > 0 ? index - 1 : index;
          size = parseInt(size);
          size = size < 1 ? 1 : size;

          return [...(array.filter((value, n) => {
              return (n >= (index * size)) && (n < ((index+1) * size))
          }))]
}



var indexx=1;
counter = (value)=>{
  indexx = indexx + value;
  console.log(indexx);
  document.getElementById("previous").disabled = indexx<=1 ? true : false;
  var data = JSON.parse(localStorage.getItem('details'));
  size =  parseInt((data.length)/5);
  checksz = size*5==data.length ? size : size +1;
  document.getElementById("next").disabled = indexx>=checksz ? true : false;
  show_data(data, indexx);
}


show_data = async (data,value)=>{
  var transform = paginate(data, value, 5);
  console.log(transform);
  var size = transform.length;
  document.getElementById("cards").innerHTML = "";
  var xx=  (value-1)*5;
  for(var i=0; i<size; i++){
    document.getElementById("cards").innerHTML = document.getElementById("cards").innerHTML + `<a class="card" href="#">
    <span class="card-header" style="background-image: url(http://placeimg.com/400/200/animals);">
      <span class="card-title">
        <h3>${xx +(i+1)} -- Account No - ${transform[i]["Account No"]}
             </h3>
      </span>
    </span>
    <span class="card-summary">
      Transaction Details : ${transform[i]["Transaction Details"]}
    </span>
    <br/>
    <span class="card-meta">
     ${transform[i]["Date"]}
    </span>
  </a>`
  }
}

document.getElementById("next").addEventListener("click", function(){counter(1)});
document.getElementById("previous").addEventListener("click", function(){counter(-1)});
document.getElementById("ddlitemslist").addEventListener("change", function(){filter()});

var indexx=1;
var dataAfterstore = JSON.parse(localStorage.getItem('details'));
var filtercreteria="None";
filter = ()=> {
  filtercreteria = document.getElementById('ddlitemslist').value;
  console.log(filtercreteria);
  show_data(dataAfterstore, indexx, filtercreteria);
}

var ddlItems = document.getElementById("ddlitemslist"),
itemArray = ["None", "Date", "Value Date", "Deposit AMT"];
    for (var i = 0; i < itemArray.length; i++) {
      var opt = itemArray[i];
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      ddlItems.appendChild(el);
}

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

counter = (value)=>{
  indexx = indexx + value;
  console.log(indexx);
  document.getElementById("previous").disabled = indexx<=1 ? true : false;
  size =  parseInt((dataAfterstore.length)/5);
  checksz = size*5==dataAfterstore.length ? size : size +1;
  document.getElementById("next").disabled = indexx>=checksz ? true : false;
  show_data(dataAfterstore, indexx, filtercreteria) ;
}

sortingByDate = (transform) => {
     transform.sort(function (a, b) {
     var res_A = a.Date.split(" ");
     astring = new Date(res_A[2], getmonth[res_A[1]], res_A[0]);
     var res_B = b.Date.split(" ");
     bstring = new Date(res_B[2], getmonth[res_B[1]], res_B[0]);
     return bstring - astring;
 });
}

sortingByDeposit = (transform) =>{
transform.sort(function(a, b) {
  a = a["Deposit AMT"].replace(/\,/g,'');
  b = b["Deposit AMT"].replace(/\,/g,'');
  console.log(parseFloat(a));
  return parseFloat(b) - parseFloat(a);
});
}
var getmonth = [];
getmonth["Jan"] = "01";
getmonth["Feb"] = "02";
getmonth["Mar"] = "03";
getmonth["Apr"] = "04";
getmonth["May"] = "05";
getmonth["Jun"] = "06";
getmonth["Jul"] = "07";
getmonth["Aug"] = "08";
getmonth["Sep"] = "09";
getmonth["Oct"] = "10";
getmonth["Nov"] = "11";
getmonth["Dec"] = "12";

show_data = async (data,value,filtercreteria)=>{
  var transform = paginate(data, value, 5);
  if(filtercreteria==='Date'){
    sortingByDate(transform);
  }else if(filtercreteria==='Deposit AMT'){
    sortingByDeposit(transform);
  }
  var size = transform.length;
  var xx=  (value-1)*5;
  var htmlElements  = "";
  for(var i=0; i<size; i++) {
    htmlElements +=  '<a class="card" href="#"><span class="card-title"><h3>' + Number(Number(xx)+Number((i+1))) +  '-- Account No -' + transform[i]["Account No"] + '</h3>'
     + '</span></span><span class="card-summary">Transaction Details :' + transform[i]["Transaction Details"] +
    '</span><br/><span class="card-meta">' + transform[i]["Date"] + '</span> </a><br/>'+transform[i]["Deposit AMT"];
  }
  document.getElementById("cards").innerHTML = htmlElements;
}

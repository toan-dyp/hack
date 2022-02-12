
var Wrongs = [], Miss = [], Rights = [];
var num = 1;
function init(){
  Wrongs = [], Miss = [], Rights = [];
  num = 1;
}
function check(n,hienthi){
  var btn = document.createElement("button");
  if(n===0) {
    Wrongs.push(num);
    btn.innerHTML = num;
    btn.className = "btn-danger";
    hienthi.appendChild(btn);
  };
  if(n===2){
    Miss.push(num);
    btn.innerHTML = num;
    btn.className = "btn-secondary";
    hienthi.appendChild(btn);
  }
  if(n===1){
    Rights.push(num);
    btn.innerHTML = num;
    btn.className = "btn-success";
    hienthi.appendChild(btn);
  }   
  num++;
}
function parseJSON() {
  init();
  hienthi = document.getElementById("res");
  hienthi.innerHTML = '';
  
  var textInput = document.getElementById('data').value;
  if (textInput !== '') {
    try {
      let json = JSON.parse(textInput);
      for(i of json){
        res = i.result;
        if(res !== void 0){
          if(Array.isArray(res))
            for(j of res) check(j,hienthi);
          else
            check(res,hienthi);
        } else num++;
      }
    } catch (e) {
      console.log(e)
    }
  }
  num--;
  console.log("Câu sai: "+ Wrongs)
  console.log("Câu chưa đúng làm: "+ Miss)
  console.log("Điểm: "+ ((10/num)*Rights.length).toFixed(2) + " ("+Rights.length+"/"+num+")");
  document.getElementById("point").innerHTML = "<b>Điểm: </b>" + ((10/num)*Rights.length).toFixed(2) + " ("+Rights.length+"/"+num+")";
}
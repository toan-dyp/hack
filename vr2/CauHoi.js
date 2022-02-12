Data = [];
name_ = ['A','B','C','D'];
N = {
_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
decode: function(t) {
    var e, i, n, a, o, r = "", c = 0;
    for (t = t.replace(/[^A-Za-z0-9+/=]/g, ""); c < t.length; )
        e = this._keyStr.indexOf(t.charAt(c++)) << 2 | (n = this._keyStr.indexOf(t.charAt(c++))) >> 4,
        i = (15 & n) << 4 | (a = this._keyStr.indexOf(t.charAt(c++))) >> 2,
        n = (3 & a) << 6 | (o = this._keyStr.indexOf(t.charAt(c++))),
        r += String.fromCharCode(e),
        64 != a && (r += String.fromCharCode(i)),
        64 != o && (r += String.fromCharCode(n));
    return r = N._utf8_decode(r)
},
_utf8_decode: function(t) {
    for (var e = "", i = 0, n = c1 = c2 = 0; i < t.length; )
        (n = t.charCodeAt(i)) < 128 ? (e += String.fromCharCode(n),
        i++) : 191 < n && n < 224 ? (c2 = t.charCodeAt(i + 1),
        e += String.fromCharCode((31 & n) << 6 | 63 & c2),
        i += 2) : (c2 = t.charCodeAt(i + 1),
        c3 = t.charCodeAt(i + 2),
        e += String.fromCharCode((15 & n) << 12 | (63 & c2) << 6 | 63 & c3),
        i += 3);
    return e
}
}
function parseJSON() {
      try {
        s = "";
        textInput = document.getElementById('data').value;
        json = JSON.parse(textInput);
        xuly1(json);
        textInput = document.getElementById('data2').value;
        json = JSON.parse(textInput);
        xuly2(json);
        
        renderMathInElement(document.body, {
          delimiters: [
              {left: '$$', right: '$$', display: true},
              {left: '$', right: '$', display: false},
              {left: '\\(', right: '\\)', display: false},
              {left: '\\[', right: '\\]', display: true}
          ],
          throwOnError : false
        });
      } catch (e) {
        console.log(e)
      }
}

function dom(string) {return new DOMParser().parseFromString(string,"text/html");}

function xuly1(json){
  for(k = 0; k < json.length; ++k){
    s = N.decode(json[k]["content"]);

    ques_c = dom(s.substring(0,s.search("<ol"))).querySelectorAll("body p");
    
    ans = dom(s.substring(s.search("<ol"))).querySelectorAll("ol li");

    Data[k] = {id:json[k]["id"],question:"",ans:[]};
    
    for(i = 0; i < ques_c.length; ++i) Data[k]["question"] += ques_c[i].outerHTML;

    for(var i=0;i<4;++i) Data[k]["ans"][i] = ans[i].outerHTML;
  }
  console.log(Data);
}

function xuly2(json){
  s = "";
  for(k = 0; k<json.length; ++k){
    check = 0;
    id = json[k]["idq"];
    pos = Data.map(function(e) {return e.id}).indexOf(id);
    s += '<div id = "'+(k+1)+'" style="padding: 0.01em 16px;border: 1px solid #ccc;border-radius: 16px;margin-bottom: 10px;">'
      +  '<div class = "title">Câu '+(k+1)+'</div>'
      +  '<div class = "quiz">' + Data[pos]["question"] + '</div>' 
      +  '<div class = "quiz_list">';
    for(i = 0; i<4; ++i) {
      pos_ = JSON.parse(json[k]["params"])["order"][i];
      temp = '<div class="quiz_child">' 
           + '<button>'+name_[i]+'</button>'
           + Data[pos]["ans"][pos_]
           + '</div>';
      res = dom(temp);
      li = res.querySelectorAll("body li")[0];
      btn = res.querySelectorAll("body button")[0];
      if(li.classList.contains("correctAnswer")){
        li.classList.remove("correctAnswer");
        btn.classList.add("btn-success");
        check = 1;
      } else btn.classList.add("btn-secondary");
      if(btn.classList.contains("btn-secondary")){
        if(JSON.parse(json[k]["answer"])[0] == pos_){
          btn.classList.remove("btn-secondary");
          btn.classList.add("btn-danger");
        }  
      }
      s+=res.querySelectorAll("body *")[0].outerHTML;
    }
    s += '</div></div>';
    console.log(dom(s).querySelectorAll("body .title")[k]);
  }
  document.getElementById("res").innerHTML = s;
  //console.log(s);
}
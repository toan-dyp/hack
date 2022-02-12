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

$(document).ready(function(){
    $("#Eng").click(function(){
        if($("#Eng").is(":checked")){
            $("#all").addClass("an");    
            if($("#lua-chon").val()==1)
                $("#lua-chon").val('0');
            andatalog($("#lua-chon").val());
        } else {
            $("#all").removeClass("an"); 
        }
    });

    $("#lua-chon").change(function(){
        andatalog($("#lua-chon").val());
    });
});


function dom(string) {return new DOMParser().parseFromString(string,"text/html");}

function andatalog(e){
    document.getElementById("dethi").innerHTML = '';
    if(e==0){
        document.getElementById("data_log").classList.add("an");
        document.getElementById("thongtin").classList.add("an");
        document.getElementById("loc").classList.add("an");
        $("#orgin").removeClass("an");      
    }
    else
    if(e==1){
        document.getElementById("thongtin").classList.remove("an");
        document.getElementById("data_log").classList.remove("an");
        document.getElementById("loc").classList.remove("an");
        $("#orgin").removeClass("an");      
    } else {
        $("#orgin").addClass("an");   
        document.getElementById("data_log").classList.remove("an"); 
        document.getElementById("thongtin").classList.add("an");
        document.getElementById("loc").classList.add("an");  
        //document.getElementById("dethi").innerHTML = '<iframe src="https://toan-dyp.github.io/training/check/"  width="100%" height="1000px"></iframe>';
    }
}

function parseJSON(text){
    try {
        return JSON.parse(text);
    } catch (e) {
        return undefined;
    }
}

function main(){
    var text_de_goc = $("#text-orgin").val();
    var text_de_tron = $("#text-data").val();
    var lua_chon = $("#lua-chon :selected").val();
    if(lua_chon == 0){
        if(parseJSON(text_de_goc)!=undefined){
            if($('#Eng').is(":checked")) {
                Eng_xem(parseJSON(text_de_goc));
                document.getElementById("dethi").innerHTML = s;
            }
            else {
                xem_de(parseJSON(text_de_goc));
                print(1);
            }
        } else {
            $("#text-orgin").val();
            alert("Nhập sai định dạng!");
        }
    } else 
    if(lua_chon==1){
        if(parseJSON(text_de_goc)!=undefined && parseJSON(text_de_tron)!=undefined){
            xem_de(parseJSON(text_de_goc));
            full_chuc_nang(parseJSON(text_de_tron));
            print(2);
        } else {
            $("#text-orgin").val('');
            $("#text-data").val('');
            alert("Nhập sai định dạng!");
        }
    }
    else{
        ce(text_de_tron);
    }
    $("#text-orgin").val(JSON.stringify(parseJSON(text_de_goc)));
    $("#text-data").val(JSON.stringify(parseJSON(text_de_tron)));
    beauti();
}

DG = [];
DD = [];
total = {point: 0, c_right: 0, c_done: 0}
Label = ['A','B','C','D'];

function xem_de(de_goc){
    i=0;
    n = de_goc.length;
    DG.length = 0;
    for(; i<n; ++i){
        var _id = de_goc[i]["id"]; 
        var _lv = de_goc[i]["level"];
        var _body = dom(N.decode(de_goc[i]['content'])).querySelectorAll("body")[0]; 
        // Lấy Đề Bài
        var _ques = _body.querySelectorAll('p');
        DG[i] = {id:_id, De:[], ABCD:[], DapAn:0, lv: _lv};
        for(var elem of _ques) DG[i]["De"].push(elem.innerHTML);

        // Lấy ABCD
        var _ans = _body.querySelectorAll('ol li');
        for(j = 0; j<4; ++j){
            if(_ans[j].classList.contains("correctAnswer"))
                DG[i]['DapAn'] = j;
            DG[i]['ABCD'].push(_ans[j].innerHTML);
        }
    }
    
}   

function full_chuc_nang(de_phu){
    i = 0;
    n = de_phu.length;
    DD.length = 0;
    for(; i<n; ++i){
        var _id = de_phu[i]['idq'];
        var _score = de_phu[i]['score'];
        var My_ans = JSON.parse(de_phu[i]["answer"])[0];
        var params = JSON.parse(de_phu[i]["params"])["order"];
        
        var pos = DG.map((e) => {return e.id}).indexOf(_id);
        var DA = DG[pos]['DapAn'];
        var lv = DG[pos]['lv'];
        var ques = DG[pos]['De'];
        var ans = [];
        for(var j =0 ;j<4; ++j){
            var t1=My_ans, t2=DA;
            var k = DG[pos]['ABCD'][params[j]]; 
            ans[j] = k;
        }
        DD[i] = {done:(2!=de_phu[i]["result"]), ques:ques, ans:ans, DapAn: params.indexOf(DA), Mans:params.indexOf(parseInt(My_ans)), score:_score,lv:lv};
    }
}

function beauti(){
    renderMathInElement(document.body, {
        delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false},
            {left: '\\(', right: '\\)', display: false},
            {left: '\\[', right: '\\]', display: true}
        ],
        throwOnError : false
      });
}

function print(cho){
    total.point = 0;
    total.c_right = 0;
    total.done = 0;
    const _main = $('#dethi');
    _main.empty();
    var CHUOI = '';
    if(cho==1){
        for(i = 0; i<DG.length; ++i){
            var dungsai='';
            CHUOI += '<div id = "Cau_' + (i+1) +'" class ="item mb-3">'
            + '<div id = "head">' 
            + '<h4 id = "content" class = "font-weight-bold">';
            CHUOI += 'Câu ' + (i+1) + '\n'
            + '<span class="badge bg-primary">'
            + 'Mức độ ' + DG[i]['lv'] + '</span>\n'
            + '</h4></div>'
            + '<div id = "body">'
            + '<div id = "DeBai" class="fs-4">'
            var quest = '';
            for(var j =0 ; j<DG[i]['De'].length; ++j) quest += '<p>' + DG[i]['De'][j] + '<p>\n';
            CHUOI += quest
            + '</div>'
            + '<div id = "ABCD" class = "fs-5">';
            var ABCD = '<div class="row mb-3">';
            for(var j = 0; j < 2; ++j){
                if(j==DG[i]['DapAn']) dungsai='success'; else dungsai='secondary';
                ABCD += '<div class="col-sm-6">'
                      + '<div class="row">'
                      + '<div class="col-sm-2">'
                      + '<button class="btn btn-'+dungsai+'">'+Label[j]+'</button>'
                      + '</div>'
                      + '<div class="col-sm-10 mt-2 fs-5">'
                      + '<span class="w-3">' + DG[i]['ABCD'][j] + '</span>'
                      + '</div></div></div>'
            }
            ABCD += '</div>'
                  + '<div class="row mb-3">';
            for(var j = 2; j < 4; ++j){
                if(j==DG[i]['DapAn']) dungsai='success'; else dungsai='secondary';
                ABCD += '<div class="col-sm-6">'
                      + '<div class="row">'
                      + '<div class="col-sm-2">'
                      + '<button class="btn btn-'+dungsai+'">'+Label[j]+'</button>'
                      + '</div>'
                      + '<div class="col-sm-10 mt-2 fs-5">'
                      + '<span class="w-3">' + DG[i]['ABCD'][j] + '</span>'
                      + '</div></div></div>'
            }
            ABCD += '</div>';

            CHUOI += ABCD
                   + '</div></div></div>';
        }
        _main.append(CHUOI);
    } else {
        for(i = 0; i<DD.length; ++i){
            var dungsai='badge bg-';
            var ds = '';
            if(DD[i]['done'] == 0){
                ds = 'Chưa làm';
                dungsai+='warning';
                ++total.done;
            } else {
                if(DD[i]['DapAn'] == DD[i]['Mans']){
                    ds = 'Đúng',dungsai += 'success', total.point += DD[i]['score'], ++total.c_right; 
                    if($('#dropdownCheck').is(":checked")) continue;
                } 
                else 
                    dungsai+='danger',ds='Sai';
            }
            CHUOI += '<div id = "Cau_' + (i+1) +'" class ="item mb-3">'
               + '<div id = "head">' 
               + '<h4 id = "content" class = "font-weight-bold">';
            CHUOI += 'Câu ' + (i+1) + '\n'
                   + '<span class="badge bg-primary">'
                   + DD[i]['score'] + 'đ - '
                   + 'Mức độ ' + DD[i]['lv'] + '</span>\n'
                   + '<span class = "' + dungsai + '">' + ds + "</span>"
                   + '</h4></div>'
                   + '<div id = "body">'
                   + '<div id = "DeBai" class="fs-4">'
            var quest = '';
            for(var j =0 ; j<DD[i]['ques'].length; ++j) 
                quest += '<p>' + DD[i]['ques'][j] + '<p>\n';
            CHUOI += quest
                   + '</div>'
                   + '<div id = "ABCD" class = "fs-5">';
            var ABCD = '<div class="row mb-3">';
            for(var j = 0; j < 2; ++j){
                var type = 'secondary';
                if(j == DD[i]['Mans'])
                    if(j == DD[i]['DapAn'])
                        type = 'success';
                    else
                        type = 'danger';
                ABCD += '<div class="col-sm-6">'
                      + '<div class="row">'
                      + '<div class="col-sm-2">'
                      + '<button class="btn btn-'+type+'">'+Label[j]+'</button>'
                      + '</div>'
                      + '<div class="col-sm-10 mt-2 fs-5">'
                      + '<span class="w-3">' + DD[i]['ans'][j] + '</span>'
                      + '</div></div></div>'
            }
            ABCD += '</div>'
                  + '<div class="row mb-3">';
            for(var j = 2; j < 4; ++j){
                var type = 'secondary';
                if(j == DD[i]['Mans'])
                    if(j == DD[i]['DapAn'])
                        type = 'success';
                    else
                        type = 'danger';
                if(j == DD[i]['DapAn']) type = 'success';
                ABCD += '<div class="col-sm-6">'
                      + '<div class="row">'
                      + '<div class="col-sm-2">'
                      + '<button class="btn btn-'+type+'">'+Label[j]+'</button>'
                      + '</div>'
                      + '<div class="col-sm-10 mt-2 fs-5">'
                      + '<span class="w-3">' + DD[i]['ans'][j] + '</span>'
                      + '</div></div></div>'
            }
            ABCD += '</div>';

            CHUOI += ABCD
                   + '</div></div></div>';
        }

        if(CHUOI.length == 0 || total.c_right == DD.length)
            CHUOI = '<div class="alert alert-success" role="alert">'
                  + '<h4 class="alert-heading">Chúc mừng!</h4>'
                  + '<p>Bạn đã làm đúng hết!</p>'
                  + '<hr>'
                  + '<p class="mb-0">Giải trí thôi!</p>'        
                  + '</div>' + CHUOI;
        _main.append(CHUOI);

        var x = (total.point*10);
        $("#diem").children(":nth-child(1)").text(total.point +' / 10');
        $("#diem").children(":nth-child(1)").css("width", (x).toString()+"%");
        $("#diem").children(":nth-child(2)").css("width", (100-x).toString()+"%");
        
        console.log(_main);
    }
    beauti();
}

Data = [];
name_ = ['A','B','C','D'];

s = ''
function Eng_xem(de_goc){
    for(i of de_goc) s+=N.decode(i["content"]);
    s = dom(s).firstChild.innerHTML;
    console.log(s);
    beauti();
}

var Wrongs = [], Miss = [], Rights = [];
var num = 1;
function init(){
  Wrongs = [], Miss = [], Rights = [];
  num = 1;
}

function check(n,hienthi){
    var btn = document.createElement("button");
    btn.className = 'check ';
    if(n===0) {
      Wrongs.push(num);
      btn.innerHTML = num;
      btn.className += "btn-danger";
      hienthi.appendChild(btn);
    };
    if(n===2){
      Miss.push(num);
      btn.innerHTML = num;
      btn.className += "btn-secondary";
      hienthi.appendChild(btn);
    }
    if(n===1){
      Rights.push(num);
      btn.innerHTML = num;
      btn.className += "btn-success";
      hienthi.appendChild(btn);
    }   
    num++;
}

function ce(textInput){
  init();
  hienthi = document.getElementById("dethi");
  hienthi.innerHTML = '';
  
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
}

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
        var textInput = document.getElementById('data').value;
        let json = JSON.parse(textInput);
        for(i of json) s+=N.decode(i["content"]);
        var doc = new DOMParser().parseFromString(s,"text/html");
        //s = "<div class='container'>" + doc.firstChild.innerHTML + "</div>";document.body.innerHTML = s;
        s= doc.firstChild.innerHTML;document.getElementById("res").innerHTML = s;
        renderMathInElement(document.body, {
          // customised options
          // • auto-render specific keys, e.g.:
          delimiters: [
              {left: '$$', right: '$$', display: true},
              {left: '$', right: '$', display: false},
              {left: '\\(', right: '\\)', display: false},
              {left: '\\[', right: '\\]', display: true}
          ],
          // • rendering keys, e.g.:
          throwOnError : false
        });
      } catch (e) {
        console.log(e)
      }
}
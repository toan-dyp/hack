var d, u, h, o = function() {},
m = {},
t = "/?g=math.q_quiz_enc",
p = [],
n = [],
s = [],
g = [],
r = 0,
c = [],
l = [],
f = 0,
_ = [],
v = [],
b = 0,
y = 0,
x = 0,
k = 0,
q = 0,
S = 0;
quiz_choose = 0;
var i = [],
w = [];
savedQuiz = [];
var C, P = 0,
z = 0,
E = 0,
j = 0,
N = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(t) {
        var e, i, n, a, o, r, c = "",
            s = 0;
        for (t = N._utf8_encode(t); s < t.length;)
            n = (r = t.charCodeAt(s++)) >> 2,
            a = (3 & r) << 4 | (e = t.charCodeAt(s++)) >> 4,
            o = (15 & e) << 2 | (i = t.charCodeAt(s++)) >> 6,
            r = 63 & i,
            isNaN(e) ? o = r = 64 : isNaN(i) && (r = 64),
            c = c + this._keyStr.charAt(n) + this._keyStr.charAt(a) + this._keyStr.charAt(o) + this._keyStr.charAt(r);
        return c
    },
    decode: function(t) {
        var e, i, n, a, o, r = "",
            c = 0;
        for (t = t.replace(/[^A-Za-z0-9+/=]/g, ""); c < t.length;)
            e = this._keyStr.indexOf(t.charAt(c++)) << 2 | (n = this._keyStr.indexOf(t.charAt(c++))) >> 4,
            i = (15 & n) << 4 | (a = this._keyStr.indexOf(t.charAt(c++))) >> 2,
            n = (3 & a) << 6 | (o = this._keyStr.indexOf(t.charAt(c++))),
            r += String.fromCharCode(e),
            64 != a && (r += String.fromCharCode(i)),
            64 != o && (r += String.fromCharCode(n));
        return r = N._utf8_decode(r)
    },
    _utf8_encode: function(t) {
        t = t.replace(/rn/g, "n");
        for (var e = "", i = 0; i < t.length; i++) {
            var n = t.charCodeAt(i);
            n < 128 ? e += String.fromCharCode(n) : (127 < n && n < 2048 ? e += String.fromCharCode(n >> 6 | 192) : (e += String.fromCharCode(n >> 12 | 224),
                    e += String.fromCharCode(n >> 6 & 63 | 128)),
                e += String.fromCharCode(63 & n | 128))
        }
        return e
    },
    _utf8_decode: function(t) {
        for (var e = "", i = 0, n = c1 = c2 = 0; i < t.length;)
            (n = t.charCodeAt(i)) < 128 ? (e += String.fromCharCode(n),
                i++) : 191 < n && n < 224 ? (c2 = t.charCodeAt(i + 1),
                e += String.fromCharCode((31 & n) << 6 | 63 & c2),
                i += 2) : (c2 = t.charCodeAt(i + 1),
                c3 = t.charCodeAt(i + 2),
                e += String.fromCharCode((15 & n) << 12 | (63 & c2) << 6 | 63 & c3),
                i += 3);
        return e
    }
},
e = [],
B = !1;
e.vi = {
    question: "C??u"
},
e.en = {
    question: "Question"
},
o.init = function(t) {
    if (j = (m = t).num_out,
        w = m.data_log,
        m.done_exam && (b = m.done_exam.tn_score,
            y = m.done_exam.tl_score,
            x = m.done_exam.max_score,
            k = m.done_exam.correct,
            q = m.done_exam.wrong,
            S = m.done_exam.missed,
            P = m.done_exam.type_exam,
            z = m.done_exam.times,
            E = m.done_exam.ended),
        C = e[m.lang],
        h = $("#main-contest"),
        m.isTimeStart && 0 < m.timeStart) {
        r = m.timeStart;
        var a = setInterval(function() {
            {
                var t, e, i, n;
                0 == --r ? (B ? A(B) : O(!0),
                    clearInterval(a)) : (t = parseInt(r / 86400),
                    e = parseInt((r - 24 * t * 3600) / 3600),
                    i = parseInt((r - 24 * t * 3600 - 3600 * e) / 60),
                    n = "",
                    0 < t && (n += t + " ng??y, "),
                    0 < e && (n += e + " gi??? "),
                    0 < i && (n += i + " ph??t "),
                    0 < (i = r - 24 * t * 3600 - 3600 * e - 60 * i) && (n += i + " gi??y"),
                    "" != n && (n = "c??n " + n),
                    $("#timecount").html(n))
            }
        }, 1e3);
        $("#timer").hide(),
            O(!1)
    } else {
        if (!m._list)
            return void $("#main-contest").html("Kh??ng t??m th???y c??u h???i n??o ??? ????? thi n??y. Vui l??ng ki???m tra l???i n???i dung ????? thi!");
        0 < m.id_user ? O(!0) : $("#timer").hide()
    }
    $("#btn-check").on("click", function() {
            return T._time > 60 * m.time_submit ? (alert("B???n ch??? c?? th??? n???p b??i thi sau khi l??m ???????c " + m.not_early + " ph??t."),
                !1) : ($("#btn-check").prop("disabled", !0),
                void(confirm("B???n c?? ch???c ch???n n???p b??i thi n??y") ? G(!1) : $("#btn-check").prop("disabled", !1)))
        }),
        0 < j && $("#tmp_score").html("???? tho??t ra: " + j)
};
var T = new Object;

function a() {
1 == T._time && G(!0),
    --T._time;
var t = parseInt(T._time / 60),
    e = T._time % 60,
    i = "";
i += t < 10 ? "0" + t : t,
    i += " : ",
    i += e < 10 ? "0" + e : e,
    $("#time_num").html(i)
}

function O(e) {
$.ajax({
    url: t,
    data: {
        id_subject: m.id_subject,
        id_skill: m.id_category,
        qlib_list: m.list_q,
        matrix: m.matrix
    },
    cache: !1,
    method: "GET",
    dataType: "json",
    success: function(t) {
        B = t,
            e && A(t)
    },
    error: function(t) {
        console.log(t),
            alert("Can not load question!")
    }
})
}

function A(t) {
t.length;
for (var e = 0; e < t.length; e++)
    p["q" + t[e].id] = t[e].content,
    n["q" + t[e].id] = t[e].q_type,
    18 == t[e].q_type ? (f++,
        l[t[e].level] || (l[t[e].level] = []),
        l[t[e].level].push(t[e].id)) : (c[t[e].level] || (c[t[e].level] = []),
        c[t[e].level].push(t[e].id));
for (e = 0; e < m._list.length; e++)
    s["q" + m._list[e].id_script] = m._list[e].score;
if (m.not_shuffle)
    for (var i = m.list_q.split(","), e = 0; e < i.length; e++)
        (18 == n["q" + i[e]] ? v : _).push(i[e]);
$("#timer").show(),
    localStorage.getItem("data" + m.id_user + "." + m.id_category) || 0 != m.data_log.length ? (console.log("History"),
        function() {
            if (0 === P && (P = 0 < c.length && 0 < l.length ? 3 : 0 < c.length ? 1 : 2),
                m.done_exam)
                ! function() {
                    $("#timer").remove(),
                        m.hidem && (E = y = 0);
                    var t = Math.round(1e3 * (b + y) / x) / 100,
                        e = parseInt(z / 60) + " ph??t, " + z % 60 + " gi??y",
                        i = "<p><b>" + m.say + "</b> ???? ho??n th??nh b??i ki???m tra n??y!</p>";
                    m.hidem || (i += "<p>S??? c??u ????ng: " + k + "</p>",
                            i += "<p>T???ng s??? c??u h???i: " + (k + S + q) + "</p>",
                            1 === P ? (i += "<p>??i???m b??i thi: " + (b + y) + "</p>",
                                i += "<p>??i???m thang 10: " + t + "</p>") : 2 === P ? E ? (i += "<p>??i???m b??i thi: " + Math.round(100 * (b + y)) / 100 + "</p>",
                                i += "<p>??i???m thang 10: " + t + "</p>") : i += "<p>??i???m s???: Ch??a ch???m </p>" : (i += "<p>??i???m tr???c nghi???m: " + Math.round(100 * b) / 100 + "</p>",
                                i += E ? "<p>??i???m t??? lu???n: " + y + "</p>" : "<p>??i???m t??? lu???n: Ch??a ch???m </p>",
                                i += "<p>??i???m b??i thi: " + Math.round(100 * (b + y)) / 100 + "</p>",
                                i += "<p>??i???m thang 10: " + t + "</p>")),
                        i += "<p>Th???i gian l??m b??i: " + e + "</p>",
                        1 == redo && (i += "<p><button class = 'btn btn-danger' onclick = 'NE.redoExam();'>L??m l???i b??i n??y!</button></p>"),
                        $("#contest-result").html("<div class = 'contest-result'>" + i + "</div>")
                }();
            else if (localStorage.getItem("data" + m.id_user + "." + m.id_category))
                return $("#contest-result").html("<p>OLM ph??t hi???n d??? li???u b??i thi c???a b???n ch??a ???????c l??u tr??n h??? th???ng. H??y <a href = 'javascript:;' onclick = 'NE.saveTmpResult();' >click v??o ????y</a> ????? l??u l???i.<p>").css({
                        color: "red"
                    }),
                    0 < m.timedo && $("#contest-result").append("<p>Ho???c b???n <a href = 'javascript:;' onclick = 'NE.forceRedo()'>click v??o ????y</a> ????? l??m l???i b??i n??y.</p>"),
                    $("#main-contest").html("");
            if (1 == m.hidem && (m.viewans = 0),
                m.viewans || !m.done_exam) {
                console.log(w),
                    L = m.done_exam && m.done_exam.rotate_img ? JSON.parse(m.done_exam.rotate_img) : [],
                    console.log(L);
                var t = 1;
                h.html(""),
                    3 === P && h.append("<h3>A. Tr???c nghi???m</h3>");
                for (var e, i = 0; i < w.length; i++)
                    t += function(t, e) {
                        void 0 === (M = w[e]).tlscore || I || (m.done_exam && m.done_exam.ended ? (h.append("<h3>B. T??? lu???n</h3><div id = 'testboard'><div id = 'user-test'></div><canvas id = 'canvas' style='position: absolute;z-index:10;'></canvas></div>"),
                                J = $("#user-test")) : h.append("<h3>B. T??? lu???n</h3>"),
                            I = !0);
                        var i = e + 1,
                            n = M.idq;
                        if (!p["q" + n])
                            return h.append("<div class='titlex' id='t" + i + "'>" + C.question + " " + t + ": C??u h???i kh??ng t???n t???i (ID: " + n + ")"),
                                1;
                        u = detectQuestion(N.decode(p["q" + n]), M),
                            m.done_exam || u.setTest(!1);
                        u.setStart(C.question, t),
                            u.id_quiz = M.idq,
                            u.score = M.score,
                            u.getMany();
                        var a = u.getNumberQuiz(),
                            o = 18 !== u.idq() || m.done_exam ? "" : "<span><button class='btn btn-primary' onclick = 'NE.storeQuiz(this);'><i class='fa fa-save'></i> L??u b??i l??m</button><span></span></span>",
                            r = 18 === u.idq() ? "bttl" : "bttn",
                            c = 1 === m.adm ? "<a href = '/?l=teachercourse.quiz&id_subject=" + m.id_subject + "&id=" + n + "' style='font-weight:normal;' target='_blank'>[S???a]</a>" : "",
                            s = " <span class = 'ans_choose' id = 'ch" + i + "'></span>",
                            s = 1 === a ? "<div class='titlex' id='t" + i + "'><span class ='" + r + "'>" + C.question + " " + t + " (" + u.score + "??): </span><a href = 'javascript:;' onclick = 'NE.reportError(" + n + ");' style='font-weight:normal;'>[B??o l???i c??u h???i]</a> " + o + c + s + "</div>" : "(" + u.score + "??) <a href = 'javascript:;' onclick = 'NE.reportError(" + n + ");' style='font-weight:normal;'>[B??o l???i c??u h???i]</a> " + c + s;
                        J ? J.append("<div class='itemx'>" + s + "<div class='quizx' data-id='" + i + "'><div id='qx" + i + "'></div><div class='showExp' id='eq" + i + "' style='display:none;'></div></div></div>") : h.append("<div class='itemx'>" + s + "<div class='quizx' data-id='" + i + "'><div id='qx" + i + "'></div><div id = 'cr" + i + "'></div><div class='showExp' id='eq" + i + "' style='display:none;'></div></div></div>");
                        if (m.done_exam) {
                            if (u.makeQuestionH($("#qx" + i)),
                                void 0 !== M.tlscore)
                                -
                                1 == M.tlscore || 1 == m.hidem ? $("#t" + i).append("<span class = 'wrong'>Ch??a ch???m</span>") : $("#t" + i).append("<span class = 'corrected'>???? ch???m: " + M.tlscore + "??</span>"),
                                !m.hidem && M.comment && $("#t" + i).append("<span class = 'tl-comment'>Nh???n x??t: " + M.comment + "</span>");
                            else {
                                var d = 1;
                                if ("number" == typeof M.result)
                                    d = M.result;
                                else
                                    for (var l = 0; l < M.result.length; l++)
                                        d *= M.result[l];
                                1 == d ? $("#t" + i).append("<span class = 'corrected'>????ng</span>") : 2 == d ? $("#t" + i).append("<span class = 'missed'>Ch??a l??m</span>") : $("#t" + i).append("<span class = 'wrong'>Sai</span>")
                            }
                            $("#cr" + i).html("<button class = 'btn btn-default' onclick = 'NE.getCorrect(" + i + ")'>????p ??n ????ng</button><div id = 'showcr" + i + "' style = 'display:none;'></div>"),
                                u.makeCorrectAns($("#showcr" + i)),
                                u.hasExp() && ($("#t" + i).append("<span class = 'getExp' data-id = '" + i + "'> <i class = 'fa fa-file-text-o'></i>H?????ng d???n gi???i</span>"),
                                    u.getExp($("#eq" + i)))
                        } else
                            u.initQuestion($("#qx" + i), {
                                abcdSign: !1,
                                isAnswer: !1
                            });
                        g[e] = u;
                        i = M.label ? M.label.join("|") : "";
                        return $("#ch" + (e + 1)).html(i),
                            a
                    }(t, i);
                $(".getExp").on("click", function() {
                        var t = $(this).data("id");
                        $("#eq" + t).toggle()
                    }),
                    $("#testboard").find("img").each(function(t, e) {
                        var i = $(e).wrap("<p/>").parent().html();
                        L[t] || (L[t] = 0),
                            $(e).replaceWith("<div><span class = 'rotate-img' style = 'float:right'><a href = 'javascript:;' class='rotate-img-" + t + "' onclick = 'NE.rotate(this," + t + ")'><i class = 'fa fa-rotate-right'></i></a></span>" + i + "</div>"),
                            0 != L[t] && o.rotate($(".rotate-img-" + t), t, !0)
                    }),
                    m.done_exam && m.done_exam.ended && 1 != P && (e = !m.hidem && m.done_exam.nx ? m.done_exam.nx : "",
                        function(t, i) {
                            0 == (Q = t.find("img").length) ? H(i) : t.find("img").each(function(t, e) {
                                $(e).on("load", function() {
                                    0 == --Q && H(i)
                                })
                            })
                        }($("#testboard"), e)),
                    1 === f && $("span.bttl").hide()
            } else
                h.html("B???n ???? ho??n th??nh b??i thi n??y!");
            m.done_exam || (R(),
                    o.timecount(),
                    K()),
                D()
        }()) : (console.log("Make Exam"),
        function() {
            K(),
                h.html("");
            var t = 1,
                e = 1,
                i = [];
            if (P = 0 < c.length && 0 < l.length ? 3 : 0 < c.length ? 1 : 2,
                0 < c.length)
                if (3 === P && h.append("<h3>A. Tr???c nghi???m</h3>"),
                    m.not_shuffle) {
                    i = _;
                    for (var n = 0; n < i.length; n++)
                        e += V(i[n], e, t),
                        t += 1
                } else
                    for (var a = 1; a < c.length; a++)
                        if (c[a]) {
                            i = Z(c[a]);
                            for (n = 0; n < i.length; n++)
                                e += V(i[n], e, t),
                                t += 1
                        }
            if (0 < l.length)
                if (3 === P && h.append("<h3>B. T??? lu???n</h3>"),
                    m.not_shuffle) {
                    i = v;
                    for (n = 0; n < i.length; n++)
                        e += V(i[n], e, t),
                        t += 1
                } else
                    for (a = 1; a < l.length; a++)
                        if (l[a]) {
                            i = Z(l[a]);
                            for (n = 0; n < i.length; n++)
                                e += V(i[n], e, t),
                                t += 1
                        }
            1 === f && $("span.bttl").hide(),
                o.timecount(),
                R(),
                D()
        }())
}
T._time = 0,
T._time_count = !1,
T._time_interval = !1,
o.timecount = function() {
    T._time_count || (T._time = m.timedo,
        T._time_interval = setInterval(a, 1e3),
        T._time_count = !0)
};
var M, I = !(o.storeQuiz = function(t) {
    F(t)
}),
L = [];
o.rotate = function(t, e, i = !1) {
L[e] += i ? 0 : 90,
    $(t).parent().parent().find("img").css({
        transform: "rotate(" + L[e] + "deg)"
    })
};
var Q = 0;

function H(t) {
olmDraw.init({
        elm: "user-test",
        margin: 88
    }),
    t && (olmDraw.loadJSON(t, !0),
        setTimeout(function() {
            olmDraw.convertSVG()
        }, 1500))
}
var J = !(o.getCorrect = function(t) {
$("#showcr" + t).toggle()
});

function R() {
$(".qselect").on("click", function() {
    quiz_choose = $(this).closest(".quizx").data("id") - 1,
        F()
});
var t = 0 < m.asubmit ? "<b>C???nh b??o: N???u b???n r???i kh???i b??i ki???m tra t???i ??a " + m.asubmit + " l???n, h??? th???ng s??? t??? ?????ng thu b??i.</b>" : "",
    e = 0 < m.time_submit ? "<p>L??u ??: B???n ch??? c?? th??? n???p b??i thi sau khi l??m ???????c " + m.not_early + " ph??t.</p>" : "";
$("#contest-result").html("<div class='noti-out-view'><p>Nh???c nh???: M???i l???n b???n r???i kh???i m??n h??nh ki???m tra, h??? th???ng s??? l??u l???i v?? b??o c??o.</p><p>" + t + e + "</p></div>")
}

function D() {
document.addEventListener("contextmenu", t => t.preventDefault()),
    document.onkeypress = function(t) {
        if (123 == (t = t || window.event).keyCode)
            return !1
    },
    document.onmousedown = function(t) {
        if (123 == (t = t || window.event).keyCode)
            return !1
    },
    document.onkeydown = function(t) {
        if (123 == (t = t || window.event).keyCode)
            return !1
    },
    jQuery(document).ready(function(t) {
        t(document).keydown(function(t) {
            var e = String.fromCharCode(t.keyCode).toLowerCase();
            if (t.ctrlKey && ("f" == e || "c" == e || "u" == e))
                return alert("Sorry, This Functionality Has Been Disabled!"),
                    !1
        })
    })
}

function K() {
var i = m.asubmit,
    n = !0,
    a = 0 < m.asubmit ? "/" + i : "";
document.addEventListener("visibilitychange", function(t) {
    var e;
    (n = !n) || (j += 1,
        1 === P && ($("#tmp_score").html("???? tho??t ra: " + j + a),
            1 == j && (0 < m.asubmit ? alert("C???nh b??o: B???n ???? tho??t m??n h??nh ki???m tra " + j + " l???n. T???i ??a " + i + " l???n h??? th???ng s??? t??? thu b??i!") : alert("C???nh b??o: B???n ???? tho??t m??n h??nh ki???m tra " + j + a + " l???n. OLM s??? b??o c??o cho gi??o vi??n bi???t ??i???u n??y!"))),
        (e = {
            log: "tab"
        }).id_category = m.id_category,
        $.ajax({
            url: "/?g=teachercategory.saveLogUser",
            data: e,
            success: function(t) {
                console.log(t)
            },
            type: "POST",
            error: function() {
                console.log("L???i k???t n???i")
            }
        }),
        0 < m.asubmit && i < j && 1 === P && G(!0))
})
}

function V(t, e, i) {
(d = detectQuestion(N.decode(p["q" + t]))).setTest(!1),
    d.getMany(),
    d.setStart(C.question, e),
    d.id_quiz = parseInt(t),
    d.score = parseFloat(s["q" + t]);
var n = d.getNumberQuiz(),
    a = 18 === d.idq() ? "<span><button class='btn btn-primary' onclick = 'NE.storeQuiz(this);'><i class='fa fa-save'></i> L??u b??i l??m</button><span></span></span>" : "",
    o = 18 === d.idq() ? "bttl" : "bttn",
    r = 1 === m.adm ? "<a href = '/?l=teachercourse.quiz&id_subject=" + m.id_subject + "&id=" + t + "' style='font-weight:normal;' target='_blank'>[S???a]</a>" : "",
    c = " <span class = 'ans_choose' id = 'ch" + i + "'></span>",
    c = 1 === n ? "<div class='titlex' id='t" + i + "'><span class = '" + o + "'>" + C.question + " " + e + ": (" + d.score + "??) </span><a href = 'javascript:;' onclick = 'NE.reportError(" + t + ");' style='font-weight:normal;'>[B??o l???i c??u h???i]</a> " + a + r + c + "</div>" : "(" + d.score + "??) <a href = 'javascript:;' onclick = 'NE.reportError(" + t + ");'>[B??o l???i c??u h???i]</a> " + r + c;
return h.append("<div class='itemx'>" + c + "<div class='quizx' data-id='" + i + "'><div id='qx" + i + "'></div><div class='showExp' id='eq" + i + "' style='display:none;'></div></div></div>"),
    d.makeQuestion($("#qx" + i)),
    g.push(d),
    n
}

function G(t) {
w = [],
    savedQuiz = [];
! function t(e, i, n) {
    var a = 0;
    d = g[e];
    try {
        var o, r = d.check($("#qx" + (e + 1))),
            c = d.getSaveData();
        if (c.idq = d.id_quiz,
            c.score = d.score,
            d.bttl)
            c.tlscore = -1;
        else {
            a = "number" == typeof c.result ? (o = [c.result],
                d.score) : (o = c.result,
                d.score / o.length);
            for (var s = 0; s < o.length; s++)
                1 === o[s] ? (b += a,
                    d.multi && (k += 1)) : 0 === o[s] ? d.multi && (q += 1) : d.multi && (S += 1);
            d.multi || (1 === r ? k += 1 : 0 === r ? q += 1 : S += 1)
        }
    } catch (t) {
        console.log(t + " id:" + d.id_quiz);
        var c = {
            idq: d.id_quiz,
            score: d.score
        };
        S += 1
    }
    x += c.score;
    w[e] = c;
    savedQuiz[e] = c.idq;
    e + 1 < i ? t(e + 1, i, n) : X(n)
}(x = b = S = q = k = 0, g.length, t)
}

function F(t) {
w = [],
    savedQuiz = [];
! function t(e, i, n) {
    d = g[e];
    try {
        if (d.accept) {
            var a, o = d.check($("#qx" + (e + 1))),
                r = d.getSaveData();
            if (r.idq = d.id_quiz,
                r.score = d.score,
                d.bttl)
                r.tlscore = -1;
            else {
                _score = "number" == typeof r.result ? (a = [r.result],
                    d.score) : (a = r.result,
                    d.score / a.length);
                for (var c = 0; c < a.length; c++)
                    1 === a[c] ? (b += _score,
                        d.multi && (k += 1)) : 0 === a[c] ? d.multi && (q += 1) : d.multi && (S += 1);
                d.multi || (1 === o ? k += 1 : 0 === o ? q += 1 : S += 1)
            }
        } else {
            var r = {
                idq: d.id_quiz,
                score: d.score
            };
            S += 1
        }
    } catch (t) {
        console.log(t + " id: " + d.id_quiz);
        var r = {
            idq: d.id_quiz,
            score: d.score
        };
        S += 1
    }
    x += r.score;
    w[e] = r;
    savedQuiz[e] = d.id_quiz;
    e + 1 < i ? t(e + 1, i, n) : W(n)
}(x = b = S = q = k = 0, g.length, t)
}
var U = 4;

function W(e) {
var t = w[quiz_choose].label ? w[quiz_choose].label.join("|") : "";
$("#ch" + (quiz_choose + 1)).html(t);
t = w[quiz_choose].label ? quiz_choose + 1 + w[quiz_choose].label.join("|") : "";
console.log(t),
    i.push(t),
    !e && i.length < U || (t = {
            id_course: m.id_course,
            id_category: m.id_category,
            time_spent: m.time_spent + m.timedo - T._time,
            data_log: JSON.stringify(w),
            quiz_list: JSON.stringify(savedQuiz),
            type_exam: P,
            correct: k,
            wrong: q,
            missed: S,
            tn_score: Math.round(100 * b) / 100,
            tl_score: y,
            max_score: x,
            choose: JSON.stringify(i),
            score: Math.round(1e3 * (b + y) / x) / 100
        },
        $.ajax({
            url: "/?g=teacherexam.storeRecord",
            data: t,
            success: function(t) {
                "login" === t ? (alert("Vui l??ng ????ng nh???p l???i ????? l??m b??i thi!"),
                    window.location.href = "/dangnhap?return=" + m.lesson_url) : "saved" === t ? (alert("B??i thi ???? ???????c n???p v?? ch???m ??i???m"),
                    location.reload()) : "not_update" === t ? alert("L???i: Kh??ng c???p nh???t d??? li???u") : "ok" === t && (i = [],
                    $(e).parent().find("span").html("<span style = 'color:green;font-weight: 200;'>???? l??u!</span>"),
                    setTimeout(function() {
                        $(e).parent().find("span").html("")
                    }, 3e3))
            },
            type: "POST",
            error: function() {
                alert("L???i k???t n???i: B???n m???t k???t n???i internet. H??y y??n t??m ti???p t???c l??m b??i ?????n khi c?? k???t n???i m???ng tr??? l???i!")
            }
        }))
}

function X(t) {
if (!t && (1 === P || 3 === P) && 0 < S) {
    if (!confirm("B???n v???n c??n " + S + " c??u h???i ch??a tr??? l???i, b???n c?? ch???c ch???n mu???n n???p kh??ng?"))
        return void $("#btn-check").prop("disabled", !1);
    X(!0)
}
t = {
    id_subject: m.id_subject,
    id_course: m.id_course,
    id_category: m.id_category,
    data_log: JSON.stringify(w),
    quiz_list: JSON.stringify(savedQuiz),
    correct: k,
    wrong: q,
    missed: S,
    time_spent: m.time_spent + m.timedo - T._time,
    tn_score: Math.round(100 * b) / 100,
    tl_score: y,
    max_score: x,
    score: Math.round(1e3 * (b + y) / x) / 100,
    type: 14,
    ended: 1 === P ? 1 : 0,
    type_exam: P,
    id_group: m.id_group,
    log: "[]"
};
localStorage.setItem("data" + m.id_user + "." + m.id_category, JSON.stringify(t)),
    $.ajax({
        url: "/?g=teacherexam.saveRecord",
        data: t,
        success: function(t) {
            "ok" == t ? (window.onbeforeunload = null,
                alert("B??i thi c???a b???n ???? ???????c n???p ??i"),
                location.reload()) : "saved" === t ? location.reload() : (alert("Vui l??ng ????ng nh???p l???i ????? n???p b??i thi!"),
                window.location.href = "/dangnhap?return=" + m.lesson_url)
        },
        type: "POST",
        error: function() {
            localStorage.setItem("disconect" + m.id_user + "." + m.id_category, 1),
                alert("L???i k???t n???i: H??y ki???m tra l???i k???t n???i internet c???a b???n v?? th??? l???i !"),
                $("#btn-check").prop("disabled", !1)
        }
    })
}

function Z(t) {
for (var e, i, n = t.length - 1; 0 < n; n--)
    e = Math.floor(Math.random() * (n + 1)),
    i = t[n],
    t[n] = t[e],
    t[e] = i;
return t
}
o.saveTmpResult = function() {
    var t = JSON.parse(localStorage.getItem("data" + m.id_user + "." + m.id_category));
    $.ajax({
        url: "/?g=teacherexam.saveRecord",
        data: t,
        success: function(t) {
            "ok" == t ? (alert("B??i thi c???a b???n ???? ???????c n???p ??i"),
                location.reload()) : "saved" === t && (alert("B??i thi ???? ???????c n???p v?? ch???m ??i???m"),
                location.reload())
        },
        type: "POST",
        error: function() {
            alert("L???i k???t n???i: H??y ki???m tra l???i k???t n???i internet c???a b???n v?? th??? l???i !")
        }
    })
},
o.forceRedo = function() {
    localStorage.removeItem("data" + m.id_user + "." + m.id_category),
        location.reload()
},
o.redoExam = function() {
    if (!confirm("B???n c?? ch???c x??a d??? li???u b??i n??y ????? l??m l???i?"))
        return !1;
    var t = new Object;
    t.id_subject = m.id_subject,
        t.id_category = m.id_category,
        $.ajax({
            url: "/?g=teacherexam.deleteRecord",
            data: t,
            success: function(t) {
                "ok" == t ? (localStorage.removeItem("data" + m.id_user + "." + m.id_category),
                    location.reload()) : alert("X???y ra l???i: " + t)
            },
            type: "POST",
            error: function() {
                alert("H??y ki???m tra k???t n???i internet c???a b???n v??o th??? l???i !")
            }
        })
},
o.reportError = function(e) {
    var t;
    document.getElementById("olm_modal") || ((t = document.createElement("div")).id = "olm_modal",
        t.setAttribute("class", "modal-bg fade in"),
        t.innerHTML = "<div id='olm-modal-content' style='width: 620px; padding: 5px 8px; background: #ffffff;opacity: 1; box-shadow: 0px 1px 10px #000; margin: 2.5% auto;'><div style='overflow: hidden; margin: 10px;' class='olm-question-list scroll'><span class='close' onclick='NE.closeModal();'>&times;</span><h2 style='text-align: center;'>B??o l???i c??u h???i</h2><p>B???n ???? g???p l???i g?? ??? c??u h???i n??y, h??y m?? t??? v??o ?? b??n d?????i!</p> <textarea class='form-control' rows='5' id='reportContent' placeholder = 'H??y m?? t??? v??i d??ng v??? l???i c???a b??i to??n n??y.' style = 'width: 97%;'></textarea><p style='text-align: center;'><br /><button id = 'give-feedback' class='btn btn-primary' style = 'margin-right: 10px;'>G???i b??o l???i</button><button onclick='NE.closeModal();' class='btn btn-danger'>H???y</button></p><br class='clear'/></div></div>",
        document.getElementById("qholder").appendChild(t),
        $(t).addClass("hidden-phone hidden-tablet"),
        $("#give-feedback").on("click", function() {
            var t = $("#reportContent").val();
            "" !== t ? $.ajax({
                url: "?g=content.feedback",
                type: "POST",
                data: {
                    id_question: e,
                    skill: m.id_category,
                    content: t,
                    subject: m.id_subject,
                    id_course: m.id_course,
                    type: 2
                },
                success: function(t) {
                    "OK" == t ? (alert("C???m ??n b???n ???? b??o l???i, OLM s??? xem x??t ph???n h???i n??y c???a b???n!"),
                        o.closeModal()) : "SORT" == t ? alert("B???n vui l??ng m?? t??? l???i c??? th??? h??n, c???m ??n b???n!") : alert("???? x???y ra l???i, h??y g???i l???i!")
                },
                error: function() {
                    alert("L???i k???t n???i ?????n m??y ch??? OLM, h??y th??? l???i!")
                }
            }) : alert("B???n ph???i m?? t??? v??? l???i c???a b??i to??n n??y.")
        }))
},
o.closeModal = function() {
    $("#olm_modal").remove()
},
window.NE = o

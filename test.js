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
    question: "Câu"
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
                    0 < t && (n += t + " ngày, "),
                    0 < e && (n += e + " giờ "),
                    0 < i && (n += i + " phút "),
                    0 < (i = r - 24 * t * 3600 - 3600 * e - 60 * i) && (n += i + " giây"),
                    "" != n && (n = "còn " + n),
                    $("#timecount").html(n))
            }
        }, 1e3);
        $("#timer").hide(),
            O(!1)
    } else {
        if (!m._list)
            return void $("#main-contest").html("Không tìm thấy câu hỏi nào ở đề thi này. Vui lòng kiểm tra lại nội dung đề thi!");
        0 < m.id_user ? O(!0) : $("#timer").hide()
    }
    $("#btn-check").on("click", function() {
            return T._time > 60 * m.time_submit ? (alert("Bạn chỉ có thể nộp bài thi sau khi làm được " + m.not_early + " phút."),
                !1) : ($("#btn-check").prop("disabled", !0),
                void(confirm("Bạn có chắc chắn nộp bài thi này") ? G(!1) : $("#btn-check").prop("disabled", !1)))
        }),
        0 < j && $("#tmp_score").html("Đã thoát ra: " + j)
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
                        e = parseInt(z / 60) + " phút, " + z % 60 + " giây",
                        i = "<p><b>" + m.say + "</b> đã hoàn thành bài kiểm tra này!</p>";
                    m.hidem || (i += "<p>Số câu đúng: " + k + "</p>",
                            i += "<p>Tổng số câu hỏi: " + (k + S + q) + "</p>",
                            1 === P ? (i += "<p>Điểm bài thi: " + (b + y) + "</p>",
                                i += "<p>Điểm thang 10: " + t + "</p>") : 2 === P ? E ? (i += "<p>Điểm bài thi: " + Math.round(100 * (b + y)) / 100 + "</p>",
                                i += "<p>Điểm thang 10: " + t + "</p>") : i += "<p>Điểm số: Chưa chấm </p>" : (i += "<p>Điểm trắc nghiệm: " + Math.round(100 * b) / 100 + "</p>",
                                i += E ? "<p>Điểm tự luận: " + y + "</p>" : "<p>Điểm tự luận: Chưa chấm </p>",
                                i += "<p>Điểm bài thi: " + Math.round(100 * (b + y)) / 100 + "</p>",
                                i += "<p>Điểm thang 10: " + t + "</p>")),
                        i += "<p>Thời gian làm bài: " + e + "</p>",
                        1 == redo && (i += "<p><button class = 'btn btn-danger' onclick = 'NE.redoExam();'>Làm lại bài này!</button></p>"),
                        $("#contest-result").html("<div class = 'contest-result'>" + i + "</div>")
                }();
            else if (localStorage.getItem("data" + m.id_user + "." + m.id_category))
                return $("#contest-result").html("<p>OLM phát hiện dữ liệu bài thi của bạn chưa được lưu trên hệ thống. Hãy <a href = 'javascript:;' onclick = 'NE.saveTmpResult();' >click vào đây</a> để lưu lại.<p>").css({
                        color: "red"
                    }),
                    0 < m.timedo && $("#contest-result").append("<p>Hoặc bạn <a href = 'javascript:;' onclick = 'NE.forceRedo()'>click vào đây</a> để làm lại bài này.</p>"),
                    $("#main-contest").html("");
            if (1 == m.hidem && (m.viewans = 0),
                m.viewans || !m.done_exam) {
                console.log(w),
                    L = m.done_exam && m.done_exam.rotate_img ? JSON.parse(m.done_exam.rotate_img) : [],
                    console.log(L);
                var t = 1;
                h.html(""),
                    3 === P && h.append("<h3>A. Trắc nghiệm</h3>");
                for (var e, i = 0; i < w.length; i++)
                    t += function(t, e) {
                        void 0 === (M = w[e]).tlscore || I || (m.done_exam && m.done_exam.ended ? (h.append("<h3>B. Tự luận</h3><div id = 'testboard'><div id = 'user-test'></div><canvas id = 'canvas' style='position: absolute;z-index:10;'></canvas></div>"),
                                J = $("#user-test")) : h.append("<h3>B. Tự luận</h3>"),
                            I = !0);
                        var i = e + 1,
                            n = M.idq;
                        if (!p["q" + n])
                            return h.append("<div class='titlex' id='t" + i + "'>" + C.question + " " + t + ": Câu hỏi không tồn tại (ID: " + n + ")"),
                                1;
                        u = detectQuestion(N.decode(p["q" + n]), M),
                            m.done_exam || u.setTest(!1);
                        u.setStart(C.question, t),
                            u.id_quiz = M.idq,
                            u.score = M.score,
                            u.getMany();
                        var a = u.getNumberQuiz(),
                            o = 18 !== u.idq() || m.done_exam ? "" : "<span><button class='btn btn-primary' onclick = 'NE.storeQuiz(this);'><i class='fa fa-save'></i> Lưu bài làm</button><span></span></span>",
                            r = 18 === u.idq() ? "bttl" : "bttn",
                            c = 1 === m.adm ? "<a href = '/?l=teachercourse.quiz&id_subject=" + m.id_subject + "&id=" + n + "' style='font-weight:normal;' target='_blank'>[Sửa]</a>" : "",
                            s = " <span class = 'ans_choose' id = 'ch" + i + "'></span>",
                            s = 1 === a ? "<div class='titlex' id='t" + i + "'><span class ='" + r + "'>" + C.question + " " + t + " (" + u.score + "đ): </span><a href = 'javascript:;' onclick = 'NE.reportError(" + n + ");' style='font-weight:normal;'>[Báo lỗi câu hỏi]</a> " + o + c + s + "</div>" : "(" + u.score + "đ) <a href = 'javascript:;' onclick = 'NE.reportError(" + n + ");' style='font-weight:normal;'>[Báo lỗi câu hỏi]</a> " + c + s;
                        J ? J.append("<div class='itemx'>" + s + "<div class='quizx' data-id='" + i + "'><div id='qx" + i + "'></div><div class='showExp' id='eq" + i + "' style='display:none;'></div></div></div>") : h.append("<div class='itemx'>" + s + "<div class='quizx' data-id='" + i + "'><div id='qx" + i + "'></div><div id = 'cr" + i + "'></div><div class='showExp' id='eq" + i + "' style='display:none;'></div></div></div>");
                        if (m.done_exam) {
                            if (u.makeQuestionH($("#qx" + i)),
                                void 0 !== M.tlscore)
                                -
                                1 == M.tlscore || 1 == m.hidem ? $("#t" + i).append("<span class = 'wrong'>Chưa chấm</span>") : $("#t" + i).append("<span class = 'corrected'>Đã chấm: " + M.tlscore + "đ</span>"),
                                !m.hidem && M.comment && $("#t" + i).append("<span class = 'tl-comment'>Nhận xét: " + M.comment + "</span>");
                            else {
                                var d = 1;
                                if ("number" == typeof M.result)
                                    d = M.result;
                                else
                                    for (var l = 0; l < M.result.length; l++)
                                        d *= M.result[l];
                                1 == d ? $("#t" + i).append("<span class = 'corrected'>Đúng</span>") : 2 == d ? $("#t" + i).append("<span class = 'missed'>Chưa làm</span>") : $("#t" + i).append("<span class = 'wrong'>Sai</span>")
                            }
                            $("#cr" + i).html("<button class = 'btn btn-default' onclick = 'NE.getCorrect(" + i + ")'>Đáp án đúng</button><div id = 'showcr" + i + "' style = 'display:none;'></div>"),
                                u.makeCorrectAns($("#showcr" + i)),
                                u.hasExp() && ($("#t" + i).append("<span class = 'getExp' data-id = '" + i + "'> <i class = 'fa fa-file-text-o'></i>Hướng dẫn giải</span>"),
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
                h.html("Bạn đã hoàn thành bài thi này!");
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
                if (3 === P && h.append("<h3>A. Trắc nghiệm</h3>"),
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
                if (3 === P && h.append("<h3>B. Tự luận</h3>"),
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
var t = 0 < m.asubmit ? "<b>Cảnh báo: Nếu bạn rời khỏi bài kiểm tra tối đa " + m.asubmit + " lần, hệ thống sẽ tự động thu bài.</b>" : "",
    e = 0 < m.time_submit ? "<p>Lưu ý: Bạn chỉ có thể nộp bài thi sau khi làm được " + m.not_early + " phút.</p>" : "";
$("#contest-result").html("<div class='noti-out-view'><p>Nhắc nhở: Mỗi lần bạn rời khỏi màn hình kiểm tra, hệ thống sẽ lưu lại và báo cáo.</p><p>" + t + e + "</p></div>")
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
        1 === P && ($("#tmp_score").html("Đã thoát ra: " + j + a),
            1 == j && (0 < m.asubmit ? alert("Cảnh báo: Bạn đã thoát màn hình kiểm tra " + j + " lần. Tối đa " + i + " lần hệ thống sẽ tự thu bài!") : alert("Cảnh báo: Bạn đã thoát màn hình kiểm tra " + j + a + " lần. OLM sẽ báo cáo cho giáo viên biết điều này!"))),
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
                console.log("Lỗi kết nối")
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
    a = 18 === d.idq() ? "<span><button class='btn btn-primary' onclick = 'NE.storeQuiz(this);'><i class='fa fa-save'></i> Lưu bài làm</button><span></span></span>" : "",
    o = 18 === d.idq() ? "bttl" : "bttn",
    r = 1 === m.adm ? "<a href = '/?l=teachercourse.quiz&id_subject=" + m.id_subject + "&id=" + t + "' style='font-weight:normal;' target='_blank'>[Sửa]</a>" : "",
    c = " <span class = 'ans_choose' id = 'ch" + i + "'></span>",
    c = 1 === n ? "<div class='titlex' id='t" + i + "'><span class = '" + o + "'>" + C.question + " " + e + ": (" + d.score + "đ) </span><a href = 'javascript:;' onclick = 'NE.reportError(" + t + ");' style='font-weight:normal;'>[Báo lỗi câu hỏi]</a> " + a + r + c + "</div>" : "(" + d.score + "đ) <a href = 'javascript:;' onclick = 'NE.reportError(" + t + ");'>[Báo lỗi câu hỏi]</a> " + r + c;
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
                "login" === t ? (alert("Vui lòng đăng nhập lại để làm bài thi!"),
                    window.location.href = "/dangnhap?return=" + m.lesson_url) : "saved" === t ? (alert("Bài thi đã được nộp và chấm điểm"),
                    location.reload()) : "not_update" === t ? alert("Lỗi: Không cập nhật dữ liệu") : "ok" === t && (i = [],
                    $(e).parent().find("span").html("<span style = 'color:green;font-weight: 200;'>Đã lưu!</span>"),
                    setTimeout(function() {
                        $(e).parent().find("span").html("")
                    }, 3e3))
            },
            type: "POST",
            error: function() {
                alert("Lỗi kết nối: Bạn mất kết nối internet. Hãy yên tâm tiếp tục làm bài đến khi có kết nối mạng trở lại!")
            }
        }))
}

function X(t) {
if (!t && (1 === P || 3 === P) && 0 < S) {
    if (!confirm("Bạn vẫn còn " + S + " câu hỏi chưa trả lời, bạn có chắc chắn muốn nộp không?"))
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
                alert("Bài thi của bạn đã được nộp đi"),
                location.reload()) : "saved" === t ? location.reload() : (alert("Vui lòng đăng nhập lại để nộp bài thi!"),
                window.location.href = "/dangnhap?return=" + m.lesson_url)
        },
        type: "POST",
        error: function() {
            localStorage.setItem("disconect" + m.id_user + "." + m.id_category, 1),
                alert("Lỗi kết nối: Hãy kiểm tra lại kết nối internet của bạn và thử lại !"),
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
            "ok" == t ? (alert("Bài thi của bạn đã được nộp đi"),
                location.reload()) : "saved" === t && (alert("Bài thi đã được nộp và chấm điểm"),
                location.reload())
        },
        type: "POST",
        error: function() {
            alert("Lỗi kết nối: Hãy kiểm tra lại kết nối internet của bạn và thử lại !")
        }
    })
},
o.forceRedo = function() {
    localStorage.removeItem("data" + m.id_user + "." + m.id_category),
        location.reload()
},
o.redoExam = function() {
    if (!confirm("Bạn có chắc xóa dữ liệu bài này để làm lại?"))
        return !1;
    var t = new Object;
    t.id_subject = m.id_subject,
        t.id_category = m.id_category,
        $.ajax({
            url: "/?g=teacherexam.deleteRecord",
            data: t,
            success: function(t) {
                "ok" == t ? (localStorage.removeItem("data" + m.id_user + "." + m.id_category),
                    location.reload()) : alert("Xảy ra lỗi: " + t)
            },
            type: "POST",
            error: function() {
                alert("Hãy kiểm tra kết nối internet của bạn vào thử lại !")
            }
        })
},
o.reportError = function(e) {
    var t;
    document.getElementById("olm_modal") || ((t = document.createElement("div")).id = "olm_modal",
        t.setAttribute("class", "modal-bg fade in"),
        t.innerHTML = "<div id='olm-modal-content' style='width: 620px; padding: 5px 8px; background: #ffffff;opacity: 1; box-shadow: 0px 1px 10px #000; margin: 2.5% auto;'><div style='overflow: hidden; margin: 10px;' class='olm-question-list scroll'><span class='close' onclick='NE.closeModal();'>&times;</span><h2 style='text-align: center;'>Báo lỗi câu hỏi</h2><p>Bạn đã gặp lỗi gì ở câu hỏi này, hãy mô tả vào ô bên dưới!</p> <textarea class='form-control' rows='5' id='reportContent' placeholder = 'Hãy mô tả vài dòng về lỗi của bài toán này.' style = 'width: 97%;'></textarea><p style='text-align: center;'><br /><button id = 'give-feedback' class='btn btn-primary' style = 'margin-right: 10px;'>Gửi báo lỗi</button><button onclick='NE.closeModal();' class='btn btn-danger'>Hủy</button></p><br class='clear'/></div></div>",
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
                    "OK" == t ? (alert("Cảm ơn bạn đã báo lỗi, OLM sẽ xem xét phản hồi này của bạn!"),
                        o.closeModal()) : "SORT" == t ? alert("Bạn vui lòng mô tả lỗi cụ thể hơn, cảm ơn bạn!") : alert("Đã xảy ra lỗi, hãy gửi lại!")
                },
                error: function() {
                    alert("Lỗi kết nối đến máy chủ OLM, hãy thử lại!")
                }
            }) : alert("Bạn phải mô tả về lỗi của bài toán này.")
        }))
},
o.closeModal = function() {
    $("#olm_modal").remove()
},
window.NE = o

!(function (e) {
  (e.fn.transpose = function (a) {
    var n = e.extend({}, e.fn.transpose.defaults, a),
      t = null,
      s = [
        { name: "Ab", value: 0, type: "F" },
        { name: "A", value: 1, type: "N" },
        { name: "A#", value: 2, type: "S" },
        { name: "Bb", value: 2, type: "F" },
        { name: "B", value: 3, type: "N" },
        { name: "C", value: 4, type: "N" },
        { name: "C#", value: 5, type: "S" },
        { name: "Db", value: 5, type: "F" },
        { name: "D", value: 6, type: "N" },
        { name: "D#", value: 7, type: "S" },
        { name: "Eb", value: 7, type: "F" },
        { name: "E", value: 8, type: "N" },
        { name: "F", value: 9, type: "N" },
        { name: "F#", value: 10, type: "S" },
        { name: "Gb", value: 10, type: "F" },
        { name: "G", value: 11, type: "N" },
        { name: "G#", value: 0, type: "S" }
      ],
      r = function (e) {
        "m" == e.charAt(e.length - 1) && (e = e.substring(0, e.length - 1));
        for (var a = 0; a < s.length; a++) if (e == s[a].name) return s[a];
      },
      u = function (a, n, t) {
        var u,
          m = e(a),
          c = m.text(),
          d =
            (u = c).length > 1 && ("b" == u.charAt(1) || "#" == u.charAt(1))
              ? u.substr(0, 2)
              : u.substr(0, 1),
          f =
            (function (e, a, n) {
              var t = r(e).value + a;
              t > 11 ? (t -= 12) : t < 0 && (t += 12);
              var u = 0;
              if (0 == t || 2 == t || 5 == t || 7 == t || 10 == t)
                switch (n.name) {
                  case "A":
                  case "A#":
                  case "B":
                  case "C":
                  case "C#":
                  case "D":
                  case "D#":
                  case "E":
                  case "F#":
                  case "G":
                  case "G#":
                    for (; u < s.length; u++)
                      if (s[u].value == t && "S" == s[u].type) return s[u];
                  default:
                    for (; u < s.length; u++)
                      if (s[u].value == t && "F" == s[u].type) return s[u];
                }
              else for (; u < s.length; u++) if (s[u].value == t) return s[u];
            })(d, n, t).name + c.substr(d.length);
        m.text(f);
        var p = m[0].nextSibling;
        if (
          p &&
          3 == p.nodeType &&
          p.nodeValue.length > 0 &&
          "/" != p.nodeValue.charAt(0)
        ) {
          var h = l(c.length, f.length, p.nodeValue.length);
          (0 == h || (p.nodeValue.length >= 2 && 2 == h)) && (h = 1),
            (p.nodeValue = i(" ", h));
        }
      },
      l = function (e, a, n) {
        return e > a ? n + (e - a) : e < a ? n - (a - e) : n;
      },
      i = function (e, a) {
        for (var n = [], t = 0; t < a; t++) n.push(e);
        return n.join("");
      },
      m = function (a) {
        for (
          var t = a.replace(/\../g, " ").replace(/\./g, " "),
            s = (t = t.replace(/\-/g, " ")).replace(/\s+/, " ").split(" "),
            r = 0;
          r < s.length;
          r++
        )
          if (0 == !e.trim(s[r]).length && !s[r].match(n.chordRegex)) return !1;
        return !0;
      },
      c = function (e) {
        return e.replace(n.chordReplaceRegex, "<span class='c'>$1</span>");
      };
    return e(this).each(function () {
      var a = e(this).attr("data-key");
      if (((a && "" != e.trim(a)) || (a = n.key), !a || "" == e.trim(a)))
        throw "Starting key not defined.";
      t = r(a);
      var l = [];
      e(s).each(function (e, a) {
        t.name == a.name
          ? l.push("<a href='#' class='selected'>" + a.name + "</a>")
          : l.push("<a href='#'>" + a.name + "</a>");
      });
      var i = e(this),
        d = e("<div class='transpose-keys'></div>");
      d.html(l.join("")),
        e("a", d).click(function (a) {
          return (
            a.preventDefault(),
            (function (a, n) {
              var s = r(n);
              if (t.name != s.name) {
                var l,
                  i,
                  m =
                    ((l = t.value),
                    (i = s.value),
                    l > i ? 0 - (l - i) : l < i ? i - l + 0 : 0);
                e("span.c", a).each(function (e, a) {
                  u(a, m, s);
                }),
                  (t = s);
              }
            })(i, e(this).text()),
            e(".transpose-keys a").removeClass("selected"),
            e(this).addClass("selected"),
            !1
          );
        }),
        e(this).before(d),
        (String.prototype.ltrim = function () {
          return this.replace(/^\s+/, "");
        });
      for (
        var f,
          p = [],
          h = e(this)
            .text()
            .split(/\r\n|\n/g),
          o = 0;
        o < h.length;
        o++
      ) {
        (f = h[o]), 0 == o && (f = f.ltrim());
        var v = f.indexOf("Intro"),
          g = f.indexOf("Musik"),
          y = f.indexOf("Music"),
          b = f.indexOf("Int."),
          x = f.indexOf("Outro"),
          j = f.indexOf("Melodi"),
          O = f.indexOf("Tab"),
          A = f.indexOf("="),
          F = f.indexOf("Interlude"),
          S = f.indexOf("("),
          G = f.indexOf("Int :"),
          k = f.indexOf("[");
        m(f)
          ? p.push("<span>" + c(f) + "</span>")
          : v >= 0 ||
            g >= 0 ||
            y >= 0 ||
            b >= 0 ||
            x >= 0 ||
            j >= 0 ||
            O >= 0 ||
            A >= 0 ||
            F >= 0 ||
            S >= 0 ||
            G >= 0 ||
            k >= 0
          ? p.push("<span>" + c(f) + "</span>")
          : p.push("<span class='d'>" + f + "</span>");
      }
      e(this).html(p.join("\n"));
    });
  }),
    (e.fn.transpose.defaults = {
      chordRegex: /^[A-G][b\#\-]?(2|4|5|6|7|9|11|13|6\/9|7\-5|7\-9|7\#5|7\#9|7\+5|7\+9|b5|#5|#9|7b5|7b9|7sus2|7sus4|add2|add4|add9|aug|dim|dim7|m\/maj7|m6|m7|m7b5|m9|m11|m13|maj7|maj9|maj11|maj13|mb5|m|sus|sus2|sus4)*(\/[A-G][b\#\-]*)*$/,
      chordReplaceRegex: /([A-G][b\#\-]?(2|4|5|6|7|9|11|13|6\/9|7\-5|7\-9|7\#5|7\#9|7\+5|7\+9|b5|#5|#9|7b5|7b9|7sus2|7sus4|add2|add4|add9|aug|dim|dim7|m\/maj7|m6|m7|m7b5|m9|m11|m13|maj7|maj9|maj11|maj13|mb5|m|sus|sus2|sus4)*)/g
    });
})(jQuery);

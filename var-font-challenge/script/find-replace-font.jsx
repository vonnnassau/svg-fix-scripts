    alert("running");


    /*  Fix SVG variable-fonts by applying available PostScript names
        Usage: run, pick an SVG, it will open and fix text frames.
    */

    function readFileText(f) {
    if (!f.exists) return "";
    f.encoding = "UTF-8";
    f.open("r");
    var s = f.read();
    f.close();
    return s;
    }

    function parseFontFamilies(svgText) {
    // returns array of {selector, families[], idHint}
    var out = [];

    // 1) Inline styles on <text ... style="font-family: ...">
    var reInline = /<text\b[^>]*\bstyle\s*=\s*"(?:[^"]*?font-family\s*:\s*([^;"']+)[^"]*)"/gi;
    var m;
    while ((m = reInline.exec(svgText))) {
        out.push({ selector: null, families: splitFamilies(m[1]), idHint: extractIdAt(reInline.lastIndex, svgText) });
    }

    // 2) CSS blocks: .cls-x { font-family: ... }
    var reCSS = /\.([A-Za-z0-9_-]+)\s*\{[^}]*font-family\s*:\s*([^;]+);/gi;
    while ((m = reCSS.exec(svgText))) {
        out.push({ selector: "." + m[1], families: splitFamilies(m[2]), idHint: null });
    }

    // 3) Element attributes: <text font-family="...">
    var reAttr = /<text\b[^>]*\bfont-family\s*=\s*"([^"]+)"/gi;
    while ((m = reAttr.exec(svgText))) {
        out.push({ selector: null, families: splitFamilies(m[1]), idHint: extractIdAt(reAttr.lastIndex, svgText) });
    }

    return out;

    function splitFamilies(s) {
    var arr = [];
    if (!s || typeof s !== "string") return arr;
    var parts = s.split(",");
    for (var i = 0; i < parts.length; i++) {
        var t = parts[i].replace(/['"]/g, "").replace(/^\s+|\s+$/g, "");
        if (t && t.length > 0) arr.push(t);
    }
    return arr;
    }

    function extractIdAt(idx, txt) {
        // look backward a bit from current index for id="..."
        var start = Math.max(0, idx - 300);
        var seg = txt.substring(start, idx);
        var m = /id\s*=\s*"([^"]+)"/i.exec(seg);
        return m ? m[1] : null;
    }
    }

    function buildAvailableFontsMap() {
    var map = {};
    for (var i = 0; i < app.textFonts.length; i++) {
        var f = app.textFonts[i];
        // Key by PostScript name and also by family-style combination for fuzzy match
        map[f.name] = f; // PS name, e.g. "APVar-CondensedExtraBold"
        map[f.family + "___" + f.style] = f; // e.g. "AP Var___Condensed ExtraBold"
    }
    return map;
    }

    function chooseFontForFamilies(families, availMap) {
    // Return the first family token that matches a PS name in Illustrator
    for (var i = 0; i < families.length; i++) {
        var fam = families[i];
        if (availMap[fam]) return availMap[fam];
    }
    // Fallback: if a token looks like "Family Style", try to split
    for (var j = 0; j < families.length; j++) {
        var t = families[j];
        var m = /^(.*?)[ -]+(Thin|Light|Medium|Regular|Bold|ExtraBold|Black|SemiCondensed|Condensed|ExtraCondensed.*)$/i.exec(t);
        if (m) {
        var key = m[1].trim() + "___" + m[2].trim();
        if (availMap[key]) return availMap[key];
        }
    }
    return null;
    }

    (function main() {
    alert("main() running");
        if (!app.documents.length) {
        var inFile = File.openDialog("Pick an SVG to fix", "*.svg");
        if (!inFile) return;

        var svgText = readFileText(inFile);
        var blocks = parseFontFamilies(svgText);
        var avail = buildAvailableFontsMap();

        // Build a default choice from the first block
        var defaultFont = null;
        for (var i = 0; i < blocks.length && !defaultFont; i++) {
        defaultFont = chooseFontForFamilies(blocks[i].families, avail);
        }

        // Open document
        var doc = app.open(inFile);

        // If you added ids like id="psfont-APVar-CondensedExtraBold", map per id
        var idToFont = {};
        for (var k = 0; k < blocks.length; k++) {
        if (!blocks[k].idHint) continue;
        var f = chooseFontForFamilies(blocks[k].families, avail);
        if (f) idToFont[blocks[k].idHint] = f;
        }

        // Walk and apply
        function walk(item) {
        if (item.typename === "TextFrame") {
            var fnt = defaultFont;
            // Prefer a font tied to an ancestor/group id if present
            var p = item;
            while (p && p !== doc) {
            if (p.name && idToFont[p.name]) { fnt = idToFont[p.name]; break; }
            p = p.parent;
            }
            if (fnt) {
            try { item.textRange.characterAttributes.textFont = fnt; } catch (e) {}
            }
        } else if (item.typename === "GroupItem") {
            for (var i = 0; i < item.pageItems.length; i++) walk(item.pageItems[i]);
        }
        }
        for (var i = 0; i < doc.pageItems.length; i++) walk(doc.pageItems[i]);

        alert("Fonts applied. Default used: " + (defaultFont ? defaultFont.name : "none found"));
    }
    })();
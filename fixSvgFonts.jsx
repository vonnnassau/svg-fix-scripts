/*
    Fix SVG fonts by applying font from group ID, then removing outer group.

    - Assumes: SVG contains <g id="FontPSName"> with nested <text>
    - Requires: Fonts installed and registered in Illustrator
*/

function main() {
    var file = File.openDialog("Select an SVG file to fix fonts", "*.svg");
    if (!file) return;

    var doc = app.open(file);
    var fontMap = buildFontMap();
    var fixCount = 0;
    var notFound = [];

    function buildFontMap() {
        var map = {};
        for (var i = 0; i < app.textFonts.length; i++) {
            var f = app.textFonts[i];
            map[f.name] = f; // PostScript name
        }
        return map;
    }

    function applyFontAndFlatten(group) {
        var psName = group.name;
        var font = fontMap[psName];

        if (!font) {
            $.writeln("Font not found for group ID: " + psName);
            notFound.push(psName);
            return;
        }

        // Find text frame inside nested group
        var textFrame = findTextFrame(group);
        if (!textFrame) {
            $.writeln("No text frame found inside: " + psName);
            return;
        }

        try {
            textFrame.textRange.characterAttributes.textFont = font;
            fixCount++;
            $.writeln("Applied font: " + psName);
        } catch (e) {
            $.writeln("Failed to apply font: " + psName + " - " + e);
        }

        // Move inner items to parent, then remove outer group
        var parent = group.parent;
        for (var i = group.pageItems.length - 1; i >= 0; i--) {
            group.pageItems[i].move(parent, ElementPlacement.PLACEATBEGINNING);
        }
        group.remove();
    }

    function findTextFrame(container) {
        if (container.typename === "TextFrame") return container;
        if (!container.pageItems) return null;
        for (var i = 0; i < container.pageItems.length; i++) {
            var result = findTextFrame(container.pageItems[i]);
            if (result) return result;
        }
        return null;
    }

    // Process all top-level group items
    for (var i = doc.pageItems.length - 1; i >= 0; i--) {
        var item = doc.pageItems[i];
        if (item.typename === "GroupItem" && item.name && fontMap[item.name]) {
            applyFontAndFlatten(item);
        }
    }

    var msg = "Fonts fixed: " + fixCount;
    if (notFound.length > 0) {
        msg += "\nFonts not found: " + notFound.length + "\n- " + notFound.join("\n- ");
    }

    alert(msg);
}

main();
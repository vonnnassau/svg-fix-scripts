// Illustrator ExtendScript
for (var i = 0; i < app.textFonts.length; i++) {
  var f = app.textFonts[i];
  $.writeln(f.name + " | family=" + f.family + " | style=" + f.style);
}

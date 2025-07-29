(function () {
  if (!app.documents.length) return;
  var doc = app.activeDocument;
  var frames = doc.textFrames;
  var mergedContents = "";

  // Collect all text in order
  for (var i = 0; i < frames.length; i++) {
    mergedContents += frames[i].contents;
    if (i < frames.length - 1) mergedContents += " "; // add space between frames
  }

  // Delete all old frames
  for (var j = frames.length - 1; j >= 0; j--) {
    frames[j].remove();
  }

  // Add a new single text frame with merged content
  var newTF = doc.textFrames.add();
  newTF.contents = mergedContents;
  newTF.top = 100; // arbitrary position
  newTF.left = 0;
  alert("Merged into one text frame: " + mergedContents);
})();


# Fix SVG Fonts for Illustrator

Trying to resolve the issue where Adobe Illustrator does not fully support variable font axis settings (font-variation-settings) from SVG files, even though browsers and other viewers do.

This script helps restore proper font rendering in SVG files opened in Adobe Illustrator.  
It works by applying available PostScript fonts to text elements, based on group `id`s in the SVG structure.


## What It Does

- Opens an `.svg` file via dialog
- Finds groups with `id` names matching PostScript font names (e.g. `APVar-ExtraCondensedBold`)
- Applies the matching font to any `text` elements inside
- Optionally removes the wrapper group after applying the font

## How to Use

1.  **Open Adobe Illustrator**
2.  **Run the script**  
    Copy fixSvgFonts.jsx to /Applications/Adobe Illustrator <version>/Presets.localized/en_US/Scripts"
    or
    Go to `File > Scripts > Other Script...` and choose `FixSvgFonts.jsx`
3. **Select an SVG file: /svg/AP_VAR_ALL.svg**  
    The script will:
    - Open the file
    - Apply fonts to each text object based on the surrounding group’s ID (which we could also dynamically get from cls))
4.  Fonts should now be correctly applied.


## To do's
    - Test with actual svg map



## APVar from Exposed Font List for testing purposes

`for (var i = 0; i < app.textFonts.length; i++) {
  var f = app.textFonts[i];
  $.writeln(f.name + " | family=" + f.family + " | style=" + f.style);
}`

APVar-Bold | family=AP Var | style=Bold  
APVar-Condensed | family=AP Var | style=Condensed  
APVar-CondensedBold | family=AP Var | style=Condensed Bold  
APVar-CondensedExtraBold | family=AP Var | style=Condensed ExtraBold  
APVar-CondensedLight | family=AP Var | style=Condensed Light  
APVar-CondensedMedium | family=AP Var | style=Condensed Medium  
APVar-CondensedThin | family=AP Var | style=Condensed Thin  
APVar-ExtraBold | family=AP Var | style=ExtraBold  
APVar-ExtraCondensed | family=AP Var | style=ExtraCondensed  
APVar-ExtraCondensedBold | family=AP Var | style=ExtraCondensed Bold  
APVar-ExtraCondensedExtraBold | family=AP Var | style=ExtraCondensed ExtraBold  
APVar-ExtraCondensedLight | family=AP Var | style=ExtraCondensed Light  
APVar-ExtraCondensedMedium | family=AP Var | style=ExtraCondensed Medium  
APVar-ExtraCondensedThin | family=AP Var | style=ExtraCondensed Thin  
APVar-Light | family=AP Var | style=Light  
APVar-Medium | family=AP Var | style=Medium  
APVar-Regular | family=AP Var | style=Regular  
APVar-SemiCondensed | family=AP Var | style=SemiCondensed  
APVar-SemiCondensedBold | family=AP Var | style=SemiCondensed Bold  
APVar-SemiCondensedExtraBold | family=AP Var | style=SemiCondensed ExtraBold  
APVar-SemiCondensedLight | family=AP Var | style=SemiCondensed Light  
APVar-SemiCondensedMedium | family=AP Var | style=SemiCondensed Medium  
APVar-SemiCondensedThin | family=AP Var | style=SemiCondensed Thin  
APVar-Thin | family=AP Var | style=Thin  


APVar-Bold  
APVar-Condensed  
APVar-CondensedBold  
APVar-CondensedExtraBold  
APVar-CondensedLight  
APVar-CondensedMedium  
APVar-CondensedThin  
APVar-ExtraBold  
APVar-ExtraCondensed  
APVar-ExtraCondensedBold  
APVar-ExtraCondensedExtraBold  
APVar-ExtraCondensedLight  
APVar-ExtraCondensedMedium  
APVar-ExtraCondensedThin  
APVar-Light  
APVar-Medium  
APVar-Regular  
APVar-SemiCondensed  
APVar-SemiCondensedBold  
APVar-SemiCondensedExtraBold  
APVar-SemiCondensedLight  
APVar-SemiCondensedMedium  
APVar-SemiCondensedThin  
APVar-Thin  
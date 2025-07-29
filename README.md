# to do
- test properly (nested)
- remove app.documents.length > 0 check
- why are all my texts scattered over multiple layers? check 2025  


# Fix SVG Fonts for Illustrator

This script helps restore proper font rendering in SVG files opened in Adobe Illustrator.  
It works by applying available PostScript fonts to text elements, based on group `id`s in the SVG structure.

## 🛠️ What It Does

- Opens an `.svg` file via dialog
- Finds groups with `id` names matching PostScript font names (e.g. `APVar-ExtraCondensedBold`)
- Applies the matching font to any `text` elements inside
- Optionally removes the wrapper group after applying the font

## 🚀 How to Use

1. **Open Adobe Illustrator**
2. **Run the script**  
   Go to `File > Scripts > Other Script...` and choose `FixSvgFonts.jsx`
3. **Select an SVG file**  
   The script will:
   - Open the file
   - Apply fonts to each text object based on the surrounding group’s ID
4. Done! Fonts should now be correctly applied.


## 📁 Folder Structure
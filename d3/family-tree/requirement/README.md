# Description

A family tree visualized in a circle.

The inner circle contains the root person. Going on level further there is a circle split in two parts: one part for the
mother, one for the father. This splitting continues for 7 levels. Hence the outside circle contains 128 parts.

Very basic example with only a few layers: http://bl.ocks.org/jeffg2k/raw/7145079/

The data to fill the circle comes from a data.json file.

At the top level there is one person with
- first name
- last name
- birth info: year + city
- parents
  - married: year + city
  - mother
  - father

# What needs to be delivered
- Index.html where data.json is read in and processed with d3js
- I expect to see a java script function (structured: I'm planning to read it) which should take the following as a parameter
  - colors: a two dimensional array of colors
  - fontSizes: an 8 dimensional array of font sizes for the content part for each circle (min 8 for the outmost)
  - fontSizesMarriage: an 8 dimensional array of font sizes for the marriage part for each circle (min 8 for outmost)
- data.json with random data: showing a full circle

# Things to consider
- Text orientation: the center and the first three levels can be aligned horizontally (see example_without_married.jpeg), the 4 out most levels vertically (except the date and place of marriage, which is always horizontally)
- Size: the goal is to generate a pdf on A1 format
- Color: mother one color, father in other color (configurable)
- Font size: try to come up with an array that best matches (configurable)
- Extras: no extras e.g. zoom etc. keep it simple
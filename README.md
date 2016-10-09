Image Map Highlighter
=====================

Image Map Highligher is a dependency-free library that allows developers to add visual highlights to image maps.

Usage
-----

Make sure that you have an image referencing a map.

```html
<img src="http://i.imgur.com/vmWqPDo.jpg"  width="400" height="300" class="image" usemap="#map">
<map name="map">
    <area href="#" shape="poly" coords="240,300,400,300,400,200,240,200">
    <area href="#" shape="circle" coords="200,100,60">
</map>

```

Initialise the highlighter using JavaScript.

```javascript
var image = document.querySelector('.image');
var highlighter = new ImageMapHighlighter(image, {
    strokeColor: 'ff0000',
    fill: true,
    fillColor: '00ff00'
});
highlighter.init();
```

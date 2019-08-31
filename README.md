# Little Slideshow
Little Slideshow is a simple slideshow developed in jQuery and works with Bootstrap v3.

![LittleSlideshow Screenshot](http://i.imgur.com/ROXq28X.png)

## License ##
Little Slideshow is licensed under the MIT License. 

    Copyright (c) 2017 Little Apps
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.

## Features ##
 * Responsive (compatible with Bootstrap v3)
 * Displays multiple images at one time
 * Thumbnails are centered below
 * Focus the center image
 * Automatically change images
 * Set max width and max height for images and thumbnails

## Requirements ##
 * jQuery Core 1.12.4+, 2.2.4+, or 3.2.1+
 * Bootstrap 3

## Installation ##
   1. Download the source code from GitHub.
   2. Add the following HTML tags inside the ``<head>`` tag.

```html
<script type="text/javascript" src="path/to/littleslideshow/littleslideshow.min.js"></script>
<link rel="stylesheet" type="text/css" href="path/to/littleslideshow/littleslideshow.min.css">
```
          
   3. Insert the HTML tag inside the ``<body>`` tag that will be used to contain the slideshow.

```html
<div id="littleslideshow"></div>
```
           
   4. Call the ``.LittleSlideshow`` method
    
```html
<script type="text/javascript">
  jQuery(document).ready(function($) {
      const images =
          [
              {
                  src: 'path/to/image1.jpg'
              },
              {
                  src: 'path/to/image2.jpg'
              },
              {
                  src: 'path/to/image3.jpg'
              },
              {
                  src: 'path/to/image4.jpg'
              },
              {
                  src: 'path/to/image5.jpg'
              },
          ];
      const options = {};

      $('#littleslideshow').LittleSlideshow(images, options);
  });
</script>
 ```
           
## Parameters ##
## Images ##
This parameter is an array of objects, with each object having the following properties:

```javascript
[
    {
        src:            '',     // The source of the image (required)
        width:          '',     // Width of image (set as the 'width' attribute of <img>)
        height:         '',     // Height of image (set as the 'height' attribute of <img>)
        alt:            '',     // Image alternative text (set as the 'alt' attribute of <img>)
        anchorTitle:    ''      // Title of link (set as the 'title' attribute of <a>)
    },
    // ...
]
```

## Options ##
Options are a JSON object with the following properties:

```javascript
{
    maxWidth:           0,      // The maximum width of each image. If zero, the original image widths are used.
    maxHeight:          0,      // The maximum height of each image. If zero, the original image heights are used.
    insertAfter:        false,  // Inserts slideshow after target element (rather than inside) if true.
    thumbnailWidth:     50,     // Width of thumbnails.
    thumbnailHeight:    50,     // Height of thumbnails.
    maxThumbnailWidth:  0,      // Maximum width of thumbnails. This is ignored if zero. If not zero and thumbnailWidth is larger than maxThumbnailWidth, maxThumbnailWidth supersedes the thumbnailWidth.
    maxThumbnailHeight: 0,      // Maximum height of thumbnails. This is ignored if zero. If not zero and thumbnailHeight is larger than maxThumbnailHeight, maxThumbnailHeight supersedes the thumbnailHeight.
    slideDuration:      400,    // The number of milliseconds of each slide animation. Ignored if changeSlideEvery is zero.
    changeSlideEvery:   0       // Number of milliseconds until slide is automatically changed. If zero, slides aren't changed automatically.
}
```

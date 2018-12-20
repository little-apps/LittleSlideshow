/**
 * @file LittleSlideshow v0.2
 * @author Little Apps (https://www.little-apps.com)
 * @license MIT License
 * @see {@link https://github.com/little-apps/LittleSlideshow|GitHub Project}
 */

!function(exports, $, undefined) {
    var LittleSlideshow = function(element, images, options) {
		const priv = {}, pub = {};
		
		priv.init = function(options) {
			this.args = 
				$.extend({
					maxWidth: 0,
					maxHeight: 0,
					insertAfter: false,
					thumbnailWidth: 50,
					thumbnailHeight: 50,
					maxThumbnailWidth: 0,
					maxThumbnailHeight: 0,
					slideDuration: 400,
					changeSlideEvery: 0,
				}, options);
				
			this.fullSizeContainer = $('<div class="slideshow-fullsize"><div class="container"><div class="row"><ul class="slider"></ul></div></div></div>');
			this.thumbnailsContainer = $('<div class="slideshow-thumbnails"><div class="container"><div class="row"><ul class="thumbnails"></ul></div></div></div>');
			this.fullSizeList = $('ul.slider', this.fullSizeContainer);
			this.thumbnailsList = $('ul.thumbnails', this.thumbnailsContainer);
			this.container = $('<div class="slideshow"></div>').append(this.fullSizeContainer, this.thumbnailsContainer);
			
			this.highlightedIndex = -1;
		}

		pub.setupTimer = function() {
			if (!priv.args.changeSlideEvery)
				return;
			
			priv.timer = setInterval(function() {
				if (priv.highlightedIndex < 0)
					priv.highlightedIndex = priv.highlightedListIndex();
				else if (priv.highlightedIndex + 1 >= priv.images.length)
					priv.highlightedIndex = 0;
				else
					priv.highlightedIndex++;
				
				const nextElement = $('li', priv.fullSizeList).get(priv.highlightedIndex);
				
				priv.select(nextElement);
			}, priv.args.changeSlideEvery);
		}

		pub.stopTimer = function() {
			clearInterval(priv.timer);
		}

		priv.highlightedListIndex = function() {
			const 
				fullsizeListItems = $('li', this.fullSizeList),
				windowCenter = Math.floor(window.innerWidth / 2);
			
			for (let i = 0; i < fullsizeListItems.length; i++) {
				const listItem = $(fullsizeListItems[i]);
				
				// Is img opacity 1?
				if ($('img', listItem).css('opacity') == 1)
					return i;
				
				// Is it centered?
				if (windowCenter >= listItem.offset().left && windowCenter <= listItem.offset().left + listItem.innerWidth())
					return i;
			}
			
			// Otherwise, just return index 0
			return 0;
		}

		priv.addItem = function(attrs, index, onLoaded) {
			attrs = $.extend({
				src: '',
				width: '',
				height: '',
				alt: '',
				anchorTitle: ''
			}, attrs);
			
			if (attrs.src == '')
				return true;
			
			const anchor =
				$('<a>')
					.attr('href', '#' + (index + 1))
					.attr('title', attrs.anchorTitle);
			
			// Create full size and thumbnail img tag (but don't set src, yet)
			const fullsizeImg = 
				$('<img>')
					.attr('alt', attrs.alt);
					
			if (attrs.width > 0)
				fullsizeImg.attr('width', attrs.width);
			
			if (attrs.height > 0)
				fullsizeImg.attr('height', attrs.height);
					
			const thumbImg = 
				$('<img>')
					.attr({
						"src": attrs.src,
						"alt": attrs.alt
					});
					
			if (this.args.thumbnailWidth > 0)
				thumbImg.attr('width', this.args.thumbnailWidth);
			
			if (this.args.thumbnailHeight > 0)
				thumbImg.attr('height', this.args.thumbnailHeight);
					
			const 
				fullsizeListItem = $('<li></li>').append(anchor.clone().append(fullsizeImg)),
				thumbListItem = $('<li></li>').append(anchor.clone().append(thumbImg));
				
			this.fullSizeList.append(fullsizeListItem);
			this.thumbnailsList.append(thumbListItem);
					
			// Attach to img load before setting src
			$(fullsizeImg).on('load', function() {
				if (priv.args.maxHeight > 0 && $(this).height() > priv.args.maxHeight) {
					$(this).css({
						"height": priv.args.maxHeight,
						"width": "auto"
					});
				}
				
				if (priv.args.maxWidth > 0 && $(this).width() > priv.args.maxWidth) {
					$(this).css({
						"width": priv.args.maxWidth,
						"height": "auto"
					});
				}
				
				priv.imagesLoaded--;
				
				if (priv.imagesLoaded <= 0) {
					$.event.trigger({
						type: "slideshowImagesLoaded"
					});
				}
			}).on('error', function() {
				// Error loading image (could be invalid URL)
				priv.imagesLoaded--;
				
				if (priv.imagesLoaded <= 0) {
					$.event.trigger({
						type: "slideshowImagesLoaded"
					});
				}
			});
			
			$(thumbImg).on('load', function() {
				if (priv.args.maxThumbnailHeight > 0 && $(this).height() > priv.args.maxThumbnailHeight) {
					$(this).css({
						"height": priv.args.maxThumbnailHeight,
						"width": "auto"
					});
				}
				
				if (priv.args.maxThumbnailWidth > 0 && $(this).width() > priv.args.maxThumbnailWidth) {
					$(this).css({
						"width": priv.args.maxThumbnailWidth,
						"height": "auto"
					});
				}
			});

			// Set src and wait for load to be fired
			fullsizeImg.attr('src', attrs.src);
			thumbImg.attr('src', attrs.src);
			
			$('a', fullsizeListItem).click(function(e) {
				e.preventDefault();
				
				priv.select(fullsizeListItem);
				priv.highlightedIndex = index;
			});
			
			$('a', thumbListItem).click(function(e) {
				e.preventDefault();
				
				$("a[href='" + $(this).attr('href') + "']", $('ul.slider', this.fullSizeContainer)).click();
			});
		}

		priv.select = function(el) {
			const 
				horizontalCenter = Math.floor(window.innerWidth / 2) - Math.floor($(el).innerWidth() / 2),
				leftOffset = $(el).data('leftOffset') * -1;
			
			priv.fullSizeList.animate({
				left: (leftOffset + horizontalCenter) + 'px'
			}, priv.slideDuration, function() {
				priv.highlight();
			});
		}

		priv.highlight = function() {
			const 
				windowCenter = Math.floor(window.innerWidth / 2);
			
			$('li', this.fullSizeList).each(function() {
				const 
					elLeftOffset = $(this).offset().left, 
					elWidth = $(this).innerWidth(),
					elAnchor = $('a', this);
				
				// Check if element has center X position
				const opacity = (windowCenter >= elLeftOffset && windowCenter <= elLeftOffset + elWidth) ? 1 : 0.25;
				
				// Otherwise, element doesn't have center X position or is outside window
				
				$('img', this).css('opacity', opacity);
				$("a[href='" + elAnchor.attr('href') + "'] img", priv.thumbnailsList).css('opacity', opacity);
			});
		}
		
		priv.images = images;
			
		if (priv.images.length == 0)
			return;
		
		priv.init(options || {});
		
		priv.element = (element instanceof $) ? element : $(element);
		
		const insertEl = (!priv.args.insertAfter) ? $(priv.element).append(priv.container) : $(priv.element).after(priv.container);
		
		$(document).on('slideshowImagesLoaded', function(e) {
			// Calculate offsets once all images are loaded.
			const listItems = $('li', priv.fullSizeList);
			
			priv.currentOffset = 0;
			
			for (let i = 0; i < listItems.length; i++) {
				const listItem = $(listItems[i]);
				
				listItem.data('leftOffset', priv.currentOffset);
				
				// If first img -> select it + start timer (if needed)
				if (i == 0) {
					priv.select(listItem);
					
					// Set highlighted index to 1 (since we're at 0 already)
					priv.highlightedIndex = 0;
					pub.setupTimer();
				}
				
				priv.currentOffset += listItem.width();
			}
		});
		
		priv.resizeTimer = 0;
		
		$(window).resize(function() {
			if (priv.resizeTimer)
				clearTimeout(priv.resizeTimer);
			
			priv.resizeTimer = setTimeout(function() {
				priv.resizeTimer = 0;
				priv.select($('li', priv.fullSizeList).get(priv.highlightedIndex));
			}, 500);
		});
		
		priv.imagesLoaded = priv.images.length;
		
		for (let i = 0; i < priv.images.length; i++) {
			priv.addItem(priv.images[i], i);
		}
		
		return pub;
    }
	
	$.fn.LittleSlideshow = function(images, options) {
		return new LittleSlideshow(this, images, options);
	}

    exports.LittleSlideshow = LittleSlideshow;

}(this, jQuery);
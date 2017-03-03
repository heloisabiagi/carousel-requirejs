<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>The Villains</title>
  <style>
  	html {
  		font-size: 16px;
  		font-family: sans-serif;
  	}

    html, body {
      height: 100%;
    }

  	h1, h2 {
  		text-align: center;
  	}

  	a, a:link, a:active {
  		text-decoration: none;
  	}

  	a:hover {
  		text-decoration: underline;
  	}

  	.container {
  		position: relative;
  		max-width: 990px;
  		margin: 30px auto;
  		border-radius: 20px;
  		border: solid 1px #DDD;
  		padding: 10px;
  		box-sizing: border-box;
  	}

  	.inline-list li {
  		display: inline-block;
  	}

  	.edit-item {
  		font-size: 0.8rem;
  		color: #00F;
  		position: absolute;
  		right: 10px;
  		top: 10px;
  		display: inline-block;
  		cursor: pointer;
  	}

  	.carousel-list {
  		margin: 0;
  		padding: 0;
  		position: absolute;
  	}

  	.carousel-list li {
  		width: 100%;
  		float: left;

  	}
  	.carousel-list img {
  		display: block;
  		width: 100%;
  	}

  	.carousel-viewport {
  		position: relative;
  		overflow: hidden;
  	}

  	.carousel-container {
  		max-width: 640px;
  		position: relative;
  		margin: auto;
  	}

  	.carousel-btn {
  		background-color: #9210FF;
  		color: #FFF;
  		text-align: center;
  		width: 30px;
  		height: 60px;
  		position: absolute;
  		top: 50%;
  		margin-top: -60px;
  		z-index: 99;
  		line-height: 60px;
  		border-radius: 10px;
  		transition: all ease-in .2s;
  	}

  	.carousel-btn:hover {
  		text-decoration: none;
  		background-color: #600AAB;
  	}

  	.carousel-btn.carousel-prev {
  		left: 5px;
  	}

  	.carousel-btn.carousel-next {
  		right: 5px;
  	}

    .admin-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
    }

    .admin-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0, 0.6);
    }

    .admin-content {
      position: relative;
      margin: 20px auto;
      background-color: #FFF;
      max-width: 800px;
      padding: 10px;
      border-radius: 20px;
    }

    .admin-close {
      position: absolute;
      right: 20px;
      top: 20px;
      cursor: pointer;
    }

    .admin-image-list {
      margin: 0;
      padding: 0;
    }

    .admin-image-list li {
      display: inline-block;
      width: 30%;
      box-sizing: border-box;
      padding: 10px;
      margin: 10px;
      border: solid 1px #DDD;
      border-radius: 10px;
      cursor: pointer;
      transition: all ease-in .2s;
    }

    .admin-image-list li:hover {
      background-color: #E2E2E2;
    }

    .admin-image-list li.selected {
      border: solid 3px #00F;
    }

    .admin-thumb {
      width: 100%;
      display: block;
    }

    .admin-img-name {
      display: block;
      text-align: center;
      margin-top: 10px;
    }

  	@media screen and (max-width: 600px){
  		html {
  			font-size: 14px;
  		}
  	}
  </style>
</head>
<body>
  <div class="admin-wrapper">
    <div class="admin-overlay"></div>
    <div class="admin-content">
      <a class="admin-close"> X </a>
      <h1>Escolha as imagens</h1>
      <ul class="admin-image-list">
          <li>
            <img src="assets/images/bane.jpg" class="admin-thumb" />
            <span class="admin-img-name">Bane</span>
          </li>
          <li>
            <img src="assets/images/catwoman.jpg" class="admin-thumb" />
            <span class="admin-img-name">Catwoman</span>
          </li>
          <li>
            <img src="assets/images/the-riddler.jpg" class="admin-thumb" />
            <span class="admin-img-name">The Riddler</span>
          </li>
      </ul>
      <div class="admin-selected">
      </div>

    </div>
  </div>

	<div class="container">
		<a href="#" class="edit-item">Edit</a>
		<h1>Villains</h1>
		<ul class="inline-list carousel-list">
			<li>
				<img src="assets/images/joker.jpg" />
				<h2>The Joker</h2>
			</li>
			<li>
				<img src="assets/images/harley-quinn.jpg" />
				<h2>Harley Quinn</h2>
			</li>
			<li>
				<img src="assets/images/harvey-dent.jpg" />
				<h2>Harvey Dent</h2>
			</li>
		</ul>
	</div>
  <script type="text/javascript" src="assets/js/jquery.min.js"></script>
  <script>
  	var myApp = myApp || {};

  	myApp.responsiveCarousel = (function(){
  		function wrapCarousel(item){
  			item.wrap('<div class="carousel-container"><div class="carousel-viewport"></div></div>');

  			item.closest(".carousel-viewport").append('<a href="#" class="carousel-btn carousel-prev"> < </a> <a href="#" class="carousel-btn carousel-next"> > </a>');

  			item.find("li:first-child").addClass("active");
  		}

  		function sizeElements(item){
  			var totalItems = item.find("li").length;
  			var viewportWidth = item.closest(".carousel-viewport").width();
  			var itemHeight = item.find("li:first-child").outerHeight();

  			item.find("li").width(viewportWidth);
  			item.width(totalItems * viewportWidth + 10);
  			item.closest(".carousel-viewport").height(itemHeight);
  		}

  		function fixMargin(item){
  			var activeItem = item.find("li.active");
  			var activeItemIndex = activeItem.index();
  			var activeItemWidth = activeItem.width();

  			item.css({marginLeft: - ( (activeItemIndex) * activeItemWidth) });
  		}

  		function goNext(button, item){
  			var activeEl = item.find('li.active');
  			var currIndex = activeEl.index();
  			var itemWidth = activeEl.outerWidth();
  			var totalItems = item.find('li').length;

  			if(currIndex < totalItems - 1) {
	  			item.animate({ marginLeft: - ( (currIndex + 1) * itemWidth) }, 500, function(){
	  				activeEl.removeClass('active').next().addClass('active');
	  			});
  			}
  		}

  		function goPrev(button, item){
  			var activeEl = item.find('li.active');
  			var currIndex = activeEl.index();
  			var itemWidth = activeEl.outerWidth();
  			var totalItems = item.find('li').length;

  			if(currIndex > 0) {
	  			item.animate({ marginLeft: - ( (currIndex - 1) * itemWidth) }, 500, function(){
	  				activeEl.removeClass('active').prev().addClass('active');
	  			});
  			}
  		}

  		function bindEvents(item){
  			item.closest('.carousel-container').find('.carousel-next').on('click', function(e){
  				e.preventDefault();

  				var button = $(this);
  				goNext(button, item);
  			});

  			item.closest('.carousel-container').find('.carousel-prev').on('click', function(e){
  				e.preventDefault();

  				var button = $(this);
  				goPrev(button, item);
  			});

  			$(window).on('resize', function(){
  				sizeElements(item);
  				fixMargin(item);
  			});
  		}

  		function init(el){
  			el.each(function(){
  				var item = $(this);

  				wrapCarousel(item);
  				sizeElements(item);
  				bindEvents(item);
  			}); 			
  		}

  		return {
  			init: init
  		}
  	})();

  	myApp.responsiveCarousel.init($(".carousel-list"));

  	myApp.adminGallery = (function(){
  		
  	});
  </script>
</body>
</html>

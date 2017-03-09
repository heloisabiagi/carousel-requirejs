define(function () {
      
  function wrapCarousel(item, index){
    item.wrap('<div class="carousel-container" data-index="'+ index +'"><div class="carousel-viewport"></div></div>');

    item.closest(".carousel-viewport").append('<a href="#" class="carousel-btn carousel-prev"> < </a> <a href="#" class="carousel-btn carousel-next"> > </a>');
    item.closest(".carousel-container").prepend('<a href="#" class="edit-item">Edit</a>');
    item.find("li:first-child").addClass("active");
  }

  function sizeElements(item){
    var totalItems = item.find("li").length;
    var viewportWidth = item.closest(".carousel-viewport").width();

    item.find("li").width(viewportWidth);
    item.width(totalItems * viewportWidth + 10);
    
    var itemHeight = item.find("li:first-child").outerHeight();
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
      var index = item.index();

      wrapCarousel(item, index);
      sizeElements(item);
      bindEvents(item);
    });       
  }

  function restartCarousel(el){
    el.each(function(){
      var item = $(this);
      var index = item.index();

      sizeElements(item);
      item.css({marginLeft: 0});
      bindEvents(item);
    });       
  }


  return {
    init: init,
    restartCarousel: restartCarousel
  }

});
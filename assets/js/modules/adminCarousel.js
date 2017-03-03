myApp.adminCarousel = (function(){
	function init(){
		bindEvents();
	}

	function adminEvents(){
		$('.admin-close').on('click', function(){
			$(this).closest('.admin-wrapper').remove();
		});

		$('.admin-image-list li').on('click', function(){
			selectImages($(this));
		});

		$('#admin-save-button').on('click', function(){
			saveCarousel($(this));
		});
	}

	function selectImages(el){
		if(!el.hasClass('selected')) {
			el.toggleClass("selected");
			var imgSelected = el.find("img").clone();
			var selectedImageData = el.find('.villain-data').clone();
			var selectedData = JSON.parse($('#selected-images').attr('data-selected'));

			$('.admin-selected-list').append('<li/>');
			$('.admin-selected-list li:last-child').append(imgSelected);
			$('.admin-selected-list li:last-child').append(selectedImageData);
			$('.admin-selected-list li:last-child').append('<a class="remove-item">X</a>');

			selectedData.images.push(el.find("img").attr('src'));

			$("#selected-images").attr("data-selected", JSON.stringify(selectedData) );

			removeImage($('.admin-selected-list li:last-child'));
		}
	}

	function removeImage(el){
		el.find('.remove-item').on('click', function(){
			var imageToRemove = $(this).closest('li').find('.villain-data').attr("data-file");
			var selectedData = JSON.parse($('#selected-images').attr('data-selected'));
			var elToRemove = selectedData.images.indexOf(imageToRemove);

			$(this).closest("li").remove();
			$(".admin-image-list").find('li[data-img="' + imageToRemove + '"]').removeClass('selected');

			selectedData.images.splice(elToRemove, 1);
			$("#selected-images").attr("data-selected", JSON.stringify(selectedData) );
		});
	}

	function saveCarousel(el){
		var container = el.closest('.admin-wrapper');
		var carouselToUpload = container.attr('data-index');
		var elToUpload = $('.carousel-container[data-index="'+carouselToUpload+'"]').find(".carousel-list");
		var selectedElements = container.find('.admin-selected-list li');
		var newItems = "";

		if(selectedElements) {
			selectedElements.each(function(index){
				var dataStorage = $(this).find('.villain-data');
				var active = "";
				if(index==0){
					active="active";
				}
				newItems +='<li class="'+active+'"><img src="'+ dataStorage.attr('data-file') +'" /><h2>'+ dataStorage.attr('data-name')+'</h2></li>';
			});

		elToUpload.html(newItems);
		myApp.responsiveCarousel.restart(elToUpload);
		setTimeout(function(){ container.remove(); }, 800);

		} else {
			container.remove();
		}

	}
	function adminInit(index){
		$.ajax({
			url: 'http://localhost/30days/galeria/assets/villains-1.json',
			dataType: 'json',
			success: function(data){
				var villainsData = data;
				newAdminTemplate = new EJS({url: 'assets/templates/admin.ejs'}).render();
				newListTemplate = new EJS({url: 'assets/templates/admin-image-list.ejs'}).render(villainsData);

				$("body").append(newAdminTemplate);
				$('.admin-image-list').html(newListTemplate);
				$('.admin-wrapper').attr('data-index', index);
			},
			complete: function(){
				adminEvents();
			}
		})
	}

	function bindEvents(){
		$('.edit-item').on('click', function(){
			var carouselIndex = $(this).closest('.carousel-container').attr('data-index');
			adminInit(carouselIndex);
			return false;
		});
	}

	return {
		init: init
	}
})();

myApp.adminCarousel.init();
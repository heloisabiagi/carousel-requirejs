define(["responsiveCarousel"],
	function(responsiveCarousel){
		function init(){
			bindEvents();
		}

		function adminEvents(index){
			var container = $('.admin-wrapper[data-index="'+index+'"]');
			
			container.find('.admin-close').on('click', function(){
				$(this).closest('.admin-wrapper').hide();
			});

			container.find('.admin-image-list li').on('click', function(){
				selectImages($(this));
			});

			container.find('.admin-save-button').on('click', function(){
				saveCarousel($(this));
			});
		}

		function selectImages(el){
			if(!el.hasClass('selected')) {
				el.toggleClass("selected");
				var adminSelectedList = el.closest('.admin-wrapper').find('.admin-selected-list');
				var imgSelected = el.find("img").clone();
				var selectedImageData = el.find('.villain-data').clone();
				var selectedData = JSON.parse(el.closest('.admin-wrapper').find('.input-selected-images').attr('data-selected'));

				adminSelectedList.append('<li/>');
				adminSelectedList.find('li:last-child').append(imgSelected);
				adminSelectedList.find('li:last-child').append(selectedImageData);
				adminSelectedList.find('li:last-child').append('<a class="remove-item">X</a>');

				selectedData.images.push(el.find("img").attr('src'));

				adminSelectedList.next(".input-selected-images").attr("data-selected", JSON.stringify(selectedData) );

				removeImage(adminSelectedList.find('li:last-child'));
			}
		}

		function removeImage(el){
			el.find('.remove-item').on('click', function(){
				var imageToRemove = $(this).closest('li').find('.villain-data').attr("data-file");
				var selectedData = JSON.parse($(this).closest('.admin-wrapper').find('.input-selected-images').attr('data-selected'));
				var elToRemove = selectedData.images.indexOf(imageToRemove);

				$(this).closest(".admin-wrapper").find('.admin-image-list li[data-img="' + imageToRemove + '"]').removeClass('selected');

				selectedData.images.splice(elToRemove, 1);
				$(this).closest('.admin-selected').find(".input-selected-images").attr("data-selected", JSON.stringify(selectedData) );

				$(this).closest("li").remove();
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
			responsiveCarousel.restartCarousel(elToUpload);
			setTimeout(function(){ container.hide(); }, 800);

			} else {
				container.hide();
			}

		}

		function adminInit(index){
			$.ajax({
				url: 'http://localhost/30days/galeria/assets/villains-1.json',
				dataType: 'json',
				success: function(data){
					var villainsData = data;
					
					newAdminTemplate = new EJS({url: 'assets/templates/admin.ejs'}).render({"dataIndex": index});
					newListTemplate = new EJS({url: 'assets/templates/admin-image-list.ejs'}).render(villainsData);

					$("body").append(newAdminTemplate);
					$('.admin-wrapper[data-index="' + index+ '"]').find('.admin-image-list').html(newListTemplate);
					
				},
				complete: function(){
					adminEvents(index);
				}
			})
		}

		function bindEvents(){
			$('.edit-item').on('click', function(){
				var carouselIndex = $(this).closest('.carousel-container').attr('data-index');

				if($('.admin-wrapper[data-index="'+carouselIndex+'"]').length > 0){
					$('.admin-wrapper[data-index="'+carouselIndex+'"]').show();
				} else {
					adminInit(carouselIndex);
				}
				return false;
			});
		}

		return {
			init: init
		}
});

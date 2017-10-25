let input3words = document.getElementById('input-3-words');
let currentPicture;

// Comment trigger
document.addEventListener('keydown', function(event){
	// Press enter key while input is being focused to comment
	if (event.keyCode === 13 && input3words === document.activeElement){
		// post comment
		url = `/image/comment`;
		let word = {
			content: input3words.value,
			targetOwner: currentPicture.ownerId,
			targetPicture: currentPicture._id,
			authorId: currentUser.id
		}
		$.ajax({type: 'post', url: url, data: word})
		
		// reset input
		input3words.value = "";
	}
})

let openPictureDim = document.getElementById('open-picture-dim');

// Open and append picture in big size
function openPictureByClick(portfolio, imageId){
	portfolio.addEventListener('click', function(){
		openPictureDim.style.display = "block";

		//append picture and comments
		url = `/image/${imageId}`;
		$.ajax({type: 'get', url: url})
		.done((data) => {
			//append picture
			currentPicture = data;
			document.getElementById('big-instant-picture-image').src = data.url;
			console.log(currentPicture);
			//append comments

		})
	})
}
// Close the big picture
function closePictureByClick(){
	openPictureDim.addEventListener('click', function(){
		openPictureDim.style.display = "none";
	});
}

closePictureByClick();

// prevent clicking in the picture and comment section to close the big picture
function suspendClickOpenPictureWrapper(){	
	// suspend picture click
	document.querySelector(".instant-picture-wrapper").addEventListener('click', function(event){
		event.stopPropagation();
	});
	// suspend comment section click
	document.querySelector(".focused-left-content").addEventListener('click', function(event){
		event.stopPropagation();
	});
}

suspendClickOpenPictureWrapper();
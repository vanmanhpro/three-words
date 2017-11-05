let postButton = document.getElementById('post-button');
let openPostPictureDim = document.getElementById('open-post-picture-dim');
let postPictureForm = document.querySelector(".post-picture-form");
function displayPostPictureByClick(){
	//listen and change state
	if(postButton) {
		postButton.addEventListener('click', function(){
			openPostPictureDim.style.display = "block";
			document.getElementsByTagName('body')[0].style.overflow = "hidden";
			console.log('post-button-pressed');	
		}, false);
	}
}
displayPostPictureByClick();

// Close the post picture
function closePostPictureFormByClick(){
	openPostPictureDim.addEventListener('click', function(){
		openPostPictureDim.style.display = "none";
		document.getElementsByTagName('body')[0].style.overflowY = "scroll";
		previewImage.innerHTML = "<p>No files currently selected for upload</p>";
		postPictureForm.reset();
	});
}

closePostPictureFormByClick();

// prevent clicking in the form from closing the form itself
function suspendClickOpenPostPictureForm(){	
	// suspend picture click
	postPictureForm.addEventListener('click', function(event){
		event.stopPropagation();
	});
}

suspendClickOpenPostPictureForm();

let inputImage = document.getElementById('input-image');
let previewImage = document.getElementById('preview-image');

inputImage.addEventListener('change', updatePreviewImage);

function updatePreviewImage(){
	previewImage.innerHTML = "";
	let currentFiles = inputImage.files;
	let newImage = document.createElement('img');
	newImage.src = window.URL.createObjectURL(currentFiles[0]);
	previewImage.appendChild(newImage);
}

function submitPicture(){
	let inputFile = inputImage.value;

	var formData = new FormData();
    formData.append('photo', inputFile);
    formData.append('userId', currentUser._id);

	let url = `/upload`;
	$.ajax({ type: 'post', url: url,
		data: formData,
		processData: false,
		contentType: false
	}).done((data) => {
		console.log(data);
	})
}

// inputImage.style.opacity = 0;

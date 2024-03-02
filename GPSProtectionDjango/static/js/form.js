function showForm() {
    document.getElementById("add-member").style.display = "block";
}



function hideForm() {
    document.getElementById("add-member").style.display = "none";
}

function showEditForm() {
    document.getElementById("edit-form-container").style.display = "block";
}

function hideEditForm() {
    document.getElementById("edit-form-container").style.display = "none";
}

function dropHandler(ev) {
    ev.preventDefault();

    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file
        if (ev.dataTransfer.items[0].kind === 'file') {
            var file = ev.dataTransfer.items[0].getAsFile();
            var dt = new DataTransfer(); 
            dt.items.add(file);
            
            document.getElementById('fileInput').files = dt.files;
            
            displayFileName({ target: { files: [file] } }); // Manually passing event-like object
        }
    } 
}

function dragOverHandler(ev) {
    ev.preventDefault(); // Prevent default behavior, which would open the file immediately
    ev.dataTransfer.dropEffect = "move"; // Indicate this is a move operation
}

function displayFileName(event) {
    var file = event.target.files[0];
    document.querySelector('.file-name').textContent = file ? file.name : "No file chosen";
    
    var imageContainer = document.querySelector('.image-container');
    var fileDropzone = document.querySelector('.file-dropzone');
    
    // Display the image preview
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var imagePreview = document.getElementById('imagePreview');
            imagePreview.src = e.target.result;
            
            // Show the image container and hide the drag & drop box
            imageContainer.style.display = 'flex';
            fileDropzone.style.display = 'none';
        }
        reader.readAsDataURL(file);
    } else {
        imageContainer.style.display = 'none';
        fileDropzone.style.display = 'block';
    }
}

document.querySelector('.image-container').addEventListener('click', function() {
    document.getElementById('fileInput').click();
});

let interestCounter = 0;

function addResearchInterest(event) {
    event.preventDefault();

    if (interestCounter >= 10) {
        document.getElementById('limitMessage').style.display = 'block';
        return; // Exit the function if 10 interests have already been added
    }
 
    const interestsContainer = document.getElementById('interestsContainer');
    
    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('placeholder', 'Add research interest');
    newInput.className = 'form-control bg-light border-0 mt-2';  // Added mt-2 to give a bit of margin-top
    newInput.style.height = '55px';
    
    interestsContainer.appendChild(newInput);
    
    // Add the margin-bottom class to the container
    if (interestsContainer.childNodes.length > 0) {
        interestsContainer.classList.add('mb-4');
    }

    // Set focus to the newly created input
    newInput.focus();
    
    interestCounter++;
}

function validateForm(event) {

    var interestInputs = document.querySelectorAll('#interestsContainer input');
    
    // Create an array to store the values
    var interests = [];

    // Loop over the inputs and collect the values
    for (var i = 0; i < interestInputs.length; i++) {
        var interestValue = interestInputs[i].value.trim();

        if (interestValue) {  // Check if the input is not empty
            interests.push(interestValue);
        }
    }

    if (interests.length < 1) {
        alert('Please add at least one research interest.');
        return false;  // Prevents the form from submitting
    }
    
    //console.log(interests);
    var interestsString = interests.join('/*/');

    document.getElementById('research_interests').value = interestsString;

    return true;
}


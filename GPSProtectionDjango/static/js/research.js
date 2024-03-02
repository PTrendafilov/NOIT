function showResearchForm(){
    document.getElementById("research-form-container").style.display = "block";
}

function hideResearchForm(){
    document.getElementById("research-form-container").style.display = "none";
}

let writerCounter = 0;  // Assuming you start from 0, adjust accordingly if starting with pre-filled writers

function addWriter(event) {
    event.preventDefault();

    if (writerCounter >= 20) {
        document.getElementById('writerLimitMessage').style.display = 'block';
        return;  // Exit the function if 20 writers have already been added
    }
 
    const writersContainer = document.getElementById('writersContainer');
    
    console.log(writersContainer)

    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('placeholder', 'Add writer');
    newInput.className = 'form-control bg-light border-0 mt-2 writer-input';
    newInput.style.height = '55px';
    newInput.setAttribute('oninput', 'autoSuggest(this)');
    
    writersContainer.appendChild(newInput);

    // Add the margin-bottom class to the container
    if (writersContainer.childNodes.length > 0) {
        writersContainer.classList.add('mb-4');
    }

    // Set focus to the newly created input
    newInput.focus();
    
    writerCounter++;
}


let membersString = document.body.getAttribute('data-members');
let members = eval(membersString);
console.log(members);

document.addEventListener('DOMContentLoaded', function() {
    const inputFields = document.querySelectorAll('.writer-input');


    

    inputFields.forEach(inputField => {
        inputField.addEventListener('input', function() {
            autoSuggest(this,);
            
        });
    });
});

function autoSuggest(inputField) {
    const suggestionsBox = document.createElement('div');
    suggestionsBox.setAttribute('class', 'suggestions');
    console.log(members);
    // Filter members based on input
    const inputValue = inputField.value.toLowerCase();
    const filteredMembers = members.filter(member => member.toLowerCase().includes(inputValue));

    // Clear out any previous suggestions
    const oldSuggestions = inputField.nextSibling;
    if (oldSuggestions && oldSuggestions.classList.contains('suggestions')) {
        oldSuggestions.remove();
    }

    // Append suggestions if there's matching data
    if (filteredMembers.length > 0) {
        filteredMembers.forEach(member => {
            const suggestionItem = document.createElement('div');
            suggestionItem.innerText = member;
            suggestionItem.addEventListener('click', function() {
                inputField.value = this.innerText;
                suggestionsBox.remove();
            });
            suggestionsBox.appendChild(suggestionItem);
        });
        inputField.parentNode.insertBefore(suggestionsBox, inputField.nextSibling);
    }
}
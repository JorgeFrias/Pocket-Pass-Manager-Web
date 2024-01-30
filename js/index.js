// Reads the description from the file and writes it to the page
function readDescription() {
    fetch('assets/copy/app_description.txt')
        .then(response => response.text())
        .then(contents => {
            document.getElementById('app_description').innerHTML = marked.parse(contents);
        })
        .catch(error => console.error('Error fetching file:', error));
}

$(document).ready(function () {
    readDescription();
});

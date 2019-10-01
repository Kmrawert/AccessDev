window.onload = function() {
    var fileInput = document.getElementById('imageinput');

    fileInput.addEventListener('change', function(e) {
        var reader = new FileReader();

    reader.onload = function(e) {
    var dataURL = reader.result;
    }

    reader.readAsDataURL(file);
      // Put the rest of the demo code here.
    });
}
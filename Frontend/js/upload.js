function AnalyseForm() {
    
  var fileInput = document.getElementById("formUpload");
  var file = fileInput.files[0];

  if (!file) {  
    console.error('No file selected.');
    return;
  }

  var reader = new FileReader();
    
  reader.onload = function(event) {
      uploadFile(file);
  }
  reader.readAsDataURL(file);
}

function uploadFile(file) {

  const formData = new FormData();
  formData.append('imageFile', file);

  fetch('http://localhost:9090/api/v1/predict', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log('File uploaded successfully:', data);
    saveValues(data);
    window.location.href = "/result.html";
    
  })
  .catch(error => {
    console.error('There was a problem with the upload:', error);
    // Handle error
  });
}

function saveValues(data) {
  const imageData = data.encodedImage;
  const haveAlzheimer = data.haveAlzheimer;
  sessionStorage.setItem('encodedImage', imageData);
  sessionStorage.setItem('haveAlzheimer', haveAlzheimer);

}
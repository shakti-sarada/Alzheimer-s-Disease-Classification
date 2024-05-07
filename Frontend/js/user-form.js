function submitForm() {
    
    var firstName = document.getElementById("formFirstName").value;
    var lastName = document.getElementById("formLastName").value;
    var dateOfBirth = document.getElementById("formBirth").value;
    var gender = document.getElementById("formGender").value;
    var bloodGroup = document.getElementById("formBloodGroup").value;

    var formRequestData = {
        "firstName" : firstName,
        "lastName" : lastName,
        "dob" : dateOfBirth,
        "gender" : gender,
        "bloodGroup" : bloodGroup
    }

    var formRequest = JSON.stringify(formRequestData);

    sessionStorage.setItem('formInfo', formRequest);

    window.location.href = "/upload.html"
}
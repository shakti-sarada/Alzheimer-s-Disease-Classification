const haveAlzheimer = sessionStorage.getItem('haveAlzheimer');
const encodedImage = sessionStorage.getItem('encodedImage');
const formInfo = sessionStorage.getItem('formInfo');

const data = {
    "userDetails": JSON.parse(formInfo),
    "isAlzheimer": haveAlzheimer,
    "encodedImage": encodedImage
};

console.log(data);
hitUser();

function hitUser () {
    fetch('http://localhost:9090/api/v1/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(JSON.parse(formInfo))
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data', data);
        document.getElementById('outputName').innerText = data.firstName + " "  + data.lastName;
        document.getElementById('outputAge').innerText = data.age;
        document.getElementById('outputGender').innerText = data.gender;
        document.getElementById('outputGroup').innerText = data.bloodGroup;
        document.getElementById('outputMResult').innerText = haveAlzheimer;
        
        
    })
    .catch(error => {
        console.error('There was a problem with the upload:', error);
        // Handle error
    });
}


function downloadReport() {
    fetch('http://localhost:9090/api/v1/create-report', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.blob())
    .then(blob => {
        // Extract filename from Content-Disposition header
        // const contentDisposition = response.headers.get('content-disposi
        downloadFile(blob, 'report.docx');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function downloadFile(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

// const formJSON = JSON.parse(formInfo);

// const firstName = formJSON['firstName'];
// const lastName = formJSON['lastName'];
// const dob = formJSON['dob'];
// const gender = formJSON['gender'];
// const bloodGroup = formJSON['bloodGroup'];



// console.log(firstName)
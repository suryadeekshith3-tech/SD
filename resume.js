// resume.js

// Function to add a new project field
function myfunction0() {
    let pr = document.getElementById('pr');
    let newTextarea = document.createElement('textarea');
    newTextarea.className = 'form-control prField mt-2';
    newTextarea.rows = 3;
    newTextarea.placeholder = 'Enter Here';
    pr.insertBefore(newTextarea, document.getElementById('prAddButton'));
}

// Function to add a new work experience field
function myfunction1() {
    let we = document.getElementById('we');
    let newTextarea = document.createElement('textarea');
    newTextarea.className = 'form-control weField mt-2';
    newTextarea.rows = 3;
    newTextarea.placeholder = 'Enter Here';
    we.insertBefore(newTextarea, document.getElementById('weAddButton'));
}

// Function to add a new academic qualification field
function myfunction2() {
    let aq = document.getElementById('aq');
    let newTextarea = document.createElement('textarea');
    newTextarea.className = 'form-control aqfield mt-2';
    newTextarea.rows = 3;
    newTextarea.placeholder = 'Enter Here';
    aq.insertBefore(newTextarea, document.getElementById('aqAddButton'));
}

// Function to generate the resume
function generatecv() {
    // Basic validation: Ensure name is provided
    let name = document.getElementById('nameField').value.trim();
    if (!name) {
        alert('Please enter your name.');
        return;
    }

    // Get form values (matching your HTML IDs)
    let contact = document.getElementById('contactField').value;
    let address = document.getElementById('addressField').value;
    let interests = document.getElementById('HobbiesField').value;  // Fixed: Matches HTML
    let linkedin = document.getElementById('LinkedInField').value;
    let github = document.getElementById('Instagramfield').value;  // Matches HTML
    let coding = document.getElementById('Facebookfield').value;   // Matches HTML
    let languages = document.getElementById('LanguagesField').value;
    let skills = document.getElementById('SkillsetField').value;

    // Collect project fields
    let prFields = document.querySelectorAll('.prField');
    let prList = [];
    prFields.forEach(field => {
        if (field.value.trim() !== '') {
            prList.push(field.value);
        }
    });

    // Collect work experience fields
    let weFields = document.querySelectorAll('.weField');
    let weList = [];
    weFields.forEach(field => {
        if (field.value.trim() !== '') {
            weList.push(field.value);
        }
    });

    // Collect academic qualification fields
    let aqFields = document.querySelectorAll('.aqfield');
    let aqList = [];
    aqFields.forEach(field => {
        if (field.value.trim() !== '') {
            aqList.push(field.value);
        }
    });

    // Handle profile picture
    let imgField = document.getElementById('imgField');
    let imgSrc = '';
    if (imgField.files && imgField.files[0]) {
        let file = imgField.files[0];
        // Basic check: Ensure it's an image
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file.');
            return;
        }
        let reader = new FileReader();
        reader.onload = function(e) {
            imgSrc = e.target.result;
            // After image is loaded, create the resume
            createResume(name, contact, address, interests, linkedin, github, coding, languages, skills, prList, weList, aqList, imgSrc);
        };
        reader.readAsDataURL(file);
    } else {
        // No image, create resume without it
        createResume(name, contact, address, interests, linkedin, github, coding, languages, skills, prList, weList, aqList, imgSrc);
    }
}

// Function to create and display the resume
function createResume(name, contact, address, interests, linkedin, github, coding, languages, skills, prList, weList, aqList, imgSrc) {
    // Hide the form
    document.getElementById('resu-form').style.display = 'none';

    // Create the resume container
    let cvContainer = document.createElement('div');
    cvContainer.id = 'cv-template';
    cvContainer.className = 'container mt-4';
    cvContainer.innerHTML = `
        <div class="row">
            <div class="col-md-4 text-center">
                <img id="cv-img" src="${imgSrc}" alt="Profile Picture" class="img-fluid rounded-circle" style="max-width: 150px; ${imgSrc ? '' : 'display: none;'}">
                <h2 id="cv-name" class="mt-3">${name}</h2>
                <p id="cv-contact">${contact}</p>
                <p id="cv-address">${address.replace(/\n/g, '<br>')}</p>
                <div class="cv-interests mb-4">
                    <h3>Interests</h3>
                    <p>${interests.replace(/\n/g, '<br>')}</p>
                </div>
                <div class="cv-links mb-4">
                    <h3>Important Links</h3>
                    <p>LinkedIn: <a href="${linkedin}" target="_blank">${linkedin}</a></p>
                    <p>Github: <a href="${github}" target="_blank">${github}</a></p>
                    <p>Coding Profile: <a href="${coding}" target="_blank">${coding}</a></p>
                </div>
            </div>
            <div class="col-md-8">
                <div class="row">
                    <div class="col-md-6">
                        <div class="cv-languages mb-4">
                            <h3>Languages</h3>
                            <p>${languages.replace(/\n/g, '<br>')}</p>
                        </div>
                        <div class="cv-skills mb-4">
                            <h3>Skills</h3>
                            <p>${skills.replace(/\n/g, '<br>')}</p>
                        </div>
                        <div class="cv-pr mb-4">
                            <h3>Projects</h3>
                            <ul id="cv-pr-list">
                                ${prList.map(item => `<li>${item.replace(/\n/g, '<br>')}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="cv-we mb-4">
                            <h3>Work Experience</h3>
                            <ul id="cv-we-list">
                                ${weList.map(item => `<li>${item.replace(/\n/g, '<br>')}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="cv-aq mb-4">
                            <h3>Academic Qualification</h3>
                            <ul id="cv-aq-list">
                                ${aqList.map(item => `<li>${item.replace(/\n/g, '<br>')}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center mt-4">
            <button class="btn btn-primary" onclick="editResume()">Edit Resume</button>
            <button class="btn btn-secondary ms-3" onclick="printResume()">Print Resume</button>
        </div>
    `;

    // Append to body
    document.body.appendChild(cvContainer);
}

// Function to go back to edit mode
function editResume() {
    document.getElementById('cv-template').remove();
    document.getElementById('resu-form').style.display = 'block';
}

// Function to open the print dialog in a new tab with the resume content
function printResume() {
    const resumeContent = document.getElementById('cv-template').innerHTML;
    const printWindow = window.open('', '_blank', 'width=800,height=600');

    printWindow.document.open();
    printWindow.document.write(`
        <html>
            <head>
                <title>Print Resume</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    h2, h3 { color: #333; }
                    button { display: none !important; }
                    @media print { body { margin: 0; } }
                </style>
            </head>
            <body>
                ${resumeContent}
                <script>
                    window.onload = function() {
                        window.print();
                        // Fallback: Close after 5 seconds if onafterprint doesn't fire
                        setTimeout(() => { if (!window.closed) window.close(); }, 5000);
                    };
                    window.onafterprint = function() {
                        window.close();
                    };
                </script>
            </body>
        </html>
    `);
    printWindow.document.close();
}
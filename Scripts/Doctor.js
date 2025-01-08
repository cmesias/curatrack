import { initializeApp,
    getAuth, createUserWithEmailAndPassword,
    getFirestore, collection, addDoc, 
    firebaseConfig } from './register.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase auth
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Creates a user in Firestore Database using front-end inputs and Firebase Auth uid and email
async function createUserInFirestoreDatabase(first_name, 
                        last_name, 
                        email,
                        date_of_birth, 
                        care_type, 
                        residency_status, 
                        uid) {
    try {
        const docRef = await addDoc(collection(db, "residents"), {
            first_name,
            last_name,
            email,
            date_of_birth,
            care_type,
            residency_status,
            uid
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// Author: Carl Mesias
// Title: Doctor Dashboard

/*
 * TODO 
 * [ ] Implement UUID new emlpoyee entry
 * [ ] Implement form validation to prevent invalid or missing input when creating new users
 */

/* Empty Residents array that we will fill with data fetched from the localStorage (next iteration, fetch from a database) */
let Residents = [];

// Update resident count in front-end
const UpdateResidentCountFrontEnd = () => {
    const residentCount = document.getElementById("resident-count");
    residentCount.textContent = `Number of residents: ${Residents.length}`;
}

// Update resident count
const UpdateResidentCountBackEnd = () => {
    localStorage.setItem("ResidentCount", Residents.length);
}

// Update database with new resident
const UpdateResidentDataBaseBackEnd = () => {
    localStorage.setItem("Residents", JSON.stringify(Residents));
}

// Retrieve/fetch Resident data from localStorage (in the future fetch from database)
const RetrieveResidentData = () => {

    // Use JSON.parse that will convert our JSON string
    // back into JavaScript (in this case valid array)
    let residentsFromLocalStorage = JSON.parse(localStorage.getItem("Residents"));
    
    // No localStorage residents data
    if (!residentsFromLocalStorage) {
        // console.log("Error, no data from localStorage");
    } 

    // Load localStorage residents data
    else {

        // Use spread operator to copy 'residentsFromLocalStorage' to 'Residents' array
        Residents = [...residentsFromLocalStorage];
    }
}

// Append resident data in DOM in virtual card format
const ShowResidentCards = (residentsArr) => {

    /// Get reference to main container ///
    const mainContainer = document.getElementById("main-container");

    // Clear div
    mainContainer.innerHTML = '';

    // Add border and padding
    mainContainer.style.border = "black 1px solid";
    mainContainer.style.padding = "24px";

    for (let e of residentsArr) {

        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////

        /// Get each residents data ///
        const firstName = e.first_name;
        const lastName = e.last_name;
        const birthDate = e.date_of_birth;
        const email = e.email;
        const careType = e.care_type;

        const username = e.username;
        const password = e.password_hash;
        const residencyStatus = e.residency_status;
        const userId = e.user_id;

        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////

        /// Create elements to store resident data, we will display this to the Admin to see ///

        // Create resident div
        const div = document.createElement("div");
        div.classList.add("resident-all");        // Add class "resident-all" to div

        // Create title
        const p1 = document.createElement("p");

        // 
        p1.innerHTML = `<b>Title: </b> ${firstName} ${lastName}, ${careType}.`;

        // Add line break
        const hr = document.createElement("hr");

        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////

        // Create first name
        const p2 = document.createElement("p");
        p2.innerHTML = `<b>First name: </b> ${firstName}`;

        // Create last name
        const p3 = document.createElement("p");
        p3.innerHTML = `<b>Last name: </b> ${lastName}`;

        // Create email
        const p4 = document.createElement("p");
        p4.innerHTML = `<b>Email: </b> ${email}`;

        // Create birth date
        const p5 = document.createElement("p");
        p5.innerHTML = `<b>Date of birth: </b> ${WordedBirthDate(birthDate)}`;

        // Create care type
        const p6 = document.createElement("p");

        // 
        p6.innerHTML = `<b>Care: </b> ${careType}`;

        // Add line break
        const hr2 = document.createElement("hr2");

        // Add username
        const p7 = document.createElement("p");
        p7.innerHTML = `<b>Username: </b> ${username}`;

        // Add password
        const p8 = document.createElement("p");
        p8.innerHTML = `<b>Password: </b> ${password}`;

        // Add active residency_status
        const p9 = document.createElement("p");
        p9.innerHTML = `<b>Status: </b> ${residencyStatus}`;

        // Add user_id
        const p10 = document.createElement("p");
        p10.innerHTML = `<b>user_id: </b> ${userId}`;

        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////

        /// Append ///
        div.append(p1);     // Append "Title" to resident div
        div.append(hr);     // Append line break to resident div
        div.append(p2);     // Append "first name" to resident div
        div.append(p3);     // Append "last name" to resident div
        div.append(p4);     // Append "email" to resident div
        div.append(p5);     // Append "birth date" to resident div
        div.append(p6);     // Append "Care" to resident div

        div.append(hr2);    // Append line break to resident div
        div.append(p7);     // Append "username" to resident div
        div.append(p8);     // Append "password" to resident div
        div.append(p9);     // Append "residency_status" to resident div
        div.append(p10);    // Append "user_id" to resident div

        // Appen resident div to main container
        mainContainer.append(div);
    }
}

// Store new resident entry in array from inputs
const StoreNewResidentFromInputs = () => {
    /// Get references ///

    // resident data
    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const email = document.getElementById("email");
    const birthDate = document.getElementById("birth-date");

    const careType = document.getElementById("care-type");
    const residencyStatus = document.getElementById("residency-status");

    const username = `${firstName.value.toLowerCase()}${lastName.value.toLowerCase()}1`;
    const password = "*********";

    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////

    // Store new resident data in object
    const newResident = {
        "first_name": firstName.value,
        "last_name": lastName.value,
        "email": email.value,
        "date_of_birth": birthDate.value,
        "care_type": careType.value,

        "username": username,
        "password_hash": password,
        "user_id": `resident_${Residents.length + 1}`,
        "residency_status": residencyStatus.value,
    }

    // Push new resident to database array
    Residents.push(newResident);
}

/// Append new resident entry to table
// 1. Get tbody reference
// 2. Create tr (row) for resident data item
// 3. Append each resident data in row
// 4. Append row into tbody
const AppendNewResidentToTableFrontEnd = () =>
{
    // resident data
    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const email = document.getElementById("email");

    const careType = document.getElementById("care-type");
    const residencyStatus = document.getElementById("residency-status");

    const username = `${firstName.value.toLowerCase()}${lastName.value.toLowerCase()}1`;
    const password = "*********";
    const userId = `resident_${Residents.length}`;

    ////////////////////////////////////////////////////////////////////////////
    //-------------------------------- Step 1 --------------------------------//

    // Get tbody refrence
    let tbody = document.getElementById("resident-tbody")

    // Get row length, will use this when creation of row
    let rowLength = tbody.querySelectorAll("tr").length;

    ////////////////////////////////////////////////////////////////////////////
    //-------------------------------- Step 2 --------------------------------//

    // Create row
    let row = document.createElement("tr");

    // Add row id
    row.setAttribute("id", `row_${rowLength}`);

    //-------------------------------- Step 3 --------------------------------//

    // Resident
    let td1 = document.createElement("td");
    td1.innerText = `${lastName.value}, ${firstName.value}`;
    row.append(td1);

    // Care
    let td2 = document.createElement("td");
    td2.innerText = careType.value;
    row.append(td2);

    // Email
    let td3 = document.createElement("td");
    td3.innerText = email.value;
    row.append(td3);

    // Username
    let td4 = document.createElement("td");
    td4.innerText = username;
    row.append(td4);

    // Password
    let td5 = document.createElement("td");
    td5.innerText = password;
    row.append(td5);

    // User ID
    let td6 = document.createElement("td");
    td6.innerText = userId;
    row.append(td6);

    // Status
    let td7 = document.createElement("td");
    td7.innerText = residencyStatus.value;
    row.append(td7);

    //-------------------------------- Step 4 --------------------------------//
    // Append new row to tbody
    tbody.append(row);
}

const CreateTable = () => {
    const tableHeadArrTitles = [
        'Resident',
        'Care',
        'Email',
        'Username',
        'Password',
        'User ID',
        'Status'
    ]

    // Create table head titles
    tableHeadArrTitles.forEach((th_value, th_index) => {

        // Add each column head: "Resident","Focus", "Status", etc...
        const categories_id = document.getElementById('resident-headers');

        // Create table header
        const th = document.createElement('th');

        // Added the TableHeader title to a table header
        th.innerText = th_value;

        // Append 'th' to '#resident-headers
        categories_id.append(th);
    });
}

// Load residents from database
const LoadResidents = () => {

    // Clear table head
    $('#resident-headers').html('');

    // Clear table body
    $('#resident-tbody').html('');

    // Create table
    CreateTable();

    // Retrieve data from database
    RetrieveResidentData();

    // Update resident count in front-end
    UpdateResidentCountFrontEnd();

    // Update resident count in back-end
    UpdateResidentCountBackEnd();

    // Create amount of rows with Residents length
    CreateXRows(Residents.length);

    // Append resident data to table
    AppendResidentsToFrontEnd();
}

const AppendResidentsToFrontEnd = () => {
    // Loop through each row, then insert resident data in each row

    // Loop through each row
    for (let i = 0; i < Residents.length; i++) {
        // Get current row
        let row = document.getElementById(`row_${i}`);
        // console.log(`Current row: ${i}`);

        // 1. Loop through residents
        // 2. Create td for resident data item
        // 3. Insert each td after creating it to current row 
        Residents.forEach((value, index) => {
            // console.log(`Resident index: ${index}`);

            if (i == index) {
                // console.log(`Corresponding resident: ${index}, ${value.last_name}`);

                // Create td that will hold each Resident data we want to insert

                // Resident
                let td1 = document.createElement("td");
                td1.innerText = `${value.last_name}, ${value.first_name}`;   // Hold value
                row.append(td1);                   // Insert value into current row

                // Care
                let td2 = document.createElement("td");
                td2.innerText = value.care_type;
                row.append(td2);

                // Email
                let td3 = document.createElement("td");
                td3.innerText = value.email;
                row.append(td3);

                // Username
                let td4 = document.createElement("td");
                td4.innerText = value.username;
                row.append(td4);

                // Password
                let td5 = document.createElement("td");
                td5.innerText = value.password_hash;
                row.append(td5);

                // User ID
                let td6 = document.createElement("td");
                td6.innerText = value.user_id;
                row.append(td6);

                // Status
                let td7 = document.createElement("td");
                td7.innerText = value.residency_status;
                row.append(td7);
            }
        });
    }
}

const HideResidentsList = () => {
    $('#main-container').addClass('disabled');
}

const ShowResidentsList = () => {
    $('#main-container').removeClass('disabled');
}
const ShowTable = () => {
    // If content loaded, show table
    $('#main-table').removeClass('disabled');
}

const HideTable = () => {
    $('#main-table').addClass('disabled');
}

// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', function () {

    // Upon DOM load, load employess and show table
    LoadResidents();
    Residents.length <= 0 ? HideTable() : ShowTable();
        

    // Get references
    const randomDataBtn = document.getElementById("random-data");
    const submitBtn = document.getElementById("new-resident");

    const fetchResidentsBtn = document.getElementById("fetch-residents-database");
    const showTableBtn = document.getElementById("show-table");
    const showAllResidentsBtn = document.getElementById("show-all-residents");
    const hideResidentListBtn = document.getElementById("hide-resident-list");


    // Load resident data from database then show table
    fetchResidentsBtn.addEventListener("click", function () {
        LoadResidents();
    });


    // Display table in front-end
    showTableBtn.addEventListener("click", function () {
        ShowTable();
        HideResidentsList();
    });

    // Display all residents in front-end
    showAllResidentsBtn.addEventListener("click", function () {
        // Show residents
        ShowResidentsList();

        // Hide Table
        HideTable();

        // Display resident
        ShowResidentCards(Residents);
    });

    // Hide resident list
    hideResidentListBtn.addEventListener("click", function () {
        HideResidentsList();
        HideTable();
    });

    // Set random data for user
    randomDataBtn.addEventListener("click", function () {
        
        // Get refrences
        let firstName = document.getElementById("first-name");
        let lastName = document.getElementById("last-name");
        let email = document.getElementById("email");
        let date = document.getElementById("birth-date")  // YYYY-MM-DD

        let careType = document.getElementById("care-type");
        let residencyStatus = document.getElementById("residency-status");

        // Set data to random values
        firstName.value = randomResidentFirstName();
        lastName.value = randomResidentLastName();
        email.value = randomResidentEmail();
        date.value = randomDate();
        careType.value = randomCareType();
        residencyStatus.value = randomResidencyStatus();
    });
    
    // Create new Resident
    submitBtn.addEventListener("click", function (e) {

        // Prevent page from refreshing
        e.preventDefault();

        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        //------------------ Firestore Database Data -------------------//

        let firstName = document.getElementById("first-name").value;
        let lastName = document.getElementById("last-name").value;
        let email = document.getElementById("email").value;

        let brithDate = document.getElementById("birth-date").value  // YYYY-MM-DD
        let careType = document.getElementById("care-type").value;
        let residencyStatus = document.getElementById("residency-status").value;
        let uid = self.crypto.randomUUID(); // Generate a random UUID foor the resident

        //------------------ Firestore Database Data -------------------//
        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////
        //------------------- Send Employee data to firestore database --------------------//

        createUserInFirestoreDatabase(firstName, lastName, email, brithDate, careType, residencyStatus, uid);
        // console.log("RESIDENT account creating with uid", uid);
        console.log("Sending new account details to Firestore Database...");

        //------------------- Send Employee data to firestore database --------------------//
        /////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////
        //-------------------------------- Deprecated Code --------------------------------//

        // // Load residents locally from database
        // LoadResidents();

        // // Store new resident entry in array from inputs
        // StoreNewResidentFromInputs();

        // // Update whole database with new resident entry
        // UpdateResidentDataBaseBackEnd();

        // // Update resident count in front-end
        // UpdateResidentCountFrontEnd();

        // // Update resident count in back-end
        // UpdateResidentCountBackEnd();

        // // Append new resident entry to table
        // AppendNewResidentToTableFrontEnd();

        // // Show table
        // ShowTable();

        //-------------------------------- Deprecated Code --------------------------------//
        /////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////
    });
});

function CreateXRows(numberOfResidents) {

    for (let i = 0; i < numberOfResidents; i++) {
        // Get tbody
        let tbody = document.querySelector("tbody");

        // Create a row
        let row = tbody.insertRow(-1);

        // Set row id
        row.setAttribute('id', `row_${i}`);
    }
}
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
async function createUserInFirestoreDatabase(date_of_birth, 
                            email, employement_status, 
                            first_name, 
                            last_name,
                            role, 
                            uid, 
                            username) {
    try {
        const docRef = await addDoc(collection(db, "employees"), {
            date_of_birth, 
            email, 
            employement_status,
            first_name, 
            last_name,
            role, 
            uid, 
            username
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

// Author: Carl Mesias
// Title: Admin Dashboard

/*
 * TODO 
 * [ ] Implement UUID new emlpoyee entry
 * [ ] Implement form validation to prevent invalid or missing input when creating new users
 * 
 * 
 * Rules (1/6/2025)
 * - User IDs and Emails are both stored in Firebase Auth and Firestore Database, will make it
 *   easy to make queries to retreive usernames but it also crteates redundancies. 
 *   If this is implemented, we need to implement a method when a user were to change their
 *   email address in Firebase Auth, it would also need to be update on the Firestore Database
 *   to keep it update.
 * 
 * - Passwords are only stored in Firebase Auth, not in Firestore Database
 * 
 * - After creating a new user on Firebase Auth it will return a user object which we will take the "user.uid"
 *   and store that in Firestore Database. 
 * 
 * 
 */

// Empty 'Employees' array that we will fill with data fetched from firebase (back-end)
let Employees = [];

// Update employee count in front-end
const UpdateEmployeeCountFrontEnd = () => {
    const employeeCount = document.getElementById("employee-count");
    employeeCount.textContent = `Number of employees: ${Employees.length}`;
}

// Update employee count
const UpdateEmployeeCountBackEnd = () => {
    localStorage.setItem("EmployeeCount", Employees.length);
}

// Update database with new employee
const UpdateEmployeeDataBaseBackEnd = () => {
    localStorage.setItem("Employees", JSON.stringify(Employees));
}

// Retrieve/fetch Employee data from localStorage (in the future fetch from database)
const RetrieveEmployeeData = () => {

    // Use JSON.parse that will convert our JSON string
    // back into JavaScript (in this case valid array)
    let employeesFromLocalStorage = JSON.parse(localStorage.getItem("Employees"));

    // No localStorage employees data
    if (!employeesFromLocalStorage) {
        // console.log("Error, no data from localStorage");
    }

    // Load localStorage employees data
    else {

        // Use spread operator to copy 'employeesFromLocalStorage' to 'Employees' array
        Employees = [...employeesFromLocalStorage];
    }
}

// Append employee data in DOM in virtual card format
const ShowEmployeeCards = (employeesArr) => {

    /// Get reference to main container ///
    const mainContainer = document.getElementById("main-container");

    // Clear div
    mainContainer.innerHTML = '';

    // Add border and padding
    mainContainer.style.border = "black 1px solid";
    mainContainer.style.padding = "24px";

    for (let e of employeesArr) {

        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////

        /// Get each employees data ///
        const firstName = e.first_name;
        const lastName = e.last_name;
        const birthDate = e.date_of_birth;
        const email = e.email;
        const role = e.role;

        const username = e.username;
        const password = e.password_hash;
        const employmentStatus = e.employment_status;
        const userId = e.user_id;

        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////

        /// Create elements to store employee data, we will display this to the Admin to see ///

        // Create worker div
        const div = document.createElement("div");
        div.classList.add("worker-all");        // Add class "worker" to div

        // Create title
        const p1 = document.createElement("p");

        // If role is "Doctor" set the ending title to "MD" to display on screen, otherwise just input "role" value (i.e. RN or LVN)
        p1.innerHTML = `<b>Title: </b> ${firstName} ${lastName}, ${role === "Doctor" ? "MD" : role}.`;

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

        // Create role
        const p6 = document.createElement("p");

        // If role is NOT "Doctor", set role output to include "Nurse, <type_of_nurse>", otherwise, just output role (i.e.: "Doctor")
        p6.innerHTML = `<b>Role: </b> ${role !== "Doctor" ? `Nurse, ${role}` : role}`;

        // Add line break
        const hr2 = document.createElement("hr2");

        // Add username
        const p7 = document.createElement("p");
        p7.innerHTML = `<b>Username: </b> ${username}`;

        // Add password
        const p8 = document.createElement("p");
        p8.innerHTML = `<b>Password: </b> ${password}`;

        // Add active employment_status
        const p9 = document.createElement("p");
        p9.innerHTML = `<b>Status: </b> ${employmentStatus}`;

        // Add user_id
        const p10 = document.createElement("p");
        p10.innerHTML = `<b>user_id: </b> ${userId}`;

        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////

        /// Append ///
        div.append(p1);     // Append "Title" to worker div
        div.append(hr);     // Append line break to worker div
        div.append(p2);     // Append "first name" to worker div
        div.append(p3);     // Append "last name" to worker div
        div.append(p4);     // Append "email" to worker div
        div.append(p5);     // Append "birth date" to worker div
        div.append(p6);     // Append "Role" to worker div

        div.append(hr2);    // Append line break to worker div
        div.append(p7);     // Append "username" to worker div
        div.append(p8);     // Append "password" to worker div
        div.append(p9);     // Append "employment_status" to worker div
        div.append(p10);    // Append "user_id" to worker div

        // Appen worker div to main container
        mainContainer.append(div);
    }
}

const getRole = (doctorChosen, nurseRNChosen, nurseLVNChosen) =>
{
    let role = '';
    if (doctorChosen.checked) {
        role = "Doctor";
    }
    else if (nurseRNChosen.checked) {
        role = "RN";
    }
    else if (nurseLVNChosen.checked) {
        role = "LVN";
    }

    return role;
}

// Store new employee entry in array from inputs
const StoreNewEmployeeFromInputs = (user) => {
    /// Get references ///

    // worker data
    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const email = document.getElementById("email");
    const birthDate = document.getElementById("birth-date");

    const doctorChosen = document.getElementById("doctor_role");
    const nurseRNChosen = document.getElementById("rn_role");
    const nurseLVNChosen = document.getElementById("lvn_role");
    const role = getRole(doctorChosen, nurseRNChosen, nurseLVNChosen);

    const username = `${firstName.value.toLowerCase()}${lastName.value.toLowerCase()}1`;
    const password = "**********";
    const employmentStatus = "Active";

    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////

    // Store new worker in object
    const newWorker = {
        "first_name": firstName.value,
        "last_name": lastName.value,
        "email": email.value,
        "date_of_birth": birthDate.value,
        "role": role,

        "username": username,
        "password_hash": password,
        "employment_status": employmentStatus,
        "user_id": `${user.uid}`,
    }

    // Push new worker to database array
    Employees.push(newWorker);
}

/// Append new employee entry to table
// 1. Get tbody reference
// 2. Create tr (row) for employee data item
// 3. Append each employee data in row
// 4. Append row into tbody
const AppendNewEmployeeToTableFrontEnd = (user) =>
{
    // worker data
    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const email = document.getElementById("email");

    const doctorChosen = document.getElementById("doctor_role");
    const nurseRNChosen = document.getElementById("rn_role");
    const nurseLVNChosen = document.getElementById("lvn_role");
    const role = getRole(doctorChosen, nurseRNChosen, nurseLVNChosen);

    const username = `${firstName.value.toLowerCase()}${lastName.value.toLowerCase()}1`;
    const password = "**********";
    const employmentStatus = "Active";
    const userId = user.uid;

    ////////////////////////////////////////////////////////////////////////////
    //-------------------------------- Step 1 --------------------------------//

    // Get tbody refrence
    let tbody = document.getElementById("employee-tbody")

    // Get row length, will use this when creation of row
    let rowLength = tbody.querySelectorAll("tr").length;

    ////////////////////////////////////////////////////////////////////////////
    //-------------------------------- Step 2 --------------------------------//

    // Create row
    let row = document.createElement("tr");

    // Add row id
    row.setAttribute("id", `row_${rowLength}`);

    //-------------------------------- Step 3 --------------------------------//

    // Employee
    let td1 = document.createElement("td");
    td1.innerText = `${lastName.value}, ${firstName.value}`;
    row.append(td1);

    // Position
    let td2 = document.createElement("td");
    td2.innerText = role;
    row.append(td2);

    // Status
    let td3 = document.createElement("td");
    td3.innerText = employmentStatus;
    row.append(td3);

    // Email
    let td4 = document.createElement("td");
    td4.innerText = email.value;
    row.append(td4);

    // Username
    let td5 = document.createElement("td");
    td5.innerText = username;
    row.append(td5);

    // Password
    let td6 = document.createElement("td");
    td6.innerText = password;
    row.append(td6);

    // User ID
    let td7 = document.createElement("td");
    td7.innerText = userId;
    row.append(td7);

    //-------------------------------- Step 4 --------------------------------//
    // Append new row to tbody
    tbody.append(row);
}

const CreateTable = () => {
    const tableHeadArrTitles = [
        'Employee',
        'Position',
        'Status',
        'Email',
        'Username',
        'Password',
        'User ID',
    ]

    // Create table head titles
    tableHeadArrTitles.forEach((th_value, th_index) => {

        // Add each column head: "Employee","Position", "Status", etc...
        const categories_id = document.getElementById('employee-headers');

        // Create table header
        const th = document.createElement('th');

        // Added the TableHeader title to a table header
        th.innerText = th_value;

        // Append 'th' to '#employee-headers
        categories_id.append(th);
    });
}

// Load employees from database
const LoadEmployees = () => {

    // Clear table head (front-end)
    $('#employee-headers').html('');

    // Clear table body (front-end)
    $('#employee-tbody').html('');

    // Create table (front-end)
    CreateTable();

    // Retrieve data from database(back-end)
    RetrieveEmployeeData();

    // Update employee count in (front-end)
    UpdateEmployeeCountFrontEnd();

    // Update employee count in (back-end)
    UpdateEmployeeCountBackEnd();

    // Create amount of rows with Employees length(front-end)
    CreateXRows(Employees.length);

    // Append employee data to table (front-end)
    AppendEmployeesToFrontEnd();
}

const AppendEmployeesToFrontEnd = () => {
    // Loop through each row, then insert employee data in each row

    // Loop through each row
    for (let i = 0; i < Employees.length; i++) {
        // Get current row
        let row = document.getElementById(`row_${i}`);
        // console.log(`Current row: ${i}`);

        // 1. Loop through employees
        // 2. Create td for employee data item
        // 3. Insert each td after creating it to current row 
        Employees.forEach((value, index) => {
            // console.log(`Employee index: ${index}`);

            if (i == index) {
                // console.log(`Corresponding employee: ${index}, ${value.last_name}`);

                // Create td that will hold each Employee data we want to insert

                // Employee
                let td1 = document.createElement("td");
                td1.innerText = `${value.last_name}, ${value.first_name}`;   // Hold value
                row.append(td1);                   // Insert value into current row

                // Position
                let td2 = document.createElement("td");
                td2.innerText = value.role;
                row.append(td2);

                // Status
                let td3 = document.createElement("td");
                td3.innerText = value.employment_status;
                row.append(td3);

                // Email
                let td4 = document.createElement("td");
                td4.innerText = value.email;
                row.append(td4);

                // Username
                let td5 = document.createElement("td");
                td5.innerText = value.username;
                row.append(td5);

                // Password
                let td6 = document.createElement("td");
                td6.innerText = value.password_hash;
                row.append(td6);

                // User ID
                let td7 = document.createElement("td");
                td7.innerText = value.user_id;
                row.append(td7);
            }
        });
    }
}

const HideEmployeesList = () => {
    $('#main-container').addClass('disabled');
}

const ShowEmployeesList = () => {
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
    LoadEmployees();
    Employees.length <= 0 ? HideTable() : ShowTable();

    // Get references
    const randomDataBtn = document.getElementById("random-data");
    const submitBtn = document.getElementById("admin-submit");

    const fetchEmployeesBtn = document.getElementById("fetch-employees-database");
    const showTableBtn = document.getElementById("show-table");
    const showAllEmployeesBtn = document.getElementById("show-all-employees");
    const hideEmployeeListBtn = document.getElementById("hide-employee-list");


    // Load employee data from database then show table
    fetchEmployeesBtn.addEventListener("click", function () {
        LoadEmployees();
    });


    // Display table in front-end
    showTableBtn.addEventListener("click", function () {
        ShowTable();
        HideEmployeesList();
    });

    // Display all employees in front-end
    showAllEmployeesBtn.addEventListener("click", function () {
        // Show employees
        ShowEmployeesList();

        // Hide Table
        HideTable();

        // Display employee
        ShowEmployeeCards(Employees);
    });

    // Hide employee list
    hideEmployeeListBtn.addEventListener("click", function () {
        HideEmployeesList();
        HideTable();
    });

    // Set random data for user
    randomDataBtn.addEventListener("click", function () {

        // Get refrences
        const username = document.getElementById("username");
        const firstName = document.getElementById("first-name");
        const lastName = document.getElementById("last-name");
        const email = document.getElementById("email");
        const birthDate = document.getElementById("birth-date")  // YYYY-MM-DD

        const doctorRole = document.getElementById("doctor_role");
        const rnRole = document.getElementById("rn_role");
        const lvnRole = document.getElementById("lvn_role");

        // Set data to random values
        firstName.value = randomEmployeeFirstName();
        lastName.value = randomEmployeeLastName();
        email.value = randomEmployeeEmail();
        birthDate.value = randomDate();
        username.value = `${firstName.value}${lastName.value}${birthDate.value.slice(8, 10)}`.toLowerCase();

        // Set random role for Employee
        const randRoleVal = Math.floor(Math.random() * fakesRoles.length);
        switch (randRoleVal) {
            case 0:
                doctorRole.checked = true;
            break;
            case 1:
                rnRole.checked = true;
            break;
            case 2:
                lvnRole.checked = true;
            break;
        }
    });

    // Create new worker (i.e.: Doctor or Nurse)
    submitBtn.addEventListener("click", function (e) {

        // Prevent page from refreshing after submit
        e.preventDefault();

        // Load employees locally from database
        // LoadEmployees();

        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        //---------------------- Firebase Auth Data --------------------//

        const password = `abcde12345`;
        //---------------------- Firebase Auth Data --------------------//
        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////

        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        //------------------ Firestore Database Data -------------------//

        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const birthDate = document.getElementById("birth-date").value;
    
        const doctorChosen = document.getElementById("doctor_role");
        const nurseRNChosen = document.getElementById("rn_role");
        const nurseLVNChosen = document.getElementById("lvn_role");
        const role = getRole(doctorChosen, nurseRNChosen, nurseLVNChosen);
    
        const employmentStatus = "Active";
        //------------------ Firestore Database Data -------------------//
        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////

        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        //--------------- Firebase Auth AND Firestore Data -------------//

        const email = document.getElementById("email").value;
        const username = document.getElementById("username").value;

        //--------------- Firebase Auth AND Firestore Data -------------//
        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////

        // Send new employee data from inputs (front-end) to firebase (back-end)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                // Response after sending data to Firebase Auth
                // Signed up 
                const user = userCredential.user;
                console.log("Creating EMPLOYEE account in Firebase Auth...");

                /////////////////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////////////////
                //------------------- Send Employee data to firestore database --------------------//

                createUserInFirestoreDatabase(birthDate, email, employmentStatus, firstName, lastName, role, user.uid, username);
                // console.log("EMPLOYEE account created in Firebase Auth. UID:", user.uid);
                console.log("Sending new account details to Firestore Database...");

                //------------------- Send Employee data to firestore database --------------------//
                /////////////////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////////////////

                /////////////////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////////////////
                //-------------------------------- Deprecated Code --------------------------------//

                // Store new employee entry in array from inputs
                // StoreNewEmployeeFromInputs(user);

                // Update whole database with new employee entry
                // UpdateEmployeeDataBaseBackEnd();

                // Update employee count in front-end
                // UpdateEmployeeCountFrontEnd();

                // Update employee count in back-end
                // UpdateEmployeeCountBackEnd();

                // Append new employee to table (front-end)
                // AppendNewEmployeeToTableFrontEnd(user);
        
                // Show table
                // ShowTable();

                //-------------------------------- Deprecated Code --------------------------------//
                /////////////////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////////////////
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
                // ..
            });
    });


    // Catch input event when user typing in firstname and last name
    {
        // Listen for these
        let firstName = document.getElementById("first-name");
        let lastName = document.getElementById("last-name");
        let birthDay = document.getElementById("birth-date");

        let usernameStart = '';
        let usernameMiddle = '';
        let usernameEnd = '';

        // Update these
        let username = document.getElementById("username");

        // Listen for input on first name
        firstName.addEventListener("input", function()
        {
            // Update these values just in case there are values already in these inputs
            {
                usernameStart = firstName.value;
                usernameMiddle = lastName.value;
                usernameEnd = birthDay.value.slice(8, 10);
            }

            // Set username's first part
            usernameStart = firstName.value;

            // Lower case username
            let lowerCased = `${usernameStart}${usernameMiddle}${usernameEnd}`.toLowerCase();

            // Update username in front-end
            username.value = lowerCased;
        });

        // Listen for input on last name
        lastName.addEventListener("input", function()
        {
            // Update these values just in case there are values already in these inputs
            {
                usernameStart = firstName.value;
                usernameMiddle = lastName.value;
                usernameEnd = birthDay.value.slice(8, 10);
            }

            // Set username's second part
            usernameMiddle = lastName.value;

            // Lower case username
            let lowerCased = `${usernameStart}${usernameMiddle}${usernameEnd}`.toLowerCase();

            // Update username in front-end
            username.value = lowerCased;
        });

        // Listen for input on birth date
        birthDay.addEventListener("input", function()
        {
            // Update these values just in case there are values already in these inputs
            {
                usernameStart = firstName.value;
                usernameMiddle = lastName.value;
                usernameEnd = birthDay.value.slice(8, 10);
            }

            // Set username's third part
            usernameEnd = birthDay.value.slice(8, 10);

            // Lower case username
            let lowerCased = `${usernameStart}${usernameMiddle}${usernameEnd}`.toLowerCase();

            // Update username in front-end
            username.value = lowerCased;
        });
    }
});

function CreateXRows(numberOfEmployees) {

    for (let i = 0; i < numberOfEmployees; i++) {
        // Get tbody
        let tbody = document.querySelector("tbody");

        // Create a row
        let row = tbody.insertRow(-1);

        // Set row id
        row.setAttribute('id', `row_${i}`);
    }
}

const Employees = [
    {
        "user_id": "employee_1",      // auto-generated, for admin or Website admin only
        "first_name": "Lucy",
        "last_name": "Nguyen",
        "email": "lucynguyen123@gmail.com",
        "date_of_birth": "1976-03-14",
        "role": "Doctor",
        "username": "lucynguyen1",          // auto-generated, first name + last name + number. Used for logging in
        "password_hash": "Abcde12345$$",    // Used for logging in
        "employment_status": "Active"
    },
    {
        "user_id": "employee_2", 
        "first_name": "Joey",
        "last_name": "Martinez",
        "email": "joeymartinez123@gmail.com",
        "date_of_birth": "1998-10-05",
        "role": "RN",
        "username": "joeymartinez1",
        "password_hash": "Abcde12345$$",
        "employment_status": "Active"  
    },
    {
        "user_id": "employee_3", 
        "first_name": "Sunny",
        "last_name": "Ortiz",
        "email": "sunnyortiz123@gmail.com",
        "date_of_birth": "1995-06-17",
        "role": "LVN",
        "username": "sunnyortiz1",
        "password_hash": "Abcde12345$$",
        "employment_status": "Active"
    }
]

function WordedBirthDate(birthDate) {

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];

    const birthYear = birthDate.slice(0, 4);
    const birthMonth = birthDate.slice(5, 7);
    const birthDay = birthDate.slice(8, 10);

    // Remove "0" from Month. 
    // We minus 1 because selecting a month starts with 1, but in an array it starts with 0 index
    let idxMonth = (parseInt(birthMonth, 10)) - 1;
    let month = months[ idxMonth ];

    // Remove "0" from Day
    let day = parseInt(birthDay, 10);

    return `${month} ${day}, ${birthYear}`;
}

/*  Employees:
[
    {
        "user_id" : <user_id>,  
        "first_name" : <first_name>,  
        "last_name" : <last_name>,  
        "role" : <role>,
            more employee data...
    },
    ... more employees
]
*/

// Update employee count in front-end
function UpdateEmployeeCount()
{
    const employeeCount = document.getElementById("employee-count");
    employeeCount.textContent = `Number of employees: ${Employees.length}`;
}

// Get Employee data from database and load that data into elements to display to the Admin
// 1. Get each employee data
// 2. Store employee data in 'worker' div class
// 3. Append 'worker' div to 'main-container' that displays all employees
function LoadWorkerDataBase(employeesArr)
{
    // Update employee count in front-end
    UpdateEmployeeCount();

    /// Get reference to main container ///
    const mainContainer = document.getElementById("main-container");

    for (let e of employeesArr) {

        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////

        /// Get each employees data ///
        const firstName         = e.first_name;
        const lastName          = e.last_name;
        const birthDate         = e.date_of_birth;
        const email             = e.email;
        const role              = e.role;
        
        const username          = e.username;
        const password          = e.password_hash;
        const employmentStatus  = e.employment_status;
        const userId            = e.user_id;

        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////

        /// Create elements to store employee data, we will display this to the Admin to see ///

        // Create worker div
        const div = document.createElement("div");
        div.classList.add("worker");        // Add class "worker" to div
    
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

document.addEventListener('DOMContentLoaded', function() {

    // Intial load of employees from database
    LoadWorkerDataBase(Employees);
    
    // submit button to create a new doctor or nurse
    const newWorkerBtn = document.getElementById("new-worker");

    // Add event listener
    newWorkerBtn.addEventListener("click", function() {

        /// Get references ///
        const mainContainer = document.getElementById("main-container");
    
        // worker data
        const firstName = document.getElementById("first-name");
        const lastName = document.getElementById("last-name");
        const email = document.getElementById("email");
        const birthDate = document.getElementById("birth-date");
    
        const doctorChosen = document.getElementById("doctor_role");
        const nurseRNChosen = document.getElementById("rn_role");
        const nurseLVNChosen = document.getElementById("lvn_role");
    
        // Worker's role
        let role = "";

        const username = `${firstName.value.toLowerCase()}${lastName.value.toLowerCase()}1`;
        const password = "Abcde12345$$";
        const employmentStatus = "Active";

        /// Determine if title is Doctor or Nurse ///
        if (doctorChosen.checked)
        {
            role = "Doctor";
        }
        else if (nurseRNChosen.checked)
        {
            role = "RN";
        }
        else if (nurseLVNChosen.checked)
        {
            role = "LVN";
        }

        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////

        // Create worker div
        const div = document.createElement("div");
        div.classList.add("worker");        // Add class "worker" to div

        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////

        // Create title
        const p1 = document.createElement("p");

        // If role is "Doctor" set the ending title to "MD" to display on screen, otherwise just input "role" value (i.e. RN or LVN)
        p1.innerHTML = `<b>Title: </b> ${firstName.value} ${lastName.value}, ${role === "Doctor" ? "MD" : role}.`;

        // Add line break
        const hr = document.createElement("hr");

        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////

        // Create first name
        const p2 = document.createElement("p");
        p2.innerHTML = `<b>First name: </b> ${firstName.value}`;

        // Create last name
        const p3 = document.createElement("p");
        p3.innerHTML = `<b>Last name: </b> ${lastName.value}`;

        // Create email
        const p4 = document.createElement("p");
        p4.innerHTML = `<b>Email: </b> ${email.value}`;

        // Create birth date
        const p5 = document.createElement("p");
        p5.innerHTML = `<b>Date of birth: </b> ${WordedBirthDate(birthDate.value)}`;

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

        // Add active status
        const p9 = document.createElement("p");
        p9.innerHTML = `<b>Status: </b> ${employmentStatus}`;

        // Add user_id
        const p10 = document.createElement("p");
        p10.innerHTML = `<b>user_id: </b> employee_${Employees.length+1}`;

        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////

        /// Append ///
        div.append(p1);     // Append "Title" to worker div
        div.append(hr);     // Append line break to worker div
        div.append(p2);     // Append "first_name" to worker div
        div.append(p3);     // Append "last_name" to worker div
        div.append(p4);     // Append "email" to worker div
        div.append(p5);     // Append "birth_date" to worker div
        div.append(p6);     // Append "Role" to worker div

        div.append(hr2);    // Append line break to worker div
        div.append(p7);     // Append "username" to worker div
        div.append(p8);     // Append "password" to worker div
        div.append(p9);     // Append "status" to worker div
        div.append(p10);    // Append "user_id" to worker div

        // Appen worker div to main container to display to User (the Admin)
        mainContainer.append(div);

        // Create new array for our new worker, then push to database array of Employees
        const newWorker = {
            "first_name": firstName.value,
            "last_name": lastName.value,
            "email": email.value,
            "date_of_birth": birthDate.value,
            "role": role,

            "username": username,
            "password": password,
            "employment_status": employmentStatus,
            "user_id": `employee_${Employees.length+1}`,
        }

        // Push new worker to database array
        Employees.push(newWorker);

        // Update employee count in front-end
        UpdateEmployeeCount();
    });
});

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

document.addEventListener('DOMContentLoaded', function() {

    /// Get references ///
    const mainContainer = document.getElementById("main-container");

    // worker data
    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const birthDate = document.getElementById("birth-date");
    const doctorChosen = document.getElementById("doctor_role");
    const nurseRNChosen = document.getElementById("nurse_rn_role");
    const nurseLVNChosen = document.getElementById("nurse_lvn_role");
    const email = document.getElementById("email");

    // submit button to create a new doctor or nurse
    const newWorkerBtn = document.getElementById("new-worker");

    // Worker's role
    let role = "";

    // Add event listener
    newWorkerBtn.addEventListener("click", function() {

        /// Determine if title is Doctor or Nurse ///
        if (doctorChosen.checked)
        {
            role = "Doctor";
        }
        else if (nurseRNChosen.checked)
        {
            role = "Nurse, RN";
        }
        else if (nurseLVNChosen.checked)
        {
            role = "Nurse, LVN";
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

        /// Determine if title is Doctor or Nurse ///
        switch (role) {
            case "Doctor":
                p1.innerHTML = `<b>Title: </b> ${firstName.value} ${lastName.value}, MD.`;
                break;
            case "Nurse, RN":
                p1.innerHTML = `<b>Title: </b> ${firstName.value} ${lastName.value}, RN.`;
                break;
            case "Nurse, LVN":
                p1.innerHTML = `<b>Title: </b> ${firstName.value} ${lastName.value}, LVN.`;
                break;
        }

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
        p6.innerHTML = `<b>Role: </b> ${role}`;

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

        // Appen worker div to main container
        mainContainer.append(div);
    });
});
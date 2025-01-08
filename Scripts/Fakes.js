/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//----------------------------- Employee fakes ----------------------------//
const fakesEmployeeFirstNames = [
  "Emily",
  "Liam",
  "Ava",
  "Noah",
  "Sophia",
  "Ethan",
  "Mia",
  "Lucas",
  "Isabella",
  "Mason",
  "Charlotte",
  "Logan",
  "Amelia",
  "William",
  "Harper",

  "Alexander",
  "Evelyn",
  "Benjamin",
  "Abigail",
  "Henry"
];

const fakesEmployeeLastNames = [
  "Chen",
  "Patel",
  "Lee",
  "Kim",
  "Rodriguez",
  "Hall",
  "Hernandez",
  "Brooks",
  "Taylor",
  "Davis",
  "Brown",
  "White",
  "Martin",
  "Thompson",
  "Jackson",
  "Harris",
  "Lewis",
  "Walker",
  "Scott",
  "Villa"
];

const fakesEmployeeEmails = [
  "emilychen1@gmail.com",
  "liampatel2@gmail.com",
  "avalee3@gmail.com",
  "noahkim4@gmail.com",
  "sophiarod5@gmail.com",
  "ethanhall6@gmail.com",
  "miahernandez7@gmail.com",
  "lucasbrooks8@gmail.com",
  "isabellataylor9@gmail.com",
  "masondavis10@gmail.com",
  "charlottebrown11@gmail.com",
  "loganwhite12@gmail.com",
  "ameliamartin13@gmail.com",
  "williamthompson14@gmail.com",
  "harperjackson15@gmail.com",
  "alexanderharris16@gmail.com",
  "evelynlewis17@gmail.com",
  "benjaminwalker18@gmail.com",
  "abigailscott19@gmail.com",
  "enrybilla12@gmail.com"
];

const fakesRoles = [
  "Doctor",      // Doctor, MD
  "RN",          // Registered Nurse
  "LVN"          // Lcencsed Vocational Nurse
];

const randomEmployeeFirstName = function () {
  let randVal = Math.floor(Math.random() * fakesEmployeeFirstNames.length);
  return fakesEmployeeFirstNames[randVal];
}

const randomEmployeeLastName = () => {
  let randVal = Math.floor(Math.random() * fakesEmployeeLastNames.length);
  return fakesEmployeeLastNames[randVal];
}

const randomEmployeeEmail = () => {
  let randVal = Math.floor(Math.random() * fakesEmployeeEmails.length);
  return fakesEmployeeEmails[randVal];
}

const randomEmployeeRole = () => {
  let randVal = Math.floor(Math.random() * fakesRoles.length);
  return fakesRoles[randVal];
}

//----------------------------- Employee fakes ----------------------------//
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//----------------------------- Resident fakes ----------------------------//

const fakesResidentEmails = [
  "john.doe@example.com",
  "jane.smith@example.net",
  "michael.brown@example.org",
  "emily.davis@example.com",
  "chris.johnson@example.net",
  "sarah.wilson@example.org",
  "david.miller@example.com",
  "amanda.moore@example.net",
  "daniel.taylor@example.org",
  "laura.anderson@example.com",
  "robert.thomas@example.net",
  "megan.jackson@example.org",
  "kevin.white@example.com",
  "elizabeth.harris@example.net",
  "joshua.martin@example.org",
  "jessica.thompson@example.com",
  "ryan.garcia@example.net",
  "nicole.hernandez@example.org",
  "andrew.walker@example.com",
  "ashley.lee@example.net"
];

const fakesResidentFirstNames = [
  "John",
  "Jane",
  "Michael",
  "Emily",
  "Chris",
  "Sarah",
  "David",
  "Amanda",
  "Daniel",
  "Laura",
  "Robert",
  "Megan",
  "Kevin",
  "Elizabeth",
  "Joshua",
  "Jessica",
  "Ryan",
  "Nicole",
  "Andrew",
  "Ashley"
];

const fakesResidentLastNames = [
  "Doe",
  "Smith",
  "Brown",
  "Davis",
  "Johnson",
  "Wilson",
  "Miller",
  "Moore",
  "Taylor",
  "Anderson",
  "Thomas",
  "Jackson",
  "White",
  "Harris",
  "Martin",
  "Thompson",
  "Garcia",
  "Hernandez",
  "Walker",
  "Lee"
];

const fakesCareTypes = [
  "LTC",        // Long-Term Care
  "STC",        // Short-Term Care
  "REH",        // Rehabilitation Care
  "PAL"         // Palliative  Care
]

const fakesResidencyStatus = [
  "admitted",
  "discharged",
  "pending",
  "transferred",
  "deceased",
  "temporaryLeave"
]

const randomResidentFirstName = function () {
  let randVal = Math.floor(Math.random() * fakesResidentFirstNames.length);
  return fakesResidentFirstNames[randVal];
}

const randomResidentLastName = () => {
  let randVal = Math.floor(Math.random() * fakesResidentLastNames.length);
  return fakesResidentLastNames[randVal];
}

const randomResidentEmail = () => {
  let randVal = Math.floor(Math.random() * fakesResidentEmails.length);
  return fakesResidentEmails[randVal];
}

const randomCareType = () => {
  let randVal = Math.floor(Math.random() * fakesCareTypes.length);
  // console.log(`Generated care type: ${fakesCareTypes[randVal]}`);
  return fakesCareTypes[randVal];
}

const randomResidencyStatus = () => {
  let randVal = Math.floor(Math.random() * fakesResidencyStatus.length);
  // console.log(`Generated care type: ${fakesResidencyStatus[randVal]}`);
  return fakesResidencyStatus[randVal];
}

//----------------------------- Resident fakes ----------------------------//
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
//-------------- Used by both Employee and Resident databases ------------//

// YYYY-MM-DD
function randomDate() {

  const startYear = 1950;
  const endYear = 2006;

  const year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
  const month = Math.floor((Math.random() * 12) + 1);
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  const day = Math.floor(Math.random() * lastDayOfMonth) + 1;

  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
}


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
  let month = months[idxMonth];

  // Remove "0" from Day
  let day = parseInt(birthDay, 10);

  return `${month} ${day}, ${birthYear}`;
}

//-------------- Used by both Employee and Resident databases ------------//
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
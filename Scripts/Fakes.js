
const fakesFirstNames = [
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

const fakesLastNames = [
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

const fakesEmails = [
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
  "Doctor",
  "RN",
  "LVN"
]

const randomFirstName = function () {
  let randVal = Math.floor(Math.random() * fakesFirstNames.length);
  return fakesFirstNames[randVal];
}

const randomLastName = () => {
  let randVal = Math.floor(Math.random() * fakesLastNames.length);
  return fakesLastNames[randVal];
}

const randomEmail = () => {
  let randVal = Math.floor(Math.random() * fakesEmails.length);
  return fakesEmails[randVal];
}

const randomRole = () => {
  let randVal = Math.floor(Math.random() * fakesRoles.length);
  return fakesRoles[randVal];
}

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
// src/config/seedFirestore.js
// ─── Run this ONCE to populate Firestore with 1000 IT+CS students ─────────────
//
// SETUP STEPS:
//  1. npm install firebase-admin --save-dev
//  2. Firebase Console → Project Settings → Service Accounts
//     → "Generate new private key" → save as src/config/serviceAccountKey.json
//  3. node src/config/seedFirestore.js
//
// NOTE: Custom claims (role/linkedId on Firebase tokens) are set here.
//       The app ALSO reads roles from Firestore "users" collection as fallback,
//       so the app works even without running this seed (if users are created manually).
//
// DEPARTMENTS SEEDED: CS and IT only (1000 students total: 500 CS + 500 IT)
// AUTH ACCOUNTS: admin × 1, faculty × 5, sample students × 10

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // ← place your key here

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const db   = admin.firestore();
const auth = admin.auth();

// ─── DEPARTMENTS ──────────────────────────────────────────────────────────────
const DEPARTMENTS = [
  { id: "CS", deptName: "Computer Science",       abbr: "CS", colorHex: "#3B82F6" },
  { id: "IT", deptName: "Information Technology", abbr: "IT", colorHex: "#10B981" },
];

// ─── FACULTY ──────────────────────────────────────────────────────────────────
const FACULTY = [
  { id:"FAC-001", lastName:"Montecillo",    firstName:"Gima",               middleInitial:"B.", title:"Dr.",        position:"dean",       deptId:"CS", email:"gbmontecillo@pnc.edu.ph",  specialization:"Computer Science & Administration",  publications:15, yearsInService:20 },
  { id:"FAC-002", lastName:"Magaling",      firstName:"Evangelina",         middleInitial:"A.", title:"Asst. Prof.",position:"dept_chair", deptId:"CS", email:"eamagaling@pnc.edu.ph",    specialization:"Software Engineering",               publications:8,  yearsInService:14 },
  { id:"FAC-003", lastName:"Quiatchon",     firstName:"Arcelito",           middleInitial:"C.", title:"Asst. Prof.",position:"dept_chair", deptId:"IT", email:"acquiatchon@pnc.edu.ph",   specialization:"Network Administration",             publications:6,  yearsInService:12 },
  { id:"FAC-004", lastName:"Gaviola",       firstName:"Gia Mae",            middleInitial:"L.", title:"",           position:"secretary",  deptId:"CS", email:"gmlgaviola@pnc.edu.ph",    specialization:"College Administration",             publications:0,  yearsInService:8  },
  { id:"FAC-005", lastName:"Aquino",        firstName:"Angelica",           middleInitial:"M.", title:"Asst. Prof.",position:"permanent",  deptId:"IT", email:"amaquino@pnc.edu.ph",       specialization:"Web Technologies",                   publications:4,  yearsInService:9  },
  { id:"FAC-006", lastName:"Bana",          firstName:"Christian",          middleInitial:"M.", title:"Asst. Prof.",position:"permanent",  deptId:"CS", email:"cmbana@pnc.edu.ph",         specialization:"Algorithms & Data Structures",       publications:3,  yearsInService:7  },
  { id:"FAC-007", lastName:"Cartagenas",    firstName:"Joseph",             middleInitial:"D.", title:"Asst. Prof.",position:"permanent",  deptId:"IT", email:"jdcartagenas@pnc.edu.ph",   specialization:"Database Systems",                   publications:5,  yearsInService:10 },
  { id:"FAC-008", lastName:"Dela Cruz",     firstName:"Ramiro",             middleInitial:"Z.", title:"Asst. Prof.",position:"permanent",  deptId:"CS", email:"ramdcz@pnc.edu.ph",         specialization:"Operating Systems",                  publications:3,  yearsInService:8  },
  { id:"FAC-009", lastName:"Dimaculangan",  firstName:"Melissa",            middleInitial:"A.", title:"Asst. Prof.",position:"permanent",  deptId:"IT", email:"madimaculangan@pnc.edu.ph", specialization:"Human-Computer Interaction",         publications:4,  yearsInService:9  },
  { id:"FAC-010", lastName:"Eusebio",       firstName:"Luvim",              middleInitial:"M.", title:"Asst. Prof.",position:"permanent",  deptId:"CS", email:"lmeusebio@pnc.edu.ph",      specialization:"Artificial Intelligence",            publications:6,  yearsInService:11 },
  { id:"FAC-011", lastName:"Hablanida",     firstName:"Fe",                 middleInitial:"L.", title:"Asst. Prof.",position:"permanent",  deptId:"IT", email:"fhablanida@pnc.edu.ph",     specialization:"Network Security",                   publications:5,  yearsInService:10 },
  { id:"FAC-012", lastName:"Ogalesco",      firstName:"John Patrick",       middleInitial:"M.", title:"Asst. Prof.",position:"permanent",  deptId:"CS", email:"jpmogalesco@pnc.edu.ph",    specialization:"Software Development",               publications:4,  yearsInService:8  },
  { id:"FAC-013", lastName:"Tan",           firstName:"Janus Raymond",      middleInitial:"C.", title:"Asst. Prof.",position:"permanent",  deptId:"IT", email:"jrtan@pnc.edu.ph",          specialization:"Mobile Development",                 publications:3,  yearsInService:7  },
  { id:"FAC-014", lastName:"Alforja",       firstName:"Albert",             middleInitial:"",  title:"Instr.",     position:"ft_cos",     deptId:"IT", email:"aqalforja@pnc.edu.ph",      specialization:"Information Technology",             publications:1,  yearsInService:4  },
  { id:"FAC-015", lastName:"Bicua",         firstName:"Marvin",             middleInitial:"H.", title:"Instr.",     position:"ft_cos",     deptId:"CS", email:"MBicua66@pnc.edu.ph",       specialization:"Computer Science",                   publications:1,  yearsInService:3  },
  { id:"FAC-016", lastName:"Pregonero",     firstName:"Sairine",            middleInitial:"C.", title:"Instr.",     position:"ft_cos",     deptId:"IT", email:"scpregonero@pnc.edu.ph",    specialization:"Information Technology",             publications:0,  yearsInService:3  },
  { id:"FAC-017", lastName:"Rebana",        firstName:"Kristel",            middleInitial:"O.", title:"Instr.",     position:"ft_cos",     deptId:"CS", email:"korebana@pnc.edu.ph",       specialization:"Computer Science",                   publications:0,  yearsInService:2  },
  { id:"FAC-018", lastName:"Benco",         firstName:"Roselle",            middleInitial:"R.", title:"Instr.",     position:"part_time",  deptId:"IT", email:"rosebenco@pnc.edu.ph",      specialization:"Information Technology",             publications:0,  yearsInService:2  },
  { id:"FAC-019", lastName:"Capuno",        firstName:"Ma. Emmalyn Asuncion",middleInitial:"", title:"Instr.",     position:"part_time",  deptId:"CS", email:"meacapuno@pnc.edu.ph",      specialization:"Computer Science",                   publications:0,  yearsInService:2  },
  { id:"FAC-020", lastName:"Evangelista",   firstName:"Renzo",              middleInitial:"F.", title:"Instr.",     position:"part_time",  deptId:"IT", email:"rfevangelista@pnc.edu.ph",  specialization:"Information Technology",             publications:0,  yearsInService:1  },
  { id:"FAC-021", lastName:"Morano",        firstName:"Carissa",            middleInitial:"C.", title:"Instr.",     position:"part_time",  deptId:"CS", email:"ccmorano@pnc.edu.ph",       specialization:"Computer Science",                   publications:0,  yearsInService:2  },
  { id:"FAC-022", lastName:"Orozco",        firstName:"Mc Austine Philip",  middleInitial:"M.", title:"Instr.",     position:"part_time",  deptId:"IT", email:"mcorozco@pnc.edu.ph",       specialization:"Information Technology",             publications:0,  yearsInService:1  },
  { id:"FAC-023", lastName:"Rodriguez",     firstName:"Mildred De",         middleInitial:"O.", title:"Instr.",     position:"part_time",  deptId:"CS", email:"mdrodriguez@pnc.edu.ph",    specialization:"Computer Science",                   publications:0,  yearsInService:2  },
  { id:"FAC-024", lastName:"Virtucio",      firstName:"Ronnel",             middleInitial:"",  title:"Instr.",     position:"part_time",  deptId:"IT", email:"rvirtucio@pnc.edu.ph",      specialization:"Information Technology",             publications:0,  yearsInService:1  },
];

// ─── SUBJECTS ─────────────────────────────────────────────────────────────────
const SUBJECTS = [
  // CS Year 1
  { id:"CS101", subjectCode:"CS 101", subjectTitle:"Introduction to Computing",       units:3, deptId:"CS", yearLevel:1, semester:"1st" },
  { id:"CS102", subjectCode:"CS 102", subjectTitle:"Computer Programming 1",          units:3, deptId:"CS", yearLevel:1, semester:"1st" },
  { id:"CS103", subjectCode:"CS 103", subjectTitle:"Computer Programming 2",          units:3, deptId:"CS", yearLevel:1, semester:"2nd" },
  { id:"CS104", subjectCode:"CS 104", subjectTitle:"Discrete Mathematics",            units:3, deptId:"CS", yearLevel:1, semester:"2nd" },
  // CS Year 2
  { id:"CS201", subjectCode:"CS 201", subjectTitle:"Data Structures & Algorithms",    units:3, deptId:"CS", yearLevel:2, semester:"1st" },
  { id:"CS202", subjectCode:"CS 202", subjectTitle:"Object-Oriented Programming",     units:3, deptId:"CS", yearLevel:2, semester:"1st" },
  { id:"CS203", subjectCode:"CS 203", subjectTitle:"Computer Organization",           units:3, deptId:"CS", yearLevel:2, semester:"2nd" },
  { id:"CS204", subjectCode:"CS 204", subjectTitle:"Database Management Systems",     units:3, deptId:"CS", yearLevel:2, semester:"2nd" },
  // CS Year 3
  { id:"CS301", subjectCode:"CS 301", subjectTitle:"Software Engineering",            units:3, deptId:"CS", yearLevel:3, semester:"1st" },
  { id:"CS302", subjectCode:"CS 302", subjectTitle:"Operating Systems",               units:3, deptId:"CS", yearLevel:3, semester:"1st" },
  { id:"CS303", subjectCode:"CS 303", subjectTitle:"Computer Networks",               units:3, deptId:"CS", yearLevel:3, semester:"2nd" },
  { id:"CS304", subjectCode:"CS 304", subjectTitle:"Theory of Computation",           units:3, deptId:"CS", yearLevel:3, semester:"2nd" },
  // CS Year 4
  { id:"CS401", subjectCode:"CS 401", subjectTitle:"Compiler Design",                 units:3, deptId:"CS", yearLevel:4, semester:"1st" },
  { id:"CS402", subjectCode:"CS 402", subjectTitle:"Machine Learning",                units:3, deptId:"CS", yearLevel:4, semester:"1st" },
  { id:"CS403", subjectCode:"CS 403", subjectTitle:"Capstone Project 1",              units:3, deptId:"CS", yearLevel:4, semester:"1st" },
  { id:"CS404", subjectCode:"CS 404", subjectTitle:"Capstone Project 2",              units:3, deptId:"CS", yearLevel:4, semester:"2nd" },
  { id:"CS405", subjectCode:"CS 405", subjectTitle:"Artificial Intelligence",         units:3, deptId:"CS", yearLevel:4, semester:"2nd" },
  // IT Year 1
  { id:"IT101", subjectCode:"IT 101", subjectTitle:"Introduction to Information Technology", units:3, deptId:"IT", yearLevel:1, semester:"1st" },
  { id:"IT102", subjectCode:"IT 102", subjectTitle:"Computer Programming Fundamentals",     units:3, deptId:"IT", yearLevel:1, semester:"1st" },
  { id:"IT103", subjectCode:"IT 103", subjectTitle:"IT Infrastructure",                     units:3, deptId:"IT", yearLevel:1, semester:"2nd" },
  { id:"IT104", subjectCode:"IT 104", subjectTitle:"Computer Applications",                 units:3, deptId:"IT", yearLevel:1, semester:"2nd" },
  // IT Year 2
  { id:"IT201", subjectCode:"IT 201", subjectTitle:"Web Development",                 units:3, deptId:"IT", yearLevel:2, semester:"1st" },
  { id:"IT202", subjectCode:"IT 202", subjectTitle:"Database Management",             units:3, deptId:"IT", yearLevel:2, semester:"1st" },
  { id:"IT211", subjectCode:"IT 211", subjectTitle:"Human Computer Interaction",      units:3, deptId:"IT", yearLevel:2, semester:"2nd" },
  { id:"IT212", subjectCode:"IT 212", subjectTitle:"Systems Analysis & Design",       units:3, deptId:"IT", yearLevel:2, semester:"2nd" },
  // IT Year 3
  { id:"IT301", subjectCode:"IT 301", subjectTitle:"Network Administration",          units:3, deptId:"IT", yearLevel:3, semester:"1st" },
  { id:"IT302", subjectCode:"IT 302", subjectTitle:"Systems Integration",             units:3, deptId:"IT", yearLevel:3, semester:"1st" },
  { id:"IT303", subjectCode:"IT 303", subjectTitle:"Mobile Development",              units:3, deptId:"IT", yearLevel:3, semester:"2nd" },
  { id:"IT304", subjectCode:"IT 304", subjectTitle:"IT Project Management",           units:3, deptId:"IT", yearLevel:3, semester:"2nd" },
  // IT Year 4
  { id:"IT401", subjectCode:"IT 401", subjectTitle:"Cybersecurity Fundamentals",      units:3, deptId:"IT", yearLevel:4, semester:"1st" },
  { id:"IT402", subjectCode:"IT 402", subjectTitle:"Cloud Computing",                 units:3, deptId:"IT", yearLevel:4, semester:"1st" },
  { id:"IT403", subjectCode:"IT 403", subjectTitle:"Capstone Project 1",              units:3, deptId:"IT", yearLevel:4, semester:"1st" },
  { id:"IT404", subjectCode:"IT 404", subjectTitle:"Capstone Project 2",              units:3, deptId:"IT", yearLevel:4, semester:"2nd" },
  { id:"IT405", subjectCode:"IT 405", subjectTitle:"IT Governance & Compliance",      units:3, deptId:"IT", yearLevel:4, semester:"2nd" },
];

// ─── SCHEDULES ────────────────────────────────────────────────────────────────
const SCHEDULES = [
  // IT Year 2 - HCI (Dimaculangan FAC-009)
  { id:"SCHED-001", subjectId:"IT211", facultyId:"FAC-009", section:"2IT-A", deptId:"IT", dayOfWeek:"Mon,Wed,Fri", timeStart:"08:00", timeEnd:"09:00",   room:"CCS-101", schoolYear:"2024-2025", semester:"1st" },
  { id:"SCHED-002", subjectId:"IT211", facultyId:"FAC-009", section:"2IT-B", deptId:"IT", dayOfWeek:"Mon,Wed,Fri", timeStart:"09:00", timeEnd:"10:00",   room:"CCS-102", schoolYear:"2024-2025", semester:"1st" },
  { id:"SCHED-003", subjectId:"IT211", facultyId:"FAC-009", section:"2IT-C", deptId:"IT", dayOfWeek:"Tue,Thu",     timeStart:"10:00", timeEnd:"11:30",   room:"CCS-103", schoolYear:"2024-2025", semester:"1st" },
  { id:"SCHED-004", subjectId:"IT211", facultyId:"FAC-009", section:"2IT-D", deptId:"IT", dayOfWeek:"Tue,Thu",     timeStart:"13:00", timeEnd:"14:30",   room:"CCS-101", schoolYear:"2024-2025", semester:"1st" },
  { id:"SCHED-004B",subjectId:"IT211", facultyId:"FAC-009", section:"2IT-E", deptId:"IT", dayOfWeek:"Sat",         timeStart:"08:00", timeEnd:"11:00",   room:"CCS-102", schoolYear:"2024-2025", semester:"1st" },
  // CS Year 3 - Software Engineering (Magaling FAC-002)
  { id:"SCHED-005", subjectId:"CS301", facultyId:"FAC-002", section:"3CS-A", deptId:"CS", dayOfWeek:"Mon,Wed,Fri", timeStart:"10:00", timeEnd:"11:00",   room:"CCS-201", schoolYear:"2024-2025", semester:"1st" },
  { id:"SCHED-006", subjectId:"CS301", facultyId:"FAC-002", section:"3CS-B", deptId:"CS", dayOfWeek:"Tue,Thu",     timeStart:"08:00", timeEnd:"09:30",   room:"CCS-202", schoolYear:"2024-2025", semester:"1st" },
  { id:"SCHED-007", subjectId:"CS301", facultyId:"FAC-002", section:"3CS-C", deptId:"CS", dayOfWeek:"Mon,Wed,Fri", timeStart:"13:00", timeEnd:"14:00",   room:"CCS-203", schoolYear:"2024-2025", semester:"1st" },
  { id:"SCHED-008", subjectId:"CS301", facultyId:"FAC-002", section:"3CS-D", deptId:"CS", dayOfWeek:"Tue,Thu",     timeStart:"14:00", timeEnd:"15:30",   room:"CCS-201", schoolYear:"2024-2025", semester:"1st" },
  { id:"SCHED-008B",subjectId:"CS301", facultyId:"FAC-002", section:"3CS-E", deptId:"CS", dayOfWeek:"Sat",         timeStart:"08:00", timeEnd:"11:00",   room:"CCS-202", schoolYear:"2024-2025", semester:"1st" },
  // IT Year 4 - Cybersecurity (Hablanida FAC-011)
  { id:"SCHED-009", subjectId:"IT401", facultyId:"FAC-011", section:"4IT-A", deptId:"IT", dayOfWeek:"Mon,Wed,Fri", timeStart:"13:00", timeEnd:"14:00",   room:"CCS-Lab1",schoolYear:"2024-2025", semester:"1st" },
  { id:"SCHED-010", subjectId:"IT401", facultyId:"FAC-011", section:"4IT-B", deptId:"IT", dayOfWeek:"Tue,Thu",     timeStart:"09:00", timeEnd:"10:30",   room:"CCS-Lab2",schoolYear:"2024-2025", semester:"1st" },
  { id:"SCHED-011", subjectId:"IT401", facultyId:"FAC-011", section:"4IT-C", deptId:"IT", dayOfWeek:"Mon,Wed,Fri", timeStart:"15:00", timeEnd:"16:00",   room:"CCS-Lab1",schoolYear:"2024-2025", semester:"1st" },
  { id:"SCHED-012", subjectId:"IT401", facultyId:"FAC-011", section:"4IT-D", deptId:"IT", dayOfWeek:"Sat",         timeStart:"08:00", timeEnd:"11:00",   room:"CCS-Lab3",schoolYear:"2024-2025", semester:"1st" },
  { id:"SCHED-012B",subjectId:"IT401", facultyId:"FAC-011", section:"4IT-E", deptId:"IT", dayOfWeek:"Fri",         timeStart:"13:00", timeEnd:"16:00",   room:"CCS-Lab2",schoolYear:"2024-2025", semester:"1st" },
  // CS Year 4 - AI (Eusebio FAC-010)
  { id:"SCHED-013", subjectId:"CS405", facultyId:"FAC-010", section:"4CS-A", deptId:"CS", dayOfWeek:"Tue,Thu",     timeStart:"14:00", timeEnd:"15:30",   room:"CCS-301", schoolYear:"2024-2025", semester:"1st" },
  { id:"SCHED-014", subjectId:"CS405", facultyId:"FAC-010", section:"4CS-B", deptId:"CS", dayOfWeek:"Mon,Wed,Fri", timeStart:"08:00", timeEnd:"09:00",   room:"CCS-302", schoolYear:"2024-2025", semester:"1st" },
  { id:"SCHED-015", subjectId:"CS405", facultyId:"FAC-010", section:"4CS-C", deptId:"CS", dayOfWeek:"Tue,Thu",     timeStart:"10:00", timeEnd:"11:30",   room:"CCS-301", schoolYear:"2024-2025", semester:"1st" },
  { id:"SCHED-016", subjectId:"CS405", facultyId:"FAC-010", section:"4CS-D", deptId:"CS", dayOfWeek:"Sat",         timeStart:"08:00", timeEnd:"11:00",   room:"CCS-302", schoolYear:"2024-2025", semester:"1st" },
  { id:"SCHED-016B",subjectId:"CS405", facultyId:"FAC-010", section:"4CS-E", deptId:"CS", dayOfWeek:"Mon,Wed",     timeStart:"14:00", timeEnd:"15:30",   room:"CCS-303", schoolYear:"2024-2025", semester:"1st" },
  // IT Year 2 - Web Dev (Aquino FAC-005)
  { id:"SCHED-017", subjectId:"IT201", facultyId:"FAC-005", section:"2IT-A", deptId:"IT", dayOfWeek:"Tue,Thu",     timeStart:"08:00", timeEnd:"09:30",   room:"CCS-Lab1",schoolYear:"2024-2025", semester:"1st" },
  { id:"SCHED-018", subjectId:"IT201", facultyId:"FAC-005", section:"2IT-B", deptId:"IT", dayOfWeek:"Mon,Wed,Fri", timeStart:"11:00", timeEnd:"12:00",   room:"CCS-Lab2",schoolYear:"2024-2025", semester:"1st" },
  // CS Year 2 - Data Structures (Bana FAC-006)
  { id:"SCHED-019", subjectId:"CS201", facultyId:"FAC-006", section:"2CS-A", deptId:"CS", dayOfWeek:"Mon,Wed,Fri", timeStart:"07:00", timeEnd:"08:00",   room:"CCS-101", schoolYear:"2024-2025", semester:"1st" },
  { id:"SCHED-020", subjectId:"CS201", facultyId:"FAC-006", section:"2CS-B", deptId:"CS", dayOfWeek:"Tue,Thu",     timeStart:"07:00", timeEnd:"08:30",   room:"CCS-102", schoolYear:"2024-2025", semester:"1st" },
];

// ─── EVENTS ───────────────────────────────────────────────────────────────────
const EVENTS = [
  { id:"EVT-001", title:"CCS Sportsfest 2025",     description:"Annual sports competition among IT and CS students.", eventType:"sports",   eventDate:"2025-03-15", venue:"University Gymnasium",  organizer:"CCS Student Council",  status:"upcoming" },
  { id:"EVT-002", title:"Miss & Mr. CCS 2025",     description:"Annual beauty and talent showcase.",                  eventType:"pageant",  eventDate:"2025-03-20", venue:"University Auditorium", organizer:"CCS Student Council",  status:"upcoming" },
  { id:"EVT-003", title:"CCS Research Congress",   description:"Faculty and student research presentations.",         eventType:"academic", eventDate:"2024-02-20", venue:"CCS Auditorium",        organizer:"CCS Research Office",  status:"completed" },
  { id:"EVT-004", title:"Tech Innovation Summit",  description:"Industry tech talks and product demos.",             eventType:"seminar",  eventDate:"2025-04-10", venue:"CCS Building A",        organizer:"Dean's Office",        status:"upcoming" },
  { id:"EVT-005", title:"CCS Foundation Week",     description:"CCS founding anniversary celebration.",             eventType:"cultural", eventDate:"2024-01-22", venue:"Campus Wide",            organizer:"CCS Administration",   status:"completed" },
  { id:"EVT-006", title:"IT Awareness Week",       description:"IT industry trends and career talks.",              eventType:"seminar",  eventDate:"2025-05-05", venue:"CCS Lecture Hall",       organizer:"IT Department",        status:"upcoming" },
  { id:"EVT-007", title:"CS Alumni Homecoming",    description:"Networking event with CS alumni.",                  eventType:"cultural", eventDate:"2025-06-12", venue:"University Main Hall",   organizer:"CS Department",        status:"upcoming" },
];

// ─── GENERATE 1000 STUDENTS (500 CS + 500 IT) ─────────────────────────────────
function generateStudents() {
  const LAST_NAMES = [
    "Santos","Cruz","Reyes","Garcia","Mendoza","Torres","Flores","Rivera","Gomez","Bautista",
    "Lim","Tan","Go","Chua","Villanueva","Gonzalez","Aguilar","Fernandez","Ramos","Lopez",
    "Hernandez","Martinez","Morales","Gutierrez","Perez","Jimenez","Ramirez","Rojas","Diaz","Castillo",
    "Ortiz","Vargas","Ruiz","Romero","Luna","Salazar","Medina","Campos","Guerrero","Valdez",
    "Navarro","Aquino","Macaraeg","Ocampo","Pascual","Atienza","Vidal","Espiritu","Javier","Concepcion",
    "Tolentino","Sarmiento","Pineda","Cabrera","Cortez","Lacson","Enriquez","Sevilla","Buenaventura","Padilla",
    "Peralta","Miranda","Macapagal","Dela Cruz","Dela Pena","De Jesus","De Leon","San Juan","De Guzman","De Castro",
    "Villarin","Catalan","Ylagan","Magno","Gregorio","Banaag","Corpus","Velasco","Feria","Galvez",
    "Ilustre","Kintanar","Llanes","Molino","Natividad","Oliveros","Pulido","Quizon","Resurreccion","Sigua",
    "Tejada","Uy","Vista","Wagas","Ybarra","Zamora","Abuan","Bacolod","Calimutan","Daquioag",
  ];
  const FIRST_MALE = [
    "Miguel","Juan","Carlo","Jose","Mario","Roberto","Eduardo","Ramon","Francisco","Manuel",
    "Antonio","Ricardo","Carlos","Ernesto","Andres","Pablo","Luis","Fernando","Jorge","Rodrigo",
    "Angelo","Marco","Paolo","Nico","Renz","Jude","Neil","Mark","John","James",
    "Michael","David","Kevin","Ryan","Bryan","Christian","Daniel","Joshua","Matthew","Nathan",
    "Patrick","Raymond","Steven","Timothy","Vincent","Alvin","Bernard","Dennis","Edwin","Felix",
    "Gerald","Harold","Ivan","Kenneth","Lawrence","Nelson","Oscar","Peter","Roland","Samuel",
    "Aaron","Benjamin","Cedric","Derek","Ethan","Francis","Gilbert","Henry","Ian","Jerome",
    "Karl","Leo","Marcus","Norman","Oliver","Philip","Quentin","Raphael","Simon","Tristan",
  ];
  const FIRST_FEMALE = [
    "Maria","Ana","Elena","Rosa","Luisa","Carmen","Cecilia","Angela","Bianca","Sophia",
    "Kayla","Alyssa","Nicole","Christine","Maricel","Lourdes","Maribel","Cristina","Leticia","Rosario",
    "Corazon","Gloria","Josefina","Linda","Marites","Olivia","Patricia","Regina","Sandra","Teresa",
    "Abby","Beth","Chloe","Dana","Faye","Grace","Hannah","Iris","Jane","Kate",
    "Laura","Mia","Nina","Pia","Rachel","Sara","Tara","Vina","Wendy","Yasmin",
    "Zoe","Amber","Clara","Donna","Elaine","Fatima","Gina","Hazel","Julie","Karen",
    "Lena","Monica","Norma","Portia","Queenie","Rita","Sheila","Tina","Venus","Wilda",
    "Aileen","Bea","Camille","Diane","Erika","Francesca","Geraldine","Helen","Irene","Joanna",
  ];
  const MIDDLE = [
    "Reyes","Santos","Cruz","Garcia","Mendoza","Torres","Flores","Rivera","Gomez","Bautista",
    "Lim","Villanueva","Gonzalez","Aguilar","Fernandez","Ramos","Lopez","Hernandez","Martinez","Morales",
    "Luna","Salazar","Medina","Campos","Valdez","Navarro","Aquino","Ocampo","Pascual","Tolentino",
  ];
  const BLOOD = ["A+","B+","O+","AB+","A-","B-","O-","AB-"];
  const SCHOLS = ["None","None","None","None","None","Academic Scholar","DOST Scholar","Full Merit","Indigent Scholar","Tulong Dunong"];
  const YEAR_BATCH = { 4:2021, 3:2022, 2:2023, 1:2024 };

  const pick = (arr, n) => arr[Math.abs(n) % arr.length];
  const pad  = (n, l=4)  => String(n).padStart(l,'0');

  const students = [];
  let idx = 1;

  // 500 CS + 500 IT | 4 years × 5 sections × 25 per section = 500 per dept
  for (const dept of ["CS","IT"]) {
    const course = dept === "CS" ? "BSCS" : "BSIT";
    for (let year = 1; year <= 4; year++) {
      const batch = YEAR_BATCH[year];
      for (let sec = 0; sec < 5; sec++) {
        const secLabel = `${year}${dept}-${String.fromCharCode(65+sec)}`;
        for (let s = 0; s < 25; s++) {
          const seed   = idx * 7 + sec * 13 + s * 3;
          const gender = (seed % 2 === 0) ? "Male" : "Female";
          const first  = gender === "Male" ? pick(FIRST_MALE, seed+idx) : pick(FIRST_FEMALE, seed+idx);
          const last   = pick(LAST_NAMES, seed + idx*2 + 1);
          const mid    = pick(MIDDLE, seed + idx*3 + 2);
          const num    = pad(idx);
          students.push({
            id:               `STU-${num}`,
            lastName:         last,
            firstName:        first,
            middleName:       mid,
            deptId:           dept,
            course,
            yearLevel:        year,
            section:          secLabel,
            studentId:        `${batch}-${num}`,
            email:            `${batch}-${num}@pnc.edu.ph`,
            birthday:         `${2005-year}-${pad((seed%12)+1,2)}-${pad((seed%28)+1,2)}`,
            gender,
            bloodType:        pick(BLOOD, seed),
            scholarship:      pick(SCHOLS, seed+5),
            isOfficer:        (seed % 13 === 0),
            isAthlete:        (seed % 7 === 0),
            isBeautyCandidate:(gender==="Female" && seed%11===0),
            guardian:         `${pick(FIRST_FEMALE,seed+99)} ${last}`,
            guardianContact:  `0917-${pad(100+idx,3)}-${pad(seed%9999,4)}`,
            status:           "active",
          });
          idx++;
        }
      }
    }
  }
  return students;
}

// ─── AUTH ACCOUNTS ────────────────────────────────────────────────────────────
// Admin + faculty accounts (full access)
// Sample student accounts for testing — students use their school email + Student@2024
const AUTH_ACCOUNTS = [
  // Admin
  { email:"gbmontecillo@pnc.edu.ph",  password:"Admin@2024",   role:"admin",   linkedId:"FAC-001", displayName:"Dr. Gima B. Montecillo"             },
  // Faculty (use Faculty@2024 as default password)
  { email:"eamagaling@pnc.edu.ph",    password:"Faculty@2024", role:"faculty", linkedId:"FAC-002", displayName:"Asst. Prof. Evangelina A. Magaling"  },
  { email:"acquiatchon@pnc.edu.ph",   password:"Faculty@2024", role:"faculty", linkedId:"FAC-003", displayName:"Asst. Prof. Arcelito C. Quiatchon"   },
  { email:"amaquino@pnc.edu.ph",      password:"Faculty@2024", role:"faculty", linkedId:"FAC-005", displayName:"Asst. Prof. Angelica M. Aquino"       },
  { email:"cmbana@pnc.edu.ph",        password:"Faculty@2024", role:"faculty", linkedId:"FAC-006", displayName:"Asst. Prof. Christian M. Bana"        },
  { email:"jdcartagenas@pnc.edu.ph",  password:"Faculty@2024", role:"faculty", linkedId:"FAC-007", displayName:"Asst. Prof. Joseph D. Cartagenas"     },
  { email:"madimaculangan@pnc.edu.ph",password:"Faculty@2024", role:"faculty", linkedId:"FAC-009", displayName:"Asst. Prof. Melissa A. Dimaculangan"  },
  { email:"lmeusebio@pnc.edu.ph",     password:"Faculty@2024", role:"faculty", linkedId:"FAC-010", displayName:"Asst. Prof. Luvim M. Eusebio"         },
  { email:"fhablanida@pnc.edu.ph",    password:"Faculty@2024", role:"faculty", linkedId:"FAC-011", displayName:"Asst. Prof. Fe L. Hablanida"          },
  // Sample Students (STU-0001 to STU-0010) — all use Student@2024
  { email:"2024-0001@pnc.edu.ph", password:"Student@2024", role:"student", linkedId:"STU-0001", displayName:"Student 0001" },
  { email:"2024-0002@pnc.edu.ph", password:"Student@2024", role:"student", linkedId:"STU-0002", displayName:"Student 0002" },
  { email:"2024-0003@pnc.edu.ph", password:"Student@2024", role:"student", linkedId:"STU-0003", displayName:"Student 0003" },
  { email:"2024-0004@pnc.edu.ph", password:"Student@2024", role:"student", linkedId:"STU-0004", displayName:"Student 0004" },
  { email:"2024-0005@pnc.edu.ph", password:"Student@2024", role:"student", linkedId:"STU-0005", displayName:"Student 0005" },
  { email:"2021-0501@pnc.edu.ph", password:"Student@2024", role:"student", linkedId:"STU-0501", displayName:"Student 0501" },
  { email:"2021-0502@pnc.edu.ph", password:"Student@2024", role:"student", linkedId:"STU-0502", displayName:"Student 0502" },
  { email:"2021-0503@pnc.edu.ph", password:"Student@2024", role:"student", linkedId:"STU-0503", displayName:"Student 0503" },
  { email:"2021-0504@pnc.edu.ph", password:"Student@2024", role:"student", linkedId:"STU-0504", displayName:"Student 0504" },
  { email:"2021-0505@pnc.edu.ph", password:"Student@2024", role:"student", linkedId:"STU-0505", displayName:"Student 0505" },
];

// ─── SEED FUNCTION ────────────────────────────────────────────────────────────
async function seed() {
  console.log("\n🔥 Seeding CCS Firestore — IT and CS only\n");
  console.log("📊 Data plan: 1000 students (500 CS + 500 IT), 24 faculty, 35 subjects\n");

  let batch = db.batch();
  let count = 0;

  const commitIfFull = async () => {
    count++;
    if (count >= 400) {
      await batch.commit();
      batch = db.batch();
      count = 0;
      console.log("   ⚡ Batch committed (500 ops)");
    }
  };

  const batchSet = async (ref, data) => {
    batch.set(ref, data);
    await commitIfFull();
  };

  // 1. Departments
  console.log("📦 Departments...");
  for (const d of DEPARTMENTS) {
    await batchSet(db.collection("departments").doc(d.id), d);
  }

  // 2. Faculty
  console.log("👨‍🏫 Faculty (24)...");
  for (const f of FACULTY) {
    await batchSet(db.collection("faculty").doc(f.id), {
      ...f, createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  // 3. Students — generated programmatically (1000 total)
  console.log("🎓 Students (1000: 500 CS + 500 IT)...");
  const STUDENTS = generateStudents();
  let done = 0;
  for (const s of STUDENTS) {
    await batchSet(db.collection("students").doc(s.id), {
      ...s, createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    done++;
    if (done % 100 === 0) console.log(`   ✓ ${done}/1000 students`);
  }

  // 4. Subjects
  console.log("📚 Subjects (35)...");
  for (const sub of SUBJECTS) {
    await batchSet(db.collection("subjects").doc(sub.id), sub);
  }

  // 5. Schedules
  console.log("🗓️  Schedules (20)...");
  for (const sc of SCHEDULES) {
    await batchSet(db.collection("schedules").doc(sc.id), {
      ...sc, createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  // 6. Events
  console.log("📅 Events (7)...");
  for (const ev of EVENTS) {
    await batchSet(db.collection("events").doc(ev.id), ev);
  }

  // Final batch commit
  if (count > 0) { await batch.commit(); console.log("   ⚡ Final batch committed"); }

  // 7. Auth Accounts (cannot batch — use Auth API one by one)
  console.log("\n🔐 Creating Firebase Auth accounts...");
  console.log("   (Admin × 1, Faculty × 8, Sample Students × 10)\n");

  for (const acc of AUTH_ACCOUNTS) {
    try {
      const userRecord = await auth.createUser({
        email:       acc.email,
        password:    acc.password,
        displayName: acc.displayName,
      });

      // Set custom claims (role-based access via token)
      await auth.setCustomUserClaims(userRecord.uid, {
        role:     acc.role,
        linkedId: acc.linkedId,
      });

      // IMPORTANT: Also write to Firestore "users" collection
      // This is the fallback for clients that can't read custom claims
      await db.collection("users").doc(userRecord.uid).set({
        email:       acc.email,
        role:        acc.role,
        linkedId:    acc.linkedId,
        displayName: acc.displayName,
        createdAt:   admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log(`   ✅ ${acc.email} [${acc.role}]`);
    } catch (err) {
      if (err.code === "auth/email-already-exists") {
        console.log(`   ⚠️  Already exists: ${acc.email}`);
        // Still update Firestore user doc if it exists
        try {
          const existing = await auth.getUserByEmail(acc.email);
          await auth.setCustomUserClaims(existing.uid, { role: acc.role, linkedId: acc.linkedId });
          await db.collection("users").doc(existing.uid).set({
            email: acc.email, role: acc.role, linkedId: acc.linkedId,
            displayName: acc.displayName, updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          }, { merge: true });
          console.log(`         → Updated claims & Firestore for ${acc.email}`);
        } catch {}
      } else {
        console.error(`   ❌ Failed: ${acc.email} —`, err.message);
      }
    }
  }

  console.log(`
╔══════════════════════════════════════════════════════╗
║   ✅  CCS Firebase Seed Complete!                    ║
║                                                      ║
║   📊  1,000 students (500 CS + 500 IT)               ║
║   👨‍🏫  24 faculty members                             ║
║   📚  35 subjects (CS + IT)                          ║
║   🗓️   20 schedules                                   ║
║   📅  7 events                                       ║
║   🔐  19 auth accounts                               ║
║                                                      ║
║   Admin:   gbmontecillo@pnc.edu.ph / Admin@2024      ║
║   Faculty: eamagaling@pnc.edu.ph  / Faculty@2024     ║
║   Student: 2024-0001@pnc.edu.ph   / Student@2024     ║
╚══════════════════════════════════════════════════════╝
`);
  process.exit(0);
}

seed().catch(err => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});

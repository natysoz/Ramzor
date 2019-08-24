export default {
  getContacts,
  getContactByNum
};

const contacts = [
  {
    _id: "5d5aa1425849adb0d0decf6d",
    isActive: true,
    balance: "$3,234.08",
    picture:
      "https://res.cloudinary.com/dvvx6eoye/image/upload/v1566221973/contacts/2_foshay.jpg",
    name: "Dorsey Ratliff",
    gender: "male",
    email: "dorseyratliff@kenegy.com",
    phone: "0556667794"
  },
  {
    _id: "5d5aa1422727f1512de8b8e5",
    isActive: true,
    balance: "$3,848.02",
    picture:
      "https://res.cloudinary.com/dvvx6eoye/image/upload/v1566221973/contacts/3_swqndq.jpg",
    name: "Pat Booker",
    gender: "female",
    email: "patbooker@kenegy.com",
    phone: "0523666214"
  },
  {
    _id: "5d5aa142c03a3505cd7d58e6",
    isActive: false,
    balance: "$2,695.21",
    picture:
      "https://res.cloudinary.com/dvvx6eoye/image/upload/v1566221973/contacts/4_qjdvyq.jpg",
    name: "Nona Glover",
    gender: "female",
    email: "nonaglover@kenegy.com",
    phone: "0522710215"
  },
  {
    _id: "5d5aa142df6dd3c651e64de8",
    isActive: false,
    balance: "$1,677.99",
    picture:
      "https://res.cloudinary.com/dvvx6eoye/image/upload/v1566221973/contacts/5_ofkloc.jpg",
    name: "Amanda Juarez",
    gender: "female",
    email: "amandajuarez@kenegy.com",
    phone: "0527938106"
  },
  {
    _id: "5d5aa142a1206cdd2994a1c0",
    isActive: false,
    balance: "$2,050.70",
    picture:
      "https://res.cloudinary.com/dvvx6eoye/image/upload/v1566221973/contacts/6_kj3ahf.jpg",
    name: "Potts Mccormick",
    gender: "male",
    email: "pottsmccormick@kenegy.com",
    phone: "0526218254"
  },
  {
    _id: "5d5aa142737cee73b8d6d9c0",
    isActive: false,
    balance: "$2,956.35",
    picture:
      "https://res.cloudinary.com/dvvx6eoye/image/upload/v1566221973/contacts/8_c0bkml.jpg",
    name: "Francis Frost",
    gender: "female",
    email: "francisfrost@kenegy.com",
    phone: "0528909849"
  },
  {
    _id: "5d5aa1422d8738313a9c1aad",
    isActive: false,
    balance: "$3,129.49",
    picture:
      "https://res.cloudinary.com/dvvx6eoye/image/upload/v1566221973/contacts/7_ubqddn.jpg",
    name: "Lilly Watson",
    gender: "female",
    email: "lillywatson@kenegy.com",
    phone: "0528859323"
  },
  {
    _id: "5d5aa142b6c4077aa0ef41c0",
    isActive: false,
    balance: "$1,539.95",
    picture:
      "https://res.cloudinary.com/dvvx6eoye/image/upload/v1566221974/contacts/9_minims.jpg",
    name: "Moore Doyle",
    gender: "male",
    email: "mooredoyle@kenegy.com",
    phone: "0525155016"
  },
  {
    _id: "5d5aa142275d18fdb6eb630c",
    isActive: true,
    balance: "$3,424.53",
    picture:
      "https://res.cloudinary.com/dvvx6eoye/image/upload/v1566221974/contacts/10_pzqovn.jpg",
    name: "Margaret Bailey",
    gender: "female",
    email: "margaretbailey@kenegy.com",
    phone: "0525227103"
  },
  {
    _id: "5d5aa1426615403bd137c44f",
    isActive: true,
    balance: "$3,427.09",
    picture:
      "https://res.cloudinary.com/dvvx6eoye/image/upload/v1566221974/contacts/1_knjtfi.jpg",
    name: "Jeannine Leon",
    gender: "female",
    email: "jeannineleon@kenegy.com",
    phone: "0520665083"
  }
];

function getContactByNum(number) {
  return contacts.find(contact => contact.phone === number);
}

function getContacts(filterBy = null) {
  var contactsToReturn = contacts;
  if (filterBy) {
    contactsToReturn = filter(filterBy);
  }
  return contactsToReturn;
}

function filter(term) {
  term = term.toLocaleLowerCase();
  return contacts.filter(contact => {
    return (
      contact.name.toLocaleLowerCase().includes(term) ||
      contact.phone.toLocaleLowerCase().includes(term) ||
      contact.email.toLocaleLowerCase().includes(term)
    );
  });
}

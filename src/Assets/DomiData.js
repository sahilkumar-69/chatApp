import { AiFillNotification } from "react-icons/ai";

// give an array of objects with 10 user details like name, image, phone, status(online/offline) ,bio
const users = [
  {
    _id: "1",
    name: "John Doe",
    image:
      "https://thumbs.dreamstime.com/b/young-woman-tourist-happy-smiling-hiking-mountains-traveling-solo-outdoor-norway-healthy-lifestyle-active-vacations-adventure-371360158.jpg",
    phone: "+1-555-123-4567",
    status: "online",
    bio: "Loves hiking and outdoor adventures.",
  },
  {
    _id: "2",
    name: "Jane Smith",
    image: "https://thumbs.dreamstime.com/b/teen-girl-stairway-11537438.jpg",
    phone: "+1-555-234-5678",
    status: "offline",
    bio: "Avid reader and coffee enthusiast.",
  },
  {
    _id: "3",
    name: "Alice Johnson",
    image: "https://thumbs.dreamstime.com/b/teen-girl-stairway-11537438.jpg",
    phone: "+1-555-345-6789",
    status: "online",
    bio: "Tech geek and aspiring developer.",
  },
  {
    _id: "4",
    name: "Bob Brown",
    image:
      "https://aac-publications.s3.amazonaws.com/articles/aaj-13201213558-1448123903.jpg",
    phone: "+1-555-456-7890",
    status: "offline",
    bio: "Fitness trainer and nutrition expert.",
  },
  {
    _id: "5",
    name: "Charlie Davis",
    image: "https://images.pexels.com/photos/886285/pexels-photo-886285.jpeg",
    phone: "+1-555-567-8901",
    status: "online",
    bio: "Music lover and guitar player.",
  },
  {
    _id: "6",
    name: "Diana Evans",
    image:
      "https://joannavargas.com/cdn/shop/articles/scarlett-johansson-beauty-secrets-159547.jpg?v=1739218043",
    phone: "+1-555-678-9012",
    status: "offline",
    bio: "Travel blogger and photographer.",
  },
  {
    _id: "7",
    name: "Ethan Wilson",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlwMiO40OFJ_2WF4te1jNUKq0_ZJ7Uc3Gigg&s",
    phone: "+1-555-789-0123",
    status: "online",
    bio: "Gamer and esports enthusiast.",
  },
  {
    _id: "8",
    name: "Fiona Green",
    image:
      "https://www.mgfilmproductions.com/uploads/1/4/5/8/145812880/389783587_2.jpg",
    phone: "+1-555-890-1234",
    status: "offline",
    bio: "Chef and food critic.",
  },
  {
    _id: "9",
    name: "George Hill",
    image:
      "https://www.bigmustard.co.uk/wp-content/uploads/2020/01/abby-thomas-1-web.jpg",
    phone: "+1-555-901-2345",
    status: "online",
    bio: "Entrepreneur and startup mentor.",
  },
  {
    _id: "10",
    name: "Hannah Lee",
    image:
      "https://i.pinimg.com/474x/25/86/29/258629944eeb85b56ea7cfc82977e6ca.jpg",
    phone: "+1-555-012-3456",
    status: "offline",
    bio: "Yoga instructor and wellness coach.",
  },
];

export default users;

// give an array of objects with 10 message details like senderId, text, image(optional), createdAt
export const messageData = [
  {
    senderId: "jfdis9dfsh",
    text: "Hey! How are you?",
    createdAt: "10:00 AM",
    // image:"https://pbs.twimg.com/media/F3wE73cW8AAtAhW.jpg"
  },
  {
    senderId: "f9dsaf9ds",
    text: "I'm good, thanks! How about you?",
    createdAt: "10:02 AM",
    // image:"https://pbs.twimg.com/media/F3wE73cW8AAtAhW.jpg"
  },
  {
    senderId: "jfdis9dfsh",
    text: "Doing well! Just got back from a hike.",
    createdAt: "10:05 AM",
    image: "https://pbs.twimg.com/media/F3wE73cW8AAtAhW.jpg",
  },
  {
    senderId: "f9dsaf9ds",
    text: "That sounds fun! Where did you go?",
    createdAt: "10:06 AM",
    image: "https://pbs.twimg.com/media/F3wE73cW8AAtAhW.jpg",
  },
  {
    senderId: "jfdis9dfsh",
    text: "I went to the Blue Ridge Mountains. The view was amazing!",
    createdAt: "10:10 AM",
    image: "https://pbs.twimg.com/media/F3wE73cW8AAtAhW.jpg",
  },
  {
    senderId: "f9dsaf9ds",
    text: "Wow, I've always wanted to go there. Did you take any pictures?",
    createdAt: "10:12 AM",
    image: "https://pbs.twimg.com/media/F3wE73cW8AAtAhW.jpg",
  },
  {
    senderId: "jfdis9dfsh",
    image: "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg",
    createdAt: "10:15 AM",
    image: "https://pbs.twimg.com/media/F3wE73cW8AAtAhW.jpg",
  },
  {
    senderId: "f9dsaf9ds",
    text: "That's a beautiful shot! The mountains look stunning.",
    createdAt: "10:16 AM",
    image: "https://pbs.twimg.com/media/F3wE73cW8AAtAhW.jpg",
  },
  {
    senderId: "jfdis9dfsh",
    text: "Thanks! It was a great day to be outdoors.",
    createdAt: "10:18 AM",
    image: "https://pbs.twimg.com/media/F3wE73cW8AAtAhW.jpg",
  },
  {
    senderId: "f9dsaf9ds",
    text: "Absolutely! We should plan a hike together sometime.",
    createdAt: "10:20 AM",
    image: "https://pbs.twimg.com/media/F3wE73cW8AAtAhW.jpg",
  },
];

export const imagesDummyData = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB3Wgb-_oizvE5Gm9PRoU3sInKKPoTSsCqkA&s",
  "https://dl-asset.cyberlink.com/web/prog/learning-center/html/7887/PDR19-YouTube-424_How_To_Profile_Picture_PC/img/05_phd_light_new.jpg",
  "https://i.pinimg.com/474x/56/a2/4e/56a24e17d610a9b6076bf7f88b0ed05e.jpg"
];

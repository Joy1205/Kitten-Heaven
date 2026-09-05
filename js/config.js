/**
 * Kitten Heaven - Central Configuration & Data File
 * Easily update phone numbers, impact statistics, job details, rescue stories, and adoption listings here.
 */

const KITTEN_HEAVEN_CONFIG = {
  org: {
    name: "KITTEN HEAVEN",
    tagline: "Rescue. Heal. Feed. Love.",
    description: "Kitten Heaven is a Bangladesh-based animal rescue organization dedicated to saving sick, injured, and abandoned cats, providing medical treatment and safe shelter, facilitating foster & adoption, and feeding street animals in our community.",
    bkashNumber: "01XXXXXXXXX",
    nagadNumber: "01XXXXXXXXX",
    phone: "+880 1XXXXXXXXX",
    email: "contact@kittenheavenbd.org",
    location: "Dhaka, Bangladesh",
    facebookUrl: "https://www.facebook.com/p/Kitten-Heaven-100079653400951/",
    youtubeUrl: "https://www.youtube.com/@kittenheavenbd"
  },

  // Impact Statistics (Editable Placeholders per instructions)
  impactStats: [
    { id: "rescued", value: "250+", label: "Cats Rescued", editablePlaceholder: "[NUMBER]+" },
    { id: "treatments", value: "380+", label: "Treatments Provided", editablePlaceholder: "[NUMBER]+" },
    { id: "shelter", value: "70+", label: "Cats in Shelter", editablePlaceholder: "[NUMBER]+" },
    { id: "streetFed", value: "40+", label: "Street Animals Fed", editablePlaceholder: "[NUMBER]+" }
  ],

  // Rescue Stories Data
  rescueStories: [
    {
      id: "milo",
      name: "Milo",
      status: "Recovered & Adopted",
      date: "October 2025",
      summary: "Found severely injured on a rainy roadside, Milo was rushed to emergency care. Today he thrives in a loving permanent home.",
      image: "images/hero_cat.jpg",
      beforeImage: "images/street_cat_feeding.jpg",
      afterImage: "images/hero_cat.jpg",
      theRescue: "Milo was discovered by one of our street feeding volunteers lying helpless near a busy highway, unable to walk due to a hip injury. Our emergency team safely brought him to our partner veterinary clinic.",
      whatHappened: "Diagnostic X-rays revealed a hip joint dislocation and signs of malnutrition. Milo was extremely frightened, dehydrated, and in urgent need of stabilization.",
      treatment: "Over the next four weeks, Milo received surgery, antibiotic therapy, localized pain management, and daily physical therapy at the shelter.",
      currentStatus: "Milo made a 100% recovery! He gained healthy weight and has now been happily adopted by a loving family."
    },
    {
      id: "luna",
      name: "Luna",
      status: "In Shelter Care",
      date: "January 2026",
      summary: "Abandoned as a 3-week-old newborn kitten during heavy monsoon rain, Luna was rescued and nurtured in dedicated foster care.",
      image: "images/cat_mimi.jpg",
      beforeImage: "images/cat_mimi.jpg",
      afterImage: "images/shelter_care.jpg",
      theRescue: "A passerby alerted us about a tiny kitten crying inside a roadside drainage canal. Our team arrived within 20 minutes to retrieve Luna before flooding occurred.",
      whatHappened: "Luna suffered from severe hypothermia, eye infection, and dehydration, weighing under 250 grams.",
      treatment: "Placed immediately in an incubator with thermal regulation, Luna received round-the-clock bottle feedings every 2 hours, antibacterial eye drops, and gentle care.",
      currentStatus: "Luna is now energetic, playful, and growing strong in our shelter. She will be ready for adoption soon!"
    },
    {
      id: "oliver",
      name: "Oliver",
      status: "Recovered",
      date: "February 2026",
      summary: "Trapped in an unsafe construction site with a severe leg fracture, Oliver was rescued and rehabilitated with patience.",
      image: "images/shelter_care.jpg",
      beforeImage: "images/street_dog_feeding.jpg",
      afterImage: "images/shelter_care.jpg",
      theRescue: "Constructive workers heard distressing cries under iron rods and called Kitten Heaven. Our team used specialized rescue gear to safely extract him.",
      whatHappened: "Oliver had a fractured front limb and skin abrasions from the collapse.",
      treatment: "Orthopedic splinting, pain medications, wound dressing, and cozy isolation resting in our shelter's medical room.",
      currentStatus: "Oliver can walk and jump with confidence again! He is currently undergoing social habituation in our foster network."
    }
  ],

  // Adoptable Cats Data
  adoptionCats: [
    {
      id: "cat-mimi",
      name: "Mimi",
      age: "8 months",
      gender: "Female",
      medicalStatus: "Fully Vaccinated & Spayed",
      adoptionStatus: "Available for Adoption",
      image: "images/cat_mimi.jpg",
      personality: "Playful, affectionate, loves window perches and soft blankets",
      story: "Mimi was rescued as a young kitten and raised in our foster network. She is exceptionally gentle with children and loves purring on laps.",
      requirements: "Indoors-only home, loving family, routine vet checkups."
    },
    {
      id: "cat-leo",
      name: "Leo",
      age: "1 year",
      gender: "Male",
      medicalStatus: "Vaccinated & Neutered",
      adoptionStatus: "Available for Adoption",
      image: "images/hero_cat.jpg",
      personality: "Calm, friendly, curious, great with other cats",
      story: "Leo was rescued during a street feeding run when volunteers noticed he was tame and seeking human companionship.",
      requirements: "Safe indoor environment, cat-friendly household."
    },
    {
      id: "cat-nora",
      name: "Nora",
      age: "6 months",
      gender: "Female",
      medicalStatus: "Healthy & Vaccinated",
      adoptionStatus: "Available for Adoption",
      image: "images/shelter_care.jpg",
      personality: "Vocal, energetic cuddle-bug who loves toy mice",
      story: "Nora was brought to our shelter with her littermates. She is full of joy and ready to bring sunshine to a home.",
      requirements: "Patient owner, interactive play time."
    }
  ],

  // Paid Position Job Circular (Shelter Helping Hand)
  jobCircular: {
    title: "Shelter Helping Hand / Shelter Assistant",
    type: "[Full-time / Part-time]",
    location: "[Dhaka, Bangladesh]",
    salary: "[Salary negotiable / Placeholder]",
    hours: "[Working Hours placeholder]",
    holiday: "[Weekly Holiday placeholder]",
    deadline: "[Application Deadline placeholder]",
    responsibilities: [
      "Feed shelter cats according to daily nutrition schedules",
      "Help prepare fresh food and clean water dishes",
      "Clean and sanitize cat feeding areas and shelter spaces",
      "Clean, sanitize, and replace litter boxes daily",
      "Maintain overall shelter hygienic standards and cleanliness",
      "Assist with basic daily cat care, grooming, and comfort",
      "Help administer prescribed medicine under proper staff instruction",
      "Assist during veterinary visits when required",
      "Help with street feeding of cats and dogs in community routes",
      "Assist with rescue-related activities and transportation when required",
      "Maintain daily shelter operating routines faithfully",
      "Handle animals gently, carefully, and responsibly at all times"
    ],
    requirements: [
      "Must genuinely care about animal welfare and display deep empathy",
      "Responsible, punctual, and reliable with daily duties",
      "Comfortable working closely around cats of all temperaments",
      "Willing and prepared to perform essential daily cleaning and feeding tasks",
      "Physically able to perform shelter movement and maintenance duties",
      "Previous animal-care experience is preferred but not mandatory",
      "On-the-job training will be provided to selected candidates"
    ]
  },

  // Street Feeding Program Info
  streetFeeding: {
    title: "Street Feeding Program",
    subtitle: "A hungry animal should not have to wonder where its next meal will come from.",
    description: "Every single day, Kitten Heaven teams travel across designated urban neighborhoods in Bangladesh to serve freshly prepared, nutritious meals to stray cats and dogs. Street animals face constant hunger, weather harshness, and human indifference. Through our feeding runs, we ensure they receive regular sustenance, clean water, and basic visual health monitoring.",
    items: [
      {
        title: "Community Street Cats Feeding",
        image: "images/street_cat_feeding.jpg",
        caption: "Providing fresh cat food and clean water daily across stray cat territory points."
      },
      {
        title: "Vulnerable Street Dogs Feeding",
        image: "images/street_dog_feeding.jpg",
        caption: "Ensuring stray dogs receive wholesome meals and compassionate human interaction."
      },
      {
        title: "Shelter Care & Rehabilitation",
        image: "images/shelter_care.jpg",
        caption: "Shelter care for rescued animals recovering from injuries before placement."
      }
    ]
  },

  // Gallery items with categories
  galleryItems: [
    { id: 1, title: "Rescued Kitten Care", category: "Rescue", image: "images/hero_cat.jpg" },
    { id: 2, title: "Street Cat Meals", category: "Street Feeding", image: "images/street_cat_feeding.jpg" },
    { id: 3, title: "Street Dog Friendship", category: "Street Feeding", image: "images/street_dog_feeding.jpg" },
    { id: 4, title: "Shelter Sanctuary Room", category: "Shelter", image: "images/shelter_care.jpg" },
    { id: 5, title: "Adoptable Mimi", category: "Adoption", image: "images/cat_mimi.jpg" },
    { id: 6, title: "Medical Rehabilitation", category: "Treatment", image: "images/shelter_care.jpg" }
  ]
};

if (typeof window !== 'undefined') {
  window.KITTEN_HEAVEN_CONFIG = KITTEN_HEAVEN_CONFIG;
}

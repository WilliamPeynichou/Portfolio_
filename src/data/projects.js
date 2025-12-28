import ScreenLoginAtIfit from '@/assets/ScreenLoginAt-Ifit.png'
import HomeAtIfit from '@/assets/HomeAt-Ifit.png'
import FormAddWeightAtIfit from '@/assets/FormAddWeightAt-Ifit.png'
import GraphiqueWeightAtIfit from '@/assets/GraphiqueWeightAt-Ifit.png'
import N8nAtIfit from '@/assets/8nAt-Ifit.png'

export const projects = [
  {
    id: 1,
    slug: 'at-ifit',
    title: "At Ifit",
    type: "Sport Data with RAG on chat bot",
    year: "2025",
    // Image principale (login screen)
    image: HomeAtIfit, 
    description: {
      fr: "Cet outil est un double tracker (2-en-1) qui met en corrélation l'évolution du poids avec les activités importées de Strava. Il offre des visualisations graphiques dédiées aux performances sportives ainsi qu'à la perte ou au gain de poids.\n\nLe fonctionnement est simple : après l'inscription, l'utilisateur renseigne son poids actuel, son objectif (perte ou gain) et connecte son compte Strava. Une analyse personnalisée basée sur le profil (genre inclusif, poids) fournit l'IMC et une cible calorique journalière. Une section d'aide détaillée accompagne l'utilisateur pour comprendre chaque métrique.\n\nL'application est inclusive et adaptée à tous : femmes, hommes et personnes transgenres.",
      en: "This tool is a 2-in-1 tracker correlating weight evolution with Strava activities. It features dedicated charts for both sports performance and weight loss/gain analysis.\n\nHow it works: after signing up, users enter their current weight, their goal (loss or gain), and connect their Strava account. A personalized analysis based on the profile (inclusive gender, weight) provides BMI and a daily caloric target. A detailed help section explains every metric.\n\nThe platform is inclusive and designed for everyone: women, men, and transgender individuals."
    },
    technologies: [
      "React", 
      "Node.js", 
      "Express", 
      "n8n AI Agent", 
      "Gemini", 
      "MySQL", 
      "Bore Tunnel"
    ],
    githubLink: "https://github.com/WilliamPeynichou/At-ifit",
    // Section spéciale pour n8n
    n8nImage: N8nAtIfit,
    gallery: [
      ScreenLoginAtIfit,
      FormAddWeightAtIfit,
      GraphiqueWeightAtIfit,
    ]
  },
  {
    id: 2,
    slug: 'ecocycle',
    title: "Ecocycle",
    type: "E-commerce with chat bot and RAG with n8n",
    year: "2025",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    description: {
      fr: "Plateforme e-commerce écologique intégrant un assistant virtuel intelligent.",
      en: "Eco-friendly e-commerce platform integrating an intelligent virtual assistant."
    },
    technologies: ["React", "Node.js", "n8n", "MongoDB"],
    githubLink: null,
    gallery: []
  },
  {
    id: 3,
    slug: 'youtube-design',
    title: "Youtube Design",
    type: "Video website with Artistic Direction",
    year: "2025",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2500&auto=format&fit=crop",
    description: {
      fr: "Refonte conceptuelle de l'interface YouTube avec une direction artistique audacieuse.",
      en: "Conceptual redesign of the YouTube interface with bold artistic direction."
    },
    technologies: ["Figma", "React", "CSS Modules"],
    githubLink: null,
    gallery: []
  },
  {
    id: 4,
    slug: 'portfolio',
    title: "Portfolio",
    type: "Portfolio website with React and Tailwind CSS/Animate UI",
    year: "2025",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2574&auto=format&fit=crop",
    description: {
      fr: "Mon portfolio personnel présentant mes projets et compétences.",
      en: "My personal portfolio showcasing my projects and skills."
    },
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    githubLink: "https://github.com/WilliamPeynichou/Portfolio_",
    gallery: []
  }
]

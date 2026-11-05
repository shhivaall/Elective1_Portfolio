import { useEffect, useMemo, useState } from "react"

const assetUrl = (assetPath: string) =>
  `${import.meta.env.BASE_URL}${assetPath.replace(/^\/+/, "")}`

type IconName = "arrow" | "atom" | "book" | "braces" | "calendar" | "check" | "chip" | "clipboard" | "code" | "database" | "external" | "flow" | "fraction" | "layers" | "layout" | "message" | "mindmap" | "moon" | "palette" | "shield" | "spark" | "sun" | "target" | "user" | "x"

const iconPaths: Record<IconName, React.ReactNode> = {
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  atom: (
    <>
      <circle cx="12" cy="12" r="1.5" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
    </>
  ),
  book: (
    <>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
    </>
  ),
  braces: (
    <>
      <path d="M8 3H7a2 2 0 0 0-2 2v4a3 3 0 0 1-3 3 3 3 0 0 1 3 3v4a2 2 0 0 0 2 2h1" />
      <path d="M16 3h1a2 2 0 0 1 2 2v4a3 3 0 0 0 3 3 3 3 0 0 0-3 3v4a2 2 0 0 1-2 2h-1" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  chip: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
      <rect x="10" y="10" width="4" height="4" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5" y="4" width="14" height="18" rx="2" />
      <path d="M9 4.5V3h6v1.5M9 10h6M9 14h6M9 18h4" />
    </>
  ),
  code: (
    <>
      <path d="m8 9-4 3 4 3" />
      <path d="m16 9 4 3-4 3" />
      <path d="m14 5-4 14" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7" />
    </>
  ),
  external: (
    <>
      <path d="M15 4h5v5" />
      <path d="m10 14 10-10" />
      <path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" />
    </>
  ),
  flow: (
    <>
      <rect x="3" y="3" width="6" height="5" rx="1" />
      <rect x="15" y="16" width="6" height="5" rx="1" />
      <path d="M9 5.5h5a4 4 0 0 1 4 4V16M15 13l3 3 3-3" />
    </>
  ),
  fraction: (
    <>
      <circle cx="8" cy="7" r="3" />
      <circle cx="16" cy="17" r="3" />
      <path d="M18 4 6 20" />
    </>
  ),
  layers: (
    <>
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 9v12M14 13h3M14 17h3" />
    </>
  ),
  message: (
    <>
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
      <path d="M8 9h8M8 13h5" />
    </>
  ),
  mindmap: (
    <>
      <circle cx="12" cy="12" r="3" />
      <circle cx="5" cy="5" r="2" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="m7 7 3 3M17 7l-3 3M7 17l3-3M17 17l-3-3" />
    </>
  ),
  moon: <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />,
  palette: (
    <>
      <circle cx="13.5" cy="6.5" r=".5" />
      <circle cx="17.5" cy="10.5" r=".5" />
      <circle cx="8.5" cy="7.5" r=".5" />
      <circle cx="6.5" cy="12.5" r=".5" />
      <path d="M12 22a10 10 0 1 1 10-10c0 2-1 3-3 3h-1.5a2.5 2.5 0 0 0-2 4c1 1.5-.5 3-3.5 3Z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </>
  ),
  spark: (
    <>
      <path d="m12 3-1.4 4.2A5 5 0 0 1 7.2 10L3 12l4.2 1.4a5 5 0 0 1 3.4 3.4L12 21l1.4-4.2a5 5 0 0 1 3.4-3.4L21 12l-4.2-1.4a5 5 0 0 1-3.4-3.4L12 3Z" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
      <path d="m15 9 6-6M17 3h4v4" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 22a8 8 0 0 1 16 0" />
    </>
  ),
  x: (
    <>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </>
  ),
}

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  )
}

const projects = [
  {
    number: "01",
    term: "Prelim",
    icon: "mindmap" as IconName,
    title: "Activity on Learning Styles",
    summary:
      "A learner concept map analyzing three student profiles, their VARK learning styles, barriers, and tailored strategies.",
    learned:
      "People process information differently. Visual cues, movement, and structured notes can remove real barriers to understanding.",
    applied:
      "I now use cause and effect maps for software systems and card sorting to plan algorithm logic before coding.",
    tags: ["Learning styles", "Visual mapping"],
  },
  {
    number: "02",
    term: "Prelim",
    icon: "shield" as IconName,
    title: "Personal Philosophy of Teaching",
    summary:
      "A reflection on balancing empathy and patience with privacy, ethics, and professional boundaries.",
    learned:
      "Good guidance balances warmth and active listening with clear, consistent professional rules.",
    applied:
      "The same principles shape ethical software: protect user data, communicate clearly, and build trust.",
    tags: ["Ethics", "Reflection"],
  },
  {
    number: "03",
    term: "Prelim",
    icon: "layout" as IconName,
    title:
      "Translating Learning Principles into Educational Technology Solutions",
    summary:
      "A four screen UI/UX concept teaching Java data types through analogies, sorting, and helpful feedback.",
    learned:
      "Learning theory and interface design work together when goals, actions, and feedback are made visible.",
    applied:
      "I use this approach to make apps and user guides more approachable for new users.",
    tags: ["UI/UX", "Java"],
    link: "https://ghynnx.github.io/Eucare_-TLA-1/",
  },
  {
    number: "04",
    term: "Prelim",
    icon: "target" as IconName,
    title: "SMART Learning Objectives",
    summary:
      "Measurable goals for Java, linear regression, and Flutter, each paired with evidence of achievement.",
    learned:
      "Specific metrics turn broad ambitions into work that can be planned, tested, and improved.",
    applied:
      "Before coding, I now define target behavior and proof that a feature works as intended.",
    tags: ["Goal setting", "Flutter"],
  },
  {
    number: "05",
    term: "Midterm",
    icon: "database" as IconName,
    title: "Content Analysis and Sequence Critique",
    summary:
      "Restructuring a lesson plan using content filters and sequencing based on prerequisites.",
    learned:
      "Strong outcomes depend on choosing useful content and arranging foundations before complexity.",
    applied:
      "I apply the same logic to software roadmaps: core architecture first, advanced features second.",
    tags: ["Systems thinking", "Planning"],
  },
  {
    number: "06",
    term: "Midterm",
    icon: "flow" as IconName,
    title: "Strategy Selection: Photosynthesis",
    summary:
      "Combining visual flowcharts and active roleplay to make a complex process inclusive and memorable.",
    learned:
      "Multisensory explanations and flexible roles help more people participate and understand.",
    applied:
      "Flowcharts help me communicate data paths and execution logic to people with different levels of technical knowledge.",
    tags: ["Flowcharts", "Collaboration"],
  },
  {
    number: "07",
    term: "Midterm",
    icon: "layout" as IconName,
    title: "Grades 1 and 2 Classroom Layout Blueprint",
    summary:
      "A spatial system balancing collaboration, accessibility, safe movement, and clear supervision.",
    learned:
      "Layout influences how confidently people move, collaborate, and find what they need.",
    applied:
      "I translate physical pathways into intuitive navigation and accessible screen hierarchy.",
    tags: ["Spatial design", "Accessibility"],
  },
  {
    number: "08",
    term: "Finals",
    icon: "atom" as IconName,
    title: "Instructional Material Evaluation",
    summary:
      "A usability and accessibility evaluation of the Build an Atom interactive simulation.",
    learned:
      "Working software is not enough; keyboard access, clear labels, and device constraints all matter.",
    applied:
      "I evaluate interfaces from the perspective of the user and test beyond the ideal use case.",
    tags: ["Usability", "Testing"],
  },
  {
    number: "09",
    term: "Finals",
    icon: "fraction" as IconName,
    title: "Adding Fractions: Instructional Material",
    summary:
      "A visual lesson that explains unlike denominators with a story, fraction bars, and quick checks.",
    learned:
      "One idea per screen, visible progress, and multiple representations make complex logic easier.",
    applied:
      "The same structure improves onboarding, documentation, and guides for users without technical backgrounds.",
    tags: ["Visual design", "Information design"],
  },
  {
    number: "10",
    term: "Finals",
    icon: "clipboard" as IconName,
    title: "Personal Philosophy of Classroom Assessment",
    summary:
      "Reframing assessment as an ongoing loop of targets, feedback, correction, and growth.",
    learned:
      "Errors are useful signals when feedback is specific, fair, and connected to a clear target.",
    applied:
      "Debugging and code review follow the same loop: test, locate, explain, improve, repeat.",
    tags: ["Feedback loops", "Debugging"],
  },
  {
    number: "11",
    term: "Finals",
    icon: "calendar" as IconName,
    title: "Classroom Management Plan",
    summary:
      "A structured plan for time, transitions, shared rules, and positive behavior support.",
    learned:
      "Good leadership combines predictable structure with empathy and problem solving that addresses the root cause.",
    applied:
      "Clear routines, time blocks, and early risk detection keep software projects on track.",
    tags: ["Leadership", "Project planning"],
  },
  {
    number: "12",
    term: "Finals",
    icon: "message" as IconName,
    title: "Homework & Questioning Techniques",
    summary:
      "A stance on meaningful practice, wait time, follow up prompts, and inclusive questioning.",
    learned:
      "Thoughtful questions and patient listening produce deeper answers than rushing toward a response.",
    applied:
      "I use open questions in design critiques and create space for every teammate during reviews.",
    tags: ["Communication", "Inclusion"],
  },
]

const activityMedia: Record<string, string[]> = {
  "01": ["/activity-assets/01-learning-styles.png"],
  "02": ["/activity-assets/pages/02-teaching-philosophy-1.jpg"],
  "03": ["/activity-assets/pages/03-ui-ux-module-1.jpg"],
  "04": ["/activity-assets/pages/04-smart-objectives-1.jpg"],
  "05": Array.from(
    { length: 4 },
    (_, index) => `/activity-assets/pages/05-content-sequence-${index + 1}.jpg`,
  ),
  "06": Array.from(
    { length: 5 },
    (_, index) =>
      `/activity-assets/pages/07-strategy-selection-${index + 1}.jpg`,
  ),
  "07": Array.from(
    { length: 3 },
    (_, index) =>
      `/activity-assets/pages/06-classroom-blueprint-${index + 1}.jpg`,
  ),
  "08": Array.from(
    { length: 2 },
    (_, index) =>
      `/activity-assets/pages/08-material-evaluation-${index + 1}.jpg`,
  ),
  "09": [
    ...Array.from(
      { length: 3 },
      (_, index) => `/activity-assets/pages/09-design-plan-${index + 1}.jpg`,
    ),
    ...Array.from(
      { length: 10 },
      (_, index) =>
        `/activity-assets/pages/09-fractions-slides-${String(index + 1).padStart(2, "0")}.jpg`,
    ),
  ],
  "10": ["/activity-assets/pages/10-assessment-philosophy-1.jpg"],
  "11": Array.from(
    { length: 4 },
    (_, index) =>
      `/activity-assets/pages/11-classroom-management-${index + 1}.jpg`,
  ),
  "12": Array.from(
    { length: 2 },
    (_, index) =>
      `/activity-assets/pages/12-homework-questioning-${index + 1}.jpg`,
  ),
}

const reflectionDetails: Record<
  string,
  { challenges: string; growth: string }
> =
  {
    "01": {
      challenges:
        "The main challenge was breaking down educational theories like VARK into simple categories without making the diagram confusing. It was also tricky choosing practical tools that directly solved each student's learning barrier.",
      growth:
        "Understanding how different minds work improved my own study habits and reminded me to design software interfaces and guides for all kinds of users.",
    },
    "02": {
      challenges:
        "The main challenge was learning how to handle behavior issues through calm, private talks instead of harsh punishments, while staying friendly and maintaining professional boundaries online.",
      growth:
        "This paper showed me that success in IT requires strong soft skills alongside technical skills, including empathy, active listening, and ethics.",
    },
    "03": {
      challenges:
        "The main challenge was explaining abstract ideas like Java data types through simple everyday examples and writing hints that guide learners without giving away the answer.",
      growth:
        "This task linked user psychology with screen design and showed me that useful technology must focus on clarity, empathy, and easy interaction.",
    },
    "04": {
      challenges:
        "The main challenge was making sure every goal had specific numbers or boundaries and defining clear proof for coding tasks, such as a Flutter app with four screens running without errors.",
      growth:
        "Setting clear goals and checking results strengthened the discipline I need to track progress and build reliable software.",
    },
    "05": {
      challenges:
        "The main challenge was finding timing errors in a disorganized schedule and rearranging it so foundations, practice, and assessment appeared in a logical order.",
      growth:
        "The exercise showed that logical structure matters as much in software engineering as it does in lesson planning.",
    },
    "06": {
      challenges:
        "The main challenge was turning chemical reactions into a simple visual flow without losing key steps, while planning roles inclusive of different movement needs and preferences.",
      growth:
        "I learned that flexible design, visual maps, and simple communication can make complex systems easier for everyone to understand.",
    },
    "07": {
      challenges:
        "The main challenge was maintaining wide paths that support wheelchair access while fitting multiple activity stations and collaborative desks without crowding the room.",
      growth:
        "The blueprint strengthened a mindset centered on users by placing accessibility, safety, and ease of movement at the center of design.",
    },
    "08": {
      challenges:
        "The main challenge was identifying subtle accessibility issues such as limitations for color blindness, precise mouse control requirements, and device constraints.",
      growth:
        "Evaluating the simulation proved that working code is only half the job; software must also be accessible, simple, and grounded in real human needs.",
    },
    "09": {
      challenges:
        "The main challenge was organizing the lesson so each slide carried one idea and writing questions that revealed common misconceptions without overwhelming learners.",
      growth:
        "Designing the lesson improved my ability to explain complex logic visually and reinforced the importance of accessibility and user empathy.",
    },
    "10": {
      challenges:
        "The main challenge was viewing errors as useful learning moments rather than failures and planning fair evaluation for learners with different backgrounds and device access.",
      growth:
        "Seeing assessment as a feedback loop gave me a growth mindset that applies directly to testing, debugging, and code review.",
    },
    "11": {
      challenges:
        "The main challenge was fitting each activity into a realistic timeline and creating a discipline guide that remained calm, fair, and respectful.",
      growth:
        "Building the plan developed organization, empathy, and leadership skills that transfer directly to software teams and project management.",
    },
    "12": {
      challenges:
        "The main challenge was creating fair work for different home situations and responding to incorrect answers in a way that keeps learners comfortable trying again.",
      growth:
        "The activity developed the patience, active listening, and thoughtful questioning needed to communicate and lead effectively in IT.",
    },
  }

const technologyBrands: Record<string, { name: string; logo: string }> = {
  "01": {
    name: "HTML5",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  },
  "02": {
    name: "CSS3",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  },
  "03": {
    name: "Java",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  },
  "04": {
    name: "Flutter",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
  },
  "05": {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  },
  "06": {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  },
  "07": {
    name: "Figma",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
  },
  "08": {
    name: "Firebase",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
  },
  "09": {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  },
  "10": {
    name: "VS Code",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
  },
  "11": {
    name: "GitHub",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  },
  "12": {
    name: "Tailwind CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  },
}

const finalReflectionAnswers = [
  {
    question: "How has this subject helped you as an IT/CS student?",
    answer:
      "This subject taught me that technology is only useful when people can actually use it. Designing the interactive Java module and evaluating the PhET simulation showed me that writing working code is only half the job. The other half is making the product clear, accessible, and friendly. Learning tools such as cause and effect maps, card sorting, and SMART goals also improved the way I plan algorithms and manage projects.",
  },
  {
    question:
      "What significant knowledge, skills, attitudes, or values have you gained from the subject?",
    answer:
      "I gained knowledge of learning styles, SMART objectives, content selection and sequencing, instructional material design, assessment, and classroom management. I strengthened my planning, visual design, and ability to explain difficult ideas simply. Most importantly, I developed empathy, patience, fairness, inclusiveness, and respect for privacy.",
  },
  {
    question:
      "How can you apply what you have learned to your academic life, future workplace, and professional responsibilities?",
    answer:
      "I can set measurable goals, divide large projects into logical steps, and test my work against clear criteria. In a future workplace, I can apply these ideas to interface design, documentation, code reviews, data privacy, and clear communication with people who have different levels of technical knowledge.",
  },
  {
    question:
      "How has this subject influenced or helped you develop your future career path?",
    answer:
      "This subject showed me that IT is not only about programming. It is also about people. I now see myself building software while guiding others through clear documentation, thoughtful onboarding, training materials, and tools designed for beginners.",
  },
  {
    question:
      "What specific lessons from this subject will you carry with you as a future IT/CS professional?",
    answer:
      "I will design for the user first, set clear goals and evidence, structure work before chasing speed, treat feedback as a continuous loop, communicate with empathy, and build technology that includes people with different needs, backgrounds, and levels of access.",
  },
]

const activities = projects.map((project) => ({
  ...project,
  images: activityMedia[project.number],
  ...reflectionDetails[project.number],
}))

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [filter, setFilter] = useState("All")
  const [heroAnimation, setHeroAnimation] = useState(0)
  const [activeSection, setActiveSection] = useState("home")
  const [reflectionQuestion, setReflectionQuestion] = useState<number | null>(
    null,
  )
  const [selected, setSelected] = useState<typeof activities[number] | null>(
    null,
  )
  const [modalTab, setModalTab] = useState<"output" | "reflection">("output")
  const [activePage, setActivePage] = useState(0)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? window.scrollY / max : 0
      document.documentElement.style.setProperty(
        "--scroll-progress",
        String(progress),
      )
    }
    updateProgress()
    window.addEventListener("scroll", updateProgress, { passive: true })
    window.addEventListener("resize", updateProgress)
    return () => {
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", updateProgress)
    }
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal-on-scroll")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px" },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [filter])

  useEffect(() => {
    const sections = ["home", "contents", "work", "reflection"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: "-22% 0px -58% 0px", threshold: [0, 0.1, 0.5] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [selected])

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  const filtered = useMemo(
    () =>
      filter === "All"
        ? activities
        : activities.filter((item) => item.term === filter),
    [filter],
  )

  const openActivity = (activity: typeof activities[number]) => {
    setSelected(activity)
    setModalTab("output")
    setActivePage(0)
  }

  return (
    <div className="site-shell">
      <div className="scroll-progress" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Eucare portfolio home">
          <span className="brand-mark">
            <Icon name="code" size={18} />
          </span>
          <span>eucare.portfolio</span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a
            className={activeSection === "home" ? "active" : ""}
            href="#home"
            aria-current={activeSection === "home" ? "page" : undefined}
          >
            Cover
          </a>
          <a
            className={activeSection === "contents" ? "active" : ""}
            href="#contents"
            aria-current={activeSection === "contents" ? "page" : undefined}
          >
            Contents
          </a>
          <a
            className={activeSection === "work" ? "active" : ""}
            href="#work"
            aria-current={activeSection === "work" ? "page" : undefined}
          >
            Activities
          </a>
          <a
            className={activeSection === "reflection" ? "active" : ""}
            href="#reflection"
            aria-current={activeSection === "reflection" ? "page" : undefined}
          >
            Reflection
          </a>
        </nav>
        <button
          className="icon-button"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          <Icon name={theme === "light" ? "moon" : "sun"} size={18} />
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="cover-tech-cloud" aria-hidden="true">
            {["03", "04", "01", "07", "06", "09"].map((key, index) => (
              <span className={`cover-tech-logo logo-${index + 1}`} key={key}>
                <img src={technologyBrands[key].logo} alt="" />
              </span>
            ))}
          </div>
          <div className="hero-copy">
            <div className="status-pill">
              <span className="status-dot" /> BSIT student portfolio · 2026 to
              2027
            </div>
            <p className="eyebrow">Principles & Strategies for Teaching</p>
            <div className="hero-title-stage" key={heroAnimation}>
              <div className="title-selection" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </div>
              <h1>
                Learning, documented.
                <br />
                <span>Growth, reflected.</span>
              </h1>
              <span className="demo-cursor" aria-hidden="true">
                <span className="click-ripple" />
                <svg viewBox="0 0 28 30">
                  <path d="M3 2.5 24 16l-10 2.1L9.6 27 3 2.5Z" />
                </svg>
              </span>
            </div>
            <p className="hero-intro">
              My digital portfolio brings together submitted activities and
              personal reflections. It follows my learning from understanding
              how people learn to designing inclusive instructional materials.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                Browse the activities <Icon name="arrow" size={18} />
              </a>
              <a className="button button-secondary" href="#reflection">
                Read my reflection
              </a>
              <button
                className="replay-button"
                onClick={() => setHeroAnimation((value) => value + 1)}
                aria-label="Replay cursor and zoom animation"
              >
                <Icon name="spark" size={16} /> Replay intro
              </button>
            </div>
          </div>

          <aside
            className="profile-card"
            aria-label="Student profile"
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect()
              const x = (event.clientX - rect.left) / rect.width - 0.5
              const y = (event.clientY - rect.top) / rect.height - 0.5
              event.currentTarget.style.setProperty("--card-ry", `${x * 7}deg`)
              event.currentTarget.style.setProperty("--card-rx", `${y * -6}deg`)
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.removeProperty("--card-ry")
              event.currentTarget.style.removeProperty("--card-rx")
            }}
          >
            <div className="profile-window">
              <span />
              <span />
              <span />
              <code>profile.ts</code>
            </div>
            <div className="avatar">
              <img
                src={assetUrl("/profile/student-portrait.jpg")}
                alt="Portrait of Mitch Ghynne G. Eucare"
              />
              <i className="avatar-status" />
            </div>
            <div className="profile-heading">
              <p className="mini-label">Student profile</p>
              <h2>Mitch Ghynne G. Eucare</h2>
              <p>BSIT · Section 3A</p>
            </div>
            <dl className="profile-details">
              <div>
                <dt>Subject</dt>
                <dd>Principles & Strategies for Teaching</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>Learning, teaching & technology</dd>
              </div>
              <div>
                <dt>Collection</dt>
                <dd>Semester activities and reflections</dd>
              </div>
            </dl>
            <div className="code-line">
              <span>const</span> mindset = <b>“keep learning”</b>;
            </div>
          </aside>
        </section>

        <section className="toc-section" id="contents">
          <div className="toc-heading reveal-on-scroll">
            <div>
              <p className="eyebrow">Portfolio directory</p>
              <h2>Table of contents</h2>
            </div>
            <p>
              The activities are organized across one semester. Select any title
              to open its submitted output and individual reflection.
            </p>
          </div>
          <div className="toc-grid">
            {(["Prelim", "Midterm", "Finals"] as const).map(
              (term, termIndex) => (
                <article
                  className="toc-card reveal-on-scroll"
                  style={
                    {
                      "--reveal-delay": `${termIndex * 100}ms`,
                    } as React.CSSProperties
                  }
                  key={term}
                >
                  <header>
                    <span className="toc-term-number">0{termIndex + 1}</span>
                    <div>
                      <p>{term}</p>
                      <h3>
                        {term === "Prelim"
                          ? "Foundations"
                          : term === "Midterm"
                            ? "Planning"
                            : "Delivery"}
                      </h3>
                    </div>
                  </header>
                  <ol>
                    {activities
                      .filter((activity) => activity.term === term)
                      .map((activity) => (
                        <li key={activity.number}>
                          <button onClick={() => openActivity(activity)}>
                            <span>{activity.number}</span>
                            <strong>{activity.title}</strong>
                            <Icon name="arrow" size={15} />
                          </button>
                        </li>
                      ))}
                  </ol>
                </article>
              ),
            )}
          </div>
          <a className="toc-reflection-link" href="#reflection">
            <span className="project-icon">
              <Icon name="spark" size={20} />
            </span>
            <span>
              <small>Semester synthesis</small>
              Final reflection
            </span>
            <Icon name="arrow" size={18} />
          </a>
        </section>

        <section className="work-section" id="work">
          <div className="section-tech-background" aria-hidden="true">
            {["05", "06", "09", "10", "11", "12"].map((key) => (
              <span key={key}>
                <img src={technologyBrands[key].logo} alt="" />
              </span>
            ))}
          </div>
          <div className="section-heading reveal-on-scroll">
            <div>
              <p className="eyebrow">Activity compilation</p>
              <h2>One semester of learning, in one place.</h2>
            </div>
            <p>
              Browse the actual submitted outputs by term. Open any activity to
              review every page and read what I learned from the experience.
            </p>
          </div>

          <div
            className="filter-row"
            role="group"
            aria-label="Filter projects by term"
          >
            {["All", "Prelim", "Midterm", "Finals"].map((term) => (
              <button
                className={filter === term ? "active" : ""}
                onClick={() => setFilter(term)}
                key={term}
              >
                {term}
              </button>
            ))}
          </div>

          <div className="project-grid">
            {filtered.map((project, index) => (
              <article
                className="project-card reveal-on-scroll"
                key={project.number}
                style={
                  {
                    "--reveal-delay": `${(index % 3) * 90}ms`,
                  } as React.CSSProperties
                }
              >
                <button
                  className="activity-preview"
                  onClick={() => openActivity(project)}
                  aria-label={`Open ${project.title}`}
                >
                  <img
                    src={assetUrl(project.images[0])}
                    alt={`${project.title} preview`}
                    loading="lazy"
                  />
                  <span className="preview-shade">
                    <span>
                      View {project.images.length}{" "}
                      {project.images.length === 1 ? "page" : "pages"}
                    </span>
                  </span>
                </button>
                <div className="project-card-body">
                  <div className="project-top">
                    <span className="project-icon">
                      <Icon name={project.icon} size={22} />
                    </span>
                    <span className="project-number">/{project.number}</span>
                  </div>
                  <p className="term-label">{project.term}</p>
                  <h3>{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>
                  <div className="tag-list">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <button
                    className="text-button"
                    onClick={() => openActivity(project)}
                  >
                    View activity <Icon name="arrow" size={17} />
                  </button>
                  {project.link && (
                    <a
                      className="activity-live-link"
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open live activity <Icon name="external" size={15} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="reflection-section" id="reflection">
          <div
            className="section-tech-background reflection-tech-background"
            aria-hidden="true"
          >
            {["03", "04", "07", "08"].map((key) => (
              <span key={key}>
                <img src={technologyBrands[key].logo} alt="" />
              </span>
            ))}
          </div>
          <div className="reflection-aside reveal-on-scroll">
            <span className="large-icon">
              <Icon name="spark" size={30} />
            </span>
            <p className="eyebrow">Final reflection</p>
            <h2>Technology is only useful when people can actually use it.</h2>
          </div>
          <div className="reflection-copy reveal-on-scroll">
            <p className="lead">
              Five questions that bring together what this semester taught me as
              an IT student and future professional.
            </p>
            <div
              className="reflection-question-list"
              aria-label="Final reflection questions"
            >
              {finalReflectionAnswers.map((item, index) => (
                <div
                  className={`reflection-question-item ${
                    reflectionQuestion === index ? "open" : ""
                  }`}
                  key={item.question}
                >
                  <button
                    onClick={() =>
                      setReflectionQuestion(
                        reflectionQuestion === index ? null : index,
                      )
                    }
                    aria-expanded={reflectionQuestion === index}
                    aria-controls={`reflection-answer-${index}`}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{item.question}</strong>
                    <Icon name="arrow" size={17} />
                  </button>
                  {reflectionQuestion === index && (
                    <div
                      className="reflection-answer-panel"
                      id={`reflection-answer-${index}`}
                    >
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <blockquote>
              “Good technology and good teaching share the same goal: helping
              people understand and succeed.”
            </blockquote>
            <p className="signature">Mitch Ghynne G. Eucare, BSIT 3A</p>
          </div>
        </section>
      </main>

      <footer>
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark">
            <Icon name="code" size={18} />
          </span>
          <span>eucare.portfolio</span>
        </a>
        <p>Compiled with clarity, curiosity, and care.</p>
        <a href="#home" className="back-top">
          Back to top <Icon name="arrow" size={16} />
        </a>
      </footer>

      {selected && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setSelected(null)
          }}
        >
          <section
            className="case-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-title"
          >
            <button
              className="modal-close"
              onClick={() => setSelected(null)}
              aria-label="Close case study"
            >
              <Icon name="x" size={20} />
            </button>
            <div className="modal-header">
              <span className="project-icon modal-activity-icon">
                <Icon name={selected.icon} size={24} />
              </span>
              <p className="eyebrow">
                {selected.term} · Activity {selected.number}
              </p>
              <h2 id="case-title">{selected.title}</h2>
              <p>{selected.summary}</p>
            </div>
            <div className="modal-tabs" role="tablist">
              <button
                className={modalTab === "output" ? "active" : ""}
                onClick={() => setModalTab("output")}
                role="tab"
                aria-selected={modalTab === "output"}
              >
                My output
                <span>{selected.images.length}</span>
              </button>
              <button
                className={modalTab === "reflection" ? "active" : ""}
                onClick={() => setModalTab("reflection")}
                role="tab"
                aria-selected={modalTab === "reflection"}
              >
                My reflection
              </button>
            </div>

            {modalTab === "output" ? (
              <div className="output-viewer" role="tabpanel">
                <div className="viewer-toolbar">
                  <div>
                    <span className="modal-label">Submitted activity</span>
                    <strong>
                      Page {activePage + 1} of {selected.images.length}
                    </strong>
                  </div>
                  {selected.link && (
                    <a
                      href={selected.link}
                      target="_blank"
                      rel="noreferrer"
                      className="viewer-link"
                    >
                      Interactive version <Icon name="external" size={15} />
                    </a>
                  )}
                </div>
                <div className="page-stage">
                  <img
                    src={assetUrl(selected.images[activePage])}
                    alt={`${selected.title}, page ${activePage + 1}`}
                  />
                </div>
                {selected.images.length > 1 && (
                  <div className="page-strip" aria-label="Select output page">
                    {selected.images.map((image, index) => (
                      <button
                        key={image}
                        className={activePage === index ? "active" : ""}
                        onClick={() => setActivePage(index)}
                        aria-label={`Show page ${index + 1}`}
                        aria-current={activePage === index ? "page" : undefined}
                      >
                        <img src={assetUrl(image)} alt="" loading="lazy" />
                        <span>{index + 1}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div role="tabpanel">
                <div className="activity-reflection-intro">
                  <span>Individual activity reflection</span>
                  <p>
                    This reflection explains the learning, challenges,
                    application, and personal or academic development connected
                    to this activity.
                  </p>
                </div>
                <div className="reflection-grid">
                  <div>
                    <span className="reflection-icon">
                      <Icon name="spark" size={18} />
                    </span>
                    <span className="modal-label">What I learned</span>
                    <p>{selected.learned}</p>
                  </div>
                  <div>
                    <span className="reflection-icon">
                      <Icon name="braces" size={18} />
                    </span>
                    <span className="modal-label">
                      Challenges I encountered
                    </span>
                    <p>{selected.challenges}</p>
                  </div>
                  <div>
                    <span className="reflection-icon">
                      <Icon name="arrow" size={18} />
                    </span>
                    <span className="modal-label">
                      How I applied the knowledge or skills gained
                    </span>
                    <p>{selected.applied}</p>
                  </div>
                  <div>
                    <span className="reflection-icon">
                      <Icon name="check" size={18} />
                    </span>
                    <span className="modal-label">
                      Contribution to my personal or academic development
                    </span>
                    <p>{selected.growth}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="modal-footer">
              <div className="tag-list">
                {selected.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

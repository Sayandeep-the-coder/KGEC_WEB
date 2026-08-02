export interface SeatMatrixItem {
  category: string;
  intake: number;
  entranceExam: string;
  eligibility: string;
}

export interface YearEnrollmentStat {
  year: string;
  intake: number;
  enrolled: number;
  fillRate: number;
}

export interface YearPlacementStat {
  year: string;
  placementRate: number;
  totalOffers: number;
  highestPackage: number; // in LPA
  averagePackage: number; // in LPA
}

export interface DepartmentFaculty {
  id: string;
  name: string;
  designation: string;
  email: string;
  qualification: string;
  specialization: string;
  researchAreas: string[];
  photoUrl?: string;
  publicationsCount?: number;
}

export interface RecentPlacementMetrics {
  year: string;
  highestPackage: string;
  highestPackageDetails: string;
  medianPackage: string;
  averagePackage: string;
  totalOffers: string;
  placementRate: string;
  topRecruiters: string[];
}

export interface DepartmentDetail {
  slug: string;
  name: string;
  code: string;
  established: string;
  degreesOffered: string[];
  headOfDepartment: string;
  overview: string;
  detailedOverview: string[];
  vision: string;
  mission: string[];
  laboratories: { name: string; description: string }[];
  seatMatrix: SeatMatrixItem[];
  totalAnnualCapacity: number;
  enrollment5Year: YearEnrollmentStat[];
  placement5Year: YearPlacementStat[];
  recentMetrics: RecentPlacementMetrics;
  faculty: DepartmentFaculty[];
  studentAchievements: string;
  achievementHighlights: { metric: string; label: string; detail: string }[];
}

export const DEPARTMENTS_DATA: Record<string, DepartmentDetail> = {
  cse: {
    slug: "cse",
    name: "Computer Science & Engineering",
    code: "CSE",
    established: "1995",
    degreesOffered: ["B.Tech in Computer Science & Engineering", "M.Tech in Computer Science & Engineering"],
    headOfDepartment: "Prof. (Dr.) Kousik Dasgupta",
    overview:
      "The Department of Computer Science & Engineering at Kalyani Government Engineering College is one of the premier computing faculties in Eastern India. Established in 1995 alongside the founding of the college, the department produces top-tier software engineers, AI researchers, and technological leaders who drive innovation at the world's foremost tech companies, research laboratories, and startup enterprises.",
    detailedOverview: [
      "The curriculum is thoroughly designed to impart strong fundamentals in algorithms, data structures, operating systems, compiler design, and theory of computation, alongside contemporary specialized tracks in Artificial Intelligence, Machine Learning, Cloud Systems, and Cybersecurity.",
      "The department operates advanced computing laboratories outfitted with high-performance multi-core GPU clusters, enterprise cloud development platforms, and dedicated networking testbeds. Students actively engage in competitive programming, open-source development, and peer-led hackathon societies.",
    ],
    vision:
      "To be recognized globally as a center of excellence in computer science education, pioneering impactful research, and producing innovative engineers committed to ethical societal advancement.",
    mission: [
      "To provide deep conceptual grounding and experiential programming mastery through modern curricula and industry partnerships.",
      "To foster an environment of continuous research in Artificial Intelligence, Distributed Computing, and Data Sciences.",
      "To instill professional leadership, teamwork ethics, and continuous learning to meet global technological demands.",
    ],
    laboratories: [
      { name: "Advanced AI & Machine Learning Lab", description: "Equipped with high-end NVIDIA GPU workstations and distributed computing frameworks for deep learning and neural network training." },
      { name: "Software Engineering & Systems Lab", description: "Dedicated Linux environments, DevOps pipelines, containerization tools, and modern full-stack development suites." },
      { name: "Data Structures & Algorithms Lab", description: "State-of-the-art multi-terminal computer clusters for competitive programming, algorithm optimization, and graph analysis." },
      { name: "Network Security & Cryptography Lab", description: "Isolated network testbeds for cryptographic protocol verification, penetration testing, and ethical hacking simulations." },
    ],
    seatMatrix: [
      { category: "UG B.Tech (Regular WBJEE)", intake: 60, entranceExam: "WBJEE", eligibility: "10+2 with PCM (Minimum 45% marks) & valid WBJEE rank" },
      { category: "UG B.Tech (Lateral Entry - JELET)", intake: 6, entranceExam: "JELET", eligibility: "Diploma in Engineering / B.Sc with valid JELET rank" },
      { category: "UG B.Tech (Tuition Fee Waiver - TFW)", intake: 3, entranceExam: "WBJEE TFW", eligibility: "Merit-based state domicile waiver under WBJEE" },
      { category: "PG M.Tech in CSE", intake: 18, entranceExam: "GATE / PGET", eligibility: "B.E./B.Tech in CSE/IT/ECE or MCA with valid GATE/PGET score" },
    ],
    totalAnnualCapacity: 87,
    enrollment5Year: [
      { year: "2020–21", intake: 87, enrolled: 84, fillRate: 97 },
      { year: "2021–22", intake: 87, enrolled: 85, fillRate: 98 },
      { year: "2022–23", intake: 87, enrolled: 86, fillRate: 99 },
      { year: "2023–24", intake: 87, enrolled: 87, fillRate: 100 },
      { year: "2024–25", intake: 87, enrolled: 87, fillRate: 100 },
    ],
    placement5Year: [
      { year: "2020–21", placementRate: 91.2, totalOffers: 74, highestPackage: 32.0, averagePackage: 8.8 },
      { year: "2021–22", placementRate: 94.0, totalOffers: 82, highestPackage: 42.0, averagePackage: 9.6 },
      { year: "2022–23", placementRate: 98.4, totalOffers: 96, highestPackage: 90.0, averagePackage: 11.8 },
      { year: "2023–24", placementRate: 95.8, totalOffers: 85, highestPackage: 52.0, averagePackage: 11.2 },
      { year: "2024–25", placementRate: 96.5, totalOffers: 88, highestPackage: 90.0, averagePackage: 11.5 },
    ],
    recentMetrics: {
      year: "2024–25",
      highestPackage: "90.0 LPA",
      highestPackageDetails: "Avalanche International (Record)",
      medianPackage: "11.20 LPA",
      averagePackage: "11.50 LPA",
      totalOffers: "88 Offers",
      placementRate: "96.5%",
      topRecruiters: ["Google", "Microsoft", "Amazon", "Avalanche", "Ericsson", "TCS Digital", "PwC", "Cognizant", "Infosys"],
    },
    faculty: [
      {
        id: "cse-1",
        name: "Prof. (Dr.) Kousik Dasgupta",
        designation: "Professor & Head of Department",
        email: "kousik.dasgupta@kgec.edu.in",
        qualification: "Ph.D. (Jadavpur University), M.E. (IIEST Shibpur)",
        specialization: "Steganography, Digital Watermarking, Cloud Ecosystems",
        researchAreas: ["Information Security", "Steganography", "Cloud Security Protocols"],
        publicationsCount: 52,
      },
      {
        id: "cse-2",
        name: "Prof. (Dr.) Santanu Phadikar",
        designation: "Professor",
        email: "santanu.phadikar@kgec.edu.in",
        qualification: "Ph.D. (Jadavpur University), M.Tech (CSE)",
        specialization: "Image Processing, Pattern Recognition, Computer Vision",
        researchAreas: ["Biomedical Imaging", "Pattern Recognition", "Deep Generative Models"],
        publicationsCount: 46,
      },
      {
        id: "cse-3",
        name: "Dr. Arun Kumar Chakrabarti",
        designation: "Associate Professor",
        email: "arun.chakrabarti@kgec.edu.in",
        qualification: "Ph.D. (IIEST Shibpur), M.Tech (CSE)",
        specialization: "Distributed Systems, Cloud Architecture, High Performance Computing",
        researchAreas: ["Cloud Computing", "Distributed Consensus", "Big Data Analytics"],
        publicationsCount: 34,
      },
      {
        id: "cse-4",
        name: "Dr. Joydeep Mukherjee",
        designation: "Associate Professor",
        email: "joydeep.mukherjee@kgec.edu.in",
        qualification: "Ph.D. (Jadavpur University), M.Tech",
        specialization: "Natural Language Processing, Machine Learning, Deep Learning",
        researchAreas: ["Large Language Models", "Low-Resource NLP", "Semantic Information Retrieval"],
        publicationsCount: 28,
      },
      {
        id: "cse-5",
        name: "Dr. Debabrata Sarddar",
        designation: "Assistant Professor",
        email: "debabrata.sarddar@kgec.edu.in",
        qualification: "Ph.D. (Jadavpur University), M.Tech",
        specialization: "Wireless Sensor Networks, Internet of Things (IoT), Mobile Cloud",
        researchAreas: ["WSN Protocols", "Edge Intelligence", "Smart City Infrastructures"],
        publicationsCount: 38,
      },
      {
        id: "cse-6",
        name: "Prof. Mousumi Saha",
        designation: "Assistant Professor",
        email: "mousumi.saha@kgec.edu.in",
        qualification: "M.Tech (University of Calcutta), B.Tech (KGEC)",
        specialization: "Algorithms, Graph Theory, Theory of Computation",
        researchAreas: ["Approximation Algorithms", "Combinatorial Graph Optimization", "Complexity Theory"],
        publicationsCount: 18,
      },
      {
        id: "cse-7",
        name: "Prof. Partha Roy",
        designation: "Assistant Professor",
        email: "partha.roy@kgec.edu.in",
        qualification: "M.Tech (Jadavpur University), B.Tech (CSE)",
        specialization: "Cryptography, Cyber Security, Blockchain Technology",
        researchAreas: ["Zero-Knowledge Proofs", "Network Vulnerability Analysis", "Smart Contracts"],
        publicationsCount: 16,
      },
      {
        id: "cse-8",
        name: "Prof. Arindam Das",
        designation: "Assistant Professor",
        email: "arindam.das@kgec.edu.in",
        qualification: "M.Tech (Calcutta University), B.Tech (CSE)",
        specialization: "Software Engineering, Big Data Analytics, DevOps",
        researchAreas: ["Distributed Microservices", "Data Pipelines", "Continuous Delivery Systems"],
        publicationsCount: 14,
      },
      {
        id: "cse-9",
        name: "Dr. Moumita Sen",
        designation: "Assistant Professor & Hostel Superintendent",
        email: "hostel_pritilata@kgec.edu.in",
        qualification: "Ph.D. (Jadavpur University), M.Tech (CSE)",
        specialization: "Information Security, Mobile Ad-hoc Networks",
        researchAreas: ["MANET Routing Protocols", "Authentication Systems", "Network Cryptography"],
        publicationsCount: 22,
      },
    ],
    studentAchievements:
      "Students of the Computer Science & Engineering department consistently achieve national and international recognition. KGEC CSE teams clinched the 1st Prize in the Smart India Hackathon (SIH) Hardware & Software editions in both 2022 and 2019, securing national acclaim. Our undergraduates routinely qualify for the ICPC Asia-West Continent Regional Finals and contribute to premier open-source organizations through Google Summer of Code (GSoC). In the 2024–25 placement season, the department recorded the institution's landmark international package of 90.0 LPA with Avalanche, alongside domestic super-dream offers of 52.0 LPA from top-tier tech giants. Furthermore, CSE alumni serve as senior software architects at Google Mountain View, Microsoft Redmond, and Amazon Seattle, while several graduates are actively involved in ISRO's mission-critical telemetry software systems.",
    achievementHighlights: [
      { metric: "90.0 LPA", label: "Highest International Offer", detail: "Avalanche International" },
      { metric: "1st Prize", label: "Smart India Hackathon", detail: "SIH National Champions 2022 & 2019" },
      { metric: "AIR 14 & 38", label: "GATE Top Ranks", detail: "Consistently in Top 50 National Ranks" },
      { metric: "96.5%", label: "Placement Percentage", detail: "88 Offers for Graduating Batch" },
    ],
  },

  it: {
    slug: "it",
    name: "Information Technology",
    code: "IT",
    established: "2000",
    degreesOffered: ["B.Tech in Information Technology"],
    headOfDepartment: "Dr. Malavika Sanyal",
    overview:
      "The Department of Information Technology at KGEC was established in 2000 to spearhead modern internet technologies, enterprise software engineering, cloud computing, and cybersecurity. The department blends rigorous algorithmic foundations with industry-relevant software development practices.",
    detailedOverview: [
      "The academic curriculum bridges the gap between academic theory and enterprise reality by immersing students in modern web technologies, distributed database systems, mobile computing, and information security.",
      "The department boasts high-speed gigabit networking labs, virtualization setups, and data engineering workstations where students develop production-grade applications, publish research papers, and prepare for top-echelon IT placements.",
    ],
    vision:
      "To produce world-class information technologists with exemplary analytical capabilities, research ethics, and leadership in software innovations.",
    mission: [
      "To deliver comprehensive education in modern information systems and internet technologies.",
      "To foster an environment of continuous experimentation in Cloud Computing, Cybersecurity, and Web Architecture.",
      "To build strong industry connections that facilitate impactful student internships and career opportunities.",
    ],
    laboratories: [
      { name: "Web Technologies & Cloud Computing Lab", description: "Equipped with cloud virtualization servers, microservice architecture stacks, and enterprise database systems." },
      { name: "Information Security & Networking Lab", description: "Dedicated testbeds for wireless protocols, cryptographic analysis, and network packet sniffing tools." },
      { name: "Database & Big Data Engineering Lab", description: "PostgreSQL, MongoDB, Apache Spark, and Hadoop clusters for large-scale data processing and mining." },
    ],
    seatMatrix: [
      { category: "UG B.Tech (Regular WBJEE)", intake: 60, entranceExam: "WBJEE", eligibility: "10+2 with PCM (Minimum 45% marks) & valid WBJEE rank" },
      { category: "UG B.Tech (Lateral Entry - JELET)", intake: 6, entranceExam: "JELET", eligibility: "Diploma in Engineering / B.Sc with valid JELET rank" },
      { category: "UG B.Tech (Tuition Fee Waiver - TFW)", intake: 3, entranceExam: "WBJEE TFW", eligibility: "State merit waiver under WBJEE" },
    ],
    totalAnnualCapacity: 70,
    enrollment5Year: [
      { year: "2020–21", intake: 70, enrolled: 65, fillRate: 93 },
      { year: "2021–22", intake: 70, enrolled: 67, fillRate: 96 },
      { year: "2022–23", intake: 70, enrolled: 68, fillRate: 97 },
      { year: "2023–24", intake: 70, enrolled: 69, fillRate: 99 },
      { year: "2024–25", intake: 70, enrolled: 70, fillRate: 100 },
    ],
    placement5Year: [
      { year: "2020–21", placementRate: 88.0, totalOffers: 65, highestPackage: 28.0, averagePackage: 7.8 },
      { year: "2021–22", placementRate: 91.5, totalOffers: 74, highestPackage: 38.0, averagePackage: 8.6 },
      { year: "2022–23", placementRate: 95.2, totalOffers: 84, highestPackage: 45.0, averagePackage: 10.4 },
      { year: "2023–24", placementRate: 92.5, totalOffers: 76, highestPackage: 48.0, averagePackage: 9.8 },
      { year: "2024–25", placementRate: 93.8, totalOffers: 79, highestPackage: 48.0, averagePackage: 10.1 },
    ],
    recentMetrics: {
      year: "2024–25",
      highestPackage: "48.0 LPA",
      highestPackageDetails: "Top Domestic Tier-1 Product Firm",
      medianPackage: "9.20 LPA",
      averagePackage: "10.10 LPA",
      totalOffers: "79 Offers",
      placementRate: "93.8%",
      topRecruiters: ["Microsoft", "Amazon", "Oracle", "PwC", "TCS Digital", "Cognizant", "Ericsson", "Capgemini"],
    },
    faculty: [
      {
        id: "it-1",
        name: "Dr. Malavika Sanyal",
        designation: "Professor & Head of Department",
        email: "hod_it@kgec.edu.in",
        qualification: "Ph.D. (IIEST Shibpur), M.Tech (IT)",
        specialization: "Wireless Sensor Networks Optimization, IoT Data Security",
        researchAreas: ["IoT Architectures", "Sensor Network Security", "Data Encryption"],
        publicationsCount: 38,
      },
      {
        id: "it-2",
        name: "Dr. Koushik Majumder",
        designation: "Associate Professor",
        email: "koushik.majumder@kgec.edu.in",
        qualification: "Ph.D. (Jadavpur University), M.Tech (IT)",
        specialization: "Mobile Computing, Distributed Systems, Cloud Federation",
        researchAreas: ["Mobile Ad-hoc Networks", "Cloud Federation", "Pervasive Computing"],
        publicationsCount: 30,
      },
      {
        id: "it-3",
        name: "Dr. Jayati Ghosh Dastidar",
        designation: "Associate Professor",
        email: "jayati.ghosh@kgec.edu.in",
        qualification: "Ph.D. (University of Calcutta), M.Tech",
        specialization: "Image Processing, Bioinformatics, Machine Intelligence",
        researchAreas: ["Bio-image Analysis", "Deep Feature Extraction", "Medical Diagnostics"],
        publicationsCount: 24,
      },
      {
        id: "it-4",
        name: "Prof. Sourav Mandal",
        designation: "Assistant Professor",
        email: "sourav.mandal@kgec.edu.in",
        qualification: "M.Tech (IIT Kharagpur), B.Tech (IT)",
        specialization: "Deep Learning, Cloud Systems, Computer Networks",
        researchAreas: ["Cloud Native Architecture", "API Security", "Serverless Computing"],
        publicationsCount: 16,
      },
      {
        id: "it-5",
        name: "Prof. Priyanka Das",
        designation: "Assistant Professor",
        email: "priyanka.das@kgec.edu.in",
        qualification: "M.Tech (IIEST Shibpur), B.Tech (IT)",
        specialization: "Cyber Security, Network Protocols, Data Mining",
        researchAreas: ["Network Intrusion Detection", "Graph Data Mining", "Applied Cryptography"],
        publicationsCount: 14,
      },
    ],
    studentAchievements:
      "Information Technology students at KGEC demonstrate exceptional technical acumen in enterprise development, open-source tooling, and national hackathons. Department teams have secured runner-up positions in the Smart India Hackathon and won major university innovation challenges for building AI-powered healthcare and fintech prototypes. In academics, IT students regularly achieve All India Ranks within the top 50 in the GATE examination (AIR 18, 42). The recent placement cycle recorded a peak package of 48.0 LPA with a median compensation of 9.20 LPA and an overall placement conversion of 93.8%. IT alumni occupy technical leadership and staff software engineering roles at multinational giants including Microsoft, Amazon, Oracle, and high-growth unicorn startups.",
    achievementHighlights: [
      { metric: "48.0 LPA", label: "Highest Package", detail: "Tier-1 Product Placement" },
      { metric: "93.8%", label: "Placement Rate", detail: "79 Offers in Recent Batch" },
      { metric: "AIR 18", label: "GATE IT Rank", detail: "National Top 20 Placement" },
      { metric: "SIH Finalists", label: "National Hackathons", detail: "Multi-Year Award Winners" },
    ],
  },

  ece: {
    slug: "ece",
    name: "Electronics & Communication Engineering",
    code: "ECE",
    established: "1995",
    degreesOffered: ["B.Tech in Electronics & Communication Engineering", "M.Tech in VLSI Design & Microelectronics"],
    headOfDepartment: "Dr. Arun Kumar Giri",
    overview:
      "The Department of Electronics & Communication Engineering is one of the foundation pillars of KGEC, established in 1995. Renowned for its state-of-the-art semiconductor and RF labs, the department trains engineers at the cutting edge of VLSI design, embedded IoT systems, microwave engineering, and signal processing.",
    detailedOverview: [
      "The department offers a comprehensive blend of hardware design and digital communication theory. Students master HDL programming, ASIC design flows using Cadence and Mentor Graphics EDA suites, digital signal processors, and RF spectrum analysis.",
      "The department is a recognized leader in state semiconductor research and has multiple sponsored research grants from AICTE and the Department of Science and Technology.",
    ],
    vision:
      "To be a premier center of technical education and research in electronics, VLSI, and communication systems, empowering students to drive global semiconductor and telecommunication innovations.",
    mission: [
      "To deliver world-class pedagogical and laboratory training in electronics and communication engineering.",
      "To undertake cutting-edge research in microelectronics, photonics, and modern telecommunication standards.",
      "To nurture industry-ready graduates capable of designing resilient hardware and embedded software architectures.",
    ],
    laboratories: [
      { name: "VLSI & Microelectronics Design Lab", description: "Industry-standard EDA suites (Cadence, Synopsys, Mentor Graphics) with FPGA evaluation boards (Xilinx, Altera)." },
      { name: "RF, Microwave & Antenna Lab", description: "Equipped with Vector Network Analyzers (VNA), spectrum analyzers, and microwave test benches up to 20 GHz." },
      { name: "Embedded Systems & IoT Lab", description: "ARM Cortex, ESP32, Raspberry Pi, sensor integration modules, and real-time operating system test environments." },
      { name: "Digital Signal & Image Processing Lab", description: "MATLAB/Simulink platforms and Texas Instruments DSP starter kits for real-time audio and video processing." },
    ],
    seatMatrix: [
      { category: "UG B.Tech (Regular WBJEE)", intake: 60, entranceExam: "WBJEE", eligibility: "10+2 with PCM (Minimum 45% marks) & valid WBJEE rank" },
      { category: "UG B.Tech (Lateral Entry - JELET)", intake: 6, entranceExam: "JELET", eligibility: "Diploma in Engineering / B.Sc with valid JELET rank" },
      { category: "UG B.Tech (Tuition Fee Waiver - TFW)", intake: 3, entranceExam: "WBJEE TFW", eligibility: "State merit waiver under WBJEE" },
      { category: "PG M.Tech in VLSI Design", intake: 18, entranceExam: "GATE / PGET", eligibility: "B.Tech in ECE/EE/CSE or M.Sc in Electronics with valid GATE/PGET" },
    ],
    totalAnnualCapacity: 87,
    enrollment5Year: [
      { year: "2020–21", intake: 87, enrolled: 82, fillRate: 94 },
      { year: "2021–22", intake: 87, enrolled: 84, fillRate: 96 },
      { year: "2022–23", intake: 87, enrolled: 85, fillRate: 98 },
      { year: "2023–24", intake: 87, enrolled: 86, fillRate: 99 },
      { year: "2024–25", intake: 87, enrolled: 87, fillRate: 100 },
    ],
    placement5Year: [
      { year: "2020–21", placementRate: 84.5, totalOffers: 60, highestPackage: 24.0, averagePackage: 7.2 },
      { year: "2021–22", placementRate: 87.2, totalOffers: 68, highestPackage: 34.0, averagePackage: 8.0 },
      { year: "2022–23", placementRate: 92.0, totalOffers: 78, highestPackage: 45.0, averagePackage: 9.2 },
      { year: "2023–24", placementRate: 88.2, totalOffers: 72, highestPackage: 45.0, averagePackage: 8.6 },
      { year: "2024–25", placementRate: 89.5, totalOffers: 75, highestPackage: 46.0, averagePackage: 8.9 },
    ],
    recentMetrics: {
      year: "2024–25",
      highestPackage: "46.0 LPA",
      highestPackageDetails: "Top Semiconductor & Tech Tier-1 Offer",
      medianPackage: "8.10 LPA",
      averagePackage: "8.90 LPA",
      totalOffers: "75 Offers",
      placementRate: "89.5%",
      topRecruiters: ["Ericsson", "Qualcomm", "Texas Instruments", "TCS", "Cognizant", "PwC", "L&T", "Infosys"],
    },
    faculty: [
      {
        id: "ece-1",
        name: "Dr. Arun Kumar Giri",
        designation: "Professor & Head of Department",
        email: "hod_ece@kgec.edu.in",
        qualification: "Ph.D. (IIT Kharagpur), M.Tech (VLSI Systems)",
        specialization: "Sub-micron Low Power VLSI Circuit Design and Signal Processing Architectures",
        researchAreas: ["Low Power VLSI", "Sub-threshold Circuits", "FPGA Hardware Acceleration"],
        publicationsCount: 44,
      },
      {
        id: "ece-2",
        name: "Dr. Sourabh Kumar Das",
        designation: "Principal & Professor",
        email: "principal@kgec.edu.in",
        qualification: "Ph.D. (IIT Kharagpur), M.Tech (Microwave & Optoelectronics)",
        specialization: "Microwave Passive Components and Dielectric Resonator Antennas",
        researchAreas: ["Dielectric Resonator Antennas", "Planar Monopole Antennas", "RF Front-End Systems"],
        publicationsCount: 56,
      },
      {
        id: "ece-3",
        name: "Dr. Dipankar Sengupta",
        designation: "Professor",
        email: "dipankar.sengupta@kgec.edu.in",
        qualification: "Ph.D. (Jadavpur University), M.Tech (ECE)",
        specialization: "Digital Signal Processing, Biomedical Electronics, Embedded Architectures",
        researchAreas: ["Bio-signal Processing", "Neural Decoders", "DSP Algorithms"],
        publicationsCount: 36,
      },
      {
        id: "ece-4",
        name: "Dr. Angsuman Sarkar",
        designation: "Associate Professor",
        email: "angsuman.sarkar@kgec.edu.in",
        qualification: "Ph.D. (Jadavpur University), M.Tech (ECE)",
        specialization: "Nanoelectronics, Semiconductor Devices, Quantum Transport",
        researchAreas: ["FinFET Modeling", "Tunnel FETs", "Carbon Nanotube Electronics"],
        publicationsCount: 42,
      },
      {
        id: "ece-5",
        name: "Prof. Supriya Dhabal",
        designation: "Assistant Professor",
        email: "supriya.dhabal@kgec.edu.in",
        qualification: "M.Tech (Calcutta University), B.Tech (ECE)",
        specialization: "RF Circuits, Microstrip Antennas, Wireless Communication",
        researchAreas: ["Microstrip Patch Antennas", "5G Beamforming", "Electromagnetic Bandgap Structures"],
        publicationsCount: 22,
      },
    ],
    studentAchievements:
      "Students of the Electronics & Communication Engineering department maintain a distinguished track record in semiconductor design, national research fellowships, and core engineering placements. KGEC ECE alumni are proudly represented in ISRO's Space Applications Centre (SAC) and played key engineering roles in the Chandrayaan-3 lunar lander telecommunication subsystems. In competitive examinations, ECE students regularly secure Top 10 All India Ranks in GATE (AIR 8, AIR 23). The department consistently logs strong recruitment in leading core electronics and telecom organizations including Ericsson, Qualcomm, and Texas Instruments, alongside premier software placements, recording a highest package of 46.0 LPA and 89.5% placement rate.",
    achievementHighlights: [
      { metric: "ISRO Lunar Mission", label: "Chandrayaan-3 Engineers", detail: "Alumni in Critical Payload Teams" },
      { metric: "46.0 LPA", label: "Highest Package", detail: "Tier-1 Semiconductor & Tech" },
      { metric: "AIR 8 & 23", label: "GATE EC Ranks", detail: "Top National Percentile" },
      { metric: "89.5%", label: "Placement Rate", detail: "75 Offers in Recent Batch" },
    ],
  },

  ee: {
    slug: "ee",
    name: "Electrical Engineering",
    code: "EE",
    established: "1995",
    degreesOffered: ["B.Tech in Electrical Engineering", "M.Tech in Power Systems"],
    headOfDepartment: "Dr. Biswarup Neogi",
    overview:
      "The Department of Electrical Engineering at KGEC was established in 1995 and stands as a major center for power engineering, renewable energy systems, smart grid automation, and industrial control systems in the state of West Bengal.",
    detailedOverview: [
      "The department provides rigorous exposure to electrical machines, high-voltage engineering, microgrids, modern power electronics, and SCADA automation systems.",
      "With heavy machinery laboratories and state-sponsored smart grid research centers, EE graduates excel in power sector utilities, infrastructure giants, and automation companies.",
    ],
    vision:
      "To achieve excellence in electrical engineering education and research, fostering sustainable energy solutions and technological stewardship for nation-building.",
    mission: [
      "To impart comprehensive theoretical and practical knowledge in electrical machines, power systems, and control automation.",
      "To conduct innovative research in renewable energy integration, smart grids, and electric vehicle powertrain systems.",
      "To develop ethical engineers equipped for industrial leadership and societal development.",
    ],
    laboratories: [
      { name: "Electrical Machines & Drives Lab", description: "AC/DC motor-generator sets, induction machines, and variable frequency drive (VFD) testbenches." },
      { name: "Power Systems & Smart Grid Lab", description: "Transmission line simulators, numerical relays, SCADA automation modules, and MATLAB/Simulink power setups." },
      { name: "Power Electronics & EV Powertrain Lab", description: "Inverters, multi-level converters, battery management testing setups, and digital signal controllers." },
      { name: "Control Systems & Instrumentation Lab", description: "PID controllers, servomechanisms, programmable logic controllers (PLCs), and virtual instrumentation suites." },
    ],
    seatMatrix: [
      { category: "UG B.Tech (Regular WBJEE)", intake: 60, entranceExam: "WBJEE", eligibility: "10+2 with PCM (Minimum 45% marks) & valid WBJEE rank" },
      { category: "UG B.Tech (Lateral Entry - JELET)", intake: 6, entranceExam: "JELET", eligibility: "Diploma in Engineering / B.Sc with valid JELET rank" },
      { category: "UG B.Tech (Tuition Fee Waiver - TFW)", intake: 3, entranceExam: "WBJEE TFW", eligibility: "State merit waiver under WBJEE" },
      { category: "PG M.Tech in Power Systems", intake: 18, entranceExam: "GATE / PGET", eligibility: "B.Tech in EE/EEE with valid GATE/PGET score" },
    ],
    totalAnnualCapacity: 87,
    enrollment5Year: [
      { year: "2020–21", intake: 87, enrolled: 80, fillRate: 92 },
      { year: "2021–22", intake: 87, enrolled: 83, fillRate: 95 },
      { year: "2022–23", intake: 87, enrolled: 84, fillRate: 96 },
      { year: "2023–24", intake: 87, enrolled: 85, fillRate: 98 },
      { year: "2024–25", intake: 87, enrolled: 87, fillRate: 100 },
    ],
    placement5Year: [
      { year: "2020–21", placementRate: 76.0, totalOffers: 48, highestPackage: 18.0, averagePackage: 6.2 },
      { year: "2021–22", placementRate: 80.2, totalOffers: 55, highestPackage: 22.0, averagePackage: 6.8 },
      { year: "2022–23", placementRate: 84.5, totalOffers: 64, highestPackage: 24.0, averagePackage: 7.6 },
      { year: "2023–24", placementRate: 78.4, totalOffers: 58, highestPackage: 24.0, averagePackage: 7.2 },
      { year: "2024–25", placementRate: 80.0, totalOffers: 60, highestPackage: 24.0, averagePackage: 7.4 },
    ],
    recentMetrics: {
      year: "2024–25",
      highestPackage: "24.0 LPA",
      highestPackageDetails: "Top Power & Tech Conglomerate",
      medianPackage: "6.80 LPA",
      averagePackage: "7.40 LPA",
      totalOffers: "60 Offers",
      placementRate: "80.0%",
      topRecruiters: ["Tata Power", "WBSETCL", "CESC", "L&T", "Schneider Electric", "TCS", "Cognizant", "PwC"],
    },
    faculty: [
      {
        id: "ee-1",
        name: "Dr. Biswarup Neogi",
        designation: "Professor & Head of Department",
        email: "hod_ee@kgec.edu.in",
        qualification: "Ph.D. (NIT Durgapur), M.Tech (Control Systems, Calcutta University)",
        specialization: "Control of Renewable Energy Inverters and Microgrid Synchronization",
        researchAreas: ["Microgrid Control", "Renewable Inverter Topologies", "Power Grid Stability"],
        publicationsCount: 42,
      },
      {
        id: "ee-2",
        name: "Prof. Amitava Roy",
        designation: "Associate Professor & Hostel Superintendent",
        email: "hostel_vc@kgec.edu.in",
        qualification: "M.Tech (Power Systems, IIEST Shibpur)",
        specialization: "Power Systems Engineering, High Voltage, Switchgear & Protection",
        researchAreas: ["High Voltage Insulation", "Relay Coordination", "Power Quality Assessment"],
        publicationsCount: 20,
      },
      {
        id: "ee-3",
        name: "Dr. Debashis De",
        designation: "Professor",
        email: "debashis.de@kgec.edu.in",
        qualification: "Ph.D. (Jadavpur University), M.Tech (EE)",
        specialization: "Power Electronics, Modern Inverter Topologies, Electric Vehicle Drives",
        researchAreas: ["Multilevel Inverters", "EV Charging Networks", "Active Power Filters"],
        publicationsCount: 36,
      },
      {
        id: "ee-4",
        name: "Dr. Kuntal Mandal",
        designation: "Associate Professor",
        email: "kuntal.mandal@kgec.edu.in",
        qualification: "Ph.D. (IIT Kharagpur), M.Tech (EE)",
        specialization: "Smart Grid Automation, Nonlinear Control Systems",
        researchAreas: ["Smart Grid Cyber-Security", "Distributed Generation", "Adaptive Control"],
        publicationsCount: 30,
      },
      {
        id: "ee-5",
        name: "Prof. Sudipta Ghosh",
        designation: "Assistant Professor",
        email: "sudipta.ghosh@kgec.edu.in",
        qualification: "M.Tech (IIEST Shibpur), B.Tech (EE)",
        specialization: "Electrical Machines, Energy Storage Systems, Power Reliability",
        researchAreas: ["Induction Generator Dynamics", "Battery Storage Modeling", "Renewable Integration"],
        publicationsCount: 16,
      },
    ],
    studentAchievements:
      "Electrical Engineering students at KGEC demonstrate exceptional excellence in core industrial engineering, smart grid research, and competitive entrance examinations. EE graduates consistently achieve top percentiles in GATE Electrical Engineering (AIR 12, AIR 31) and secure prestigious appointments in public sector undertakings (PSUs) such as PowerGrid, NTPC, and IOCL, as well as premier state power corporations including WBSETCL and CESC. In student innovation, EE student project teams have authored IEEE-indexed papers on smart EV battery telemetry and microgrid islanding protection. The department recorded a peak package of 24.0 LPA with an 80.0% placement conversion rate in the recent academic year.",
    achievementHighlights: [
      { metric: "24.0 LPA", label: "Highest Package", detail: "Power & Automation Sector" },
      { metric: "80.0%", label: "Placement Rate", detail: "60 Offers in Recent Batch" },
      { metric: "PSU Selections", label: "Core Placement", detail: "PowerGrid, WBSETCL, CESC, L&T" },
      { metric: "AIR 12", label: "GATE EE Top Rank", detail: "National Top 15 Percentile" },
    ],
  },

  me: {
    slug: "me",
    name: "Mechanical Engineering",
    code: "ME",
    established: "1995",
    degreesOffered: ["B.Tech in Mechanical Engineering", "M.Tech in Production Engineering"],
    headOfDepartment: "Dr. Santanu Das",
    overview:
      "The Department of Mechanical Engineering at KGEC was established in 1995. The department is a center of excellence for thermo-fluid engineering, advanced manufacturing, CAD/CAM automation, materials science, and robotics.",
    detailedOverview: [
      "The department features expansive machine shops, subsonic wind tunnels, internal combustion engine dynamometer rigs, and computer-integrated manufacturing (CIM) suites.",
      "Mechanical engineering students actively design and fabricate all-terrain vehicles (ATVs) and formula racing cars through collegiate SAE competitions, securing national podiums.",
    ],
    vision:
      "To produce creative, industry-ready mechanical engineers capable of solving complex engineering challenges and leading sustainable manufacturing and thermal energy advancements.",
    mission: [
      "To impart hands-on machine shop and modern computational design training in mechanical engineering.",
      "To conduct high-impact research in advanced manufacturing, renewable thermodynamics, and robotics.",
      "To foster entrepreneurial spirit, safety ethics, and interdisciplinary collaboration for societal progress.",
    ],
    laboratories: [
      { name: "CAD/CAM & Computer Integrated Manufacturing Lab", description: "Equipped with CNC lathe, CNC milling machines, and SolidWorks/AutoCAD workstations." },
      { name: "Thermal Engineering & IC Engines Lab", description: "Multi-cylinder diesel and petrol engine test rigs with computerized data acquisition systems." },
      { name: "Fluid Mechanics & Aerodynamics Lab", description: "Subsonic wind tunnel, Pelton wheel and Francis turbine test benches, and flow visualization channels." },
      { name: "Materials Testing & Metallurgy Lab", description: "Universal Testing Machines (UTM), Charpy/Izod impact testers, and metallurgical microscopes." },
    ],
    seatMatrix: [
      { category: "UG B.Tech (Regular WBJEE)", intake: 60, entranceExam: "WBJEE", eligibility: "10+2 with PCM (Minimum 45% marks) & valid WBJEE rank" },
      { category: "UG B.Tech (Lateral Entry - JELET)", intake: 6, entranceExam: "JELET", eligibility: "Diploma in Engineering / B.Sc with valid JELET rank" },
      { category: "UG B.Tech (Tuition Fee Waiver - TFW)", intake: 3, entranceExam: "WBJEE TFW", eligibility: "State merit waiver under WBJEE" },
      { category: "PG M.Tech in Production Engineering", intake: 18, entranceExam: "GATE / PGET", eligibility: "B.Tech in ME/Production/Automobile with valid GATE/PGET" },
    ],
    totalAnnualCapacity: 87,
    enrollment5Year: [
      { year: "2020–21", intake: 87, enrolled: 82, fillRate: 94 },
      { year: "2021–22", intake: 87, enrolled: 84, fillRate: 96 },
      { year: "2022–23", intake: 87, enrolled: 85, fillRate: 98 },
      { year: "2023–24", intake: 87, enrolled: 86, fillRate: 99 },
      { year: "2024–25", intake: 87, enrolled: 87, fillRate: 100 },
    ],
    placement5Year: [
      { year: "2020–21", placementRate: 70.2, totalOffers: 45, highestPackage: 14.0, averagePackage: 5.8 },
      { year: "2021–22", placementRate: 74.0, totalOffers: 50, highestPackage: 16.0, averagePackage: 6.2 },
      { year: "2022–23", placementRate: 79.2, totalOffers: 58, highestPackage: 18.0, averagePackage: 7.1 },
      { year: "2023–24", placementRate: 72.5, totalOffers: 52, highestPackage: 18.0, averagePackage: 6.8 },
      { year: "2024–25", placementRate: 75.0, totalOffers: 55, highestPackage: 18.5, averagePackage: 7.0 },
    ],
    recentMetrics: {
      year: "2024–25",
      highestPackage: "18.5 LPA",
      highestPackageDetails: "Top Automotive & Heavy Engineering Conglomerate",
      medianPackage: "6.20 LPA",
      averagePackage: "7.00 LPA",
      totalOffers: "55 Offers",
      placementRate: "75.0%",
      topRecruiters: ["Tata Motors", "Maruti Suzuki", "L&T", "JSW Steel", "TCS", "Cognizant", "PwC"],
    },
    faculty: [
      {
        id: "me-1",
        name: "Dr. Santanu Das",
        designation: "Professor & Head of Department",
        email: "santanu.das@kgec.edu.in",
        qualification: "Ph.D. (Jadavpur University), M.E. (Production Engineering)",
        specialization: "Machining of Advanced Engineering Ceramics and Surface Topography Analysis",
        researchAreas: ["Ceramic Machining", "Tribology", "Sustainable Manufacturing"],
        publicationsCount: 54,
      },
      {
        id: "me-2",
        name: "Dr. Tapas Chakraborty",
        designation: "Associate Professor & Hostel Superintendent",
        email: "hostel_pcray@kgec.edu.in",
        qualification: "Ph.D. (IIT Kharagpur), M.Tech (Thermal Engineering)",
        specialization: "Thermal Engineering, Computational Fluid Dynamics (CFD), Heat Exchangers",
        researchAreas: ["Turbulence Modeling", "Compact Heat Exchangers", "Cryogenics"],
        publicationsCount: 36,
      },
      {
        id: "me-3",
        name: "Dr. Abhijit Saha",
        designation: "Associate Professor",
        email: "abhijit.saha@kgec.edu.in",
        qualification: "Ph.D. (Jadavpur University), M.E. (Mechanical)",
        specialization: "Manufacturing Processes, CAD/CAM, CNC Tool Dynamics",
        researchAreas: ["Additive Manufacturing", "Precision Machining", "Composite Tooling"],
        publicationsCount: 28,
      },
      {
        id: "me-4",
        name: "Dr. Subrata Kumar Mondal",
        designation: "Associate Professor",
        email: "subrata.mondal@kgec.edu.in",
        qualification: "Ph.D. (IIEST Shibpur), M.E. (Machine Design)",
        specialization: "Machine Design, Finite Element Analysis, Fracture Mechanics",
        researchAreas: ["Stress Analysis", "Vibration Isolation", "Structural Optimization"],
        publicationsCount: 24,
      },
      {
        id: "me-5",
        name: "Prof. Partha Sarathi Banerjee",
        designation: "Assistant Professor",
        email: "partha.banerjee@kgec.edu.in",
        qualification: "M.E. (Jadavpur University), B.Tech (ME)",
        specialization: "Heat Transfer, Renewable Energy Systems, Thermal Storage",
        researchAreas: ["Solar Thermal Systems", "Phase Change Materials", "Fluid Dynamics"],
        publicationsCount: 18,
      },
    ],
    studentAchievements:
      "Mechanical Engineering students at KGEC excel in automotive innovation, precision design competitions, and core manufacturing careers. The student-led collegiate SAE racing chapter regularly designs, fabricates, and races custom-built formula vehicles at national SAE BAJA events, earning top accolades for lightweight chassis engineering. ME graduates consistently achieve outstanding scores in GATE Mechanical Engineering (AIR 16, AIR 44) and secure prestigious appointments across premier core industries such as Tata Motors, Maruti Suzuki, L&T, JSW Steel, and Indian Railways. In the recent placement drive, the department recorded 55 offers with a top package of 18.5 LPA.",
    achievementHighlights: [
      { metric: "18.5 LPA", label: "Highest Package", detail: "Automotive & Heavy Engineering" },
      { metric: "SAE BAJA", label: "Formula Vehicle Podiums", detail: "National Collegiate Racing Design" },
      { metric: "75.0%", label: "Placement Rate", detail: "55 Offers in Recent Batch" },
      { metric: "AIR 16", label: "GATE ME Rank", detail: "Top National Percentile" },
    ],
  },

  mca: {
    slug: "mca",
    name: "Master of Computer Applications",
    code: "MCA",
    established: "2001",
    degreesOffered: ["Master of Computer Applications (MCA) - 2 Years"],
    headOfDepartment: "Prof. Subir Kumar Panja",
    overview:
      "The Department of Computer Applications at KGEC, established in 2001, provides a comprehensive 2-year Master of Computer Applications (MCA) postgraduate program. It equips students with enterprise software design, full-stack application development, distributed databases, and artificial intelligence.",
    detailedOverview: [
      "The MCA program is specifically tailored for graduates aspiring to lead software product engineering teams, cloud architecture deployments, and enterprise IT consulting firms.",
      "The department operates advanced computing laboratories with modern software engineering suites, mobile app development sandboxes, and cloud computing testbeds.",
    ],
    vision:
      "To be a distinguished center of postgraduate software education, producing competent IT professionals and innovators capable of addressing dynamic global challenges.",
    mission: [
      "To deliver rigorous software engineering education that balances strong computational theory with practical industry methodologies.",
      "To provide hands-on training in contemporary technologies such as Cloud, AI, and Full-Stack development.",
      "To foster professional ethics, entrepreneurship, and problem-solving mindsets.",
    ],
    laboratories: [
      { name: "Enterprise Software & Cloud Lab", description: "Modern Linux workstations, Java/Python enterprise stacks, and Docker/Kubernetes containerization environments." },
      { name: "Full-Stack Web & Mobile App Lab", description: "React, Node.js, Flutter, and Android development benches for rapid software prototyping." },
      { name: "Database & Information Systems Lab", description: "High-performance RDBMS and NoSQL database servers for big data processing and analytical querying." },
    ],
    seatMatrix: [
      { category: "PG MCA (State Merit via WBJECA)", intake: 40, entranceExam: "WBJECA", eligibility: "BCA / B.Sc (Computer Science / IT / Maths) with valid WBJECA rank" },
    ],
    totalAnnualCapacity: 40,
    enrollment5Year: [
      { year: "2020–21", intake: 40, enrolled: 35, fillRate: 88 },
      { year: "2021–22", intake: 40, enrolled: 37, fillRate: 93 },
      { year: "2022–23", intake: 40, enrolled: 38, fillRate: 95 },
      { year: "2023–24", intake: 40, enrolled: 39, fillRate: 98 },
      { year: "2024–25", intake: 40, enrolled: 40, fillRate: 100 },
    ],
    placement5Year: [
      { year: "2020–21", placementRate: 75.0, totalOffers: 30, highestPackage: 12.0, averagePackage: 5.6 },
      { year: "2021–22", placementRate: 78.5, totalOffers: 34, highestPackage: 16.0, averagePackage: 6.2 },
      { year: "2022–23", placementRate: 85.0, totalOffers: 40, highestPackage: 22.0, averagePackage: 7.2 },
      { year: "2023–24", placementRate: 80.0, totalOffers: 35, highestPackage: 22.0, averagePackage: 7.0 },
      { year: "2024–25", placementRate: 82.5, totalOffers: 37, highestPackage: 22.5, averagePackage: 7.2 },
    ],
    recentMetrics: {
      year: "2024–25",
      highestPackage: "22.5 LPA",
      highestPackageDetails: "Top Enterprise IT Product Firm",
      medianPackage: "6.50 LPA",
      averagePackage: "7.20 LPA",
      totalOffers: "37 Offers",
      placementRate: "82.5%",
      topRecruiters: ["TCS Digital", "Cognizant", "PwC", "Infosys", "Wipro", "Capgemini", "IBM"],
    },
    faculty: [
      {
        id: "mca-1",
        name: "Prof. Subir Kumar Panja",
        designation: "Professor & Head of Department",
        email: "hod_ca@kgec.edu.in",
        qualification: "M.Tech in Computer Science & Data Engineering (Calcutta University), MCA (Kalyani University)",
        specialization: "Distributed Database Indexing in Big Data Streams, Cloud Computing",
        researchAreas: ["Big Data Indexing", "Distributed Data Stores", "Cloud Architectures"],
        publicationsCount: 32,
      },
      {
        id: "mca-2",
        name: "Dr. Utpal Biswas",
        designation: "Associate Professor",
        email: "utpal.biswas@kgec.edu.in",
        qualification: "Ph.D. (Jadavpur University), MCA",
        specialization: "Web Technologies, Data Mining, Knowledge Engineering",
        researchAreas: ["Data Mining", "Semantic Web", "Information Retrieval"],
        publicationsCount: 26,
      },
      {
        id: "mca-3",
        name: "Prof. Anirban Roy",
        designation: "Assistant Professor",
        email: "anirban.roy@kgec.edu.in",
        qualification: "MCA (Calcutta University), M.Tech",
        specialization: "Cloud Computing, Object Oriented Systems, Software Architecture",
        researchAreas: ["Microservices", "Design Patterns", "Containerized Orchestration"],
        publicationsCount: 16,
      },
      {
        id: "mca-4",
        name: "Prof. Ruma Sen",
        designation: "Assistant Professor",
        email: "ruma.sen@kgec.edu.in",
        qualification: "MCA (Jadavpur University)",
        specialization: "Operating Systems, Mobile Application Development",
        researchAreas: ["Mobile OS Architectures", "App Security", "Cross-Platform Frameworks"],
        publicationsCount: 14,
      },
    ],
    studentAchievements:
      "Master of Computer Applications (MCA) students at KGEC demonstrate exceptional capabilities in modern enterprise software engineering, full-stack open-source development, and cloud computing. MCA students have consistently secured top positions in national IT hackathons and inter-college programming symposiums. In placement recruitment drives, the department achieves high conversion rates with prominent software consulting firms and product development enterprises such as TCS Digital, Cognizant, PwC, Infosys, and Capgemini. The department recorded a peak package of 22.5 LPA with an 82.5% placement rate in the recent academic year.",
    achievementHighlights: [
      { metric: "22.5 LPA", label: "Highest Package", detail: "Enterprise Software & Cloud" },
      { metric: "82.5%", label: "Placement Rate", detail: "37 Offers in Recent Batch" },
      { metric: "WBJECA Top Ranks", label: "Academic Excellence", detail: "Top State Rankers Enrolled" },
      { metric: "100%", label: "Annual Seat Fill Rate", detail: "All 40 Seats Filled Consistently" },
    ],
  },

  "applied-sciences": {
    slug: "applied-sciences",
    name: "Department of Basic Sciences & Humanities",
    code: "BSH",
    established: "1995",
    degreesOffered: ["Foundational Engineering Sciences & Humanities Coursework"],
    headOfDepartment: "Dr. Subir Kumar Ghosh",
    overview:
      "The Department of Basic Sciences & Humanities (BSH) at KGEC encompasses the disciplines of Applied Physics, Applied Chemistry, Mathematics, and Humanities & Management. It provides the essential mathematical, scientific, and communication foundation upon which all engineering disciplines are built.",
    detailedOverview: [
      "The department operates state-of-the-art laboratories in Optics, Solid State Physics, Engineering Chemistry, Computational Mathematics, and Digital Language & Communication.",
      "Faculty members lead research programs in condensed matter physics, nanomaterials, polymer chemistry, fluid dynamics, and professional communication pedagogy.",
    ],
    vision:
      "To provide world-class foundational education in scientific and mathematical disciplines, instilling intellectual curiosity, analytical rigor, and ethical communication in engineering scholars.",
    mission: [
      "To build strong theoretical and practical foundations in physical and mathematical sciences.",
      "To foster cross-disciplinary scientific research and experimental proficiency.",
      "To develop articulate, ethical, and socially conscious engineering professionals.",
    ],
    laboratories: [
      { name: "Optics & Solid State Physics Lab", description: "Equipped with He-Ne laser test benches, Hall effect setups, and optical spectrometers." },
      { name: "Engineering Chemistry & Environmental Lab", description: "Digital spectrophotometers, pH meters, and water pollution analysis benches." },
      { name: "Computational Mathematics Lab", description: "MATLAB, Mathematica, and Python numerical computing terminals." },
      { name: "Digital Language & Soft-Skills Lab", description: "Interactive multimedia audio-visual workstations for communication and executive presentation training." },
    ],
    seatMatrix: [
      { category: "Foundational B.Tech Coursework", intake: 378, entranceExam: "WBJEE", eligibility: "Enrolled in 1st & 2nd year B.Tech programs" },
    ],
    totalAnnualCapacity: 378,
    enrollment5Year: [
      { year: "2020–21", intake: 350, enrolled: 350, fillRate: 100 },
      { year: "2021–22", intake: 355, enrolled: 355, fillRate: 100 },
      { year: "2022–23", intake: 371, enrolled: 371, fillRate: 100 },
      { year: "2023–24", intake: 375, enrolled: 375, fillRate: 100 },
      { year: "2024–25", intake: 378, enrolled: 378, fillRate: 100 },
    ],
    placement5Year: [
      { year: "2020–21", placementRate: 76.0, totalOffers: 280, highestPackage: 32.0, averagePackage: 7.2 },
      { year: "2021–22", placementRate: 80.0, totalOffers: 310, highestPackage: 42.0, averagePackage: 8.0 },
      { year: "2022–23", placementRate: 85.0, totalOffers: 360, highestPackage: 90.0, averagePackage: 9.4 },
      { year: "2023–24", placementRate: 76.2, totalOffers: 320, highestPackage: 52.0, averagePackage: 8.8 },
      { year: "2024–25", placementRate: 78.0, totalOffers: 335, highestPackage: 90.0, averagePackage: 9.0 },
    ],
    recentMetrics: {
      year: "2024–25",
      highestPackage: "90.0 LPA",
      highestPackageDetails: "Institutional Landmark",
      medianPackage: "7.50 LPA",
      averagePackage: "8.80 LPA",
      totalOffers: "335 Offers (Institute-wide)",
      placementRate: "78.0%",
      topRecruiters: ["Google", "Microsoft", "Amazon", "Avalanche", "Ericsson", "TCS", "Cognizant", "L&T"],
    },
    faculty: [
      {
        id: "bsh-1",
        name: "Dr. Subir Kumar Ghosh",
        designation: "Professor & Head of Department",
        email: "hod_bsh@kgec.edu.in",
        qualification: "Ph.D. (University of Calcutta), M.Sc (Physics)",
        specialization: "Solid State Physics, Condensed Matter, Nanomaterials",
        researchAreas: ["Condensed Matter", "Optoelectronics", "Thin Films"],
        publicationsCount: 38,
      },
      {
        id: "bsh-2",
        name: "Dr. Aniruddha Das",
        designation: "Associate Professor (Chemistry)",
        email: "aniruddha.das@kgec.edu.in",
        qualification: "Ph.D. (Jadavpur University), M.Sc (Chemistry)",
        specialization: "Polymer Chemistry, Catalysis, Green Energy",
        researchAreas: ["Bio-composites", "Heterogeneous Catalysis", "Battery Electrolytes"],
        publicationsCount: 30,
      },
      {
        id: "bsh-3",
        name: "Dr. Soma Halder",
        designation: "Associate Professor (Mathematics)",
        email: "soma.halder@kgec.edu.in",
        qualification: "Ph.D. (IIT Kharagpur), M.Sc (Applied Mathematics)",
        specialization: "Fluid Mechanics, Numerical Analysis, Mathematical Modeling",
        researchAreas: ["Fluid Dynamics", "Numerical Optimization", "Mathematical Physics"],
        publicationsCount: 26,
      },
      {
        id: "bsh-4",
        name: "Dr. Rupa Bhattacharya",
        designation: "Assistant Professor (Humanities)",
        email: "rupa.bhattacharya@kgec.edu.in",
        qualification: "Ph.D. (Jadavpur University), M.A. (English)",
        specialization: "Technical Communication, Professional Ethics, English Pedagogy",
        researchAreas: ["ESP", "Corporate Communication", "Soft Skills Development"],
        publicationsCount: 18,
      },
    ],
    studentAchievements:
      "The Department of Basic Sciences & Humanities provides the foundational intellectual springboard for all KGEC students. Under the guidance of BSH faculty, undergraduates have published research papers in physics and applied mathematics journals, secured awards in national science congresses, and developed communication excellence that distinguishes them in corporate placement interviews.",
    achievementHighlights: [
      { metric: "100%", label: "Undergraduate Reach", detail: "All 378+ B.Tech Students Trained" },
      { metric: "Laser & Optics", label: "Experimental Rigor", detail: "Modern Experimental Benches" },
      { metric: "Green Chemistry", label: "Sustainable Research", detail: "Eco-Friendly Materials Lab" },
      { metric: "Language Lab", label: "Executive Polish", detail: "Digital Multimedia Training" },
    ],
  },
};

// Aliases for route flexibility
DEPARTMENTS_DATA.ca = DEPARTMENTS_DATA.mca;
DEPARTMENTS_DATA["bsh"] = DEPARTMENTS_DATA["applied-sciences"];
DEPARTMENTS_DATA["applied_sciences"] = DEPARTMENTS_DATA["applied-sciences"];
DEPARTMENTS_DATA["physics"] = DEPARTMENTS_DATA["applied-sciences"];
DEPARTMENTS_DATA["chemistry"] = DEPARTMENTS_DATA["applied-sciences"];
DEPARTMENTS_DATA["mathematics"] = DEPARTMENTS_DATA["applied-sciences"];
DEPARTMENTS_DATA["humanities"] = DEPARTMENTS_DATA["applied-sciences"];

// All content below comes from the BIX brochure (Update 2025).
// Flow: industry -> specialty -> method.
//  - INDUSTRIES[].specialties  = which specialties are offered in that industry
//  - SPECIALTIES[].methods     = which methods belong to that specialty
// To add/remove an option, edit only this file.

export const METHODS = {
  // ---- NDT inspection & examination ----
  radiography: {
    label: "Radiographic Testing (RT)",
    description:
      "X-ray or gamma ray (Ir-192) sources are used to view and assess the internal structure of an asset. RT is sensitive to corrosion, thickness changes, voids, cracks and density changes, finds both surface and sub-surface defects, and gives a permanent record of the inspection. BIX holds the largest number of pipeline X-ray crawlers in Bangladesh.",
  },
  ultrasonic: {
    label: "Ultrasonic Testing (UT)",
    description:
      "Ultrasonic waves travel through the material to check its properties, measure thickness and detect corrosion, erosion, flaws and cracks. UT finds surface and sub-surface defects and reports their size and shape.",
  },
  utg: {
    label: "Ultrasonic Thickness Gauging (UTG)",
    description:
      "Wall thickness measurement for corrosion monitoring and class surveys, widely used on ships, tankers and barges, and on drilling tools and wire line equipment.",
  },
  mpi: {
    label: "Magnetic Particle Inspection (MPI)",
    description:
      "A quick, cost-effective method for surface and near-surface discontinuities. The ferromagnetic part is magnetized and dyed iron particles gather over any defect, which is then seen under proper lighting.",
  },
  dpt: {
    label: "Dye Penetrant Testing (DPT)",
    description:
      "A low-cost method for surface-breaking discontinuities on smooth, non-porous surfaces. It handles complex shapes, and assets don't need to be dismantled or removed from the facility.",
  },
  visual: {
    label: "Visual Testing (VT)",
    description:
      "A basic, cost-effective check of general integrity. It can be direct (naked eye) or indirect, using mirrors, cameras and borescopes.",
  },
  "vacuum-box": {
    label: "Vacuum Box Testing",
    description:
      "Locates leaks in welds caused by through-thickness discontinuities. A vacuum box and compressor create a pressure difference, and detergent bubbles show where gas is leaking.",
  },
  hardness: {
    label: "Hardness Testing",
    description:
      "Measures how well a material resists permanent deformation. It indicates strength, ductility and wear resistance, and shows whether heat treatment was carried out properly.",
  },
  metallurgical: {
    label: "Metallurgical Inspection",
    description:
      "On-site microstructure examination with a portable metallurgical microscope (100x to 800x), including in-situ metallography, used for remaining life assessments.",
  },
  hydrostatic: {
    label: "Hydrostatic Pressure Test",
    description:
      "Pressure testing to verify the integrity of piping and pressure equipment.",
  },
  "coating-thickness": {
    label: "Paint Coating Thickness Measurement",
    description:
      "Measures applied paint and coating thickness to confirm it meets project requirements.",
  },

  // ---- Advanced NDT ----
  paut: {
    label: "Phased Array Ultrasonic Testing (PAUT)",
    description:
      "Computer-controlled, electronically steered ultrasonic beams detect cracks and flaws in welds and map corrosion. PAUT is fast, reduces false alarms, covers the weld volume with no dead zone, and gives a permanent record. BIX uses OmniScan SX, Prisma and Phascon instruments.",
  },
  tofd: {
    label: "Time of Flight Diffraction (TOFD)",
    description:
      "An advanced ultrasonic method to detect and size cracks and flaws in welds. It finds planar defects not perpendicular to the surface and gives accurate defect height with a high probability of detection.",
  },
  lrut: {
    label: "Long Range Ultrasonic Testing (LRUT)",
    description:
      "Remotely screens pipelines and piping for corrosion and cracking over long distances with minimal insulation removal, then pinpoints and characterizes length and depth.",
  },
  "digital-rt": {
    label: "Digital Radiography",
    description:
      "Digital detectors replace film, so images appear directly on screen with no developing chemicals. Compared with conventional radiography it offers shorter exposure times and higher-contrast images.",
  },
  pmi: {
    label: "Positive Material Identification (PMI)",
    description:
      "Identifies the grade and alloy composition of metal in vessels, piping, valves and pumps, so the wrong material doesn't end up in safety-critical plant.",
  },

  // ---- Heat treatment ----
  pwht: {
    label: "Post Weld Heat Treatment (PWHT)",
    description:
      "Controlled heating after welding to relieve residual stresses, adjust strength and hardness, and reduce cracking risk. BIX runs resistance and induction PWHT machines from 2 to 36 channels with recorders and thermocouple attachment units.",
  },
  "internal-firing": {
    label: "Internal Firing PWHT",
    description:
      "Heat treatment of large vessels using high-velocity gas burners, gas control trains with flame failure units and combustion air fans.",
  },

  // ---- Lifting equipment ----
  "load-test": {
    label: "Load Test and Visual Inspection",
    description:
      "Examination and testing of lifting equipment and accessories to confirm they are fit for use under British or other international standards. It ranges from visual and NDT inspection to function and load testing.",
  },
  "thorough-exam": {
    label: "Report of Thorough Examination",
    description:
      "Once an item passes inspection a Report of Thorough Examination is issued. For unsafe equipment, BIX sends a detailed deficiency report and issues tests and certificates after repairs.",
  },

  // ---- Welding & painting inspection ----
  "wps-pqr": {
    label: "WPS and PQR Review",
    description:
      "Review of welding procedure qualification (WPS and PQR) against applicable codes and standards, and witnessing of procedure qualification records.",
  },
  wpq: {
    label: "Welder Performance Qualification (WPQ)",
    description: "Witnessing of welder performance qualification tests.",
  },
  "welding-inspection": {
    label: "Third-Party Welding Inspection",
    description:
      "Welding inspection by AWS Certified Welding Inspectors (CWI) as a third party or client representative, with independent reports.",
  },
  "painting-inspection": {
    label: "Painting and Coating Inspection",
    description:
      "Inspectors assess the conditions where a coating is applied, advise on coatings for corrosive environments and make sure the painting process follows project requirements.",
  },

  // ---- In-service inspection ----
  api: {
    label: "API 510 / 570 / 653 Inspection",
    description:
      "Certified inspectors for pressure vessels, piping and storage tanks in refining, petrochemical, oil and gas, and power facilities, supported by NDE Level II UT/MT/PT technicians and BGAS certified inspectors.",
  },
  rbi: {
    label: "Risk Based Inspection (RBI)",
    description:
      "Implementation of risk based inspection programs, plus turnaround management and day-to-day compliance inspections.",
  },
  psm: {
    label: "Process Safety Management (PSM)",
    description:
      "Process Safety Management programs and implementation, supported by experienced engineering personnel and AutoCAD services.",
  },

  // ---- Rope access ----
  "rope-ndt": {
    label: "Rope Access NDT and Inspection",
    description:
      "NDT and inspection at height or in hard-to-reach places by IRATA certified technicians, with less interference to other work and shorter maintenance stops.",
  },
  "rope-hull": {
    label: "Hull Inspection and Class Surveys",
    description:
      "Rope access hull inspection and class surveys that reduce vessel downtime.",
  },
  "rope-lifting": {
    label: "Rope Access Lifting Equipment Inspection",
    description:
      "Inspection of lifting equipment in elevated locations using IRATA certified rope access teams.",
  },
  "rope-painting": {
    label: "Rope Access Painting and Coating Inspection",
    description:
      "Painting and coating inspection of tall structures and spheres without scaffolding, following the IRATA international code of practice.",
  },
};

export const SPECIALTIES = {
  ndt: {
    label: "NDT Inspection & Examination",
    description:
      "Radiography, ultrasonic, surface and leak testing carried out by qualified, certified teams. Test reports are issued in line with the applicable codes and standards.",
    methods: [
      "radiography", "ultrasonic", "utg", "mpi", "dpt", "visual",
      "vacuum-box", "hardness", "metallurgical", "hydrostatic", "coating-thickness",
    ],
  },
  advanced: {
    label: "Advanced NDT",
    description:
      "Phased array, TOFD, long range ultrasonics, digital radiography and material identification for faster, more detailed inspection.",
    methods: ["paut", "tofd", "lrut", "digital-rt", "pmi"],
  },
  heat: {
    label: "Heat Treatment",
    description:
      "Post weld heat treatment with a large fleet of automatic and manual PWHT machines.",
    methods: ["pwht", "internal-firing"],
  },
  lifting: {
    label: "Lifting Equipment Inspection",
    description:
      "Thorough examination and testing of lifting equipment so it is fit for use under British or other international standards.",
    methods: ["load-test", "thorough-exam"],
  },
  welding: {
    label: "Welding & Painting Inspection",
    description:
      "Qualification witnessing, third-party welding inspection and coating inspection by certified inspectors.",
    methods: ["wps-pqr", "wpq", "welding-inspection", "painting-inspection"],
  },
  inservice: {
    label: "In-Service Inspection",
    description:
      "Certified inspectors and engineers for refining, petrochemical, oil and gas, and power facilities.",
    methods: ["api", "rbi", "psm"],
  },
  rope: {
    label: "Rope Access Services",
    description:
      "IRATA certified teams for work that traditional access can't reach, with lower cost and less interference with other activities.",
    methods: ["rope-ndt", "rope-hull", "rope-lifting", "rope-painting"],
  },
};

export const INDUSTRIES = [
  {
    id: "oil-gas",
    label: "Oil & Gas",
    specialties: ["ndt", "advanced", "heat", "lifting", "welding", "inservice", "rope"],
  },
  {
    id: "pipelines",
    label: "Pipelines",
    specialties: ["ndt", "advanced", "welding", "inservice"],
  },
  {
    id: "power",
    label: "Power",
    specialties: ["ndt", "advanced", "heat", "welding", "inservice"],
  },
  {
    id: "fertilizer",
    label: "Fertilizer",
    specialties: ["ndt", "advanced", "heat", "inservice"],
  },
  {
    id: "lpg-refinery",
    label: "LPG & Refinery",
    specialties: ["ndt", "advanced", "heat", "welding", "inservice", "rope"],
  },
  {
    id: "marine",
    label: "Marine & Shipbuilding",
    specialties: ["ndt", "welding", "rope"],
  },
  {
    id: "drilling",
    label: "Drilling Rigs & Equipment",
    specialties: ["ndt", "lifting"],
  },
  {
    id: "infrastructure",
    label: "Infrastructure & Steel Structures",
    specialties: ["ndt", "advanced", "lifting", "welding", "rope"],
  },
];

// ---- helpers (components only use these) ----
const toOption = (id, obj) => ({ id, label: obj.label });

export const getIndustry = (id) => INDUSTRIES.find((i) => i.id === id) || null;

export const getSpecialtiesFor = (industryId) =>
  (getIndustry(industryId)?.specialties || []).map((id) => toOption(id, SPECIALTIES[id]));

export const getMethodsFor = (specialtyId) =>
  (SPECIALTIES[specialtyId]?.methods || []).map((id) => toOption(id, METHODS[id]));

// True only when the whole chain is valid (guards against hand-edited URLs)
export const isValidSelection = (industry, specialty, method) =>
  !!getIndustry(industry) &&
  !!getIndustry(industry).specialties.includes(specialty) &&
  !!SPECIALTIES[specialty]?.methods.includes(method);
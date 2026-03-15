export interface Product {
  id: string;
  name: string;
  subName: string;
  price: string;
  description: string;
  folderPath: string;
  frameCount: number;
  frameExtension: string;
  themeColor: string;
  gradient: string;
  glowColor: string;
  features: string[];
  stats: { label: string; val: string }[];
  section1: { title: string; subtitle: string };
  section2: { title: string; subtitle: string };
  section3: { title: string; subtitle: string };
  section4: { title: string; subtitle: string };
  detailsSection: { title: string; description: string; imageAlt: string };
  freshnessSection: { title: string; description: string };
  buyNowSection: {
    price: string;
    unit: string;
    processingParams: string[];
    deliveryPromise: string;
    returnPolicy: string;
  };
  hasDeviceFolders?: boolean;
}

export const products: Product[] = [
  {
    id: 'plasma',
    name: 'Plasma Strike',
    subName: 'Electric lime hit.',
    price: '₹99',
    description: '250mg Caffeine · Zero Sugar · 8 Active Vitamins',
    folderPath: '/images/plasma',
    frameCount: 96,
    frameExtension: 'png',
    hasDeviceFolders: false,
    themeColor: '#FFD600',
    gradient: 'linear-gradient(135deg, #FFD600 0%, #FF8C00 100%)',
    glowColor: 'rgba(255, 214, 0, 0.35)',
    features: ['250mg Natural Caffeine', 'Zero Sugar', '8 Active Vitamins'],
    stats: [
      { label: 'Sugar', val: '0g' },
      { label: 'Caffeine', val: '250mg' },
      { label: 'Calories', val: '10' },
    ],
    section1: { title: 'Plasma Strike.', subtitle: 'Electric lime hit.' },
    section2: {
      title: 'Strike fast.\nStrike hard.',
      subtitle:
        'A 250mg caffeine surge with electrolytes engineered for peak human performance.',
    },
    section3: {
      title: 'Zero compromise\nformula.',
      subtitle:
        'No sugar crash. No jitters. Just clean, sustained electric energy from natural caffeine.',
    },
    section4: {
      title: 'Engineered\nfor the edge.',
      subtitle: 'Cold-fill sealed. Nitrogen flushed. Vitamin perfect.',
    },
    detailsSection: {
      title: 'The Lime Overclock',
      description:
        'Plasma Strike is built for those who need to perform, not just feel awake. We combine 250mg of natural caffeine with a full B-vitamin complex, electrolytes, and L-theanine to smooth the edge off the hit. The result is sharp mental clarity, sustained physical output, and zero sugar crash. Fierce lime flavouring from real lime extracts.',
      imageAlt: 'Plasma Strike Details',
    },
    freshnessSection: {
      title: 'Cold-Fill Technology',
      description:
        "Every can is filled at 4°C to preserve the volatile lime flavour compounds and vitamin integrity. Heat degrades B-vitamins. That's why we never hot-fill. Sealed under nitrogen to prevent oxidation. Crack it open and you get exactly what we made.",
    },
    buyNowSection: {
      price: '₹99',
      unit: 'per 250ml can',
      processingParams: ['Cold-Fill Sealed', 'Nitrogen Flush', 'Zero Sugar'],
      deliveryPromise:
        'Same-day dispatch. Delivered cold in insulated eco-packaging to metro cities.',
      returnPolicy:
        "100% Satisfaction Guarantee. Taste the difference or we'll make it right.",
    },
  },
  {
    id: 'ultraviolet',
    name: 'Ultraviolet',
    subName: 'Neon berry blast.',
    price: '₹99',
    description: '200mg Caffeine · Nootropic Stack · Wild Berry',
    folderPath: '/images/ultraviolet',
    frameCount: 96,
    frameExtension: 'png',
    themeColor: '#BF00FF',
    gradient: 'linear-gradient(135deg, #BF00FF 0%, #6600CC 100%)',
    glowColor: 'rgba(191, 0, 255, 0.35)',
    features: ['200mg Caffeine', "Lion's Mane Extract", 'Alpha-GPC'],
    stats: [
      { label: 'Sugar', val: '0g' },
      { label: 'Caffeine', val: '200mg' },
      { label: 'Nootropics', val: '3x' },
    ],
    section1: { title: 'Ultraviolet.', subtitle: 'Neon berry blast.' },
    section2: {
      title: 'Think faster.\nSee clearer.',
      subtitle:
        "A triple nootropic stack — Alpha-GPC, Lion's Mane, and Rhodiola — fused with 200mg smooth caffeine.",
    },
    section3: {
      title: "Your brain's\noverclock mode.",
      subtitle:
        'Deep focus, zero fatigue. Formulated for coders, creators, and night-shift operators.',
    },
    section4: {
      title: 'The cognitive\nedge.',
      subtitle: 'Microencapsulated for 3x bioavailability.',
    },
    detailsSection: {
      title: 'The Nootropic Formula',
      description:
        "Ultraviolet isn't just energy — it's a cognitive enhancement system. Alpha-GPC supports acetylcholine synthesis for sharp focus. Lion's Mane promotes nerve growth factor production for long-term brain health. Rhodiola Rosea combats mental fatigue under stress. Layered on 200mg of smooth caffeine from green tea extract, it's the cleanest mental high you can legally drink.",
      imageAlt: 'Ultraviolet Details',
    },
    freshnessSection: {
      title: 'Bioavailability First',
      description:
        "Each nootropic compound is microencapsulated to survive the acidic environment of the stomach and absorb in the small intestine where uptake is 3x higher. We don't just add ingredients — we engineer absorption. That's why Ultraviolet hits different.",
    },
    buyNowSection: {
      price: '₹99',
      unit: 'per 250ml can',
      processingParams: ['Microencapsulated', 'Nootropic Stack', 'Dairy Free'],
      deliveryPromise:
        "Chilled delivery to metro cities. Handled with care — nootropics are heat-sensitive.",
      returnPolicy:
        "Feel the focus within 30 minutes or we'll refund you. No questions.",
    },
  },
  {
    id: 'arctic',
    name: 'Arctic Core',
    subName: 'Ice cold clarity.',
    price: '₹99',
    description: '175mg Caffeine · Electrolyte Matrix · Cryo-Mint',
    folderPath: '/images/arctic',
    frameCount: 96,
    frameExtension: 'png',
    themeColor: '#00F5FF',
    gradient: 'linear-gradient(135deg, #00F5FF 0%, #0080FF 100%)',
    glowColor: 'rgba(0, 245, 255, 0.35)',
    features: ['Electrolyte Matrix', 'Cryo-Mint Extract', 'Hydration+'],
    stats: [
      { label: 'Sugar', val: '0g' },
      { label: 'Sodium', val: '160mg' },
      { label: 'Hydration', val: '2x' },
    ],
    section1: { title: 'Arctic Core.', subtitle: 'Ice cold clarity.' },
    section2: {
      title: 'Hydrate.\nPerform.\nDominate.',
      subtitle:
        'A full electrolyte matrix with cryo-mint cooling factor. Engineered for athletes who need more than water.',
    },
    section3: {
      title: 'Engineered\nfor the grind.',
      subtitle:
        '175mg caffeine + coconut water electrolytes + mint cooling for sustained athletic output.',
    },
    section4: {
      title: 'Cold precision\nperformance.',
      subtitle: 'Cryo-preserved. Athlete grade. Zero compromise.',
    },
    detailsSection: {
      title: 'The Hydration Protocol',
      description:
        'Arctic Core was designed with sports physiologists to solve a specific problem: standard energy drinks dehydrate you. Our Electrolyte Matrix — Sodium 160mg, Potassium 120mg, Magnesium 40mg — restores fluid balance while the caffeine powers output. Add cryo-mint extract for a genuine thermoreceptor cooling effect.',
      imageAlt: 'Arctic Core Details',
    },
    freshnessSection: {
      title: 'Cryo-Preserved Formula',
      description:
        'Electrolytes degrade under heat. Our entire manufacturing line runs at sub-10°C. Every can is filled cold, sealed cold, and stored cold until it reaches you. The mint extract is cold-distilled to preserve the volatile cooling compounds that create the signature Arctic Core sensation.',
    },
    buyNowSection: {
      price: '₹99',
      unit: 'per 250ml can',
      processingParams: [
        'Cryo-Preserved',
        'Electrolyte Matrix',
        'Athlete Grade',
      ],
      deliveryPromise:
        'Delivered in insulated sports-grade packaging. Stays cold for 24 hours in transit.',
      returnPolicy:
        "Not the most refreshing thing you've ever tasted? Full refund, guaranteed.",
    },
  },
  {
    id: 'inferno',
    name: 'Inferno Surge',
    subName: 'Fiery watermelon fury.',
    price: '₹99',
    description: '300mg Caffeine · Pre-Workout Grade · Capsaicin Boost',
    folderPath: '/images/inferno',
    frameCount: 96,
    frameExtension: 'png',
    themeColor: '#FF3D00',
    gradient: 'linear-gradient(135deg, #FF3D00 0%, #B71C1C 100%)',
    glowColor: 'rgba(255, 61, 0, 0.35)',
    features: ['300mg Caffeine', 'Capsaicin Extract', 'Beta-Alanine'],
    stats: [
      { label: 'Sugar', val: '0g' },
      { label: 'Caffeine', val: '300mg' },
      { label: 'Beta-Al', val: '3.2g' },
    ],
    section1: { title: 'Inferno Surge.', subtitle: 'Fiery watermelon fury.' },
    section2: {
      title: 'Maximum output.\nNo ceiling.',
      subtitle:
        '300mg caffeine, 3.2g beta-alanine, capsaicin thermogenic boost. Pre-workout grade energy in a can.',
    },
    section3: {
      title: 'Built for\nthe extreme.',
      subtitle:
        'Capsaicin raises core temperature. Beta-alanine buffers lactic acid. Go harder, longer.',
    },
    section4: {
      title: 'No limits.\nNo excuses.',
      subtitle: 'COA verified. Carnosyn certified. Lab grade.',
    },
    detailsSection: {
      title: 'The Pre-Workout Can',
      description:
        "Inferno Surge is the world's first energy drink formulated to pre-workout standards. 300mg natural caffeine from robusta beans. 3.2g beta-alanine — the clinical dose — to buffer lactic acid build-up. Capsaicin extract from Carolina Reaper chili raises metabolic rate by up to 15% for 3 hours. Watermelon extract provides natural citrulline for nitric oxide production.",
      imageAlt: 'Inferno Surge Details',
    },
    freshnessSection: {
      title: 'Lab-Grade Manufacturing',
      description:
        "Every batch of Inferno Surge is third-party tested for heavy metals, microbiological contamination, and exact ingredient concentrations. We publish every batch's Certificate of Analysis. Capsaicin standardized to 95% capsaicinoids. Beta-alanine is Carnosyn® certified. No proprietary blends, no hidden doses.",
    },
    buyNowSection: {
      price: '₹99',
      unit: 'per 250ml can',
      processingParams: [
        'COA Verified',
        'Carnosyn® Beta-Alanine',
        'Pre-Workout Grade',
      ],
      deliveryPromise:
        'Same-day dispatch to metro cities. Arrives cold, sealed, ready to perform.',
      returnPolicy:
        "If it doesn't make you perform harder, we'll buy it back.",
    },
  },
];

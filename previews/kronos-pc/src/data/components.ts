import type { ComponentProduct } from './types'

const catalogImage = '/images/kronos-components-catalog.png'

export const COMPONENT_CATEGORIES = [
  'GPU',
  'CPU',
  'RAM',
  'Storage',
  'Motherboard',
  'PSU',
] as const

export const componentsCatalog: ComponentProduct[] = [
  {
    id: 'c-gpu-1',
    price: 689,
    category: 'GPU',
    imageUrl: catalogImage,
    imagePosition: '18% 24%',
    content: {
      es: {
        name: 'Kronos Vectra X90 16GB',
        description:
          'GPU de alto rendimiento para gaming en 1440p/4K, renderizado y transmisiones estables.',
        badge: 'Alto rendimiento',
        stock: 'Disponible',
        warranty: '3 años',
        features: ['16GB GDDR6X', 'Triple ventilador', 'Soporte ray tracing'],
      },
      en: {
        name: 'Kronos Vectra X90 16GB',
        description:
          'High-performance GPU for 1440p/4K gaming, rendering and stable streaming.',
        badge: 'High performance',
        stock: 'In stock',
        warranty: '3 years',
        features: ['16GB GDDR6X', 'Triple fan cooler', 'Ray tracing support'],
      },
      fr: {
        name: 'Kronos Vectra X90 16GB',
        description:
          'GPU haute performance pour gaming 1440p/4K, rendu et streaming stable.',
        badge: 'Haute performance',
        stock: 'Disponible',
        warranty: '3 ans',
        features: ['16GB GDDR6X', 'Triple ventilateur', 'Support ray tracing'],
      },
    },
  },
  {
    id: 'c-gpu-2',
    price: 449,
    category: 'GPU',
    imageUrl: catalogImage,
    imagePosition: '18% 24%',
    content: {
      es: {
        name: 'Kronos Forge 780 12GB',
        description:
          'Equilibrio entre consumo, temperatura y potencia para equipos gaming compactos.',
        badge: 'Popular',
        stock: 'Disponible',
        warranty: '3 años',
        features: ['12GB GDDR6', 'Modo silencioso', '1440p recomendado'],
      },
      en: {
        name: 'Kronos Forge 780 12GB',
        description:
          'Balanced power, temperature and performance for compact gaming systems.',
        badge: 'Popular',
        stock: 'In stock',
        warranty: '3 years',
        features: ['12GB GDDR6', 'Silent mode', 'Recommended for 1440p'],
      },
      fr: {
        name: 'Kronos Forge 780 12GB',
        description:
          'Équilibre entre consommation, température et puissance pour PC gaming compacts.',
        badge: 'Populaire',
        stock: 'Disponible',
        warranty: '3 ans',
        features: ['12GB GDDR6', 'Mode silencieux', 'Recommandé pour 1440p'],
      },
    },
  },
  {
    id: 'c-cpu-1',
    price: 529,
    category: 'CPU',
    imageUrl: catalogImage,
    imagePosition: '52% 23%',
    content: {
      es: {
        name: 'Helio Core 24C Pro',
        description:
          'Procesador de gama entusiasta para juegos competitivos, edición y multitarea pesada.',
        badge: 'Nuevo',
        stock: 'Disponible',
        warranty: '3 años',
        features: ['24 núcleos híbridos', 'Boost hasta 5.8GHz', 'Listo para DDR5'],
      },
      en: {
        name: 'Helio Core 24C Pro',
        description:
          'Enthusiast-class processor for competitive gaming, editing and heavy multitasking.',
        badge: 'New',
        stock: 'In stock',
        warranty: '3 years',
        features: ['24 hybrid cores', 'Boost up to 5.8GHz', 'DDR5 ready'],
      },
      fr: {
        name: 'Helio Core 24C Pro',
        description:
          'Processeur haut de gamme pour gaming compétitif, montage et multitâche lourd.',
        badge: 'Nouveau',
        stock: 'Disponible',
        warranty: '3 ans',
        features: ['24 cœurs hybrides', 'Boost jusqu’à 5.8GHz', 'Compatible DDR5'],
      },
    },
  },
  {
    id: 'c-cpu-2',
    price: 499,
    category: 'CPU',
    imageUrl: catalogImage,
    imagePosition: '52% 23%',
    content: {
      es: {
        name: 'Nova R9 Studio',
        description:
          'Excelente rendimiento multinúcleo para streaming, compilación y cargas creativas.',
        stock: 'Disponible',
        warranty: '3 años',
        features: ['16 núcleos', 'Bajo consumo en reposo', 'Ideal workstation'],
      },
      en: {
        name: 'Nova R9 Studio',
        description:
          'Excellent multi-core performance for streaming, compiling and creative workloads.',
        stock: 'In stock',
        warranty: '3 years',
        features: ['16 cores', 'Low idle power', 'Workstation friendly'],
      },
      fr: {
        name: 'Nova R9 Studio',
        description:
          'Excellentes performances multicœurs pour streaming, compilation et charges créatives.',
        stock: 'Disponible',
        warranty: '3 ans',
        features: ['16 cœurs', 'Faible consommation au repos', 'Idéal workstation'],
      },
    },
  },
  {
    id: 'c-ram-1',
    price: 119,
    category: 'RAM',
    imageUrl: catalogImage,
    imagePosition: '82% 27%',
    content: {
      es: {
        name: 'Pulse DDR5 32GB 6000',
        description:
          'Kit de memoria rápido y estable para PCs gaming y trabajo diario exigente.',
        badge: 'Mejor valor',
        stock: 'Disponible',
        warranty: 'De por vida limitada',
        features: ['2 x 16GB', 'Perfil EXPO/XMP', 'Disipador negro mate'],
      },
      en: {
        name: 'Pulse DDR5 32GB 6000',
        description:
          'Fast, stable memory kit for gaming PCs and demanding daily work.',
        badge: 'Best value',
        stock: 'In stock',
        warranty: 'Limited lifetime',
        features: ['2 x 16GB', 'EXPO/XMP profile', 'Matte black heat spreader'],
      },
      fr: {
        name: 'Pulse DDR5 32GB 6000',
        description:
          'Kit mémoire rapide et stable pour PC gaming et travail quotidien exigeant.',
        badge: 'Meilleur choix',
        stock: 'Disponible',
        warranty: 'À vie limitée',
        features: ['2 x 16GB', 'Profil EXPO/XMP', 'Dissipateur noir mat'],
      },
    },
  },
  {
    id: 'c-ram-2',
    price: 219,
    category: 'RAM',
    imageUrl: catalogImage,
    imagePosition: '82% 27%',
    content: {
      es: {
        name: 'Volt DDR5 64GB Creator',
        description:
          'Capacidad ampliada para edición de video, 3D y proyectos con librerías grandes.',
        stock: 'Disponible',
        warranty: 'De por vida limitada',
        features: ['2 x 32GB', 'Baja latencia', 'Validada en placas entusiastas'],
      },
      en: {
        name: 'Volt DDR5 64GB Creator',
        description:
          'Expanded capacity for video editing, 3D work and large project libraries.',
        stock: 'In stock',
        warranty: 'Limited lifetime',
        features: ['2 x 32GB', 'Low latency', 'Validated on enthusiast boards'],
      },
      fr: {
        name: 'Volt DDR5 64GB Creator',
        description:
          'Capacité étendue pour montage vidéo, 3D et projets avec grandes bibliothèques.',
        stock: 'Disponible',
        warranty: 'À vie limitée',
        features: ['2 x 32GB', 'Faible latence', 'Validée sur cartes haut de gamme'],
      },
    },
  },
  {
    id: 'c-sto-1',
    price: 159,
    category: 'Storage',
    imageUrl: catalogImage,
    imagePosition: '18% 74%',
    content: {
      es: {
        name: 'Nimbus NVMe 2TB Gen4',
        description:
          'SSD de alta velocidad para sistema, juegos grandes y bibliotecas de trabajo.',
        badge: 'Rápido',
        stock: 'Disponible',
        warranty: '5 años',
        features: ['Hasta 7,300 MB/s', 'Disipador compatible', 'Garantía TBW amplia'],
      },
      en: {
        name: 'Nimbus NVMe 2TB Gen4',
        description:
          'High-speed SSD for the OS, large games and work libraries.',
        badge: 'Fast',
        stock: 'In stock',
        warranty: '5 years',
        features: ['Up to 7,300 MB/s', 'Heatsink compatible', 'Strong TBW warranty'],
      },
      fr: {
        name: 'Nimbus NVMe 2TB Gen4',
        description:
          'SSD haute vitesse pour système, grands jeux et bibliothèques de travail.',
        badge: 'Rapide',
        stock: 'Disponible',
        warranty: '5 ans',
        features: ['Jusqu’à 7,300 MB/s', 'Compatible dissipateur', 'Garantie TBW élevée'],
      },
    },
  },
  {
    id: 'c-sto-2',
    price: 289,
    category: 'Storage',
    imageUrl: catalogImage,
    imagePosition: '18% 74%',
    content: {
      es: {
        name: 'Atlas SSD 4TB',
        description:
          'Almacenamiento amplio para archivos, respaldos y bibliotecas secundarias.',
        stock: 'Por pedido',
        warranty: '5 años',
        features: ['4TB sólidos', 'Bajo ruido', 'Ideal para archivo activo'],
      },
      en: {
        name: 'Atlas SSD 4TB',
        description:
          'Large storage for files, backups and secondary libraries.',
        stock: 'By order',
        warranty: '5 years',
        features: ['Solid 4TB capacity', 'Low noise', 'Ideal for active archives'],
      },
      fr: {
        name: 'Atlas SSD 4TB',
        description:
          'Grand stockage pour fichiers, sauvegardes et bibliothèques secondaires.',
        stock: 'Sur commande',
        warranty: '5 ans',
        features: ['4TB solides', 'Faible bruit', 'Idéal pour archives actives'],
      },
    },
  },
  {
    id: 'c-mb-1',
    price: 279,
    category: 'Motherboard',
    imageUrl: catalogImage,
    imagePosition: '52% 70%',
    content: {
      es: {
        name: 'Catalyst Z790 Pro WiFi',
        description:
          'Placa madre robusta para equipos de alto rendimiento con conectividad moderna.',
        stock: 'Disponible',
        warranty: '3 años',
        features: ['VRM reforzado', 'PCIe 5.0', 'Wi-Fi 6E integrado'],
      },
      en: {
        name: 'Catalyst Z790 Pro WiFi',
        description:
          'Robust motherboard for high-performance systems with modern connectivity.',
        stock: 'In stock',
        warranty: '3 years',
        features: ['Reinforced VRM', 'PCIe 5.0', 'Integrated Wi-Fi 6E'],
      },
      fr: {
        name: 'Catalyst Z790 Pro WiFi',
        description:
          'Carte mère robuste pour systèmes haute performance avec connectivité moderne.',
        stock: 'Disponible',
        warranty: '3 ans',
        features: ['VRM renforcé', 'PCIe 5.0', 'Wi-Fi 6E intégré'],
      },
    },
  },
  {
    id: 'c-mb-2',
    price: 229,
    category: 'Motherboard',
    imageUrl: catalogImage,
    imagePosition: '52% 70%',
    content: {
      es: {
        name: 'Vector B650E Elite',
        description:
          'Base eficiente para PCs modernas con excelente ruta de actualización.',
        badge: 'Compacta',
        stock: 'Disponible',
        warranty: '3 años',
        features: ['DDR5', 'M.2 Gen5', 'Audio premium integrado'],
      },
      en: {
        name: 'Vector B650E Elite',
        description:
          'Efficient foundation for modern PCs with an excellent upgrade path.',
        badge: 'Compact',
        stock: 'In stock',
        warranty: '3 years',
        features: ['DDR5', 'M.2 Gen5', 'Integrated premium audio'],
      },
      fr: {
        name: 'Vector B650E Elite',
        description:
          'Base efficace pour PC modernes avec excellente voie d’évolution.',
        badge: 'Compacte',
        stock: 'Disponible',
        warranty: '3 ans',
        features: ['DDR5', 'M.2 Gen5', 'Audio premium intégré'],
      },
    },
  },
  {
    id: 'c-psu-1',
    price: 129,
    category: 'PSU',
    imageUrl: catalogImage,
    imagePosition: '84% 72%',
    content: {
      es: {
        name: 'Forge 850W Gold Modular',
        description:
          'Fuente eficiente y silenciosa para equipos gaming con margen de crecimiento.',
        badge: 'Eficiente',
        stock: 'Disponible',
        warranty: '10 años',
        features: ['80 Plus Gold', 'Totalmente modular', 'Cableado premium'],
      },
      en: {
        name: 'Forge 850W Gold Modular',
        description:
          'Efficient and quiet power supply for gaming systems with upgrade headroom.',
        badge: 'Efficient',
        stock: 'In stock',
        warranty: '10 years',
        features: ['80 Plus Gold', 'Fully modular', 'Premium cabling'],
      },
      fr: {
        name: 'Forge 850W Gold Modular',
        description:
          'Alimentation efficace et silencieuse pour PC gaming avec marge d’évolution.',
        badge: 'Efficace',
        stock: 'Disponible',
        warranty: '10 ans',
        features: ['80 Plus Gold', 'Entièrement modulaire', 'Câblage premium'],
      },
    },
  },
  {
    id: 'c-psu-2',
    price: 249,
    category: 'PSU',
    imageUrl: catalogImage,
    imagePosition: '84% 72%',
    content: {
      es: {
        name: 'Ion 1200W Platinum',
        description:
          'Potencia estable para estaciones de trabajo, GPUs exigentes y upgrades futuros.',
        stock: 'Por pedido',
        warranty: '10 años',
        features: ['80 Plus Platinum', 'ATX 3.1', 'Conector 12V-2x6'],
      },
      en: {
        name: 'Ion 1200W Platinum',
        description:
          'Stable power for workstations, demanding GPUs and future upgrades.',
        stock: 'By order',
        warranty: '10 years',
        features: ['80 Plus Platinum', 'ATX 3.1', '12V-2x6 connector'],
      },
      fr: {
        name: 'Ion 1200W Platinum',
        description:
          'Puissance stable pour workstations, GPU exigeants et futurs upgrades.',
        stock: 'Sur commande',
        warranty: '10 ans',
        features: ['80 Plus Platinum', 'ATX 3.1', 'Connecteur 12V-2x6'],
      },
    },
  },
]

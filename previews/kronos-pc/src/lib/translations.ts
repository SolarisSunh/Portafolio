const es = {
  meta: {
    title: 'Kronos PC | Componentes, PCs armadas y servicio técnico',
    description:
      'Kronos PC: tienda profesional de componentes, PCs armadas y servicio técnico especializado.',
  },
  nav: {
    home: 'Inicio',
    products: 'Componentes',
    prebuilts: 'PCs armadas',
    repair: 'Servicio técnico',
    about: 'Nosotros',
    contact: 'Contacto',
  },
  header: {
    quote: 'Cotizar',
    quoteMobile: 'Cotizar equipo',
    quoteTopic: 'Cotización de PC',
    languageLabel: 'Cambiar idioma',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    primaryNav: 'Principal',
    mobileNav: 'Principal móvil',
  },
  layout: {
    skip: 'Saltar al contenido',
  },
  footer: {
    about:
      'Tienda especializada en componentes, equipos armados y servicio técnico para usuarios que necesitan rendimiento confiable.',
    proof: 'Pruebas térmicas y de estabilidad antes de entregar',
    location: 'Atención en taller con cita previa',
    explore: 'Explorar',
    quotes: 'Cotizaciones',
    quoteBody:
      'Respuesta para componentes, builds completos y reparaciones con diagnóstico.',
    request: 'Solicitar atención',
    quoteTopic: 'Cotización general',
    copyright:
      'Componentes, equipos y soporte especializado.',
    aria: 'Pie de página',
  },
  common: {
    warranty: 'Garantía',
    from: 'Desde',
    explore: 'Explorar',
    currencyUpdated: 'Moneda actualizada',
    currencyFallback: 'Usando tasa de respaldo',
  },
  prebuiltKinds: {
    gaming: 'Gaming',
    creator: 'Creadores',
    office: 'Oficina',
  },
  categories: {
    GPU: 'Tarjetas gráficas',
    CPU: 'Procesadores',
    RAM: 'Memoria RAM',
    Storage: 'Almacenamiento',
    Motherboard: 'Placas madre',
    PSU: 'Fuentes de poder',
  },
  home: {
    heroEyebrow: 'Kronos PC',
    heroTitle:
      'Componentes, PCs armadas y soporte para alto rendimiento.',
    heroDescription:
      'Creamos equipos confiables para gaming, creación, oficina y trabajo profesional, con inventario seleccionado y servicio técnico propio.',
    primaryCta: 'Ver PCs armadas',
    secondaryCta: 'Comprar componentes',
    heroAlt: 'PC de alto rendimiento ensamblada por Kronos',
    stats: [
      { label: 'Líneas de producto', value: '3' },
      { label: 'Pruebas por equipo', value: '8+' },
      { label: 'Garantía en builds', value: '2 años' },
    ],
    categoriesEyebrow: 'Tienda',
    categoriesTitle: 'Soluciones para cada tipo de equipo',
    categoriesDescription:
      'Explora componentes, equipos listos para cotizar y servicios pensados para mantener tu PC estable.',
    categoryCards: [
      {
        title: 'Componentes seleccionados',
        description:
          'GPUs, CPUs, memorias, almacenamiento, placas madre y fuentes con garantía clara.',
      },
      {
        title: 'PCs armadas',
        description:
          'Equipos gaming, workstation y oficina ensamblados con pruebas de estabilidad.',
      },
      {
        title: 'Servicio técnico',
        description:
          'Diagnóstico, mantenimiento, reparación y upgrades con reporte de trabajo.',
      },
    ],
    featuredEyebrow: 'Destacados',
    featuredTitle: 'PCs armadas recomendadas',
    featuredDescription:
      'Configuraciones listas para cotizar, con piezas equilibradas y pruebas antes de entrega.',
    viewAll: 'Ver todas las configuraciones',
    trustEyebrow: 'Confianza',
    trustTitle: 'Por qué comprar en Kronos',
    trustDescription:
      'No vendemos solo piezas: cuidamos compatibilidad, temperaturas y soporte después de la entrega.',
    assurances: [
      {
        title: 'Rendimiento validado',
        body: 'Cada build se prueba con cargas reales, control térmico y revisión de consumo.',
      },
      {
        title: 'Garantía transparente',
        body: 'Te entregamos detalle de piezas, cobertura y recomendaciones de mantenimiento.',
      },
      {
        title: 'Soporte humano',
        body: 'Asesoría antes de comprar y seguimiento después de entregar el equipo.',
      },
    ],
    serviceEyebrow: 'Servicio',
    serviceTitle: 'Tu PC también necesita mantenimiento profesional',
    serviceDescription:
      'Agenda diagnóstico, limpieza, actualización o reparación con técnicos que trabajan a diario con equipos de alto rendimiento.',
    serviceCta: 'Ver servicios',
    serviceAlt: 'Banco profesional de reparación de PCs',
  },
  products: {
    eyebrow: 'Catálogo',
    title: 'Componentes para armar o actualizar tu PC',
    description:
      'Inventario seleccionado por compatibilidad, garantía y rendimiento sostenido. Puedes cotizar piezas individuales o pedir asesoría para una build completa.',
    filterAria: 'Filtrar por categoría',
    all: 'Todos',
    count: (count: number) =>
      `${count} productos disponibles para cotizar`,
  },
  prebuilts: {
    eyebrow: 'PCs armadas',
    title: 'Configuraciones listas para cotizar',
    description:
      'Cada equipo combina piezas compatibles, flujo de aire correcto y pruebas de estabilidad antes de la entrega.',
    sections: {
      gaming: {
        title: 'Gaming',
        description:
          'FPS alto, buena ventilación y margen para streaming o multitarea.',
      },
      creator: {
        title: 'Creación y workstation',
        description:
          'Memoria, almacenamiento y estabilidad para cargas creativas prolongadas.',
      },
      office: {
        title: 'Oficina y productividad',
        description:
          'Equipos silenciosos y confiables para jornadas completas de trabajo.',
      },
    },
  },
  repair: {
    eyebrow: 'Servicio técnico',
    title:
      'Diagnóstico, mantenimiento y upgrades con criterio profesional',
    description:
      'Revisamos el equipo completo, explicamos la causa del problema y te damos opciones claras antes de hacer cambios.',
    heroAlt: 'Técnico reparando una PC en un banco profesional',
  },
  about: {
    eyebrow: 'Nosotros',
    title: 'Una tienda técnica para comprar con confianza',
    description:
      'Kronos PC nace para unir venta de componentes, armado profesional y servicio técnico en una experiencia clara para gamers, creadores y equipos de oficina.',
    values: [
      {
        title: 'Compatibilidad primero',
        body: 'Revisamos placa, fuente, gabinete, refrigeración y memoria antes de recomendar una compra.',
      },
      {
        title: 'Pruebas reales',
        body: 'Cada PC armada pasa por estrés de CPU/GPU, monitoreo térmico y revisión de ruido.',
      },
      {
        title: 'Servicio responsable',
        body: 'Documentamos diagnósticos, piezas instaladas y recomendaciones de mantenimiento.',
      },
      {
        title: 'Garantía clara',
        body: 'Separar garantía de pieza, garantía de armado y soporte evita sorpresas después de la compra.',
      },
    ],
    processEyebrow: 'Proceso',
    processTitle: 'De la cotización a la entrega',
    processDescription:
      'El objetivo es que el equipo tenga sentido para tu uso, no solo que tenga piezas llamativas. Por eso revisamos compatibilidad, ruido, temperaturas y posibilidad de mantenimiento.',
    process: [
      'Escuchamos el uso real del equipo y el presupuesto.',
      'Proponemos piezas compatibles con margen de actualización.',
      'Armamos, ordenamos cableado y validamos temperaturas.',
      'Entregamos la PC con recomendaciones de cuidado y soporte.',
    ],
    labTitle: 'Taller y banco de pruebas propio',
    labDescription:
      'Tener servicio técnico dentro de la tienda permite detectar problemas de compatibilidad, fuentes al límite, mala ventilación y upgrades innecesarios antes de que afecten al cliente.',
    labAlt: 'Taller profesional de Kronos PC',
  },
  contact: {
    eyebrow: 'Contacto',
    title: 'Cotiza componentes, PCs armadas o servicio técnico',
    description:
      'Cuéntanos qué necesitas y prepararemos una recomendación con piezas compatibles, tiempos estimados y cobertura.',
    quotesTitle: 'Cotizaciones',
    workshopTitle: 'Atención en taller',
    workshopBody:
      'Servicio con cita previa para diagnóstico, limpieza y upgrades.',
    usefulTitle: 'Información útil',
    usefulBody:
      'Incluye uso principal, presupuesto, monitor/resolución y piezas actuales si buscas actualizar.',
    note:
      'El formulario prepara un correo con tu solicitud para que puedas enviarlo desde tu cliente de email.',
    name: 'Nombre',
    email: 'Correo',
    phone: 'Teléfono',
    topic: 'Tema',
    message: 'Mensaje',
    placeholder:
      'Uso principal, presupuesto, juegos o programas, piezas actuales y fecha ideal de entrega.',
    submit: 'Preparar solicitud',
    sent: 'Solicitud preparada. Revisa tu cliente de correo para enviarla.',
    defaultTopic: 'Cotización general',
    mailSubject: 'Solicitud Kronos PC',
    bodyLabels: {
      name: 'Nombre',
      email: 'Correo',
      phone: 'Teléfono',
      phoneMissing: 'No indicado',
      topic: 'Tema',
    },
  },
  cards: {
    quoteComponent: 'Cotizar componente',
    quotePrebuilt: 'Solicitar cotización',
    scheduleService: 'Agendar servicio',
  },
  experience: {
    statusOnline: 'Sistema en línea',
    enter: 'Entrar a la tienda',
    lobbyEyebrow: 'Showroom Kronos',
    deskEyebrow: 'Centro de asistencia',
    deskTitle: 'Asesoría técnica en vivo',
    deskBody:
      'Validamos compatibilidad, temperaturas y rendimiento antes de cada entrega, con soporte humano de principio a fin.',
    deskPoints: [
      'Compatibilidad verificada',
      'Pruebas reales de estabilidad',
      'Garantía y soporte claros',
    ],
    departmentsEyebrow: 'Departamentos',
    departmentsTitle: 'Recorre la tienda',
    departmentsBody:
      'Tres zonas conectadas: componentes, equipos armados y laboratorio técnico.',
    enterDepartment: 'Entrar al departamento',
    viewDetails: 'Ver detalles',
    close: 'Cerrar',
    overview: 'Resumen',
    specifications: 'Especificaciones',
    features: 'Características',
    availability: 'Disponibilidad',
    selectCategoryAria: 'Seleccionar categoría de productos',
    terminalAria: 'Terminal de producto',
    catalogStatus: 'Catálogo activo',
  },
} as const

const en = {
  meta: {
    title: 'Kronos PC | Components, Custom PCs and Technical Service',
    description:
      'Kronos PC: professional computer components, custom-built PCs and specialized technical service.',
  },
  nav: {
    home: 'Home',
    products: 'Components',
    prebuilts: 'Custom PCs',
    repair: 'Technical service',
    about: 'About',
    contact: 'Contact',
  },
  header: {
    quote: 'Quote',
    quoteMobile: 'Quote a PC',
    quoteTopic: 'PC quote',
    languageLabel: 'Change language',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    primaryNav: 'Primary',
    mobileNav: 'Mobile primary',
  },
  layout: {
    skip: 'Skip to content',
  },
  footer: {
    about:
      'Specialized store for components, custom systems and technical service for users who need dependable performance.',
    proof: 'Thermal and stability testing before delivery',
    location: 'Workshop service by appointment',
    explore: 'Explore',
    quotes: 'Quotes',
    quoteBody:
      'Responses for components, full builds and diagnostic repairs.',
    request: 'Request assistance',
    quoteTopic: 'General quote',
    copyright:
      'Components, systems and specialized support.',
    aria: 'Footer',
  },
  common: {
    warranty: 'Warranty',
    from: 'From',
    explore: 'Explore',
    currencyUpdated: 'Currency updated',
    currencyFallback: 'Using fallback rate',
  },
  prebuiltKinds: {
    gaming: 'Gaming',
    creator: 'Creators',
    office: 'Office',
  },
  categories: {
    GPU: 'Graphics cards',
    CPU: 'Processors',
    RAM: 'Memory',
    Storage: 'Storage',
    Motherboard: 'Motherboards',
    PSU: 'Power supplies',
  },
  home: {
    heroEyebrow: 'Kronos PC',
    heroTitle:
      'Components, custom PCs and support for high performance.',
    heroDescription:
      'We build reliable systems for gaming, creation, office work and professional use, with selected inventory and in-house technical service.',
    primaryCta: 'View custom PCs',
    secondaryCta: 'Shop components',
    heroAlt: 'High-performance PC assembled by Kronos',
    stats: [
      { label: 'Product lines', value: '3' },
      { label: 'Tests per system', value: '8+' },
      { label: 'Build warranty', value: '2 years' },
    ],
    categoriesEyebrow: 'Store',
    categoriesTitle: 'Solutions for every type of system',
    categoriesDescription:
      'Explore components, ready-to-quote systems and services designed to keep your PC stable.',
    categoryCards: [
      {
        title: 'Selected components',
        description:
          'GPUs, CPUs, memory, storage, motherboards and power supplies with clear warranty.',
      },
      {
        title: 'Custom PCs',
        description:
          'Gaming, workstation and office systems assembled with stability testing.',
      },
      {
        title: 'Technical service',
        description:
          'Diagnostics, maintenance, repair and upgrades with a work report.',
      },
    ],
    featuredEyebrow: 'Featured',
    featuredTitle: 'Recommended custom PCs',
    featuredDescription:
      'Ready-to-quote configurations with balanced parts and pre-delivery testing.',
    viewAll: 'View all configurations',
    trustEyebrow: 'Trust',
    trustTitle: 'Why buy from Kronos',
    trustDescription:
      'We do more than sell parts: we care about compatibility, temperatures and support after delivery.',
    assurances: [
      {
        title: 'Validated performance',
        body: 'Every build is tested with real workloads, thermal control and power review.',
      },
      {
        title: 'Transparent warranty',
        body: 'You receive part details, coverage and maintenance recommendations.',
      },
      {
        title: 'Human support',
        body: 'Advice before purchase and follow-up after the system is delivered.',
      },
    ],
    serviceEyebrow: 'Service',
    serviceTitle: 'Your PC also needs professional maintenance',
    serviceDescription:
      'Schedule diagnostics, cleaning, upgrades or repairs with technicians who work daily on high-performance systems.',
    serviceCta: 'View services',
    serviceAlt: 'Professional PC repair bench',
  },
  products: {
    eyebrow: 'Catalog',
    title: 'Components to build or upgrade your PC',
    description:
      'Inventory selected for compatibility, warranty and sustained performance. Quote individual parts or request advice for a complete build.',
    filterAria: 'Filter by category',
    all: 'All',
    count: (count: number) =>
      `${count} products available for quote`,
  },
  prebuilts: {
    eyebrow: 'Custom PCs',
    title: 'Configurations ready to quote',
    description:
      'Each system combines compatible parts, proper airflow and stability testing before delivery.',
    sections: {
      gaming: {
        title: 'Gaming',
        description:
          'High FPS, strong airflow and room for streaming or multitasking.',
      },
      creator: {
        title: 'Creation and workstation',
        description:
          'Memory, storage and stability for long creative workloads.',
      },
      office: {
        title: 'Office and productivity',
        description:
          'Quiet, reliable systems for full workdays.',
      },
    },
  },
  repair: {
    eyebrow: 'Technical service',
    title:
      'Diagnostics, maintenance and upgrades with professional judgment',
    description:
      'We review the full system, explain the cause of the issue and give clear options before making changes.',
    heroAlt: 'Technician repairing a PC on a professional bench',
  },
  about: {
    eyebrow: 'About',
    title: 'A technical store built for confident purchases',
    description:
      'Kronos PC brings component sales, professional assembly and technical service into a clear experience for gamers, creators and office teams.',
    values: [
      {
        title: 'Compatibility first',
        body: 'We check the board, power supply, case, cooling and memory before recommending a purchase.',
      },
      {
        title: 'Real testing',
        body: 'Every custom PC goes through CPU/GPU stress, thermal monitoring and noise review.',
      },
      {
        title: 'Responsible service',
        body: 'We document diagnostics, installed parts and maintenance recommendations.',
      },
      {
        title: 'Clear warranty',
        body: 'Separating part warranty, build warranty and support helps avoid surprises after purchase.',
      },
    ],
    processEyebrow: 'Process',
    processTitle: 'From quote to delivery',
    processDescription:
      'The goal is for the system to make sense for your use, not just to include flashy parts. That is why we check compatibility, noise, temperatures and maintenance access.',
    process: [
      'We listen to the real use case and budget.',
      'We propose compatible parts with upgrade headroom.',
      'We assemble, manage cables and validate temperatures.',
      'We deliver the PC with care recommendations and support.',
    ],
    labTitle: 'In-house workshop and test bench',
    labDescription:
      'Having technical service inside the store helps detect compatibility issues, overloaded power supplies, poor airflow and unnecessary upgrades before they affect the customer.',
    labAlt: 'Professional Kronos PC workshop',
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Quote components, custom PCs or technical service',
    description:
      'Tell us what you need and we will prepare a recommendation with compatible parts, estimated timing and coverage.',
    quotesTitle: 'Quotes',
    workshopTitle: 'Workshop service',
    workshopBody:
      'Appointment-based service for diagnostics, cleaning and upgrades.',
    usefulTitle: 'Useful information',
    usefulBody:
      'Include main use, budget, monitor/resolution and current parts if you want to upgrade.',
    note:
      'The form prepares an email with your request so you can send it from your email client.',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    topic: 'Topic',
    message: 'Message',
    placeholder:
      'Main use, budget, games or programs, current parts and ideal delivery date.',
    submit: 'Prepare request',
    sent: 'Request prepared. Check your email client to send it.',
    defaultTopic: 'General quote',
    mailSubject: 'Kronos PC request',
    bodyLabels: {
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      phoneMissing: 'Not provided',
      topic: 'Topic',
    },
  },
  cards: {
    quoteComponent: 'Quote component',
    quotePrebuilt: 'Request quote',
    scheduleService: 'Schedule service',
  },
  experience: {
    statusOnline: 'System online',
    enter: 'Enter the store',
    lobbyEyebrow: 'Kronos showroom',
    deskEyebrow: 'Service desk',
    deskTitle: 'Live technical guidance',
    deskBody:
      'We validate compatibility, temperatures and performance before every delivery, with real human support end to end.',
    deskPoints: [
      'Verified compatibility',
      'Real stability testing',
      'Clear warranty and support',
    ],
    departmentsEyebrow: 'Departments',
    departmentsTitle: 'Walk the store',
    departmentsBody:
      'Three connected zones: components, prebuilt systems and the technical lab.',
    enterDepartment: 'Enter department',
    viewDetails: 'View details',
    close: 'Close',
    overview: 'Overview',
    specifications: 'Specifications',
    features: 'Features',
    availability: 'Availability',
    selectCategoryAria: 'Select product category',
    terminalAria: 'Product terminal',
    catalogStatus: 'Catalog active',
  },
} as const

const fr = {
  meta: {
    title: 'Kronos PC | Composants, PC assemblés et service technique',
    description:
      'Kronos PC : boutique professionnelle de composants, PC assemblés et service technique spécialisé.',
  },
  nav: {
    home: 'Accueil',
    products: 'Composants',
    prebuilts: 'PC assemblés',
    repair: 'Service technique',
    about: 'À propos',
    contact: 'Contact',
  },
  header: {
    quote: 'Devis',
    quoteMobile: 'Demander un devis',
    quoteTopic: 'Devis PC',
    languageLabel: 'Changer de langue',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    primaryNav: 'Navigation principale',
    mobileNav: 'Navigation mobile',
  },
  layout: {
    skip: 'Aller au contenu',
  },
  footer: {
    about:
      'Boutique spécialisée en composants, systèmes assemblés et service technique pour les utilisateurs qui ont besoin de performances fiables.',
    proof: 'Tests thermiques et de stabilité avant livraison',
    location: 'Service en atelier sur rendez-vous',
    explore: 'Explorer',
    quotes: 'Devis',
    quoteBody:
      'Réponse pour composants, configurations complètes et réparations avec diagnostic.',
    request: 'Demander une assistance',
    quoteTopic: 'Devis général',
    copyright:
      'Composants, systèmes et support spécialisé.',
    aria: 'Pied de page',
  },
  common: {
    warranty: 'Garantie',
    from: 'À partir de',
    explore: 'Explorer',
    currencyUpdated: 'Devise mise à jour',
    currencyFallback: 'Taux de secours utilisé',
  },
  prebuiltKinds: {
    gaming: 'Gaming',
    creator: 'Créateurs',
    office: 'Bureau',
  },
  categories: {
    GPU: 'Cartes graphiques',
    CPU: 'Processeurs',
    RAM: 'Mémoire RAM',
    Storage: 'Stockage',
    Motherboard: 'Cartes mères',
    PSU: 'Alimentations',
  },
  home: {
    heroEyebrow: 'Kronos PC',
    heroTitle:
      'Composants, PC assemblés et support pour hautes performances.',
    heroDescription:
      'Nous créons des systèmes fiables pour le gaming, la création, le bureau et les usages professionnels, avec un inventaire sélectionné et un service technique interne.',
    primaryCta: 'Voir les PC assemblés',
    secondaryCta: 'Acheter des composants',
    heroAlt: 'PC haute performance assemblé par Kronos',
    stats: [
      { label: 'Lignes de produits', value: '3' },
      { label: 'Tests par système', value: '8+' },
      { label: 'Garantie des builds', value: '2 ans' },
    ],
    categoriesEyebrow: 'Boutique',
    categoriesTitle: 'Solutions pour chaque type de système',
    categoriesDescription:
      'Explorez des composants, des systèmes prêts pour devis et des services pensés pour garder votre PC stable.',
    categoryCards: [
      {
        title: 'Composants sélectionnés',
        description:
          'GPU, CPU, mémoire, stockage, cartes mères et alimentations avec une garantie claire.',
      },
      {
        title: 'PC assemblés',
        description:
          'Systèmes gaming, workstation et bureau assemblés avec tests de stabilité.',
      },
      {
        title: 'Service technique',
        description:
          'Diagnostic, maintenance, réparation et upgrades avec rapport de travail.',
      },
    ],
    featuredEyebrow: 'Sélection',
    featuredTitle: 'PC assemblés recommandés',
    featuredDescription:
      'Configurations prêtes pour devis, avec pièces équilibrées et tests avant livraison.',
    viewAll: 'Voir toutes les configurations',
    trustEyebrow: 'Confiance',
    trustTitle: 'Pourquoi acheter chez Kronos',
    trustDescription:
      'Nous ne vendons pas seulement des pièces : nous veillons à la compatibilité, aux températures et au support après livraison.',
    assurances: [
      {
        title: 'Performance validée',
        body: 'Chaque build est testé avec de vraies charges, un contrôle thermique et une revue de consommation.',
      },
      {
        title: 'Garantie transparente',
        body: 'Vous recevez le détail des pièces, la couverture et les recommandations de maintenance.',
      },
      {
        title: 'Support humain',
        body: 'Conseil avant achat et suivi après la livraison du système.',
      },
    ],
    serviceEyebrow: 'Service',
    serviceTitle: 'Votre PC a aussi besoin de maintenance professionnelle',
    serviceDescription:
      'Planifiez diagnostic, nettoyage, upgrade ou réparation avec des techniciens qui travaillent chaque jour sur des systèmes haute performance.',
    serviceCta: 'Voir les services',
    serviceAlt: 'Banc professionnel de réparation de PC',
  },
  products: {
    eyebrow: 'Catalogue',
    title: 'Composants pour assembler ou améliorer votre PC',
    description:
      'Inventaire sélectionné pour la compatibilité, la garantie et les performances durables. Demandez un devis pour des pièces ou une configuration complète.',
    filterAria: 'Filtrer par catégorie',
    all: 'Tous',
    count: (count: number) =>
      `${count} produits disponibles pour devis`,
  },
  prebuilts: {
    eyebrow: 'PC assemblés',
    title: 'Configurations prêtes pour devis',
    description:
      'Chaque système combine des pièces compatibles, un bon flux d’air et des tests de stabilité avant livraison.',
    sections: {
      gaming: {
        title: 'Gaming',
        description:
          'FPS élevés, bonne ventilation et marge pour streaming ou multitâche.',
      },
      creator: {
        title: 'Création et workstation',
        description:
          'Mémoire, stockage et stabilité pour de longues charges créatives.',
      },
      office: {
        title: 'Bureau et productivité',
        description:
          'Systèmes silencieux et fiables pour des journées complètes de travail.',
      },
    },
  },
  repair: {
    eyebrow: 'Service technique',
    title:
      'Diagnostic, maintenance et upgrades avec jugement professionnel',
    description:
      'Nous vérifions tout le système, expliquons la cause du problème et proposons des options claires avant toute intervention.',
    heroAlt: 'Technicien réparant un PC sur un banc professionnel',
  },
  about: {
    eyebrow: 'À propos',
    title: 'Une boutique technique pour acheter en confiance',
    description:
      'Kronos PC réunit vente de composants, assemblage professionnel et service technique dans une expérience claire pour gamers, créateurs et équipes de bureau.',
    values: [
      {
        title: 'Compatibilité d’abord',
        body: 'Nous vérifions carte mère, alimentation, boîtier, refroidissement et mémoire avant de recommander un achat.',
      },
      {
        title: 'Tests réels',
        body: 'Chaque PC assemblé passe par stress CPU/GPU, surveillance thermique et contrôle du bruit.',
      },
      {
        title: 'Service responsable',
        body: 'Nous documentons diagnostics, pièces installées et recommandations de maintenance.',
      },
      {
        title: 'Garantie claire',
        body: 'Séparer garantie des pièces, garantie d’assemblage et support évite les surprises après l’achat.',
      },
    ],
    processEyebrow: 'Processus',
    processTitle: 'Du devis à la livraison',
    processDescription:
      'L’objectif est que le système corresponde à votre usage, pas seulement qu’il ait des pièces voyantes. Nous vérifions donc compatibilité, bruit, températures et accès à la maintenance.',
    process: [
      'Nous écoutons l’usage réel et le budget.',
      'Nous proposons des pièces compatibles avec marge d’évolution.',
      'Nous assemblons, organisons les câbles et validons les températures.',
      'Nous livrons le PC avec recommandations de soin et support.',
    ],
    labTitle: 'Atelier et banc de test internes',
    labDescription:
      'Avoir le service technique dans la boutique aide à détecter les incompatibilités, alimentations à la limite, mauvaise ventilation et upgrades inutiles avant qu’ils affectent le client.',
    labAlt: 'Atelier professionnel Kronos PC',
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Demandez un devis pour composants, PC assemblés ou service technique',
    description:
      'Dites-nous ce dont vous avez besoin et nous préparerons une recommandation avec pièces compatibles, délais estimés et couverture.',
    quotesTitle: 'Devis',
    workshopTitle: 'Service en atelier',
    workshopBody:
      'Service sur rendez-vous pour diagnostic, nettoyage et upgrades.',
    usefulTitle: 'Informations utiles',
    usefulBody:
      'Indiquez l’usage principal, le budget, le moniteur/résolution et les pièces actuelles si vous souhaitez améliorer un PC.',
    note:
      'Le formulaire prépare un email avec votre demande pour que vous puissiez l’envoyer depuis votre client de messagerie.',
    name: 'Nom',
    email: 'Email',
    phone: 'Téléphone',
    topic: 'Sujet',
    message: 'Message',
    placeholder:
      'Usage principal, budget, jeux ou programmes, pièces actuelles et date de livraison idéale.',
    submit: 'Préparer la demande',
    sent: 'Demande préparée. Vérifiez votre client email pour l’envoyer.',
    defaultTopic: 'Devis général',
    mailSubject: 'Demande Kronos PC',
    bodyLabels: {
      name: 'Nom',
      email: 'Email',
      phone: 'Téléphone',
      phoneMissing: 'Non indiqué',
      topic: 'Sujet',
    },
  },
  cards: {
    quoteComponent: 'Demander un devis',
    quotePrebuilt: 'Demander un devis',
    scheduleService: 'Planifier le service',
  },
  experience: {
    statusOnline: 'Système en ligne',
    enter: 'Entrer dans la boutique',
    lobbyEyebrow: 'Showroom Kronos',
    deskEyebrow: 'Centre d’assistance',
    deskTitle: 'Conseil technique en direct',
    deskBody:
      'Nous validons compatibilité, températures et performance avant chaque livraison, avec un vrai support humain de bout en bout.',
    deskPoints: [
      'Compatibilité vérifiée',
      'Tests de stabilité réels',
      'Garantie et support clairs',
    ],
    departmentsEyebrow: 'Départements',
    departmentsTitle: 'Parcourez la boutique',
    departmentsBody:
      'Trois zones connectées : composants, systèmes assemblés et laboratoire technique.',
    enterDepartment: 'Entrer dans le département',
    viewDetails: 'Voir les détails',
    close: 'Fermer',
    overview: 'Aperçu',
    specifications: 'Spécifications',
    features: 'Caractéristiques',
    availability: 'Disponibilité',
    selectCategoryAria: 'Sélectionner une catégorie de produits',
    terminalAria: 'Terminal produit',
    catalogStatus: 'Catalogue actif',
  },
} as const

export const translations = { es, en, fr } as const

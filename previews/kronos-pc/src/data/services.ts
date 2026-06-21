import type { RepairServiceItem } from './types'

export const repairServices: RepairServiceItem[] = [
  {
    id: 'srv-diag',
    priceFrom: 49,
    content: {
      es: {
        title: 'Diagnóstico integral',
        description:
          'Revisión completa de hardware, temperaturas, almacenamiento, energía y estabilidad con reporte claro de hallazgos.',
        duration: 'Mismo día',
        includes: ['Prueba de estrés', 'Revisión de temperaturas', 'Reporte de recomendaciones'],
      },
      en: {
        title: 'Full diagnostics',
        description:
          'Complete review of hardware, temperatures, storage, power and stability with a clear findings report.',
        duration: 'Same day',
        includes: ['Stress test', 'Temperature review', 'Recommendation report'],
      },
      fr: {
        title: 'Diagnostic complet',
        description:
          'Révision complète du matériel, des températures, du stockage, de l’énergie et de la stabilité avec rapport clair.',
        duration: 'Même jour',
        includes: ['Test de stress', 'Revue des températures', 'Rapport de recommandations'],
      },
    },
  },
  {
    id: 'srv-hw',
    priceFrom: 89,
    content: {
      es: {
        title: 'Reparación de hardware',
        description:
          'Diagnóstico de fallas físicas, reemplazo de componentes y verificación eléctrica con piezas de calidad.',
        duration: '1 a 3 días',
        includes: ['Inspección de energía', 'Prueba por componente', 'Validación final'],
      },
      en: {
        title: 'Hardware repair',
        description:
          'Physical fault diagnosis, component replacement and electrical verification with quality parts.',
        duration: '1 to 3 days',
        includes: ['Power inspection', 'Component-by-component test', 'Final validation'],
      },
      fr: {
        title: 'Réparation matérielle',
        description:
          'Diagnostic des pannes physiques, remplacement de composants et vérification électrique avec pièces de qualité.',
        duration: '1 à 3 jours',
        includes: ['Inspection électrique', 'Test par composant', 'Validation finale'],
      },
    },
  },
  {
    id: 'srv-sw',
    priceFrom: 69,
    content: {
      es: {
        title: 'Optimización de software',
        description:
          'Limpieza de arranque, drivers correctos, ajustes de estabilidad y reducción de latencia sin cambios riesgosos.',
        duration: 'Mismo día',
        includes: ['Auditoría de inicio', 'Drivers actualizados', 'Perfil de rendimiento'],
      },
      en: {
        title: 'Software optimization',
        description:
          'Startup cleanup, correct drivers, stability tuning and latency reduction without risky changes.',
        duration: 'Same day',
        includes: ['Startup audit', 'Updated drivers', 'Performance profile'],
      },
      fr: {
        title: 'Optimisation logicielle',
        description:
          'Nettoyage du démarrage, pilotes corrects, réglages de stabilité et réduction de latence sans changements risqués.',
        duration: 'Même jour',
        includes: ['Audit du démarrage', 'Pilotes à jour', 'Profil de performance'],
      },
    },
  },
  {
    id: 'srv-clean',
    priceFrom: 59,
    content: {
      es: {
        title: 'Limpieza y mantenimiento',
        description:
          'Limpieza profunda, cambio de pasta térmica, ajuste de ventiladores y mejora del flujo de aire.',
        duration: 'Medio día',
        includes: ['Limpieza interna', 'Pasta térmica premium', 'Curva de ventilación'],
      },
      en: {
        title: 'Cleaning and maintenance',
        description:
          'Deep cleaning, thermal paste replacement, fan tuning and airflow improvement.',
        duration: 'Half day',
        includes: ['Internal cleaning', 'Premium thermal paste', 'Fan curve tuning'],
      },
      fr: {
        title: 'Nettoyage et maintenance',
        description:
          'Nettoyage profond, remplacement de pâte thermique, réglage des ventilateurs et amélioration du flux d’air.',
        duration: 'Demi-journée',
        includes: ['Nettoyage interne', 'Pâte thermique premium', 'Courbe de ventilation'],
      },
    },
  },
  {
    id: 'srv-up',
    priceFrom: 39,
    content: {
      es: {
        title: 'Asesoría de actualización',
        description:
          'Plan de actualización equilibrado para CPU, GPU, fuente, gabinete y refrigeración antes de invertir.',
        duration: 'Sesión programada',
        includes: ['Revisión de compatibilidad', 'Lista de piezas', 'Ruta de upgrade'],
      },
      en: {
        title: 'Upgrade consulting',
        description:
          'Balanced upgrade plan for CPU, GPU, power supply, case and cooling before you invest.',
        duration: 'Scheduled session',
        includes: ['Compatibility review', 'Parts list', 'Upgrade path'],
      },
      fr: {
        title: 'Conseil upgrade',
        description:
          'Plan d’amélioration équilibré pour CPU, GPU, alimentation, boîtier et refroidissement avant investissement.',
        duration: 'Session planifiée',
        includes: ['Revue de compatibilité', 'Liste de pièces', 'Chemin d’upgrade'],
      },
    },
  },
]

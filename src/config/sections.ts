export type SectionConfig = Record<string, boolean>

export const sections = {
  profile: {
    heroActiveLabel: false,
    heroTitle: false,
    heroSubtitle: false,
    heroCtaPrimary: false,
    heroCtaProjects: false,
    heroKpis: false,
    about: true,
    education: true,
    educationDegrees: true,
    educationDiplomasAndCertificates: true,
    educationEvidencePdf: true,
  },
  stack: {
    categories: true,
  },
  trajectory: {
    timeline: true,
    tags: true,
  },
  portfolio: {
    highlights: true,
    role: true,
    tech: true,
    media: true,
  },
  contact: {
    details: true,
    links: true,
  },
} as const satisfies Record<string, SectionConfig>


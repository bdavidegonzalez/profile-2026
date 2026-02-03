export type ExperienceItem = {
  id: string
  role: string
  company: string
  client?: string
  start: string
  end: string
  summary: string[]
  tags: string[]
}

export type EducationItem = {
  id: string
  type: 'degree' | 'diploma' | 'certificate'
  program: string
  institution: string
  start: string
  end: string
  summary?: string
  tags: string[]
}

export type StackCategory = {
  id: string
  title: string
  items: string[]
}

export type ProductItem = {
  id: string
  name: string
  description: string
  highlights: string[]
  role: string[]
  tech: string[]
  links: Array<{ label: string; url: string }>
  media?: {
    title: string
    url: string
    embedUrl?: string
    aspect?: '16/9' | '9/16'
  }
}

export type ContactInfo = {
  email: string
  phone?: string
  location?: string
  links: Array<{ label: string; url: string }>
}

export type AppContent = {
  strings: Record<string, string>
  about: {
    paragraphs: string[]
  }
  stack: {
    categories: StackCategory[]
  }
  portfolio: {
    products: ProductItem[]
  }
  contact: ContactInfo
  experience: ExperienceItem[]
  education: EducationItem[]
}


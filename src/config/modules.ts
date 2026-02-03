export type ModuleId = 'stack' | 'trajectory' | 'portfolio' | 'contact'

export type ModuleConfig = {
  enabled: boolean
}

export type ModulesConfig = Record<ModuleId, ModuleConfig>

/**
 * Toggle visibility of modules (navbar + routes).
 * Later this can be loaded from an API.
 */
export const modules: ModulesConfig = {
  stack: { enabled: true },
  trajectory: { enabled: true },
  portfolio: { enabled: true },
  contact: { enabled: true },
}


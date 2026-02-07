import type { ModulesConfig } from '@/models'

export type { ModuleId, ModuleConfig, ModulesConfig } from '@/models'

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


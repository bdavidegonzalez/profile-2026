export type ModuleId = 'stack' | 'trajectory' | 'portfolio' | 'contact'

export type ModuleConfig = {
  enabled: boolean
}

export type ModulesConfig = Record<ModuleId, ModuleConfig>

export type SectionConfig = Record<string, boolean>

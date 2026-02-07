export type SystemDashboard = {
  uptimePct: number
  latencyMs: number
  threadsStatus: 'ACTIVE' | 'IDLE'
  totalRepos: number
  totalReposDeltaMonth: number
  commitsYtd: number
  commitsAvgPerDay: number
  containers: number
  orchestratedStatus: 'ORCHESTRATED' | 'MANUAL'
  traffic: {
    requests: string
    bandwidth: string
    errorRate: string
    cores: string
  }
  logs: Array<{ time: string; level: 'INFO' | 'SUCCESS'; message: string }>
}

import { sleep } from '@/utils'

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

function randomBetween(min: number, max: number) {
  return Math.round((min + Math.random() * (max - min)) * 100) / 100
}

export const systemApi = {
  async getDashboard(signal?: AbortSignal): Promise<SystemDashboard> {
    await sleep(450)
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError')

    return {
      uptimePct: randomBetween(99.9, 100),
      latencyMs: Math.round(randomBetween(8, 20)),
      threadsStatus: 'ACTIVE',
      totalRepos: 128,
      totalReposDeltaMonth: 12,
      commitsYtd: 4812,
      commitsAvgPerDay: 18,
      containers: 562,
      orchestratedStatus: 'ORCHESTRATED',
      traffic: {
        requests: '142.5k',
        bandwidth: '8.4GB/s',
        errorRate: '0.002%',
        cores: '64x_VIRT',
      },
      logs: [
        { time: '14:23:01', level: 'INFO', message: 'Successfully deployed Kubernetes cluster v1.28 to us-east-1...' },
        { time: '14:15:22', level: 'INFO', message: 'Optimized database query performance by 45% using Redis caching layer...' },
        { time: '13:58:10', level: 'SUCCESS', message: 'Security audit complete. All 256 microservices compliant with SOC2 standards.' },
        { time: '12:44:05', level: 'INFO', message: 'Architecting new event-driven pipeline for Real-time Analytics Dashboard.' },
      ],
    }
  },
}


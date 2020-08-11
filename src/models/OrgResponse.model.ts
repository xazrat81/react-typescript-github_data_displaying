import { Organization } from './Organization.model'

export interface OrgResponse {
  total_count: number
  incomplete_results: boolean
  items: Organization[]
}
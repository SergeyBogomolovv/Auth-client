import { User } from './user'

export interface RefreshResponse {
  accesToken: string
  user: User
}

import { User } from './user'

export interface LoginResponse {
  user: User
  accesToken: string
}

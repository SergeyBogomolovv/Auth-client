export interface User {
  id: string
  name: string
  email: string
  roles: [UserRole]
  image: string
  createdAt: string
  emailVerified: Date | null
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

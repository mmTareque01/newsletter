export interface EmailOptions {
  bcc: string[]
  subject: string
  body: string
}

export type EmailResult =
  | {
      success: true
      message: string
    }
  | {
      success: false
      message: string
      error: string
    }

export interface FailedMailEntry {
  from: string | undefined
  to: string
  subject: string
  body: string
  error: string
  date: Date
}

export interface GmailSMTPConfig {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
  logger?: boolean
  debug?: boolean
  tls?: {
    rejectUnauthorized?: boolean
  }
}

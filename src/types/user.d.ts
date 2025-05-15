// GOOD (global declaration)
declare global {
  interface UserType {
    email: string;
    firstName: string | null;
    lastName: string | null;
  }
}

export {}
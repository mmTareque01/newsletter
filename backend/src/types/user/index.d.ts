// GOOD (global declaration)
declare global {
  interface UserType {
    id:string;
    email: string;
    firstName: string | null;
    lastName: string | null;
  }
}

export {}
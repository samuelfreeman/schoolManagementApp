/**
 * @type Across the recact app, we will use the following types
 *
 */
/**
 * @interface Admin
 */
interface Admin {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface otp {
  otp: string;
}
/**
 * @interface Global Store types
 */
interface AuthToken {
  token: string;
  setToken: (token: string) => void;
  clearToken: () => void;
}
interface VerifyUser {
  email: string;
  setEmail: (email: string) => void;
  clearEmail: () => void;
}

/**
 * @interface Students
 */
interface Student {
  firstName: string;
  lastName: string;
  otherName: string;
  gender: Gender;
  photoUrl: string;
  photoKey: string;
  studentId: string;
  password: string;
  contact: string;
  subject: Subject[];
}

type Gender = {
  male: string;
  female: string;
};
type Subject = {
  ENGLISH: string;
  MATHEMATICS: string;
  SCIENCE: string;
  SOCIAL_STUDIES: string;
  KISWAHILI: string;
};

/**
 * @interface Tutor
 */
interface Tutor {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  password: string;
  contact: string;
  registeredCode: string;
}

/**
 * @Global types
 * @type {Admin}
 */
type CreateAdmin = Omit<Admin, "id">;
type LoginAdmin = Pick<Admin, "email" | "password">;
type UpdateAdmin = Partial<Admin>;
type AdminTable = Admin;
// Forgot password flow
type ForgotPassword = Pick<User, "email">;
type ResendOTP = Pick<User, "email">;
type ResetPassword = {
  email?: string;
  otp: string;
  newPassword: string;
  token: string;
};

/**
 * @Global types
 * @type {Student}
 */
type CreateStudent = Omit<Student, "studentId">;
type UpdateStudent = Partial<Student>;
type StudentTable = Student;

/**
 * @Global types
 * @type {Tutor}
 */
type CreateTutor = Omit<Tutor, "id">;
type UpdateTutor = Partial<Tutor>;
type TutorTable = Tutor;

/**
 * @Errors
 * @type {Error}
 */
type Errors = {
  response: {
    data: {
      status: number;
      message: string;
    };
  };
};

/**
 * @External props
 */
interface HeaderProps {
  title: string;
  description: string;
  className?: string;
  buttons: ButtonInfo[];
}

import AuthLayout from "@/pages/auth/auth.layout";
import NotFound from "@/pages/not-found";
import RootLayout from "@/pages/root.layout";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { AdminProtectedPage, VerifyUserOTPProtected } from "./protected.routes";

const rootRoutes = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<RootLayout />}>
        {/* Auth Routes */}
        <Route path="/" element={<AuthLayout />}>
          {/* Login page */}
          <Route
            index
            lazy={async () => {
              const { default: Login } = await import(
                "@/pages/auth/login/login"
              );
              return { Component: Login };
            }}
          />
          {/* OTP Verify */}
          <Route element={<VerifyUserOTPProtected />}>
            <Route
              path="admin/otp-verify"
              lazy={async () => {
                const { default: LoginOtpForm } = await import(
                  "@/pages/auth/login/login-otp-form"
                );
                return { Component: LoginOtpForm };
              }}
            />
          </Route>
          {/* Signup page */}
          <Route
            path="signup"
            lazy={async () => {
              const { default: Register } = await import(
                "@/pages/auth/signup/signup"
              );
              return { Component: Register };
            }}
          />
          {/* Forgot password */}
          <Route
            path="forgot-password"
            lazy={async () => {
              const { default: ForgotPassword } = await import(
                "@/pages/auth/forgot-password/forgot-password"
              );
              return { Component: ForgotPassword };
            }}
          />
          {/* Verify OTP */}
          <Route
            path="verify-otp"
            lazy={async () => {
              const { default: VerifyOTP } = await import(
                "@/pages/auth/forgot-password/verify-otp"
              );
              return { Component: VerifyOTP };
            }}
          />
          {/* Reset password */}
          <Route
            path="reset-password/:token"
            lazy={async () => {
              const { default: ResetPassword } = await import(
                "@/pages/auth/forgot-password/reset-password"
              );
              return { Component: ResetPassword };
            }}
          />
          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* Admin Routes */}
        <Route element={<AdminProtectedPage />}>
          <Route
            path="admin"
            lazy={async () => {
              const { default: AdminLayout } = await import(
                "@/pages/admin/pages/admin.layout"
              );
              return { Component: AdminLayout };
            }}
          >
            {/* Dashboard */}
            <Route
              index
              lazy={async () => {
                const { default: Dashboard } = await import(
                  "@/pages/admin/pages/dashboard/dashboard"
                );
                return { Component: Dashboard };
              }}
            />
            {/* Admins */}
            <Route
              path="admins"
              lazy={async () => {
                const { default: AdminsLayout } = await import(
                  "@/pages/admin/pages/admins/index"
                );
                return { Component: AdminsLayout };
              }}
            >
              <Route
                index
                lazy={async () => {
                  const { default: Admins } = await import(
                    "@/pages/admin/pages/admins/admins"
                  );
                  return { Component: Admins };
                }}
              />
              {/* Add */}
              <Route
                path="add"
                lazy={async () => {
                  const { default: AddAdmin } = await import(
                    "@/pages/admin/pages/admins/add/add-admin"
                  );
                  return { Component: AddAdmin };
                }}
              />
              {/* Edit */}
              <Route
                path="edit/:id"
                lazy={async () => {
                  const { default: EditAdmin } = await import(
                    "@/pages/admin/pages/admins/edit/edit-admin"
                  );
                  return { Component: EditAdmin };
                }}
              />
            </Route>
            {/* Tutors */}
            <Route
              path="tutors"
              lazy={async () => {
                const { default: TutorsLayout } = await import(
                  "@/pages/admin/pages/tutors/index"
                );
                return { Component: TutorsLayout };
              }}
            >
              <Route
                index
                lazy={async () => {
                  const { default: Tutors } = await import(
                    "@/pages/admin/pages/tutors/tutors"
                  );
                  return { Component: Tutors };
                }}
              />
              {/* Add */}
              <Route
                path="add"
                lazy={async () => {
                  const { default: AddTutor } = await import(
                    "@/pages/admin/pages/tutors/add/add-tutor"
                  );
                  return { Component: AddTutor };
                }}
              />
              {/* Edit*/}
              <Route
                path="edit/:id"
                lazy={async () => {
                  const { default: EditTutor } = await import(
                    "@/pages/admin/pages/tutors/edit/edit-tutor"
                  );
                  return { Component: EditTutor };
                }}
              />
            </Route>
            {/* Students */}
            {/* Classes */}
            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  )
);

export default rootRoutes;

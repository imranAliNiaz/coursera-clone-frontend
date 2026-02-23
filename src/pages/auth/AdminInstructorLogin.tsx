import React from "react";
import { IMAGES } from "../../constants/images";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import useAdminInstructorLogin from "./useAdminInstructorLogin";

interface Props {
  expectedRole?: "admin" | "instructor";
}

const AdminInstructorLogin: React.FC<Props> = ({ expectedRole }) => {
  const { email, error, handleSubmit, isLoading, password, setEmail, setPassword } =
    useAdminInstructorLogin({ expectedRole });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface px-4 font-sans">
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm border border-border w-full max-w-md">
        <div className="text-center mb-8">
          <img src={IMAGES.LOGO} alt="Coursera" className="h-8 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            {expectedRole
              ? `${expectedRole.charAt(0).toUpperCase() + expectedRole.slice(1)} Login`
              : "Portal Access"}
          </h1>
          <p className="text-text-secondary text-sm">
            For Admins and Instructors only
          </p>
        </div>

        {error && (
          <div className="bg-learn-error-bg-light text-error text-sm p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-8 text-center border-t border-border-light pt-6">
          <p className="text-xs text-text-secondary">
            Not an admin or instructor?{" "}
            <a href="/" className="text-primary hover:underline font-medium">
              Go to Home
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminInstructorLogin;

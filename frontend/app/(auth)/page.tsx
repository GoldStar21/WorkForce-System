import Link from "next/link";
import LoginForm from "@/components/(login_&_password)/LoginForm";

const LoginPage = () => {
  return (
    <main className="login">
      <div className="login__card">
        <h1 className="login__title">Login form</h1>
        <LoginForm />
        <div className="login__forgottenPasswordLink">
          <Link href="" className="login__forgottenPasswordText">
            Forgot my password!
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;

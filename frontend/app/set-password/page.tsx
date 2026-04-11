"use client";

import CreatePassword from "@/components/(login_&_password)/CreatePassword";

const SetPassword = () => {
  return (
    <main className="login">
      <div className="login__card">
        <h1 className="login__title">Password create</h1>
        <CreatePassword />
      </div>
    </main>
  );
};

export default SetPassword;

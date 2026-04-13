"use client";

import CreatePassword from "@/components/(login_&_password)/CreatePassword";
import { Suspense } from "react";

const SetPassword = () => {
  return (
    <main className="login">
      <div className="login__card">
        <h1 className="login__title">Password create</h1>
        <Suspense fallback={null}>
      <CreatePassword />
    </Suspense>
      </div>
    </main>
  );
};

export default SetPassword;

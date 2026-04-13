"use client";

import { FaRegEyeSlash } from "react-icons/fa";
import Button from "../Button";
import { usePasswodHook } from "@/hooks/usePasswordHook";

const CreatePassword = () => {

  

    const { password, setPassword, confirmPassword, setConfirmPassword, handleRegister } =
    usePasswodHook();


  return (
    <form className="form" autoComplete="off" onSubmit={handleRegister}>
      <div className="form__group">
        <input
          type="password"
          placeholder="Enter your future password"
          className="form__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <FaRegEyeSlash className="form__icons" />
      </div>

      <div className="form__group">
        <input
          type="password"
          placeholder="Repeat your future password"
          className="form__input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <FaRegEyeSlash className="form__icons" />
      </div>
      <div className="form__group">
        <label>
          <input type="checkbox" />
          See the password
        </label>
      </div>
      <Button label="Register" type="submit" modifier="button--login" />
    </form>
  );
};

export default CreatePassword;

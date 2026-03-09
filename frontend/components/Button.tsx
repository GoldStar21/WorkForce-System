"use client";

interface ButtonProps {
  label: React.ReactNode;
  modifier?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  modifier = "",
  type = "button",
  onClick
}) => {
  return (
    <button type={type} className={`button ${modifier}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;

const FormButton = ({
  children,
  extraClass = "",
  type = "button",
  onClick,
  disabled,
}) => {
  return (
    <button
      type={type}
      className={`${extraClass} mt-8 rounded-lg bg-primary py-[6px] 400px:py-[8px] px-[8px] 400px:px-[12px] font-medium text-white text-[14px] disabled:bg-primary/[0.6]`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default FormButton;

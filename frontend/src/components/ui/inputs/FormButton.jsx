


const FormButton = ({ children,extraClass="",type="button",onClick,disabled}) => {
  return (
    <button
      type={type}
      className={`${extraClass} mt-8 rounded-lg bg-[#FF725E] py-[6px] 400px:py-[8px] px-[8px] 400px:px-[12px] font-medium text-white text-[14px] 400px:text-base disabled:bg-[#FF725E]/[0.8]`}
      onClick={onClick}
      disabled={disabled}
    >
     {children} 
    </button>
  );
};

export default FormButton;




const FormButton = ({ children,extraClass="",type="button",onClick}) => {
  return (
    <button
      type={type}
      className={`${extraClass} mt-8 rounded-lg bg-yellow py-[6px] 400px:py-[8px] px-[8px] 400px:px-[12px] font-medium text-richblack-900 text-[14px] 400px:text-base`}
      onClick={onClick}
    >
     {children} 
    </button>
  );
};

export default FormButton;

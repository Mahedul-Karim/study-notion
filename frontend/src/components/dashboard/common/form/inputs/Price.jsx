import React from 'react'
import Input from '../../../../ui/inputs/Input'

const Price = ({register,errors}) => {
  return (
    <div>
    <Input
      label={"Course Price"}
      required
      placeholder={"Enter Course Price"}
      type={"text"}
      register={register}
      
    />
    {errors?.price && (
        <p className="text-sm mt-2 text-pink-200">
          {errors?.price?.message}
        </p>
      )}
  </div>
  )
}

export default Price
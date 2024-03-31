import React from 'react'
import Button from '../../ui/Button'
import { FaRegEdit } from 'react-icons/fa'

const SettingButton = () => {
  return (
    <div>
          <Button
            to={"/dashboard/user/settings"}
            yellow
            extraClass="!py-2 flex items-center gap-2"
          >
            Edit
            <span>
              <FaRegEdit />
            </span>
          </Button>
        </div>
  )
}

export default SettingButton
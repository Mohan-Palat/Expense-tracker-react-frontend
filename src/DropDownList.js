import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const categoryOptions = [
  {

    value: 'Rent',
  },
  {

    value: 'Car',
  },
  {

    value: 'Food',
  },
  {

    value: 'Phone',
  },
]

const DropdownExampleSelection = () => (
  <Dropdown
    placeholder='Select Category'
    fluid
    selection
    options={categoryOptions}
  />
)

export default DropdownExampleSelection

import './Apply.css'
import React, { useState } from 'react';
import { numberOfApplicants } from '../../globals/constants'
import Select from 'react-select';
const Apply = () => {
  const [step, setStep] = useState(1);
  const [numberApplicants, setNumberApplicants] = useState(null);
  const handleNumberChange = (selectedOption) => {
    console.log(selectedOption)
    setNumberApplicants(selectedOption)
  }

  return (
    <div className='apply'>
      <div class="container container-wide">
        <div className='apply_stepper row'>
          <div className={'apply_stepper_item col-md-2 ' + (step >= 1 ? 'active' : '')}>
            <div className='apply_stepper_item_number'>
              <span>1</span>
              <div className='apply_stepper_item_number--line'></div>
            </div>
            <div className='apply_stepper_item_text'>Service Type</div>
          </div>
          <div className={'apply_stepper_item col-md-2 ' + (step >= 2 ? 'active' : '')}>
            <div className='apply_stepper_item_number'>
              <span>2</span>
              <div className='apply_stepper_item_number--line'></div>
            </div>
            <div className='apply_stepper_item_text'>Your Information</div>
          </div>
          <div className={'apply_stepper_item col-md-2 ' + (step >= 3 ? 'active' : '')}>
            <div className='apply_stepper_item_number'>
              <span>3</span>
              <div className='apply_stepper_item_number--line'></div>
            </div>
            <div className='apply_stepper_item_text'>Payment</div>
          </div>
          <div className={'apply_stepper_item col-md-2 ' + (step >= 4 ? 'active' : '')}>
            <div className='apply_stepper_item_number'>
              <span>4</span>
            </div>
            <div className='apply_stepper_item_text'>Confirmation</div>
          </div>
        </div>
        <div className='container'>
          <div className='apply_body row'>
            <div className='apply_body_form col-md-8'>
              <div className='apply_body_form--title'>Visa application form</div>
              <div className='row apply_body_form_input'>
                <div class="col-lg-6 mb-3">
                  <div className='apply_body_form_input--label'>
                    Number of Applicants
                    <span className='apply_body_form_input--required'>*</span>
                  </div>
                  <div className='input-group'>
                    <Select
                      value={numberApplicants}
                      onChange={handleNumberChange}
                      options={numberOfApplicants.map((data) => ({ value: data, label: data }))}
                      isSearchable={false}
                      placeholder={''}
                    />
                  </div>
                </div>
                <div class="col-lg-6 mb-3"></div>
              </div>
              <div className='row'></div>
              <div className='row'></div>
              <div className='row'></div>
            </div>
            <div className='apply_body_info col-md-4'></div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Apply;
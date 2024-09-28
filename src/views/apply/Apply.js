import './Apply.css'
import React, { useState } from 'react';
import { numberOfApplicants, lengthOfVisa, purposeOfTravel, portList, processingTimeList, esimTypeList } from '../../globals/constants'
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import dayjs from 'dayjs';
import TimePicker from 'rc-time-picker';
import PhoneInput from 'react-phone-number-input'
import TermsAndConditions from '../../components/TermsAndConditions'
import ApplicantModal from '../../components/modals/ApplicantModal'

const Apply = () => {
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({
    mode: 'all'
  });
  const eSimList = esimTypeList.map((i, index) => ({ value: i.value, label: `${i.label} | ${i.price}USD` }))
  const [step, setStep] = useState(1);
  const [indexApplicant, setIndexApplicant] = useState(0);
  const [completeStep, setCompleteStep] = useState(0);
  const [numberApplicants, setNumberApplicants] = useState(null);
  const [lengthVisa, setLengthVisa] = useState(lengthOfVisa[[0]]);
  const [purposeTravel, setPurposeTravel] = useState(purposeOfTravel[[0]]);
  const [entryDate, setEntryDate] = useState(null);
  const [exitDate, setExitDate] = useState(null);
  const [arrivalPort, setArrivalPort] = useState(null);
  const [exitPort, setExitPort] = useState(null);
  const [flightNumber, setFlightNumber] = useState('');
  const [processingTime, setProcessingTime] = useState(processingTimeList[0].value);
  const [promotionCode, setPromotionCode] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    fullName: '',
    phone: '',
    primaryEmail: '',
    secondaryEmail: '',
    confirmCorrect: false,
    readTermsAndCondition: false,
    applicants: []
  });
  
  const [arrivalFastTrack, setArrivalFastTrack] = useState({
    checked: false,
    arrivalTime: null,
    flightNumber: '',
    type: null
  })
  const [carPickup, setCarPickup] = useState({
    checked: false,
    dropOffPoint: '',
    typeOfCar: null
  })
  const [eSIM, setESIM] = useState({
    checked: false,
    quantity: null,
    type: eSimList[0]
  })

  const [applicantSelected, setApplicantSelected] = useState({
    fullLegalName: '',
    dateOfBirth: null,
    gender: null,
    nationality: null,
    passportNumber: '',
    expiredDate: null,
    photoOfPassport: null,
    portraitPhoto: null
  })
  
  const handleFocus = (e) => {
    const { target } = e;
    if (target) {
      target.readOnly = true;  // -------> this for all others
    }
  };
  const handleBackClick = () => {
    setCompleteStep(completeStep - 1)
    setStep(step - 1)
  }

  const openNewApplicant = () => {
    setIndexApplicant(contactInfo.applicants.length)
    setApplicantSelected({
      fullLegalName: '',
      dateOfBirth: null,
      gender: null,
      nationality: null,
      passportNumber: '',
      expiredDate: null,
      photoOfPassport: null,
      portraitPhoto: null
    })
    setTimeout(() => {
      setModalIsOpen(true)
    }, 200);
  }

  function submitHandler(formData){
    switch (step) {
      case 1:
        setCompleteStep(1)
        setStep(2)
        if (contactInfo.applicants.length < numberApplicants.value) {
          openNewApplicant()
        }
        break;
    
      default:
        break;
    }
  }

  const onProcessingTimeChanged = (e) => {
    setProcessingTime(Number(e.currentTarget.value))
  }

  const submitErrorHandler = (errs) => {
    const errorsvalues = Object.values(errs)
    if (errorsvalues.length) {
      let firstErrorElement = document.getElementsByName(errorsvalues[0].ref.name)[0];
      firstErrorElement.parentElement.scrollIntoView({ behavior: `smooth`, block: 'center'});
    }
  }

  const closeModal = (params) => {
    if (!Array.from(params.target.classList).includes('ReactModal__Overlay')) setModalIsOpen(false)
  }

  const submitModal = async (data) => {
    const newData = { ...data }
    newData.photoOfPassportBase64 = await convertImageToBase64(newData.photoOfPassport)
    newData.portraitPhotoBase64 = await convertImageToBase64(newData.portraitPhoto)
    const applicants = JSON.parse(JSON.stringify(contactInfo.applicants))
    if (applicants[indexApplicant]) {
      applicants[indexApplicant] = newData
    } else {
      applicants.push(newData)
    }

    setContactInfo({ ...contactInfo, applicants })
    setModalIsOpen(false)
  }

  const editApplicant = (applicant, index) => {
    setIndexApplicant(index)
    setApplicantSelected({
      ...applicant
    })
    setTimeout(() => {
      setModalIsOpen(true)
    }, 200);
  }

  const convertImageToBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result) ;
      }, false);
      reader.readAsDataURL(file)
    })
  }

  return (
    <div className='apply'>
      <div className="container-wide">
        <div className='apply_stepper row'>
          <div className={'apply_stepper_item col-md-2 col-3 ' + (step >= 1 ? 'active ' : '') + (completeStep >= 1 ? 'complete' : '')}>
            <div className='apply_stepper_item_number'>
              { completeStep >= 1 ? <i className="fa-solid fa-check"></i> : <span>1</span>}
              <div className='apply_stepper_item_number--line'></div>
            </div>
            <div className='apply_stepper_item_text'>Service Type</div>
          </div>
          <div className={'apply_stepper_item col-md-2 col-3 ' + (step >= 2 ? 'active ' : '') + (completeStep >= 2 ? 'complete' : '')}>
            <div className='apply_stepper_item_number'>
              { completeStep >= 2 ? <i className="fa-solid fa-check"></i> : <span>2</span>}
              <div className='apply_stepper_item_number--line'></div>
            </div>
            <div className='apply_stepper_item_text'>Your Information</div>
          </div>
          <div className={'apply_stepper_item col-md-2 col-3 ' + (step >= 3 ? 'active ' : '') + (completeStep >= 3 ? 'complete' : '')}>
            <div className='apply_stepper_item_number'>
              { completeStep >= 3 ? <i className="fa-solid fa-check"></i> : <span>3</span>}
              <div className='apply_stepper_item_number--line'></div>
            </div>
            <div className='apply_stepper_item_text'>Payment</div>
          </div>
          <div className={'apply_stepper_item col-md-2 col-3 ' + (step >= 4 ? 'active ' : '') + (completeStep >= 4 ? 'complete' : '')}>
            <div className='apply_stepper_item_number'>
              { completeStep >= 4 ? <i className="fa-solid fa-check"></i> : <span>4</span>}
            </div>
            <div className='apply_stepper_item_text'>Confirmation</div>
          </div>
        </div>
        <div className='container'>
          <div className='apply_body row'>
            <div className='apply_body_form col-md-8'>
              <form onSubmit={handleSubmit(submitHandler, submitErrorHandler)} >
                { step > 1 && <button type='button' className='btn btn-outline-danger back-button' onClick={handleBackClick}>&lt; Previous</button> }
                { step === 1 && (<>
                  <div className='apply_body_form--title'>Visa application form</div>
                  <div className='row apply_body_form_input'>
                    <div className="col-lg-6 mb-3">
                      <div className='form_input--label'>
                        Number of Applicants
                        <span className='form_input--required'>*</span>
                      </div>
                      <div className='input-group'>
                        <Controller
                          control={control}
                          defaultValue={numberApplicants}
                          name="numberOfApplicants"
                          rules={{
                            required: {
                              value: true,
                              message: "This field is required!",
                            },
                          }}
                          render={({ field: { onChange, onBlur, value, ref, name } }) => (
                            <Select
                              name={name}
                              defaultValue={numberApplicants}
                              onChange={(value) => {
                                setNumberApplicants(value)
                                onChange(value)
                              }}
                              options={numberOfApplicants.map((data) => ({ value: data, label: data }))}
                              isSearchable={false}
                              placeholder={''}
                              className={'react-select--custom ' + (errors.numberOfApplicants ? 'error' : '')}
                              onBlur={onBlur}
                            />
                          )}
                        />
                        { errors.numberOfApplicants ? (<span className='error-message'>{ errors.numberOfApplicants.message }</span>) : null }
                      </div>
                    </div>
                    <div className="col-lg-6 mb-3">
                      <div className='form_input--label'>
                        Length of visa
                        <span className='form_input--required'>*</span>
                      </div>
                      <div className='input-group'>
                        <Select
                          defaultValue={lengthVisa}
                          onChange={(value) => setLengthVisa(value)}
                          options={lengthOfVisa}
                          isSearchable={false}
                          placeholder={''}
                          className='react-select--custom'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='row apply_body_form_input'>
                    <div className="col-lg-6 mb-3">
                      <div className='form_input--label'>
                        Purpose of travel
                        <span className='form_input--required'>*</span>
                      </div>
                      <div className='input-group'>
                        <Select
                          defaultValue={purposeTravel}
                          onChange={(value) => setPurposeTravel(value)}
                          options={purposeOfTravel}
                          isSearchable={false}
                          placeholder={''}
                          className='react-select--custom'
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-6 mb-3">
                      <div className='form_input--label'>
                        Entry date
                        <span className='form_input--required'>*</span>
                      </div>
                      <div className='input-group'>
                        <Controller
                          control={control}
                          defaultValue={entryDate}
                          name="entryDate"
                          rules={{
                            required: {
                              value: true,
                              message: "This field is required!",
                            },
                          }}
                          render={({ field: { onChange, onBlur, value, ref, name } }) => (
                            <DatePicker
                              name={name}
                              selected={entryDate}
                              onChange={(value) => {
                                setEntryDate(value)
                                onChange(value)
                              }}
                              placeholderText="YYYY-MM-DD"
                              className={'react-datePicker--custom ' + (errors.entryDate ? 'error' : '')}
                              onBlur={onBlur}
                              dateFormat="yyyy-MM-dd"
                              onFocus={handleFocus}
                              minDate={ dayjs().toDate() }
                            />
                          )}
                        />
                        { errors.entryDate ? (<span className='error-message'>{ errors.entryDate.message }</span>) : null }
                      </div>
                    </div>
                    <div className="col-lg-3 col-6 mb-3">
                      <div className='form_input--label'>
                        Exit date
                        <span className='form_input--required'>*</span>
                      </div>
                      <div className='input-group'>
                        <Controller
                          control={control}
                          selected={exitDate}
                          name="exitDate"
                          rules={{
                            required: {
                              value: true,
                              message: "This field is required!",
                            },
                          }}
                          render={({ field: { onChange, onBlur, value, ref, name } }) => (
                            <DatePicker
                              name={name}
                              selected={exitDate}
                              onChange={(value) => {
                                setExitDate(value)
                                onChange(value)
                              }}
                              placeholderText="YYYY-MM-DD"
                              className={'react-datePicker--custom ' + (errors.exitDate ? 'error' : '')}
                              onBlur={onBlur}
                              dateFormat="yyyy-MM-dd"
                              onFocus={handleFocus}
                              minDate={ dayjs().toDate() }
                            />
                          )}
                        />
                        { errors.exitDate ? (<span className='error-message'>{ errors.exitDate.message }</span>) : null }
                      </div>
                    </div>
                  </div>
                  <div className='row apply_body_form_input'>
                    <div className="col-lg-6 mb-3">
                      <div className='form_input--label'>
                        Arrival port
                        <span className='form_input--required'>*</span>
                      </div>
                      <div className='input-group'>
                        <Controller
                          control={control}
                          defaultValue={arrivalPort}
                          name="arrivalPort"
                          rules={{
                            required: {
                              value: true,
                              message: "This field is required!",
                            },
                          }}
                          render={({ field: { onChange, onBlur, value, ref, name } }) => (
                            <Select
                              name={name}
                              defaultValue={arrivalPort}
                              onChange={(value) => {
                                setArrivalPort(value)
                                onChange(value)
                              }}
                              options={portList}
                              isSearchable={true}
                              placeholder={''}
                              className={'react-select--custom ' + (errors.arrivalPort ? 'error' : '')}
                              onBlur={onBlur}
                            />
                          )}
                        />
                        { errors.arrivalPort ? (<span className='error-message'>{ errors.arrivalPort.message }</span>) : null }
                      </div>
                    </div>
                    <div className="col-lg-6 mb-3">
                      <div className='form_input--label'>
                        Exit through checkpoint
                        <span className='form_input--required'>*</span>
                      </div>
                      <div className='input-group'>
                        <Controller
                          control={control}
                          defaultValue={exitPort}
                          name="exitPort"
                          rules={{
                            required: {
                              value: true,
                              message: "This field is required!",
                            },
                          }}
                          render={({ field: { onChange, onBlur, value, ref, name } }) => (
                            <Select
                              name={name}
                              defaultValue={exitPort}
                              onChange={(value) => {
                                setExitPort(value)
                                onChange(value)
                              }}
                              options={portList}
                              isSearchable={true}
                              placeholder={''}
                              className={'react-select--custom ' + (errors.exitPort ? 'error' : '')}
                              onBlur={onBlur}
                            />
                          )}
                        />
                        { errors.exitPort ? (<span className='error-message'>{ errors.exitPort.message }</span>) : null }
                      </div>
                    </div>
                  </div>
                  <div className='row apply_body_form_input'>
                    <div className="col-lg-6 mb-3">
                      <div className='form_input--label'>
                        Processing time
                        <span className='form_input--required'>*</span>
                      </div>
                      <div className='input-group'>
                        {
                          processingTimeList.map((item, index) => (<div key={index} className='redio_group_container'>
                            <div className='redio_group'>
                              <input
                                type="radio"
                                name="processingTime"
                                value={item.value}
                                checked={item.value === processingTime}
                                onChange={onProcessingTimeChanged}
                                id={`processingTime_${item.value}`}
                              />
                              <label className='label_text' htmlFor={`processingTime_${item.value}`}>
                                <strong>{ item.label }</strong> ({ item.summary }) { item.price > 0 ? `+${item.price}` : '0' }USD
                              </label>
                            </div>
                            { item.value === processingTime || index === processingTimeList.length - 1 ? (
                              <div className='custom_tooltip' dangerouslySetInnerHTML={{ __html: item.description }}></div>
                            ) : null }
                          </div>)) 
                        }
                      </div>
                    </div>
                    <div className="col-lg-6 mb-3">
                      { entryDate ? (<>
                        <div className='form_input--label'>
                          Flight number
                        </div>
                        <div className='input-group'>
                          <input className='text_input' type='text' value={flightNumber} onChange={(e) => setFlightNumber(e.currentTarget.value)} />
                        </div>
                      </>) : null }
                    </div>
                  </div>
                  <div className='apply_body_form--title mt-3'>ADD-ON SERVICES</div>
                  <div className='apply_body_form_input mb-3'>
                    <div className='checkbox_group'>
                      <input type="checkbox"
                        defaultChecked={arrivalFastTrack.checked}
                        onChange={(e) => setArrivalFastTrack({ ...arrivalFastTrack, checked: e.target.checked })}
                        id='arrivalFastTrack'
                      />
                      <label className='label_text' htmlFor='arrivalFastTrack'>
                        <strong>Arrival Fast track</strong>
                      </label>
                    </div>
                    { arrivalFastTrack.checked ? (
                      <div className='row mt-2'>
                        <div className="col-lg-3 mb-3">
                          <div className='form_input--label'>
                            Arrival time
                            <span className='form_input--required'>*</span>
                          </div>
                          <div className='input-group'>
                            <Controller
                              control={control}
                              defaultValue={arrivalFastTrack.arrivalTime}
                              name="arrivalTime"
                              rules={{
                                required: {
                                  value: true,
                                  message: "This field is required!",
                                },
                              }}
                              render={({ field: { onChange, onBlur, value, ref, name } }) => (
                                <TimePicker
                                  name={name}
                                  showSecond={false}
                                  value={arrivalFastTrack.arrivalTime}
                                  onChange={(value) => {
                                    setArrivalFastTrack({...arrivalFastTrack, arrivalTime: value})
                                    onChange(value)
                                  }}
                                  placeholderText=""
                                  className={'react-timePicker--custom ' + (errors.arrivalTime ? 'error' : '')}
                                  onBlur={onBlur}
                                  format="HH:mm"
                                  onFocus={handleFocus}
                                  clearIcon={<></>}
                                />
                              )}
                            />
                            { errors.arrivalTime ? (<span className='error-message'>{ errors.arrivalTime.message }</span>) : null }
                          </div>
                        </div>
                        <div className="col-lg-3 mb-3">
                          <div className='form_input--label'>
                            Flight number
                            <span className='form_input--required'>*</span>
                          </div>
                          <div className='input-group'>
                            <Controller
                              control={control}
                              defaultValue={arrivalFastTrack.flightNumber}
                              name="flightNumber"
                              rules={{
                                required: {
                                  value: true,
                                  message: "This field is required!",
                                },
                              }}
                              render={({ field: { onChange, onBlur, value, ref, name } }) => (
                                <input
                                  name={name}
                                  className={'text_input ' + (errors.flightNumber ? 'error' : '')}
                                  type='text'
                                  value={arrivalFastTrack.flightNumber}
                                  onChange={(e) => {
                                    setArrivalFastTrack({...arrivalFastTrack, flightNumber: e.currentTarget.value})
                                    onChange(e.currentTarget.value)
                                  }}
                                  onBlur={onBlur}
                                />
                              )}
                            />
                            { errors.flightNumber ? (<span className='error-message'>{ errors.flightNumber.message }</span>) : null }
                          </div>
                        </div>
                        <div className="col-lg-6 mb-3">
                          <div className='form_input--label'>
                            Type
                            <span className='form_input--required'>*</span>
                          </div>
                          <div className='input-group'>
                            <Controller
                              control={control}
                              defaultValue={arrivalFastTrack.type}
                              name="type"
                              rules={{
                                required: {
                                  value: true,
                                  message: "This field is required!",
                                },
                              }}
                              render={({ field: { onChange, onBlur, value, ref, name } }) => (
                                <Select
                                  name={name}
                                  defaultValue={arrivalFastTrack.type}
                                  onChange={(value) => {
                                    setArrivalFastTrack({...arrivalFastTrack, type: value})
                                    onChange(value)
                                  }}
                                  options={[]}
                                  isSearchable={false}
                                  placeholder={''}
                                  className={'react-select--custom ' + (errors.type ? 'error' : '')}
                                  onBlur={onBlur}
                                />
                              )}
                            />
                            { errors.type ? (<span className='error-message'>{ errors.type.message }</span>) : null }
                          </div>
                        </div>
                      </div>
                    ) : null }
                  </div>
                  <div className='apply_body_form_input mb-3'>
                    <div className='checkbox_group'>
                      <input type="checkbox"
                        defaultChecked={carPickup.checked}
                        onChange={(e) => setCarPickup({...carPickup, checked: e.target.checked})}
                        id='carPickup'
                      />
                      <label className='label_text' htmlFor='carPickup'>
                        <strong>Car Pick up</strong>
                      </label>
                    </div>
                    { carPickup.checked ? (
                      <div className='row mt-2'>
                        <div className="col-lg-6 mb-3">
                          <div className='form_input--label'>
                            Drop off point
                            <span className='form_input--required'>*</span>
                          </div>
                          <div className='input-group'>
                            <Controller
                              control={control}
                              defaultValue={carPickup.dropOffPoint}
                              name="dropOffPoint"
                              rules={{
                                required: {
                                  value: true,
                                  message: "This field is required!",
                                },
                              }}
                              render={({ field: { onChange, onBlur, value, ref, name } }) => (
                                <input
                                  name={name}
                                  className={'text_input ' + (errors.dropOffPoint ? 'error' : '')}
                                  type='text'
                                  value={carPickup.dropOffPoint}
                                  onChange={(e) => {
                                    setCarPickup({...carPickup, dropOffPoint: e.currentTarget.value})
                                    onChange(e.currentTarget.value)
                                  }}
                                  onBlur={onBlur}
                                />
                              )}
                            />
                            { errors.dropOffPoint ? (<span className='error-message'>{ errors.dropOffPoint.message }</span>) : null }
                          </div>
                        </div>
                        <div className="col-lg-6 mb-3">
                          <div className='form_input--label'>
                            Type of Car
                            <span className='form_input--required'>*</span>
                          </div>
                          <div className='input-group'>
                            <Controller
                              control={control}
                              defaultValue={carPickup.typeOfCar}
                              name="typeOfCar"
                              rules={{
                                required: {
                                  value: true,
                                  message: "This field is required!",
                                },
                              }}
                              render={({ field: { onChange, onBlur, value, ref, name } }) => (
                                <Select
                                  name={name}
                                  defaultValue={carPickup.typeOfCar}
                                  onChange={(value) => {
                                    setCarPickup({...carPickup, typeOfCar: value})
                                    onChange(value)
                                  }}
                                  options={[]}
                                  isSearchable={false}
                                  placeholder={''}
                                  className={'react-select--custom ' + (errors.typeOfCar ? 'error' : '')}
                                  onBlur={onBlur}
                                />
                              )}
                            />
                            { errors.typeOfCar ? (<span className='error-message'>{ errors.typeOfCar.message }</span>) : null }
                          </div>
                        </div>
                      </div>
                    ) : null }
                  </div>
                  <div className='apply_body_form_input mb-5'>
                    <div className='checkbox_group'>
                      <input type="checkbox"
                        defaultChecked={eSIM.checked}
                        onChange={(e) => setESIM({...eSIM, checked: e.target.checked})}
                        id='eSIM'
                      />
                      <label className='label_text' htmlFor='eSIM'>
                        <strong>eSIM</strong>
                      </label>
                    </div>
                    { eSIM.checked ? (
                      <div className='row mt-2'>
                        <div className="col-lg-6 mb-3">
                          <div className='form_input--label'>
                            Quantity
                            <span className='form_input--required'>*</span>
                          </div>
                          <div className='input-group'>
                            <Controller
                              control={control}
                              defaultValue={eSIM.quantity}
                              name="quantity"
                              rules={{
                                required: {
                                  value: true,
                                  message: "This field is required!",
                                },
                              }}
                              render={({ field: { onChange, onBlur, value, ref, name } }) => (
                                <Select
                                  name={name}
                                  defaultValue={eSIM.quantity}
                                  onChange={(value) => {
                                    setESIM({...eSIM, quantity: value})
                                    onChange(value)
                                  }}
                                  options={numberOfApplicants.map((data) => ({ value: data, label: data }))}
                                  isSearchable={false}
                                  placeholder={''}
                                  className={'react-select--custom ' + (errors.quantity ? 'error' : '')}
                                  onBlur={onBlur}
                                />
                              )}
                            />
                            { errors.quantity ? (<span className='error-message'>{ errors.quantity.message }</span>) : null }
                          </div>
                        </div>
                        <div className="col-lg-6 mb-3">
                          <div className='form_input--label'>
                            Type
                            <span className='form_input--required'>*</span>
                          </div>
                          <div className='input-group'>
                            <Controller
                              control={control}
                              defaultValue={eSIM.type}
                              name="eSIMType"
                              rules={{
                                required: {
                                  value: true,
                                  message: "This field is required!",
                                },
                              }}
                              render={({ field: { onChange, onBlur, value, ref, name } }) => (
                                <Select
                                  name={name}
                                  defaultValue={eSIM.type}
                                  onChange={(value) => {
                                    setESIM({...eSIM, type: value})
                                    onChange(value)
                                  }}
                                  options={eSimList}
                                  isSearchable={false}
                                  placeholder={''}
                                  className={'react-select--custom ' + (errors.eSIMType ? 'error' : '')}
                                  onBlur={onBlur}
                                />
                              )}
                            />
                            { errors.eSIMType ? (<span className='error-message'>{ errors.eSIMType.message }</span>) : null }
                          </div>
                        </div>
                      </div>
                    ) : null }
                  </div>
                </>) }
                { step === 2 && (<>
                  <div className='apply_body_form--title mt-4'>PASSENGERS INFORMATION / EVISA</div>
                  <div>
                    { contactInfo.applicants.length < numberApplicants.value ? (<span onClick={openNewApplicant} className='apply_body_form--openDialog'>CLICK TO ADD APPLICANT</span>) : null }
                  </div>
                  { contactInfo.applicants.length ? (
                    <div className='apply_body_form_applicant_list'>
                      {
                        contactInfo.applicants.map((applicant, index) => (
                          <div className='apply_body_form_applicant_item' key={index}>
                            <div className='apply_body_form_applicant_item--title'>
                              APPLICANT { index + 1 }
                              <div className='apply_body_form_applicant_item--editButton' onClick={() => editApplicant(applicant, index)}>
                                <i className="fas fa-pencil-alt"></i> Edit
                              </div>
                            </div>
                            <div className='apply_body_form_applicant_item--body'>
                              <div className='row'>
                                <div className='col-md-7'>
                                  <ul>
                                    <li>
                                      <div className='row mb-2'>
                                        <div className="col-6 fs-14 fw-bold">Full legal name:</div>
                                        <div className="col-6 fs-14">{ applicant.fullLegalName }</div>
                                      </div>
                                    </li>
                                    <li>
                                      <div className='row mb-2'>
                                        <div className="col-6 fs-14 fw-bold">Date of birth:</div>
                                        <div className="col-6 fs-14">{ dayjs(applicant.dateOfBirth).format('YYYY-MM-DD') }</div>
                                      </div>
                                    </li>
                                    <li>
                                      <div className='row mb-2'>
                                        <div className="col-6 fs-14 fw-bold">Gender:</div>
                                        <div className="col-6 fs-14">{ applicant.gender.label }</div>
                                      </div>
                                    </li>
                                    <li>
                                      <div className='row mb-2'>
                                        <div className="col-6 fs-14 fw-bold">Nationality:</div>
                                        <div className="col-6 fs-14">{ applicant.nationality.label }</div>
                                      </div>
                                    </li>
                                    <li>
                                      <div className='row mb-2'>
                                        <div className="col-6 fs-14 fw-bold">Passport number:</div>
                                        <div className="col-6 fs-14">{ applicant.passportNumber }</div>
                                      </div>
                                    </li>
                                    <li>
                                      <div className='row'>
                                        <div className="col-6 fs-14 fw-bold">Expired date:</div>
                                        <div className="col-6 fs-14">{ dayjs(applicant.expiredDate).format('YYYY-MM-DD') }</div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                                <div className='col-md-5'>
                                  <ul>
                                    <li>
                                      <div className='mb-2'>
                                        <div className="fw-bold">Attachments:</div>
                                      </div>
                                    </li>
                                    <div className="row">
                                      <div className="col-6"><img src={applicant.photoOfPassportBase64} alt='photoOfPassport' width={'100%'}/></div>
                                      <div className="col-6"><img src={applicant.portraitPhotoBase64} alt='portraitPhoto' width={'100%'}/></div>
                                    </div>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  ) : null }
                  <div className='apply_body_form--title'>YOUR CONTACT INFORMATION</div>
                  <div className='row apply_body_form_input'>
                    <div className="col-lg-6 mb-3">
                      <div className='form_input--label'>
                        Full name
                        <span className='form_input--required'>*</span>
                      </div>
                      <div className='input-group'>
                        <Controller
                          control={control}
                          defaultValue={contactInfo.fullName}
                          name="fullName"
                          rules={{
                            required: {
                              value: true,
                              message: "This field is required!",
                            },
                          }}
                          render={({ field: { onChange, onBlur, value, ref, name } }) => (
                            <input
                              name={name}
                              className={'text_input ' + (errors.fullName ? 'error' : '')}
                              type='text'
                              value={contactInfo.fullName}
                              onChange={(e) => {
                                setContactInfo({...contactInfo, fullName: e.currentTarget.value})
                                onChange(e.currentTarget.value)
                              }}
                              onBlur={onBlur}
                            />
                          )}
                        />
                        { errors.fullName ? (<span className='error-message'>{ errors.fullName.message }</span>) : null }
                      </div>
                    </div>
                    <div className="col-lg-6 mb-3">
                      <div className='form_input--label'>
                        Phone
                        <span className='form_input--required'>*</span>
                      </div>
                      <div className='input-group'>
                        <Controller
                          control={control}
                          defaultValue={contactInfo.phone}
                          name="contactInfoPhone"
                          rules={{
                            required: {
                              value: true,
                              message: "This field is required!",
                            },
                          }}
                          render={({ field: { onChange, onBlur, value, ref, name } }) => (
                            <PhoneInput
                              international={true}
                              countryCallingCodeEditable={false}
                              defaultCountry="VN"
                              value={contactInfo.phone}
                              onChange={(e) => {
                                setContactInfo({...contactInfo, phone: e || ''})
                                onChange(e || '')
                              }}
                              limitMaxLength={true}
                              className={'phoneInput--custom ' + (errors.contactInfoPhone ? 'error' : '')}
                              onBlur={onBlur}
                            />
                          )}
                        />
                        { errors.contactInfoPhone ? (<span className='error-message'>{ errors.contactInfoPhone.message }</span>) : null }
                      </div>
                    </div>
                  </div>
                  <div className='row apply_body_form_input'>
                    <div className="col-lg-6 mb-3">
                      <div className='form_input--label'>
                        Primary Email
                        <span className='form_input--required'>*</span>
                      </div>
                      <div className='input-group'>
                        <Controller
                          control={control}
                          defaultValue={contactInfo.primaryEmail}
                          name="primaryEmail"
                          rules={{
                            required: {
                              value: true,
                              message: "This field is required!",
                            },
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address"
                            }
                          }}
                          render={({ field: { onChange, onBlur, value, ref, name } }) => (
                            <input
                              name={name}
                              className={'text_input ' + (errors.primaryEmail ? 'error' : '')}
                              type='text'
                              value={contactInfo.primaryEmail}
                              onChange={(e) => {
                                setContactInfo({...contactInfo, primaryEmail: e.currentTarget.value})
                                onChange(e.currentTarget.value)
                              }}
                              onBlur={onBlur}
                            />
                          )}
                        />
                        { errors.primaryEmail ? (<span className='error-message'>{ errors.primaryEmail.message }</span>) : null }
                      </div>
                    </div>
                    <div className="col-lg-6 mb-3">
                      <div className='form_input--label'>
                        Secondary Email
                      </div>
                      <div className='input-group'>
                        <Controller
                          control={control}
                          defaultValue={contactInfo.secondaryEmail}
                          name="secondaryEmail"
                          rules={{
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address"
                            }
                          }}
                          render={({ field: { onChange, onBlur, value, ref, name } }) => (
                            <input
                              name={name}
                              className={'text_input ' + (errors.secondaryEmail ? 'error' : '')}
                              type='text'
                              value={contactInfo.secondaryEmail}
                              onChange={(e) => {
                                setContactInfo({...contactInfo, secondaryEmail: e.currentTarget.value})
                                onChange(e.currentTarget.value)
                              }}
                              onBlur={onBlur}
                            />
                          )}
                        />
                        { errors.secondaryEmail ? (<span className='error-message'>{ errors.secondaryEmail.message }</span>) : null }
                      </div>
                    </div>
                  </div>
                  <div className='row apply_body_form_input mb-3'>
                    <div className="col-lg-12 mb-3">
                      <div className='input-group'>
                        <Controller
                          control={control}
                          defaultValue={contactInfo.confirmCorrect}
                          name="confirmCorrect"
                          rules={{
                            required: {
                              value: true,
                              message: "This field is required!",
                            },
                          }}
                          render={({ field: { onChange, onBlur, value, ref, name } }) => (
                            <div className='checkbox_group'>
                              <input type="checkbox"
                                defaultChecked={contactInfo.confirmCorrect}
                                onChange={(e) => {
                                  setContactInfo({ ...contactInfo, confirmCorrect: e.target.checked })
                                  onChange(e.target.checked)
                                }}
                                id='confirmCorrect'
                                name={name}
                              />
                              <label className='label_text' htmlFor='confirmCorrect'>
                                I confirm the above information is correct
                              </label>
                            </div>
                          )}
                        />
                        { errors.confirmCorrect ? (<span className='error-message'>{ errors.confirmCorrect.message }</span>) : null }
                      </div>
                    </div>
                    <div className="col-lg-12 mb-3">
                      <div className='input-group'>
                        <Controller
                          control={control}
                          defaultValue={contactInfo.readTermsAndCondition}
                          name="readTermsAndCondition"
                          rules={{
                            required: {
                              value: true,
                              message: "This field is required!",
                            },
                          }}
                          render={({ field: { onChange, onBlur, value, ref, name } }) => (
                            <div className='checkbox_group'>
                              <input type="checkbox"
                                name={name}
                                defaultChecked={contactInfo.readTermsAndCondition}
                                onChange={(e) => {
                                  setContactInfo({ ...contactInfo, readTermsAndCondition: e.target.checked })
                                  onChange(e.target.checked)
                                }}
                                id='readTermsAndCondition'
                              />
                              <label className='label_text' htmlFor='readTermsAndCondition'>
                                I have read and agreed <span>Terms and Condition & Cancellation and Refund Policy</span>
                              </label>
                            </div>
                          )}
                        />
                        { errors.readTermsAndCondition ? (<span className='error-message'>{ errors.readTermsAndCondition.message }</span>) : null }
                      </div>
                    </div>
                  </div>
                  <div className='row apply_body_form_input'>
                    <div className=" col-lg-12 mb-3">
                      <TermsAndConditions />
                    </div>
                  </div>
                </>) }
                <div className='apply_body_form_footer'>
                  { step > 1 && <button type='button' className='btn btn-outline-danger back-button' onClick={handleBackClick}>&lt; Previous</button> }
                  <button type='submit' className='btn btn-danger'>Next &gt;</button>
                </div>
              </form>
            </div>
            <div className='col-md-4'>
              <div className='apply_body_info'>
                <div className='apply_body_info--title'>REVIEW YOUR ORDER</div>
                <div className='apply_body_info--type'>
                  <img src='/images/fly.svg' alt='fly' />EVisa:
                </div>
                <ul className='apply_body_info--listItem'>
                  <li><strong>Purpose of travel:</strong>{purposeTravel ? purposeTravel.label : ''}</li>
                  <li><strong>Length of visa:</strong>{lengthVisa ? lengthVisa.label : ''}</li>
                  <li><strong>Entry date:</strong>{entryDate ? dayjs(entryDate).format('YYYY-MM-DD') : ''}</li>
                  <li><strong>Exit date:</strong>{exitDate ? dayjs(exitDate).format('YYYY-MM-DD') : ''}</li>
                  <li><strong>Arrival port:</strong>{arrivalPort ? arrivalPort.label : ''}</li>
                  <li><strong>Exit through checkpoint:</strong>{exitPort ? exitPort.label : ''}</li>
                  <li><strong>Number of Applicants:</strong>{numberApplicants ? numberApplicants.label : ''}</li>
                  <li><strong>Service fee:</strong><div className='text-right'>0 USD</div></li>
                  <li><strong>Processing fee:</strong><div className='text-right'>0 USD</div></li>
                  <li><strong>Admin & Government fee:</strong><div className='text-right'>0 USD</div></li>
                </ul>
                <hr  />
                { arrivalFastTrack.checked || carPickup.checked || eSIM.checked ? (<>
                  <div className='apply_body_info--type mb-2'>
                    ADD-ON SERVICES
                  </div>
                  { arrivalFastTrack.checked ? (<>
                    <div className='apply_body_info--type'>
                      <img src='/images/fly.svg' alt='fly' />Arrival Fast track:
                    </div>
                    <ul className='apply_body_info--listItem'>
                      <li><strong>Arrival time:</strong>{arrivalFastTrack.arrivalTime ? arrivalFastTrack.arrivalTime.format('HH:mm') : ''}</li>
                      <li><strong>Flight number:</strong>{arrivalFastTrack.flightNumber || ''}</li>
                      <li><strong>Type:</strong>{arrivalFastTrack.type ? arrivalFastTrack.type.label : ''}</li>
                    </ul>
                  </>) : null }
                  { carPickup.checked ? (<>
                    <div className='apply_body_info--type'>
                      <img src='/images/fly.svg' alt='fly' />Car Pick up:
                    </div>
                    <ul className='apply_body_info--listItem'>
                      <li><strong>Drop off point:</strong>{carPickup.dropOffPoint || ''}</li>
                      <li><strong>Type of Car:</strong>{carPickup.typeOfCar ? carPickup.typeOfCar.label : ''}</li>
                    </ul>
                  </>) : null }
                  { eSIM.checked ? (<>
                    <div className='apply_body_info--type'>
                      <img src='/images/fly.svg' alt='fly' />eSIM
                    </div>
                    <ul className='apply_body_info--listItem'>
                      <li><strong>Quantity:</strong>{eSIM.quantity ? eSIM.quantity.label : ''}</li>
                      <li><strong>Type:</strong>{eSIM.type ? eSIM.type.label : ''}</li>
                    </ul>
                  </>) : null }
                </>) : null }
                <div className='apply_body_info_promotionCode'>
                  <div className='apply_body_info_promotionCode--title'>Promotion code</div>
                  <div className='apply_body_info_promotionCode_inputGroup'>
                    <input type='text' value={promotionCode} onChange={(e) => setPromotionCode(e.currentTarget.value)}/>
                    <button type='button' className='btn btn-danger'>Apply</button>
                  </div>
                </div>
                <div className='apply_body_info_fee'>
                  <div className='apply_body_info_fee_item'>
                    <span className='apply_body_info_fee_item--label'>Subtotal:</span>
                    <span className='apply_body_info_fee_item--value'>0</span>
                  </div>
                  <div className='apply_body_info_fee_item'>
                    <span className='apply_body_info_fee_item--label'>Discount:</span>
                    <span className='apply_body_info_fee_item--value'>0</span>
                  </div>
                  <div className='apply_body_info_fee_item total'>
                    <span className='apply_body_info_fee_item--label'>Total:</span>
                    <span className='apply_body_info_fee_item--value'>0</span>
                  </div>
                  <div className='apply_body_info_fee_item convert'>
                    <span className='apply_body_info_fee_item--label'>1 USD = 25,900 VND</span>
                    <span className='apply_body_info_fee_item--value'>0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ApplicantModal modalIsOpen={modalIsOpen} data={applicantSelected} closeModal={closeModal} onSubmitModal={submitModal} index={indexApplicant}/>
    </div>
  )
};

export default Apply;
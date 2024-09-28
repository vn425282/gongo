import React, { useEffect, useState, useMemo } from 'react';
import Modal from 'react-modal';
import './ApplicantModal.css'
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import dayjs from 'dayjs'
import Select from 'react-select';
import { genderList } from '../../globals/constants'
import countryList from 'react-select-country-list'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const ApplicantModal = (props) => {
  const countries = useMemo(() => countryList().getData(), [])
  const [localData, setLocalData] = useState({})
  const [keyModal, setKeyModal] = useState(0)
  const [imagePassport, setImagePassport] = useState('/images/passport-photo.jpg')
  const [imagePortrait, setImagePortrait] = useState('/images/portrait-photo.jpg')
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({
    mode: 'all'
  });

  const submitHandler = (formData) => {
    props.onSubmitModal(localData)
  }
  const submitErrorHandler = (errs) => {
    const errorsvalues = Object.values(errs)
    if (errorsvalues.length) {
      let firstErrorElement = document.getElementsByName(errorsvalues[0].ref.name)[0];
      firstErrorElement.parentElement.scrollIntoView({ behavior: `smooth`, block: 'center'});
    }
  }
  const handleFocus = (e) => {
    const { target } = e;
    if (target) {
      target.readOnly = true;  // -------> this for all others
    }
  };

  useEffect(() => {
    if (props.modalIsOpen) {
      setLocalData({...props.data})
      reset(props.data)
      setKeyModal(keyModal + 1)
    }
  }, [props.modalIsOpen])

  useEffect(() => {
    if (localData.photoOfPassport) {
      convertImage(localData.photoOfPassport, setImagePassport)
    } else {
      setImagePassport('/images/passport-photo.jpg')
    }

    if (localData.portraitPhoto) {
      convertImage(localData.portraitPhoto, setImagePortrait)
    } else {
      setImagePortrait('/images/portrait-photo.jpg')
    }
  }, [localData.photoOfPassport, localData.portraitPhoto])

  const openFileUpload = (id) => {
    const element = document.getElementById(id)
    if (element) element.click()
  }

  const selectImage = (event, fieldName, onchangeEvent) => {
    if (event.target.files.length) {
      const file = event.target.files[0]
      const tmp = { ...localData }
      tmp[fieldName] = file
      setLocalData(tmp)
      onchangeEvent(file.name)
    }
    event.target.value = ''
  }

  const convertImage = (file, functionCallback) => {
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      functionCallback(reader.result) ;
    }, false);
    reader.readAsDataURL(file)
  }

  const clearImage = (e, fieldName, onChange) => {
    e.stopPropagation()
    setLocalData({ ...localData, [fieldName]: null })
    onChange(null)
  }

  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      style={customStyles}
      ariaHideApp={false}
      portalClassName="react-modal--custom"
    >
      <div className='applicantModal modal-lg'>
        <div className='applicantModal_title'>
          APPLICANT { props.index + 1 }
          <button type='button' className='applicantModal-close-button' onClick={props.closeModal}>
            <img src='/images/close.svg' alt='close' width='22' height='22'/>
          </button>
        </div>
        <form onSubmit={handleSubmit(submitHandler, submitErrorHandler)} key={keyModal}>
          <div className='applicantModal_body container'>
            <div className='row'>
              <div className="col-lg-6 mb-4">
                <div className='form_input--label'>
                  Full legal name
                  <span className='form_input--required'>*</span>
                </div>
                <div className='input-group'>
                  <Controller
                      control={control}
                      defaultValue={localData.fullLegalName}
                      name="fullLegalName"
                      rules={{
                        required: {
                          value: true,
                          message: "This field is required!",
                        },
                      }}
                      render={({ field: { onChange, onBlur, value, ref, name } }) => (
                        <input
                          name={name}
                          className={'text_input ' + (errors.fullLegalName ? 'error' : '')}
                          type='text'
                          value={localData.fullLegalName}
                          onChange={(e) => {
                            setLocalData({...localData, fullLegalName: e.currentTarget.value})
                            onChange(e.currentTarget.value)
                          }}
                          onBlur={onBlur}
                        />
                      )}
                    />
                  { errors.fullLegalName ? (<span className='error-message'>{ errors.fullLegalName.message }</span>) : null }
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className='form_input--label'>
                  Date of birth
                  <span className='form_input--required'>*</span>
                </div>
                <div className='input-group'>
                  <Controller
                    control={control}
                    defaultValue={localData.dateOfBirth}
                    name="dateOfBirth"
                    rules={{
                      required: {
                        value: true,
                        message: "This field is required!",
                      },
                    }}
                    render={({ field: { onChange, onBlur, value, ref, name } }) => (
                      <DatePicker
                        name={name}
                        selected={localData.dateOfBirth}
                        onChange={(value) => {
                          setLocalData({...localData, dateOfBirth: value})
                          onChange(value)
                        }}
                        placeholderText="YYYY-MM-DD"
                        className={'react-datePicker--custom ' + (errors.dateOfBirth ? 'error' : '')}
                        onBlur={onBlur}
                        dateFormat="yyyy-MM-dd"
                        onFocus={handleFocus}
                        maxDate={ dayjs().toDate() }
                      />
                    )}
                  />
                  { errors.dateOfBirth ? (<span className='error-message'>{ errors.dateOfBirth.message }</span>) : null }
                </div>
              </div>
            </div>
            <div className='row'>
              <div className="col-lg-6 mb-4">
                <div className='form_input--label'>
                  Gender
                  <span className='form_input--required'>*</span>
                </div>
                <div className='input-group'>
                  <Controller
                    control={control}
                    defaultValue={localData.gender}
                    name="gender"
                    rules={{
                      required: {
                        value: true,
                        message: "This field is required!",
                      },
                    }}
                    render={({ field: { onChange, onBlur, value, ref, name } }) => (
                      <Select
                        name={name}
                        defaultValue={localData.gender}
                        onChange={(value) => {
                          setLocalData({...localData, gender: value})
                          onChange(value)
                        }}
                        options={genderList}
                        isSearchable={false}
                        placeholder={''}
                        className={'react-select--custom ' + (errors.gender ? 'error' : '')}
                        onBlur={onBlur}
                      />
                    )}
                  />
                  { errors.gender ? (<span className='error-message'>{ errors.gender.message }</span>) : null }
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className='form_input--label'>
                  Nationality
                  <span className='form_input--required'>*</span>
                </div>
                <div className='input-group'>
                  <Controller
                    control={control}
                    defaultValue={localData.nationality}
                    name="nationality"
                    rules={{
                      required: {
                        value: true,
                        message: "This field is required!",
                      },
                    }}
                    render={({ field: { onChange, onBlur, value, ref, name } }) => (
                      <Select
                        name={name}
                        defaultValue={localData.nationality}
                        onChange={(value) => {
                          setLocalData({...localData, nationality: value})
                          onChange(value)
                        }}
                        options={countries}
                        placeholder={''}
                        className={'react-select--custom ' + (errors.nationality ? 'error' : '')}
                        onBlur={onBlur}
                      />
                    )}
                  />
                  { errors.nationality ? (<span className='error-message'>{ errors.nationality.message }</span>) : null }
                </div>
              </div>
            </div>
            <div className='row'>
              <div className="col-lg-6 mb-4">
                <div className='form_input--label'>
                  Passport number
                  <span className='form_input--required'>*</span>
                </div>
                <div className='input-group'>
                  <Controller
                      control={control}
                      defaultValue={localData.passportNumber}
                      name="passportNumber"
                      rules={{
                        required: {
                          value: true,
                          message: "This field is required!",
                        },
                      }}
                      render={({ field: { onChange, onBlur, value, ref, name } }) => (
                        <input
                          name={name}
                          className={'text_input ' + (errors.passportNumber ? 'error' : '')}
                          type='text'
                          value={localData.passportNumber}
                          onChange={(e) => {
                            setLocalData({...localData, passportNumber: e.currentTarget.value})
                            onChange(e.currentTarget.value)
                          }}
                          onBlur={onBlur}
                        />
                      )}
                    />
                  { errors.passportNumber ? (<span className='error-message'>{ errors.passportNumber.message }</span>) : null }
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className='form_input--label'>
                  Expired date
                  <span className='form_input--required'>*</span>
                </div>
                <div className='input-group'>
                  <Controller
                    control={control}
                    defaultValue={localData.expiredDate}
                    name="expiredDate"
                    rules={{
                      required: {
                        value: true,
                        message: "This field is required!",
                      },
                    }}
                    render={({ field: { onChange, onBlur, value, ref, name } }) => (
                      <DatePicker
                        name={name}
                        selected={localData.expiredDate}
                        onChange={(value) => {
                          setLocalData({...localData, expiredDate: value})
                          onChange(value)
                        }}
                        placeholderText="YYYY-MM-DD"
                        className={'react-datePicker--custom ' + (errors.expiredDate ? 'error' : '')}
                        onBlur={onBlur}
                        dateFormat="yyyy-MM-dd"
                        onFocus={handleFocus}
                        minDate={ dayjs().toDate() }
                      />
                    )}
                  />
                  { errors.expiredDate ? (<span className='error-message'>{ errors.expiredDate.message }</span>) : null }
                </div>
              </div>
            </div>
            <div className='row'>
              <div className="col-lg-6 mb-5">
                <div className='form_input--label'>
                  Photo of passport page 
                  <span className='form_input--required'>*</span>
                </div>
                <div className='form_input--description'>Passport data page: Full page including photo, personal information, and ICAO line. Photos must be taken straight, without glare.<br />.png, .jpg, .jpeg format, size ≤ 5MB</div>
                <div className='input-group'>
                  <div className='form_input--uploadFile mb-1' onClick={() => openFileUpload('photoOfPassport')} style={{ backgroundImage: `url('${imagePassport}')` }}>
                    <Controller
                      control={control}
                      defaultValue={localData.photoOfPassport ? localData.photoOfPassport.name : ''}
                      name="photoOfPassport"
                      rules={{
                        required: {
                          value: true,
                          message: "This field is required!",
                        },
                      }}
                      render={({ field: { onChange, onBlur, value, ref, name } }) => (<>
                        <input
                          id="photoOfPassport"
                          name={name}
                          className={'text_input ' + (errors.photoOfPassport ? 'error' : '')}
                          type='file'
                          onChange={(e) => {
                            selectImage(e, 'photoOfPassport', onChange)
                          }}
                          accept="image/png, image/jpg, image/jpeg"
                        />
                        { localData.photoOfPassport && (
                          <button type='button' className='clear-image-button' onClick={(e) => clearImage(e, 'photoOfPassport', onChange)}>
                            <img src='/images/close.svg' alt='close' width='22' height='22'/>
                          </button>
                        )}
                      </>)}
                    />
                  </div>
                  { errors.photoOfPassport ? (<span className='error-message'>{ errors.photoOfPassport.message }</span>) : null }
                </div>
              </div>
              <div className="col-lg-6 mb-5">
                <div className='form_input--label'>
                  Portrait photo
                  <span className='form_input--required'>*</span>
                </div>
                <div className='form_input--description'>Photo taken no more than 6 months ago, straight looking, no hat, no glasses, polite clothes, <strong>not cropped from passport photo</strong>.<br />.png, .jpg, .jpeg format, size ≤ 5MB</div>
                <div className='input-group'>
                  <div className='form_input--uploadFile mb-1' onClick={() => openFileUpload('portraitPhoto')} style={{ backgroundImage: `url('${imagePortrait}')` }}>
                    <Controller
                      control={control}
                      defaultValue={localData.portraitPhoto ? localData.portraitPhoto.name : ''}
                      name="portraitPhoto"
                      rules={{
                        required: {
                          value: true,
                          message: "This field is required!",
                        },
                      }}
                      render={({ field: { onChange, onBlur, value, ref, name } }) => (<>
                        <input
                          id="portraitPhoto"
                          name={name}
                          className={'text_input ' + (errors.portraitPhoto ? 'error' : '')}
                          type='file'
                          onChange={(e) => {
                            selectImage(e, 'portraitPhoto', onChange)
                          }}
                          accept="image/png, image/jpg, image/jpeg"
                        />
                        { localData.portraitPhoto && (
                          <button type='button' className='clear-image-button' onClick={(e) => clearImage(e, 'portraitPhoto', onChange)}>
                            <img src='/images/close.svg' alt='close' width='22' height='22'/>
                          </button>
                        )}
                      </>)}
                    />
                  </div>
                  { errors.portraitPhoto ? (<span className='error-message'>{ errors.portraitPhoto.message }</span>) : null }
                </div>
              </div>
            </div>
          </div>
          <div className='applicantModal_footer'>
            <button type='button' className='btn btn-outline-danger back-button' onClick={props.closeModal}>Cancel</button>
            <button type='submit' className='btn btn-danger'>Save</button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default ApplicantModal;
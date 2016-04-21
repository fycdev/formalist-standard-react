import React from 'react'
import Container from './container'
import CheckBox from './check-box'
import DateField from './date-field'
import DateTimeField from './date-time-field'
import HiddenField from './hidden-field'
import MultiSelectionField from './multi-selection-field'
import NumberField from './number-field'
import RadioButtons from './radio-buttons'
import SelectBox from './select-box'
import SelectionField from './selection-field'
import TextField from './text-field'
import TextArea from './text-area'
import MultiUploadField from './multi-upload-field'
import UploadField from './upload-field'


/**
 * Wrap a React class in with the common Container class
 *
 * @param  {Function} field A React class
 * @return {Function} A function
 */
function wrapField (field, config = {}) {
  return (fieldProps) => {
    return (
      <Container field={field} config={config} {...fieldProps} />
    )
  }
}

/**
 * Wrapped fields for each type
 * @param {Object} config Config specific to the fields.
 * @type {Object}
 */
function fields (config = {}) {
  return {
    checkBox: wrapField(CheckBox, config.checkBox),
    dateField: wrapField(DateField, config.dateField),
    dateTimeField: wrapField(DateTimeField, config.dateTimeField),
    hiddenField: wrapField(HiddenField, config.hiddenField),
    multiSelectionField: wrapField(MultiSelectionField, config.multiSelectionField),
    numberField: wrapField(NumberField, config.numberField),
    radioButtons: wrapField(RadioButtons, config.radioButtons),
    selectBox: wrapField(SelectBox, config.selectBox),
    selectionField: wrapField(SelectionField, config.selectionField),
    textArea: wrapField(TextArea, config.textArea),
    textField: wrapField(TextField, config.textField),
    multiUploadField: wrapField(MultiUploadField, config.multiUploadField),
    uploadField: wrapField(UploadField, config.uploadField)
  }
}

export default fields

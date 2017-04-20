import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames'
import moment from 'moment'

// Import the display types
import FieldErrors from '../common/errors'
import FieldHeader from '../common/header'
import DateTimePicker, {dateFormats} from '../../ui/date-time-picker'

// Import styles
import styles from './date-time-field.mcss'

/**
 * Date Time field
 */
class DateTimeField extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    attributes: React.PropTypes.shape({
      label: React.PropTypes.string,
      hint: React.PropTypes.string,
      placeholder: React.PropTypes.string,
      inline: React.PropTypes.bool,
    }),
    errors: ImmutablePropTypes.list,
    hint: React.PropTypes.string,
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    config: React.PropTypes.object,
    value: React.PropTypes.string,
  };

  /**
   * Enable parent to pass context
   */

  static contextTypes = {
    globalConfig: React.PropTypes.object,
  };

  /**
   * onChange handler
   *
   * @param  {String} date Date as a dd/mm/yyyy formatted string
   */
  onChange = (date) => {
    this.props.actions.edit(
      (val) => { return date }
    )
  };

  /**
   * setToNow
   */
  setToNow = () => {
    this.onChange(moment().format(dateFormats.utc))
  };

  render () {
    let { attributes, errors, hint, label, name, value } = this.props
    let hasErrors = (errors.count() > 0)

    // Set up field classes
    let fieldClassNames = classNames(
      styles.base,
      {
        [`${styles.baseInline}`]: attributes.inline,
      }
    )
    // TODO Asses whether to remove this binding
    /* eslint-disable react/jsx-no-bind */
    return (
      <div className={fieldClassNames}>
        <button className={styles.nowButton} onClick={(e) => {
          e.preventDefault()
          this.setToNow()
        }}>
          Set to now
        </button>
        <FieldHeader id={name} label={label} hint={hint} error={hasErrors} />
        <div className={styles.display}>
          <DateTimePicker
            id={name}
            error={hasErrors}
            placeholder={attributes.placeholder}
            value={value}
            onChange={this.onChange} />
        </div>
        {(hasErrors) ? <FieldErrors errors={errors} /> : null}
      </div>
    )
    /* eslint-enable react/jsx-no-bind */
  }
}

export default DateTimeField

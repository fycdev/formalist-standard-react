import classNames from 'classnames'
import React from 'react'
import moment from 'moment'
import 'moment/locale/en-au'

// Components
import Popunder from '../popunder'
import Input from '../input'

// Styles
import styles from './time-picker.mcss'

const dateFormats = {
  time: 'HH:mm:ss',
  humanTime: 'hh:mma',
}

class TimePicker extends React.Component {
  static propTypes = {
    value: React.PropTypes.string,
    error: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
  };

  constructor (props) {
    super(props)
    let inputValue
    let parsedTime = moment(props.value, dateFormats.time)
    if (parsedTime.isValid()) {
      this.time = parsedTime
      inputValue = parsedTime.format(dateFormats.humanTime)
    }

    this.state = {
      inputValue: inputValue,
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value && nextProps.value !== this.props.value) {
      let parsedTime = moment(nextProps.value, dateFormats.time)
      if (parsedTime.isValid()) {
        this.time = parsedTime
        this.setState({
          inputValue: parsedTime.format(dateFormats.humanTime),
        })
      }
    }
  }

  onInputChange = (e, value) => {
    let time = moment(value, dateFormats.humanTime)
    this.time = time
    this.props.onChange(time.format(dateFormats.time))
  };

  onInputFocus = () => {
    this._popunder.openPopunder()
  };

  onTimeClick = (time, e) => {
    e.preventDefault()
    this.time = time
    this.setState({
      inputValue: time.format(dateFormats.humanTime),
    })
    this.props.onChange(time.format(dateFormats.time))
  };

  /**
   * Render a list of human formatted times between midnight and midnight
   * @return {ReactElement} React element containing the list
   */
  renderTimeList = () => {
    // Get midnight
    let date = moment().set({
      hours: 0,
      minutes: 0,
      seconds: 0,
    })
    // Get the end of the day
    let end = moment().endOf('day')
    return (
      <ul>
        {this.renderTimeItem(date, [], end, this.time)}
      </ul>
    )
  };

  /**
   * Recursive function to render time items
   * @param  {Moment} date Context date object
   * @param  {Array} items Array of previous created elements
   * @param  {Moment} end A moment object representing the end of the day
   * @param  {Moment} active A moment object representing the currently selected time
   * @return {Array} Return the array of built up items (or recurse)
   */
  renderTimeItem = (date, items, end, active) => {
    if (end.diff(date) > 0) {
      // Check if active. We only care about hours/minutes
      let isActive = (active &&
        active.hours() === date.hours() &&
        active.minutes() === date.minutes()
      )
      let buttonClassNames = classNames(
        styles.button,
        {
          [`${styles.buttonActive}`]: isActive,
        }
      )

      let onClick = this.onTimeClick.bind(this, date.clone())
      let item = <li key={date.format()} className={styles.item}>
        <button
          ref={(r) => { this._buttonActive = (isActive) ? r : null }}
          className={buttonClassNames}
          onClick={onClick}
        >
          {date.format(dateFormats.humanTime)}
        </button>
      </li>
      items.push(item)
      date = date.add(15, 'minutes')
      return this.renderTimeItem(date, items, end, active)
    } else {
      return items
    }
  };

  onPopunderOpen = (e, domNode) => {
    if (this._buttonActive && this._popunder.getContainer()) {
      let buttonEl = this._buttonActive
      let containerEl = this._popunder.getContainer()
      containerEl.scrollTop = buttonEl.offsetTop
    }
  };

  render () {
    let { error, placeholder } = this.props
    let { inputValue } = this.state

    return (
      <div className={styles.base}>
        <Popunder
          ref={(r) => { this._popunder = r }}
          closeOnEsc
          closeOnOutsideClick
          onOpen={this.onPopunderOpen}
        >
          <Input
            key={inputValue}
            defaultValue={inputValue}
            error={error}
            placeholder={placeholder || 'Select or enter a time'}
            onFocus={this.onInputFocus}
            onChange={this.onInputChange}
          />
          {this.renderTimeList()}
        </Popunder>
      </div>
    )
  }
}

export default TimePicker

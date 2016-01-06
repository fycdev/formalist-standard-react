import React from 'react'
import classNames from 'classnames'
import isNumber from 'is-number'
import optionClassNames from '../../../utils/option-class-names'

const FloatDisplayStandard = React.createClass({
  propTypes: {
    value: React.PropTypes.number,
    config: React.PropTypes.object
  },

  render () {
    let { config } = this.props

    let intFieldClassNames = classNames(
      'fm-field-int',
      'fm-input',
      'fm-input--text',
      optionClassNames('fm-field-int', config.display_options)
    )

    // Configure specific number attributes from the config
    let numberProps = {}
    let numberConfig = ['step', 'min', 'max']
    numberConfig.forEach((option) => {
      let value = config[option]
      if (value && (value === 'any' || isNumber(value))) {
        numberProps[option] = value
      }
    })

    return (
      <input className={intFieldClassNames} type='number' defaultValue={this.props.value} onChange={this.props.onChange} {...numberProps}/>
    )
  }
})

export default FloatDisplayStandard
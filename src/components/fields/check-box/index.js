import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames'

// Import components
import FieldErrors from '../common/errors'
import FieldHeader from '../common/header'
import Checkbox from '../../ui/checkbox'

// Import styles
import styles from './check-box.mcss'

/**
 * Base class for the `check_box`
 *
 */
class CheckBox extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    name: React.PropTypes.string,
    config: React.PropTypes.object,
    attributes: React.PropTypes.shape({
      label: React.PropTypes.string,
      hint: React.PropTypes.string,
      placeholder: React.PropTypes.string,
      inline: React.PropTypes.bool,
    }),
    hint: React.PropTypes.string,
    label: React.PropTypes.string,
    errors: ImmutablePropTypes.list,
    value: React.PropTypes.bool,
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
   * @param  {Event} e Change event from a form input/select
   */
  onChange = (e, value) => {
    this.props.actions.edit(
      (val) => { return value }
    )
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

    // Set up the label
    let checkboxLabel = attributes.question_text || label

    return (
      <div className={fieldClassNames}>
        <div className={styles.header}>
          <FieldHeader id={name} label={label} hint={hint} error={hasErrors} />
        </div>
        <div className={styles.display}>
          <Checkbox
            name={name}
            label={checkboxLabel}
            error={hasErrors}
            value={value}
            defaultChecked={value}
            onChange={this.onChange} />
          {(hasErrors) ? <FieldErrors errors={errors} /> : null}
        </div>
      </div>
    )
  }
}

export default CheckBox

import React, {Component} from "react"
import {
  Entity,
  CompositeDecorator,
} from "draft-js"
import uid from 'uid'
// Components
import Input from '../../../input'
import Checkbox from '../../../checkbox'
import Label from '../../../label'
import styles from './link.mcss'

class Link extends Component {
  render () {
    const {url} = Entity.get(this.props.entityKey).getData();
    return (
      <a href={url} title={url}>
        {this.props.children}
      </a>
    )
  }
}

Link.propTypes = {
  entityKey: React.PropTypes.string.isRequired,
}

function findLinkEntities (contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity()
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType().toLowerCase() === "link"
      )
    },
    callback
  )
}

const decorator = {
  strategy: findLinkEntities,
  component: Link,
}

class ActionHandler extends Component {
  constructor(props) {
    super(props)

    const {entityKey} = props
    const entity = Entity.get(entityKey)
    const entityData = entity.getData()
    // And absence of data means we want to edit it immediately
    this.state = {
      id: uid(10),
      editing: (entityData.url == null),
      changeData: entityData
    }
    this.persistPopover = this.persistPopover.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount () {
    const {entityKey, forceVisible} = this.props
    const entity = Entity.get(entityKey)
    const entityData = entity.getData()
    if (entityData.url == null) {
      this.persistPopover()
    }
  }

  persistPopover () {
    const {forceVisible} = this.props
    forceVisible(true)
  }

  unpersistPopover () {
    const {forceVisible} = this.props
    forceVisible(false)
  }

  handleEdit () {
    this.persistPopover()
    this.setState({
      editing: true
    })
  }

  onChange (key, e, value) {
    const {changeData} = this.state
    const newChangeData = Object.assign({}, changeData, {
      [`${key}`]: value
    })
    this.setState({
      changeData: newChangeData,
    })
  }

  onSubmit (e) {
    e.preventDefault()
    const {entityKey} = this.props
    const {changeData} = this.state
    const entity = Entity.get(entityKey)
    Entity.replaceData(entityKey, changeData)
    this.setState({
      editing: false
    })
    this.unpersistPopover()
  }

  render() {
    const {entityKey, remove, forceVisible} = this.props
    const {editing, id} = this.state
    const entity = Entity.get(entityKey)
    const entityData = entity.getData()
    return (
      <div ref={(r) => this._container = r}>
        {
          (editing)
          ? <form onSubmit={this.onSubmit}>
              <div className={styles.field}>
                <Label className={styles.label} for={`url-${id}`}>Link</Label>
                <Input
                  defaultValue={entityData.url}
                  name={`url-${id}`}
                  onChange={this.onChange.bind(this, 'url')}
                  placeholder='http://'
                  size='small'
                  type='text'/>
              </div>
              <div className={styles.field}>
                <Label className={styles.label} for={`title-${id}`}>Title</Label>
                <Input
                  defaultValue={entityData.title}
                  name={`title-${id}`}
                  onChange={this.onChange.bind(this, 'title')}
                  placeholder='Description of link'
                  size='small'
                  type='text'/>
              </div>
              <div className={styles.fieldCheckbox}>
                <Checkbox
                  defaultChecked={(entityData.newWindow === true)}
                  label='Open in new window?'
                  name={`newWindow-${id}`}
                  onChange={this.onChange.bind(this, 'newWindow')}
                  />
              </div>
              <div className={styles.actions}>
                <button className={styles.saveButton}>Save link</button>
              </div>
            </form>
          : <div className={styles.displayWrapper}>
              <a href={entityData.url} target='_blank' className={styles.handlerUrl}>{entityData.url}</a>
              <button
                className={styles.editButton}
                onClick={(e) => {
                  e.preventDefault()
                  this.handleEdit()
                }}>
                Change
              </button>
              <button
                className={styles.removeButton}
                onClick={(e) => {
                  e.preventDefault()
                  remove(entity)
                }}>
                <span className={styles.removeText}>Remove</span>
                <span className={styles.removeX}>×</span>
              </button>
            </div>
        }
      </div>
    )
  }
}

export default {
  handler: ActionHandler,
  decorator,
}

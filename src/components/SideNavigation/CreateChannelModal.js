import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {closeModal} from 'Actions/ui'
import {createChannel} from 'Actions/channels'
import {Modal, TextInput, Button} from 'Components'

class CreateChannelModal extends PureComponent {
  defaultState = {
    name: '',
    description: '',
  }

  state = this.defaultState

  componentDidUpdate(prevProps) {
    if (prevProps.currentModal === 'createChannel' && this.props.currentModal !== 'createChannel') {
      this.reset()
    }
  }

  render() {
    const {name, description} = this.state

    return (
      <Modal modalId='createChannel'>
        <h3>Create Channel</h3>
        <form onSubmit={this.onSubmit}>
          <TextInput
            label='Name'
            name='name'
            placeholder='The name for your channel'
            onChange={this.onChange}
            value={name} />

          <TextInput
            label='Description'
            name='description'
            placeholder="Your channel's description"
            onChange={this.onChange}
            value={description} />

          <Button type='submit'>Create Channel</Button>
        </form>
      </Modal>
    )
  }

  onChange = (e) => {
    const {name, value} = e.target

    this.setState({[name]: value})
  }

  onSubmit = async (e) => {
    const {name, description} = this.state
    const {createChannel, closeModal} = this.props

    e.preventDefault()

    await createChannel(name, description)
    closeModal()
  }

  reset() {
    setTimeout(() => this.setState(this.defaultState), 500)
  }
}

const mapStateToProps = (state) => ({currentModal: state.ui.currentModal})

const mapDispatchToProps = (dispatch) => ({
  createChannel: (name, description) => dispatch(createChannel({name, description})),
  closeModal: () => dispatch(closeModal()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateChannelModal)

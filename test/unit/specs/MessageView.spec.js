import { getVm } from '../util'
import MessageView from 'src/components/MessageView'

describe('MessageView.vue', () => {
  it('should render correct messages', () => {
    const messages = [
      {message: 'Hello1', displayName: 'Neng1', created: new Date()},
      {message: 'Hello2', displayName: 'Neng2', created: new Date()}
    ]
    const vm = getVm(MessageView, { messages, displayName: 'Neng' })
    const textContent = vm.$el.querySelector('.media-list').textContent
    expect(textContent).to.contain('Hello1')
    expect(textContent).to.contain('Hello2')
    expect(textContent).to.contain('Neng1')
    expect(textContent).to.contain('Neng2')
  })
})

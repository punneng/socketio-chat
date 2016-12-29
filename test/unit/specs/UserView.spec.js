import { getVm } from '../util'
import MessageView from 'src/components/UserView'

describe('UserView.vue', () => {
  it('should render correct users', () => {
    const users = [ 'Neng1', 'Neng2' ]
    const vm = getVm(MessageView, { users })
    const textContent = vm.$el.querySelector('.media-list').textContent
    expect(textContent).to.contain('Neng1')
    expect(textContent).to.contain('Neng2')
  })
})

import Vue from 'vue'

function getVm (Component, propsData) {
  const Ctor = Vue.extend(Component)
  const vm = new Ctor({ propsData }).$mount()
  return vm
}

export {
  getVm
}

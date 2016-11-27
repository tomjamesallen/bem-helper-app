import uppercamelcase from 'uppercamelcase'
import decamelize from 'decamelize'
import reducerFromActionsMap from '../helpers/reducerFromActionsMap'

export const UPDATE_RENDERED_CLASS = 'bem-helper-app/bemConverter/UPDATE_RENDERED_CLASS'
export const UPDATE_MODULE = 'bem-helper-app/bemConverter/UPDATE_MODULE'
export const UPDATE_B = 'bem-helper-app/bemConverter/UPDATE_B'
export const UPDATE_E = 'bem-helper-app/bemConverter/UPDATE_E'
export const UPDATE_M = 'bem-helper-app/bemConverter/UPDATE_M'

import bemClassGenerator from 'bem-class-generator'

const bem = ({b, e, m}) => {
  const block = bemClassGenerator(b, { returnBaseEl: false })
  return block(e, m)
}

const initialState = {
  bemInputs: { b: '', e: '', m: '' },
  module: '',
  renderedClass: ''
}

const getBemFromRenderedClass = renderedClass => {
  const _be = renderedClass.split('__')
  const _b = _be[0]
  const _e = _be[1]
  const _bm = _b.split('--')
  const _em = _e && _e.split('--') || []

  const b = _bm[0] || ''
  const e = _em[0] || ''
  const m = _bm[1] || _em[1] || ''

  return { b, e, m }
}

const getModuleFromB = b => uppercamelcase(b)
const getBFromModule = module => decamelize(module, '-')

const reducer = reducerFromActionsMap(initialState, {
  [UPDATE_RENDERED_CLASS]: (state, action) => {
    const {renderedClass} = action
    const bemInputs = getBemFromRenderedClass(renderedClass)
    const module = getModuleFromB(bemInputs.b)
    return {
      ...state,
      bemInputs,
      renderedClass,
      module
    }
  },
  [UPDATE_MODULE]: (state, action) => {
    const {module} = action
    const bemInputs = {
      ...state.bemInputs,
      b: getBFromModule(module)
    }

    const renderedClass = bem(bemInputs)

    return {
      ...state,
      renderedClass,
      bemInputs,
      module
    }
  },
  [UPDATE_B]: (state, action) => {
    const bemInputs = {
      ...state.bemInputs,
      b: action.b || ''
    }

    const module = getModuleFromB(bemInputs.b)
    const renderedClass = bem(bemInputs)

    return {
      ...state,
      bemInputs,
      module,
      renderedClass
    }
  },
  [UPDATE_E]: (state, action) => {
    const bemInputs = {
      ...state.bemInputs,
      e: action.e || ''
    }

    const renderedClass = bem(bemInputs)

    return {
      ...state,
      bemInputs,
      renderedClass
    }
  },
  [UPDATE_M]: (state, action) => {
    const bemInputs = {
      ...state.bemInputs,
      m: action.m || ''
    }

    const renderedClass = bem(bemInputs)

    return {
      ...state,
      bemInputs,
      renderedClass
    }
  }
})

export default reducer

export const updateRenderedClass = renderedClass => ({
  type: UPDATE_RENDERED_CLASS,
  renderedClass
})
export const updateModule = module => ({ type: UPDATE_MODULE, module })
export const updateB = b => ({ type: UPDATE_B, b })
export const updateE = e => ({ type: UPDATE_E, e })
export const updateM = m => ({ type: UPDATE_M, m })


// let s = reducer(initialState)
// console.log(s)
// s = reducer(s, updateRenderedClass('my-module__el--mod'))
// console.log(s)
//
// s = reducer(s, updateModule('NewModule'))
// console.log(s)
//
// s = reducer(s, updateB('some-module-thing'))
// console.log(s)
// s = reducer(s, updateE('some-element'))
// console.log(s)
// s = reducer(s, updateM('some-modifier'))
// console.log(s)
//
// s = reducer(s, updateM())
// console.log(s)
//
// s = reducer(s, updateE())
// console.log(s)
//
// s = reducer(s, updateB())
// console.log(s)

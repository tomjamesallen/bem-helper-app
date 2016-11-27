import React, {PropTypes} from 'react'
import bemClassGenerator from 'bem-class-generator'

const bem = bemClassGenerator(__filename)

const BemConverter = ({
  updateRenderedClass,
  updateModule,
  updateB,
  updateE,
  updateM,
  ...state
}) => {
  console.log(state)

  const onChange = {
    updateRenderedClass: e => updateRenderedClass(e.target.value),
    updateModule: e => updateModule(e.target.value),
    updateB: e => updateB(e.target.value),
    updateE: e => updateE(e.target.value),
    updateM: e => updateM(e.target.value)
  }

  return (
    <div className={bem()}>
      <div>
        <label>
          Rendered class
          <input
            value={state.renderedClass}
            onChange={onChange.updateRenderedClass}
            style={{width: '100%'}}
          />
        </label>
      </div>
      <div>
        <label>
          Module
          <input
            value={state.module}
            onChange={onChange.updateModule}
          />
        </label>
      </div>

      <div>
        <label>
          B
          <input
            value={state.bemInputs.b}
            onChange={onChange.updateB}
          />
        </label>
        <label>
          E
          <input
            value={state.bemInputs.e}
            onChange={onChange.updateE}
          />
        </label>
        <label>
          M
          <input
            value={state.bemInputs.m}
            onChange={onChange.updateM}
          />
        </label>
      </div>
    </div>
  )
}

BemConverter.propTypes = {
  updateRenderedClass: PropTypes.func,
  updateModule: PropTypes.func,
  updateB: PropTypes.func,
  updateE: PropTypes.func,
  updateM: PropTypes.func
}

BemConverter.defaultProps = {
  updateRenderedClass() {},
  updateModule() {},
  updateB() {},
  updateE() {},
  updateM() {}
}

export default BemConverter

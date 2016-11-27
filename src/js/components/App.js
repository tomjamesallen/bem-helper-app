import React from 'react'
import BemConverterContainer from '../containers/BemConverterContainer'
import bemClassGenerator from 'bem-class-generator'

const bem = bemClassGenerator(__filename)

const App = () => (
  <div className={bem()}>
    <h1 className={bem('header')}>bem helpers</h1>
    <BemConverterContainer />
  </div>
)

export default App

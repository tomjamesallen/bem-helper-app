import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import BemConverter from '../components/BemConverter'
import {
  updateRenderedClass,
  updateModule,
  updateB,
  updateE,
  updateM
} from '../redux/modules/bemConverter'

const mapStateToProps = state => state.bemConverter

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateRenderedClass,
    updateModule,
    updateB,
    updateE,
    updateM
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BemConverter)

import React, { Component } from 'react'

import Auxilary from '../../hoc/Auxilary'
import Burger from '../../components/Burger/Burger'

export class BurgerBuilder extends Component {
  render() {
    return (
      <Auxilary>
        <Burger />
        <div className="">Build Controls</div>
      </Auxilary>
    )
  }
}

export default BurgerBuilder

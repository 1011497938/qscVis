import React from 'react';
import Map from '../../res/map.svg'
export default class MapView extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
      <Map width={1920} height={1080}/>
      </div>
    )
  }
}


import React from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';

export default ({ isLoading }) => {
  return (
      <Dimmer inverted active={isLoading}>
        <Loader />
      </Dimmer>
  )
}

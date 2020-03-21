import React from 'react';
import cn from 'classnames';

import s from './App.scss';

class App extends React.Component {
   render() {

    return (
      <div className={cn(s.root)}>Vending</div>
    );
  }
}

export default App;

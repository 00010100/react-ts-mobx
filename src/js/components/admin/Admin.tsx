import * as React from 'react';

import { ManagePlayers, ManageHeadToHeads, ManageGames } from './';
import ViewStore from '../../stores/ViewStore';
import { observer, inject } from 'mobx-react';

interface AdminProps {
  viewStore?: ViewStore 
}

@inject('viewStore')
@observer
class Admin extends React.Component<AdminProps, any> {
  render() {
    const { viewStore } = this.props;
    const { players } = viewStore;

    return (
      <div className="col-sm-8">
        <ManagePlayers />
        {players.length > 1 && <ManageHeadToHeads />}
      </div>
    );
  }
}

export default Admin;

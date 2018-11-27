import * as React from 'react';
import ViewStore from '../../../stores/ViewStore';
import { Player } from '../../../models';
import { observer, inject } from 'mobx-react';

interface PlayerRowProps {
  player: Player;
  index: number;
  viewStore?: ViewStore;
}

interface PlayerRowState {}

@inject('viewStore')
@observer
class PlayerRow extends React.Component<PlayerRowProps, PlayerRowState> {
  handleInputChange = (e) => {
    const { value } = e.target;
    const { viewStore, player } = this.props;

    if (value && value.trim().length !== 0) {
      viewStore.updatePlayer(player.key, value);
    }
  };

  handleRemove = (key: string) => {
    const { viewStore } = this.props;

    viewStore.removePlayer(key);
  };

  render() {
    const { index, player } = this.props;

    return (
      <tr>
        <th scope="row">{index + 1}</th>
        <td>
          <input
            type="text"
            value={player.name}
            className="form-control"
            id="playerName"
            name="name"
            placeholder="Player Name"
            onChange={this.handleInputChange}
          />
        </td>
        <td>
          <button className={`btn btn-default`} onClick={() => this.handleRemove(player.key)}>
            X
          </button>
        </td>
      </tr>
    );
  }
}

export default PlayerRow;

import { firebaseAuth, playersRef, headToHeadsRef } from '../utils/firebase';
import { observable } from 'mobx';
import { Player, HeadToHead } from '../models';

class ViewStore {
  @observable authed: boolean = false;
  @observable isLoading: boolean = true;
  @observable user: any = null;
  @observable errorMessage: string = '';
  @observable players: Player[] = [];
  @observable headToHeads: HeadToHead[] = [];

  constructor() {
    this.fetchPlayers();
    this.fetchHeadToHeads();
  }

  fetchPlayers = () => {
    playersRef.on('value', (snapshot) => {
      let players = [];

      snapshot.forEach((childSnapShot) => {
        const player = childSnapShot.val();
        player.key = childSnapShot.key;
        players.push(player);

        return false;
      });

      this.players = players;
    });
  };

  fetchHeadToHeads = () => {
    headToHeadsRef.on('value', (snapshot) => {
      let headToHeads = [];

      snapshot.forEach((childSnapShot) => {
        const headToHead = childSnapShot.val();
        headToHead.key = childSnapShot.key;
        headToHeads.push(headToHead);

        return false;
      });

      this.headToHeads = headToHeads;
    });
  };

  firebaseCheckAuth = () => {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.authed = true;
        this.isLoading = false;
        this.user = user;
      } else {
        this.authed = false;
        this.isLoading = false;
        this.user = null;
      }
    });
  };

  logError = (error) => {
    this.errorMessage = error;
  };

  // CRUD players

  addPlayer = (playerName: string) => {
    const playerKey = playersRef.push().key;

    playersRef.child(playerKey).set({ name: playerName });
  };

  updatePlayer = (key: string, name: string) => {
    playersRef.child(key).update({ name });
  };

  removePlayer = (key: string) => {
    playersRef.child(key).remove();
  };

  // CRUD headToHeads
  addHeadToHead = (title: string, playerA: string, playerB: string) => {
    const headToHead = headToHeadsRef.push().key;

    headToHeadsRef
      .child(headToHead)
      .set({ title, playerA, playerB, playerAWinCount: 0, drawsCount: 0, playerBWinCount: 0 });
  };

  updateHeadToHead = (key: string, name: string, value: string) => {
    headToHeadsRef.child(key).update({ [name]: value });
  };

  removeHeadToHead = (key: string) => {
    headToHeadsRef.child(key).remove();
  };
}

export default ViewStore;

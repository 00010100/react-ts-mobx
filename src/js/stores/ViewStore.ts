import { firebaseAuth } from '../utils/firebase';
import { observable } from 'mobx';

class ViewStore {
  @observable authed: boolean = false;
  @observable isLoading: boolean = true;
  @observable user: any = null;
  @observable errorMessage: string = '';

  firebaseCheckAuth = () => {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        console.log('here true', user)
        this.authed = true;
        this.isLoading = false;
        this.user = user;
      } else {
        console.log('here false')
        this.authed = false;
        this.isLoading = false;
        this.user = null;
      }
    });
  };

  logError = (error) => {
    this.errorMessage = error;
  }
  
  addPlayer = (playerName: string) => {
    console.log(playerName)
  }
}

export default ViewStore;

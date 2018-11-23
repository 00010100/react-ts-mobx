import { firebaseAuth } from '../utils/firebase';

class ViewStore {
  authed: boolean = false;
  isLoading: boolean = false;
  user: any = null;
  errorMessage: string = '';

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
}

export default ViewStore;

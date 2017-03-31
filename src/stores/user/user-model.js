// Dependencies
import {extendObservable} from 'mobx';
import BaseModel from 'stores/base/base-model';

// Model
class User extends BaseModel {
  constructor() {
    super();

    extendObservable(this, {
      name: '',
      email: ''
    });
  }
}

// Exports
export default User;

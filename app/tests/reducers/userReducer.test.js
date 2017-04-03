import userReducer from '../../reducers/userReducer';
import rootReducer from '../../reducers/index';

const initialState = {
  name: null,
  email: null,
  id: null,
  signedIn: false
};

describe('user reducer', () => {

  it('should return initial state by default', () => {
    expect(userReducer(undefined, {})).toEqual(initialState)
  });

  it('should return a user object when action is SIGN_IN', () => {
    const user = { id: 1, name: 'Mike', email: 'mick@mike.com', signedIn: true };

    expect(userReducer(undefined, {
      type: 'SIGN_IN',
      user
    })).toEqual(user);
  });

  it('should return to the initialState when action is SIGN_OUT', () => {
    const userState = rootReducer(undefined, {
      type: 'SIGN_OUT',
    });

    expect(userState.user).toEqual(initialState);
  });
});
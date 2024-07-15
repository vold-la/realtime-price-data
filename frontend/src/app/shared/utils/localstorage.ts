export const loadState = () => {
  try {
    let serializedState;

    if (typeof localStorage !== 'undefined') {
      serializedState = localStorage.getItem('state');
    } else if (typeof sessionStorage !== 'undefined') {
      serializedState = sessionStorage.getItem('state');
    } else {
      console.log('Neither localStorage nor sessionStorage is supported in this environment. Cannot load state.');
      return undefined;
    }

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state:', err);
    return undefined;
  }
};

export const saveState = (state : any) => {
  try {
    const serializedState = JSON.stringify(state);

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('state', serializedState);
    } else if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('state', serializedState);
    } else {
      console.log('Neither localStorage nor sessionStorage is supported in this environment. State not saved.');
    }
  } catch (err) {
    console.error('Error saving state:', err);
  }
};

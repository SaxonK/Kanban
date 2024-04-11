// Mixin for managing local element states without persistence
import { ref } from 'vue';

const useLocalState = (initialState) => {
  if (typeof initialState !== 'object' || initialState === null) {
    throw new Error('Initial state must be defined and of type Object');
  }
  
  const copyInitialState = { ...initialState };
  const localStates = ref(copyInitialState);

  const resetLocalStates = () => {
    const OriginalState = { ...initialState };
    localStates.value = OriginalState;
  }
  const setLocalStateFalse = (key, config = 'none') => {
    if (config === 'none') {
      localStates.value[key] = false;
    } else {
      localStates.value[key][config] = false;
    }
  }
  const setLocalStateTrue = (key, config = 'none') => {
    if (config === 'none') {
      localStates.value[key] = true;
    } else {
      localStates.value[key][config] = true;
    }
  }
  const toggleLocalState = (key, config = 'none') => {
    if (config === 'none') {
      localStates.value[key] = !localStates.value[key];
    } else {
      localStates.value[key][config] = !localStates.value[key][config];
    }
  }

  return {
    localStates,
    resetLocalStates,
    setLocalStateFalse,
    setLocalStateTrue,
    toggleLocalState
  };
}

export { useLocalState };
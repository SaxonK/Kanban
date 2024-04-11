const idCounters = {};

export const generateUniqueId = type => {
  if (!idCounters[type]) {
    idCounters[type] = parseInt(localStorage.getItem(`next${type.charAt(0).toUpperCase() + type.slice(1)}Id`)) || 1;
  }

  const newId = idCounters[type]++;
  localStorage.setItem(`next${type.charAt(0).toUpperCase() + type.slice(1)}Id`, idCounters[type]);
  return newId;
};
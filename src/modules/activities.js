export const activities = {
  types: [
    { type: 'add', action: 'added' },
    { type: 'comment', action: 'commented' },
    { type: 'delete', action: 'deleted' },
    { type: 'mark', action: 'marked' },
    { type: 'progress', action: 'progressed' },
    { type: 'remove', action: 'removed' },
    { type: 'rollback', action: 'rolled back' }
  ],
  isTypeIncluded: function(type) {
    return this.types.some(activity => activity.type === type);
  },
  getActionByType: function(type) {
    const activity = this.types.find(activity => activity.type === type);
    return activity ? activity.action : null;
  }
};
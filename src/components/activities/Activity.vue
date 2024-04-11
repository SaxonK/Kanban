<script setup>
  import { activities } from '@/modules/activities';
  import { computed, ref } from 'vue';
  import { utils } from '@/modules/utils';
  import Html from '@/components/elements/misc/Html.vue';

  const { activity, allLists } = defineProps({
    activity: {
      type: Object,
      required: true
    },
    allLists: {
      type: Array,
      required: true
    }
  });
  const action = computed(() => {
    switch(activity.type) {
      case 'add':
      case 'mark':
        return `${activities.getActionByType(activity.type)} ${activity.details[0]} to ${activity.details[1]}`;
        break;
      case 'comment':
        return `${activities.getActionByType(activity.type)}:`;
        break;
      case 'progress':
      case 'rollback':
        return `${activities.getActionByType(activity.type)} ${activity.details[0]} from ${getListTitleById(activity.details[1])} to ${getListTitleById(activity.details[2])}`;
        break;
    };
  });
  const createdDate = computed(() => {
    return utils.formatDate(activity.datetime, 'DD MMM YY');
  });
  const createdTime = computed(() => {
    return utils.formatDate(activity.datetime, 'HH:mm');
  });
  const getListTitleById = (id) => {
    const list = allLists.find(list => list.id === id);
    return list.title;
  }
</script>

<template>
  <div class="card-activity" :class="activity.type">
    <h4><span style="font-weight: 600;">You</span> {{ action }} </h4>
    <Html v-if="activity.type === 'comment'"
      :editable="false"
      :html="activity.details"
    />
    <span class="activity-datetime">{{ createdDate }} at {{ createdTime }}</span>
  </div>
</template>

<style scoped>
.activity-datetime {
  font-size: var(--step--1);
}
.card-activity {
  padding: var(--space-xs);
  border: 2px solid var(--color-border);
  border-radius: 12px;
}
.card-activity.add,
.card-activity.progress {
  border-color: rgba(var(--c-primary), 0.75);
}
.card-activity.remove,
.card-activity.rollback {
  border-color: rgba(var(--c-tertiary), 0.75);
}
</style>
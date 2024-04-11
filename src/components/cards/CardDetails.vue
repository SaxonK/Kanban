<script setup>
  import { useLocalState } from '@/mixins/useLocalState.js';
  import Actions from  '@/components/cards/actions/CardActions.vue';
  import Activity from '@/components/activities/Activity.vue';
  import Checklist from '@/components/cards/extras/checklist/Checklist.vue';
  import EditableHeading from '@/components/elements/headings/EditableTextareaHeading.vue';
  import Html from '@/components/elements/misc/Html.vue';
  import Modal from '@/components/elements/menus/Modal.vue';
  import PrimaryButton from '@/components/elements/buttons/PrimaryButton.vue';
  import RichTextEditor from '@/components/elements/fields/richtexteditor/RichTextEditor.vue';
  import Section from '@/components/elements/menus/Section.vue';

  const { allLists, card, isVisible } = defineProps({
    allLists: {
      type: Array,
      required: true
    },
    card: {
      type: Object,
      required: true
    },
    isVisible: {
      type: Boolean,
      required: true
    }
  });

  const { localStates, resetLocalStates, setLocalStateFalse, setLocalStateTrue, toggleLocalState } = useLocalState({
    actions: false,
    description: false,
    comment: false
  });
  const emit = defineEmits(['close-modal','update-card-details']);

  const closeCardDetails = () => {
    resetLocalStates();
    emit('close-modal');
  };
  const saveChanges = (updates, property) => {
    const emptyTagRegex = /<([^/]+)>(?:\s*|&nbsp;|\n|\r)*<\/\1>/g;
    const sanatisedUpdates = updates.replace(emptyTagRegex, '');
    
    setLocalStateFalse(property);
    emit('update-card-details', property, sanatisedUpdates);
  };
  const toggleActionMenu = (event) => {
    event.stopPropagation();
    toggleLocalState('actions');
  };
</script>

<template>
  <Modal class="card-details-modal" :card="card" :isVisible="isVisible" @close-modal="closeCardDetails">
    <template v-slot:header>
      <span class="material-symbols-rounded card-icon">article</span>
      <EditableHeading :module="card" type="h2" />
      <div class="card-actions">
        <PrimaryButton
          style="width: fit-content;"
          text="Actions"
          type="soft"
          @click="toggleActionMenu"
        />
        <transition name="fade">
          <Actions v-if="localStates.actions"
            :card="card"
            style="margin: 0 0 0 auto"
            @close-action-menu="setLocalStateFalse('actions')"
            @close-modal="closeCardDetails"
          />
        </transition>
      </div>
    </template>
    <template v-slot:main>
      <Section headline="Description" headlineType="h3" icon="description">
        <p v-if="!localStates.description && card.description === ''" 
          class="card-description-empty"
          @click="toggleLocalState('description')"
        >Add a more detailed description...</p>
        <Html v-if="!localStates.description && card.description != ''"
          :editable="true"
          :html="card.description"
          @edit-html-content="toggleLocalState('description')"
        />
        <RichTextEditor
          :content="card.description"
          :isVisible="localStates.description"
          @save-rich-text="saveChanges($event, 'description')"
          @cancel-rich-text="setLocalStateFalse('description')"
        />
      </Section>
      <Checklist v-for="checklist in card.activeChecklists"
        :card="card"
        :checklist="checklist"
        :key="checklist.id"
      />
      <Section headline="Activity" headlineType="h3" icon="browse_activity">
        <div class="add-comment">
          <p v-if="!localStates.comment" class="add-comment-button"
            @click="toggleLocalState('comment')"
          >Write a comment...</p>
          <RichTextEditor
            content=""
            :isVisible="localStates.comment"
            @save-rich-text="saveChanges($event, 'comment')"
            @cancel-rich-text="setLocalStateFalse('comment')"
          />
        </div>
        <div class="card-activities">
          <Activity v-for="activity in card.activitiesDescending"
            :activity="activity"
            :allLists="allLists"
            :key="activity.id"
          />
        </div>
      </Section>
    </template>
  </Modal>
</template>

<style>
.modal .content .header h2 {
  padding-left: var(--space-2xs);
}
.modal .basic-menu {
  overflow-x: hidden;
  overflow-y: scroll;
}
.card-details-modal .modal .card-icon {
  cursor: default;
}
</style>
<style scoped>
.card-actions {
  position: relative;
  margin-left: auto;
}
.modal .card-description-empty {
  width: 100%;
  padding: calc(var(--space-2xs) * 2) calc(var(--space-2xs) * 2) calc(var(--space-2xs) * 3);
  background: var(--color-background-soft);
  border-radius: 4px;
  transition: all 300ms ease-in-out;
  cursor: pointer;
}
.modal .card-description-empty:hover {
  background: rgba(var(--c-white-0), 0.15);
}
.modal .card-description-readonly {
  width: 100%;
  padding: calc(var(--space-2xs) * 2);
  border-radius: 4px;
  transition: all 300ms ease-in-out;
  cursor: pointer;
}
.modal .card-description-readonly:hover {
  background: rgba(var(--c-white-0), 0.15);
}
.modal .add-comment {
  margin-bottom: var(--space-xs);
}
.modal .add-comment-button {
  width: 100%;
  padding: calc(var(--space-3xs) * 2) calc(var(--space-2xs) * 2);
  background: var(--color-background-soft);
  border-radius: 12px;
  transition: all 300ms ease-in-out;
  cursor: pointer;
}
.modal .add-comment-button:hover {
  background: rgba(var(--c-white-0), 0.15);
}
.modal .card-activities {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}
</style>
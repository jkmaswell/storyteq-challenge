<script setup lang="ts">
interface Props {
  label: string
  list: Array<string | { title: string; author: string}>
  noSelectedPlaceholder: string
}

// Props
const props = withDefaults(defineProps<Props>(), {
  noSelectedPlaceholder: 'No selected',
})
</script>

<template>
  <div
    v-bind="$attrs"
    class="search-list"
  >
    <label class="search-list__label">
      {{ props.label }}
    </label>
    <ul class="search-list__table">
      <li
        v-if="props.list.length === 0"
        class="search-list__item"
      >
        {{ props.noSelectedPlaceholder }}
      </li>
      <li
        v-for="(item, idx) in props.list"
        :key="`${idx}-list`"
        class="search-list__item"
      >
        <slot
          :item="item"
          name="item"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.search-list {
  &__item {
    padding-block: 0.5rem;
    padding-inline: 1rem;
    text-transform: capitalize;

    &:not(:last-child) {
      border-block-end: .0625rem solid var(--border-hover);
    }
  }

  &__label {
    margin-block-start: 1rem;
  }

  &__table {
    border: .0625rem solid var(--border-hover);
    border-radius: .5rem;
  }
}
</style>
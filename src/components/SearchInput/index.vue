<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Props {
  label: string
  placeholder: string
  results: Array<string | { title: string; author: string}>
}

interface Emit {
  (e: 'input', event: string): void
  (e: 'select', event: string | { title: string; author: string}): void
}

// Props
const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Please type at least 3 characters',
})

// Emits
const emit = defineEmits<Emit>()

// Refs
const searchInput = ref<HTMLInputElement | null>(null)

// Data
const query = ref<string>('')

// Methods
const onSearchInput = () => {
  emit('input', query.value)
}

const selectItem = (item: string | { title: string; author: string}) => {
  emit('select', item)
  query.value = ''
}

// Hooks
onMounted(() => {
  if (searchInput.value) {
    searchInput.value.focus()
  }
})

defineExpose({
  searchInput,
})
</script>

<template>
  <div class="search">
    <label for="search">
      {{ props?.label }}
    </label>
    <div class="search__input-container">
      <!-- Input -->
      <i class="material-symbols-outlined">search</i>
      <input
        id="search"
        ref="searchInput"
        v-model="query"
        :placeholder="props.placeholder"
        class="search__input-container__input"
        @input="onSearchInput"
      >
      <button
        v-if="query.length"
        class="search__clear"
        @click="query = ''"
      >
        <i class="material-symbols-outlined">close</i>
      </button>

      <!-- Results -->
      <div
        v-if="query.length && query.length > 2"
        class="search__result"
      >
        <div
          v-if="props.results.length === 0"
          class="search__not-found"
        >
          No results found
        </div>
        <ul v-else>
          <li
            v-for="(result, idx) in props.results"
            :key="`${idx}-result`"
            class="search__result__item"
            @click="selectItem(result)"
          >
            <slot
              :item="result"
              name="result"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search {
  // Input
  &__input-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: .0625rem solid var(--border);
    border-radius: .5rem;
    background: var(--secondary);
    min-block-size: 4rem;
    min-inline-size: 31.25rem;
    padding-block: 1rem;
    padding-inline: 1.5rem;

    &__input {
      flex: 2;
      padding-inline: 0.5rem;
    }

    &:hover {
      border-color: var(--border-hover);
    }

    &:focus-within {
      border-color: var(--primary);
    }
  }

  // Result
  &__result {
    position: absolute;
    z-index: 2;
    border: .0625rem solid var(--border-hover);
    border-radius: .5rem;
    background: var(--secondary);
    box-shadow: 0 0 1.5rem -0.75rem var(--primary);
    inline-size: 100%;
    inset-block-start: 100%;
    inset-inline-start: 0;
    margin-block-start: .5rem;
  
    &__item {
      padding: 1rem;
      cursor: pointer;
      margin-block: .25rem;
      margin-inline: 0;
      text-transform: capitalize;
  
      &:hover {
        background-color: var(--tertiary);
      }
    }
  }

  // Not found
  &__not-found {
    padding: 1rem;
  }
}
</style>
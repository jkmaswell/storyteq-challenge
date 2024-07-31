<script setup lang="ts">
import type { Book } from '@/views/books/types'
import { useSearchStore } from '@/views/search/search.store'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

// Composables
const searchStore = useSearchStore()

const { cityResults, bookResults, selectedCities, selectedBooks } = storeToRefs(searchStore)

// Refs
const cityInput = ref<HTMLInputElement | null>(null)

// Methods
const onCityInput = (query: string) => {
  searchStore.searchCities(query)
}

const onBookInput = (query: string) => {
  searchStore.searchBooks(query)
}

const selectCity = (city: string) => {
  searchStore.selectCity(city)
}

const selectBook = (book: Book) => {
  searchStore.selectBook(book)
}

// Hooks
onMounted(() => {
  if (cityInput.value) {
    cityInput.value.focus()
  }
})
</script>

<template>
  <div class="search-view">
    <div class="search-view__container">
      <SearchInput
        :results="cityResults"
        label="Search Cities"
        placeholder="Please type at least 3 characters"
        @input="onCityInput"
        @select="selectCity"
      >
        <template #result="{item}">
          {{ item }}
        </template>
      </SearchInput>
      <div class="search-view__result-list">
        <label class="search-view__result-list__label">Selected Cities</label>
        <ul class="search-view__result-list__table">
          <li
            v-if="selectedCities.length === 0"
            class="search-view__result-list__item"
          >
            No cities selected
          </li>
          <li
            v-for="city in selectedCities"
            :key="city"
            class="search-view__result-list__item"
          >
            {{ city }}
          </li>
        </ul>
      </div>
    </div>
    <div class="search-view__container">
      <SearchInput
        :results="bookResults"
        label="Search Books"
        placeholder="Please type at least 3 characters"
        @input="onBookInput"
        @select="selectBook"
      >
        <template #result="{item}">
          {{ item.title }} - {{ item.author }}
        </template>
      </SearchInput>
      <div class="search-view__result-list">
        <label class="search-view__result-list__label">Selected Books</label>
        <ul class="search-view__result-list__table">
          <li
            v-if="selectedBooks.length === 0"
            class="search-view__result-list__item"
          >
            No books selected
          </li>
          <li
            v-for="book in selectedBooks"
            :key="book.title"
            class="search-view__result-list__item"
          >
            {{ book.title }} - {{ book.author }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-view {
  // Container
  &__container {
    margin-block: 5rem;
  }

  // Result list
  &__result-list {
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
      border: .0625rem solid var(--border);
      border-radius: .5rem;
    }
  }

  // Not found
  &__not-found {
    padding: 1rem;
  }
}
</style>
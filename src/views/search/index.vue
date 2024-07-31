<script setup lang="ts">
import type { Book } from '@/views/books/types'
import { useSearchStore } from '@/views/search/search.store'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

// Composables
const searchStore = useSearchStore()

const { cityResults, bookResults, selectedCities, selectedBooks } = storeToRefs(searchStore)

// Refs
const cityInput = ref<HTMLElement | null>(null)

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
    (cityInput.value as HTMLInputElement).focus()
  }
})
</script>

<template>
  <div class="search-view">
    <div class="search-view__container">
      <SearchInput
        id="city-input"
        ref="cityInput"
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
      <SearchList
        id="city-list"
        :list="selectedCities"
        label="Selected Cities"
        no-selected-placeholder="No cities selected"
      >
        <template #item="{item}">
          {{ item }}
        </template>
      </SearchList>
    </div>
    <div class="search-view__container">
      <SearchInput
        id="book-input"
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
      <SearchList
        id="book-list"
        :list="selectedBooks"
        label="Selected Books"
        no-selected-placeholder="No books selected"
      >
        <template #item="{item}">
          {{ item.title }} - {{ item.author }}
        </template>
      </SearchList>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-view {
  // Container
  &__container {
    margin-block: 5rem;
  }
}
</style>
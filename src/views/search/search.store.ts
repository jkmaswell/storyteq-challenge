import { useBooksStore } from '@/views/books/books.store'
import type { Book } from '@/views/books/types'
import { useCitiesStore } from '@/views/cities/cities.store'
import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'



export const useSearchStore = defineStore('search', () => {

  // Composables
  const booksStore = useBooksStore()
  const citiesStore = useCitiesStore()

  const { books } = storeToRefs(booksStore)
  const { cities } = storeToRefs(citiesStore)

  // Data
  const cityResults = ref<string[]>([])
  const bookResults = ref<Book[]>([])
  const selectedCities = ref<string[]>([])
  const selectedBooks = ref<Book[]>([])

  // Computed
  const filteredCities = computed(() => cities.value.filter((city: string) => !selectedCities.value.includes(city)))
  const filteredBooks = computed(() => books.value.filter((book: Book) => !selectedBooks.value.some((selectedBook: Book) => selectedBook.title === book.title)))

  // Methods
  const searchCities = (query: string) => {
    if (query.length < 3) {
      cityResults.value = []
      
      return
    }
    const lowerQuery = query.toLowerCase()

    cityResults.value = filteredCities.value.filter((city: string) => city.toLowerCase().includes(lowerQuery))
  }

  const searchBooks = (query: string) => {
    if (query.length < 3) {
      bookResults.value = []
      
      return
    }
    const lowerQuery = query.toLowerCase()

    bookResults.value = filteredBooks.value.filter((book: Book) => book.title.toLowerCase().includes(lowerQuery))
  }

  const selectCity = (city: string) => {
    if (!selectedCities.value.includes(city))
      selectedCities.value.push(city)
  }

  const selectBook = (book: Book) => {
    if (!selectedBooks.value.some((selectedBook: Book) => selectedBook.title === book.title))
      selectedBooks.value.push(book)
  }

  return {
    // Data
    cities,
    books,
    cityResults,
    bookResults,
    selectedCities,
    selectedBooks,

    // Methods
    searchCities,
    searchBooks,
    selectCity,
    selectBook,
  }
})
import { useSearchStore } from '@/views/search/search.store'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import SearchView from './index.vue'

describe('SearchView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())

    const searchStore = useSearchStore()

    vi.spyOn(searchStore, 'searchCities')
    vi.spyOn(searchStore, 'searchBooks')
    vi.spyOn(searchStore, 'selectCity')
    vi.spyOn(searchStore, 'selectBook')
  })

  it('renders the search inputs and placeholders correctly', () => {
    const wrapper = mount(SearchView)

    const cityInput = wrapper.find('#city-input input')
    const bookInput = wrapper.find('#book-input input')

    expect(cityInput.exists()).toBe(true)
    expect(bookInput.exists()).toBe(true)
  })

  it('focuses the city input on mount', async () => {
    const wrapper = mount(SearchView, {
      attachTo: document.body,
    })

    const cityInput = wrapper.find('#city-input input')

    expect(document.activeElement).toBe(cityInput.element)
  })

  it('displays results when there are search matches for cities', async () => {
    const searchStore = useSearchStore()

    searchStore.searchCities = vi.fn().mockImplementation(query => {
      searchStore.cityResults = ['san jose', 'san francisco', 'santa rosa'].filter(city => city.includes(query))
    })

    const wrapper = mount(SearchView)
    const cityInput = wrapper.find('#city-input input')

    await cityInput.setValue('san')

    const resultItems = wrapper.findAll('.search__result__item')

    expect(resultItems.length).toBe(3)
    expect(resultItems[0].text()).toBe('san jose')
    expect(resultItems[1].text()).toBe('san francisco')
    expect(resultItems[2].text()).toBe('santa rosa')
  })

  it('displays "No results found" when there are no matches for cities', async () => {
    const searchStore = useSearchStore()

    searchStore.searchCities = vi.fn().mockImplementation(() => {
      searchStore.cityResults = []
    })

    const wrapper = mount(SearchView)
    const cityInput = wrapper.find('#city-input input')

    await cityInput.setValue('abc')

    expect(wrapper.text()).toContain('No results found')
  })

  it('displays results when there are search matches for books', async () => {
    const searchStore = useSearchStore()

    searchStore.searchBooks = vi.fn().mockImplementation(query => {
      searchStore.bookResults = [
        { title: 'Don Quixote', author: 'Miguel De Cervantes' },
        { title: 'Pilgrim\'s Progress', author: 'John Bunyan' },
      ].filter(book => book.title.includes(query))
    })

    const wrapper = mount(SearchView)
    const bookInput = wrapper.find('#book-input input')

    await bookInput.setValue('Don')

    const resultItems = wrapper.findAll('.search__result__item')

    expect(resultItems.length).toBe(1)
    expect(resultItems[0].text()).toBe('Don Quixote - Miguel De Cervantes')
  })

  it('displays "No results found" when there are no matches for books', async () => {
    const searchStore = useSearchStore()

    searchStore.searchBooks = vi.fn().mockImplementation(() => {
      searchStore.bookResults = []
    })

    const wrapper = mount(SearchView)
    const bookInput = wrapper.find('#book-input input')

    await bookInput.setValue('abc')

    expect(wrapper.text()).toContain('No results found')
  })

  it('emits select event when a city is selected', async () => {
    const searchStore = useSearchStore()

    searchStore.searchCities = vi.fn().mockImplementation(query => {
      searchStore.cityResults = ['san jose', 'san francisco'].filter(city => city.includes(query))
    })

    const wrapper = mount(SearchView)
    const cityInput = wrapper.find('#city-input input')

    await cityInput.setValue('san')

    const resultItems = wrapper.findAll('.search__result__item')

    await resultItems[0].trigger('click')

    expect(searchStore.selectCity).toHaveBeenCalledWith('san jose')
  })

  it('emits select event when a book is selected', async () => {
    const searchStore = useSearchStore()

    searchStore.searchBooks = vi.fn().mockImplementation(query => {
      searchStore.bookResults = [
        { title: 'Don Quixote', author: 'Miguel De Cervantes' },
      ].filter(book => book.title.includes(query))
    })

    const wrapper = mount(SearchView)
    const bookInput = wrapper.find('#book-input input')

    await bookInput.setValue('Don')

    const resultItems = wrapper.findAll('.search__result__item')

    await resultItems[0].trigger('click')

    expect(searchStore.selectBook).toHaveBeenCalledWith({ title: 'Don Quixote', author: 'Miguel De Cervantes' })
  })

  it('displays selected cities', () => {
    const searchStore = useSearchStore()

    searchStore.selectedCities = ['san jose', 'san francisco']

    const wrapper = mount(SearchView)

    const selectedCities = wrapper.findAll('#city-list .search-list__item')

    expect(selectedCities.length).toBe(2)
    expect(selectedCities[0].text()).toBe('san jose')
    expect(selectedCities[1].text()).toBe('san francisco')
  })

  it('displays selected books', () => {
    const searchStore = useSearchStore()

    searchStore.selectedBooks = [{ title: 'Don Quixote', author: 'Miguel De Cervantes' }]

    const wrapper = mount(SearchView)

    const selectedBooks = wrapper.findAll('#book-list .search-list__item')

    expect(selectedBooks.length).toBe(1)
    expect(selectedBooks[0].text()).toBe('Don Quixote - Miguel De Cervantes')
  })
})
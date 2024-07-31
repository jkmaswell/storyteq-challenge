import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import SearchInput from './index.vue'

describe('SearchInput', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('displays a message when less than 3 characters are typed in the city search input', async () => {
    const wrapper = mount(SearchInput)
    const input = wrapper.find('#city-search')

    await input.setValue('sa')
    expect(wrapper.text()).toContain('Please type at least 3 characters')
  })

  it('displays city results when 3 or more characters are typed in the city search input', async () => {
    const wrapper = mount(SearchInput)
    const input = wrapper.find('#city-search')

    await input.setValue('san')
    expect(wrapper.text()).toContain('san jose')
    expect(wrapper.text()).toContain('santiago')
    expect(wrapper.text()).toContain('san francisco')
  })

  it('displays a message when no book results are found', async () => {
    const wrapper = mount(SearchInput)
    const input = wrapper.find('#book-search')

    await input.setValue('zzz')
    expect(wrapper.text()).toContain('No results found')
  })

  it('adds a city to the selected cities list when a city is clicked', async () => {
    const wrapper = mount(SearchInput)
    const input = wrapper.find('#city-search')

    await input.setValue('san')

    const city = wrapper.find('li')

    await city.trigger('click')
    expect(wrapper.text()).toContain('Selected Cities')
    expect(wrapper.text()).toContain('san jose')
  })

  it('adds a book to the selected books list when a book is clicked', async () => {
    const wrapper = mount(SearchInput)
    const input = wrapper.find('#book-search')

    await input.setValue('don')

    const book = wrapper.find('li')

    await book.trigger('click')
    expect(wrapper.text()).toContain('Selected Books')
    expect(wrapper.text()).toContain('Don Quixote - Miguel De Cervantes')
  })
})
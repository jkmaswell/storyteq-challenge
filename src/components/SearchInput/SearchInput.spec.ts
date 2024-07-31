import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SearchInput from './index.vue'

describe('SearchInput', () => {
  it('renders the search input and placeholder correctly', () => {
    const wrapper = mount(SearchInput, {
      props: {
        label: 'Search Cities',
        placeholder: 'Type at least 3 characters',
        results: [],
      },
    })

    const input = wrapper.find('input')

    expect(input.element.placeholder).toBe('Type at least 3 characters')
  })

  it('emits an input event when typing in the search input', async () => {
    const wrapper = mount(SearchInput, {
      props: {
        label: 'Search Cities',
        placeholder: 'Type at least 3 characters',
        results: [],
      },
    })

    const input = wrapper.find('input')

    await input.setValue('san')
    expect(wrapper.emitted().input[0]).toEqual(['san'])
  })

  it('displays results when there are search matches', async () => {
    const results = ['san jose', 'san francisco', 'santa rosa']

    const wrapper = mount(SearchInput, {
      props: {
        label: 'Search Cities',
        placeholder: 'Type at least 3 characters',
        results,
      },
    })

    const input = wrapper.find('input')

    await input.setValue('san')
    
    const resultItems = wrapper.findAll('.search__result__item')

    expect(resultItems.length).toBe(3)
  })

  it('displays "No results found" when there are no matches', async () => {
    const wrapper = mount(SearchInput, {
      props: {
        label: 'Search Cities',
        placeholder: 'Type at least 3 characters',
        results: [],
      },
    })

    const input = wrapper.find('input')

    await input.setValue('zzz')
    
    expect(wrapper.text()).toContain('No results found')
  })

  it('emits a select event when a result is clicked', async () => {
    const results = ['san jose', 'san francisco']

    const wrapper = mount(SearchInput, {
      props: {
        label: 'Search Cities',
        placeholder: 'Type at least 3 characters',
        results,
      },
    })

    const input = wrapper.find('input')

    await input.setValue('san')
    
    const resultItems = wrapper.findAll('.search__result__item')

    await resultItems[0].trigger('click')
    
    expect(wrapper.emitted().select[0]).toEqual(['san jose'])
  })
})
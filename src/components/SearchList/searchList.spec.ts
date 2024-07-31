import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SearchList from './index.vue'

describe('SearchList.vue', () => {
  it('renders the label correctly', () => {
    const wrapper = mount(SearchList, {
      props: {
        label: 'Test Label',
        list: [],
        noSelectedPlaceholder: 'No selected',
      },
    })
    
    expect(wrapper.find('.search-list__label').text()).toBe('Test Label')
  })

  it('renders the placeholder when the list is empty', () => {
    const wrapper = mount(SearchList, {
      props: {
        label: 'Test Label',
        list: [],
        noSelectedPlaceholder: 'No items selected',
      },
    })

    expect(wrapper.find('.search-list__item').text()).toBe('No items selected')
  })

  it('renders list items correctly', () => {
    const list = ['item 1', 'item 2', 'item 3']

    const wrapper = mount(SearchList, {
      props: {
        label: 'Test Label',
        list,
        noSelectedPlaceholder: 'No selected',
      },
      slots: {
        item: '<template #item="{ item }">{{ item }}</template>',
      },
    })

    const items = wrapper.findAll('.search-list__item')

    expect(items.length).toBe(list.length)
    expect(items[0].text()).toBe('item 1')
    expect(items[1].text()).toBe('item 2')
    expect(items[2].text()).toBe('item 3')
  })

  it('renders list items with title and author correctly', () => {
    const list = [
      { title: 'Book 1', author: 'Author 1' },
      { title: 'Book 2', author: 'Author 2' },
    ]

    const wrapper = mount(SearchList, {
      props: {
        label: 'Books',
        list,
        noSelectedPlaceholder: 'No selected',
      },
      slots: {
        item: '<template #item="{ item }">{{ item.title }} - {{ item.author }}</template>',
      },
    })

    const items = wrapper.findAll('.search-list__item')

    expect(items.length).toBe(list.length)
    expect(items[0].text()).toBe('Book 1 - Author 1')
    expect(items[1].text()).toBe('Book 2 - Author 2')
  })
})
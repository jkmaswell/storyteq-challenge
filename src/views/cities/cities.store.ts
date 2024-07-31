import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCitiesStore = defineStore('cities', () => {
  // Data
  const cities = ref<string[]>([
    'san jose', 
    'santiago', 
    'san francisco',
    'santa rosa',
    'san juan',
    'sabadell',
    'salamanca',
    'salt lake city',
    'salinas',
    'salem',
    'sausalito',
    'taipei',
    'tel aviv',
    'tempe',
    'termez',
    'temuco',
    'tiajuna',
    'tieling',
    'thousand oaks',
    'thunder bay',
    'tokyo',
    'tulsa',
  ])

  return {
    cities,
  }
})
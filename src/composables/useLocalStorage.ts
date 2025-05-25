import {ref, watch} from 'vue'

export const useLocalStorage = (key:string, defaultValue = null) => {
  const storedValue = localStorage.getItem(key)
  const initialValue = storedValue ? JSON.parse(storedValue) : defaultValue

  const value = ref(initialValue)

  watch(value, (newValue) => {
    localStorage.setItem(key,JSON.stringify(newValue))
  }, {deep: true})

  return value
}
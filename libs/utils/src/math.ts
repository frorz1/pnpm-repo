import axios from "axios"
export const getRes = () => {
  return axios.get('https://www.baidu.com')
}
export const add = (x: number, y: number) => {
  return x + y
}

export const isArray = (arr: []) => {
  return Array.isArray(arr)
}
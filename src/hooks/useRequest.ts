import useSwr from 'swr'
import { API_URL } from '../utils/config'

export const fetcher = (url: string) => fetch(url).then(r => r.json())

export const useRequest = (path: string, name?: any) => {
    if (!path) {
        throw new Error('Path is required')
    }

    const url = name ? API_URL + path + '/' + name : API_URL + path

    const { data, error } = useSwr(url, fetcher)

    return { data, error }
}
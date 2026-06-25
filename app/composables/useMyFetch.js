export const useMyFetch = async (request, opts) => {
  try {
    const config = useRuntimeConfig()
    const response = await useFetch(request, {
      baseURL: config.public.baseURL,
      ...opts
    })
    return response
  } catch (error) {
    console.error('Error in useMyFetch:', error)
    return undefined
  }
}

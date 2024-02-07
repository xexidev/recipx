export default function usePagination (unPaginatedList) {
  const itemsPerPage = 1000

  const getPaginatedList = (list = null, currentPageNumber) => {
    let newList = null
    if (list) {
      const end = (currentPageNumber * itemsPerPage)
      const start = end - itemsPerPage
      newList = list.slice(start, end)
    }
    return newList
  }

  const numberOfPages = () => {
    const totalItems = unPaginatedList.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    return totalPages
  }

  return {
    numberOfPages,
    getPaginatedList
  }
}

import usePagination from '../../../hooks/usePagination'
import { NavLink } from 'react-router-dom'

export default function Pagination ({ unPaginatedList }) {
  const { numberOfPages } = usePagination(unPaginatedList)
  const pages = numberOfPages()
  const pagesArr = new Array(pages).fill(0)

  return (
    <>
      { pages > 1 &&
        <div>
          {pagesArr.map((page, index) => {
            const pageNumber = index + 1
            return (
              <NavLink to={`./../${pageNumber}`} key={pageNumber}>{pageNumber}</NavLink>
            )
          })}
        </div>
      }
    </>
  )
}

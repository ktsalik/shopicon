import './Pagination.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface PaginationComponentProps {
  page: number;
  pageCount: number;
  onPageChange: any;
};

const Pagination = (props: PaginationComponentProps) => {

  const setPage = (page: number) => {
    props.onPageChange(page);
  };

  const page = props.page;
  const pageCount = props.pageCount;
  return (
    <div className="Pagination">
        {
          page > 1
            ? <button onClick={() => setPage(page - 1)}><FontAwesomeIcon icon={faArrowLeft} size="lg" /></button>
            : ''
        }
        {
          page > 2
            ? <button onClick={() => setPage(1)}>{1}</button>
            : ''
        }
        {
          page === pageCount
            ? <button onClick={() => setPage(page - 2)}>{page - 2}</button>
            : ''
        }
        {
          page !== 1
            ? <button onClick={() => setPage(page - 1)}>{page - 1}</button>
            : ''
        }
        <button className="current">{page}</button>
        {
          page < pageCount
            ? <button onClick={() => setPage(page + 1)}>{page + 1}</button>
            : ''
        }
        {
          page === 1
            ? <button onClick={() => setPage(page + 2)}>{page + 2}</button>
            : ''
        }
        {
          page < pageCount - 1 && pageCount !== 1
            ? <button onClick={() => setPage(pageCount)}>{pageCount}</button>
            : ''
        }
        {
          page < pageCount
            ? <button onClick={() => setPage(page + 1)}><FontAwesomeIcon icon={faArrowRight} size="lg" /></button>
            : ''
        }
      </div>
  )
};

export default Pagination;
import React from 'react';
import classes from './Paginator.module.css';

type PropsType = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (p: number) => void;
};

let Paginator = (props: PropsType) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages: Array<number> = [];
  for (let i = 1; i < pagesCount; i++) {
    pages.push(i);
  }
  let curPage = props.currentPage;
  let resultPages: (number | string)[] = [];
  if (curPage < 5) {
    resultPages = [1, 2, 3, 4, 5, '...', pagesCount];
  } else if (curPage < pagesCount - 3) {
    resultPages = [1, '...', ...pages.slice(curPage - 3, curPage + 2), '...', pagesCount];
  } else {
    resultPages = [1, '...', pagesCount - 4, pagesCount - 3, pagesCount - 2, pagesCount - 1, pagesCount];
  }

  return (
    <div className={classes.paginator__pages}>
      {resultPages.map((p) => {
        if (typeof p === 'number') {
          return (
            <span
              className={curPage === p ? classes.selectedPage : undefined}
              onClick={(e) => {
                props.onPageChange(p);
              }}
            >
              {p}
            </span>
          );
        } else {
          return <span>{p}</span>;
        }
      })}
    </div>
  );
};

export default Paginator;

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  filterAll,
  filterWithoutTransfer,
  filterOneTransfer,
  filterTwoTransfers,
  filterThreeTransfers,
} from '../../redux/actions/actionsFilter';

import classes from './Filter.module.scss';

export const Filter = () => {
  const [classesList, setClassesList] = useState([classes.filters, classes['filter-hidden']]);
  const filter = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const changeClasses = () => {
    if (classesList[1] === classes['filter-hidden']) {
      setClassesList([classes.filters]);
    } else {
      setClassesList([classes.filters, classes['filter-hidden']]);
    }
    return classesList;
  };

  return (
    <div className={classesList.join(' ')} onClick={changeClasses}>
      <p className={classes.header}>количество пересадок</p>
      <label className={classes.filter}>
        <input
          type="checkbox"
          checked={filter.All}
          onChange={() => {
            dispatch(filterAll());
          }}
        />
        <span>Все</span>
      </label>
      <label className={classes.filter}>
        <input
          type="checkbox"
          checked={filter.withoutTransfer}
          onChange={() => {
            dispatch(filterWithoutTransfer());
          }}
        />
        <span>Без пересадок</span>
      </label>
      <label className={classes.filter}>
        <input
          type="checkbox"
          checked={filter.oneTransfer}
          onChange={() => {
            dispatch(filterOneTransfer());
          }}
        />
        <span>1 пересадка</span>
      </label>
      <label className={classes.filter}>
        <input
          type="checkbox"
          checked={filter.twoTransfers}
          onChange={() => {
            dispatch(filterTwoTransfers());
          }}
        />
        <span>2 пересадки</span>
      </label>
      <label className={classes.filter}>
        <input
          type="checkbox"
          checked={filter.threeTransfers}
          onChange={() => {
            dispatch(filterThreeTransfers());
          }}
        />
        <span>3 пересадки</span>
      </label>
    </div>
  );
};

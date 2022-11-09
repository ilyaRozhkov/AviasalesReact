import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import Alert from '@mui/material/Alert';

import { Main } from '../Main/Main';
import { getServices, getId } from '../../services/getServices';

import Logo from './Logo.png';
import classes from './App.module.scss';

export const App = () => {
  const dispatch = useDispatch();
  const [closeAlert, setCloseAlert] = useState(false);
  const { searchId, tickets, stop, error } = useSelector((state) => state.services);

  useEffect(() => {
    if (!searchId) {
      dispatch(getId());
    }
    if (searchId !== null && !stop) {
      dispatch(getServices(searchId));
    }
  }, [searchId, tickets, stop]);

  return (
    <>
      {error && !closeAlert && (
        <Alert
          severity="warning"
          onClose={() => {
            setCloseAlert(true);
          }}
        >
          При загрузке возникла ошибка. Были загружены не все билеты! Чтобы получить больше билетов - обновите страницу.
        </Alert>
      )}
      <div className={classes.App}>
        <img src={Logo} alt="Логотип" className={classes.logo} />
        <Main />
      </div>
    </>
  );
};

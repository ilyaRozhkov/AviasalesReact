import * as actions from '../redux/actions/actionsServices';

const { fetchTicketsSuccess, fetchIdSuccess, fetchIsLoading, fetchIsStop, fetchError } = actions;

export function getId() {
  return function (dispatch) {
    return fetch('https://front-test.dev.aviasales.ru/search')
      .then((res) => {
        if (!res.ok) {
          throw Error(`При загрузке данных произошла ошибка: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        dispatch(fetchIdSuccess(json));
      })
      .catch((e) => console.log(e.message));
  };
}

export function getServices(id) {
  return function (dispatch) {
    return fetch(`https://front-test.dev.aviasales.ru/tickets?searchId=${id}`)
      .then((res) => {
        dispatch(fetchIsLoading());
        if (!res.ok) {
          dispatch(fetchError());
          throw Error(`При загрузке данных произошла ошибка: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        dispatch(fetchIsStop(json));
        dispatch(fetchTicketsSuccess(json));
        if (json.stop) {
          dispatch(fetchIsLoading());
        }
      })
      .catch((e) => console.log(e));
  };
}

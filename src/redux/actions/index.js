import {
  USER_LOGGED_IN,
  USER_LOG_OUT,
  LOADING_ON,
  LOADING_OFF,
  USER_ERROR,
  REGISTERED,
  REGISTER_ERROR,
  GET_DATA,
  GET_TASKS,
} from "../types";
import { admin } from "../../api/admin";

export const RegisterUser =
  (companyname, username, email, password, { companyId: randomId }) =>
  async (dispatch) => {
    dispatch({ type: LOADING_ON });
    await admin.post('/users' , {
        id: randomId,
        companyname,
        username,
        email,
        password,
        companyId: randomId,
        isCompany: true,
        role: {
          admin: true,
          editTask: true,
          addTask: true,
          deleteTask: true,
          changeStatus: true,
          changeSettings: true,
        },
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.id);
        dispatch(getCompany(res.data.id));
      })
      .catch((error) => {
        dispatch({
          type: REGISTER_ERROR,
          payload: {
            message: "Something went wrong. User Registration failed!",
          },
        });
      })
      .finally(() => {
        dispatch({ type: LOADING_OFF });
      });
  };


export const getCompany = (id) => async (dispatch) => {
  dispatch({ type: LOADING_ON });
  admin
    .get(`/users/${id}`)
    .then((res) => {
      dispatch({
        type: REGISTERED,
        payload: {
          isRegistered: true,
          data: res.data,
        },
      });
    })
    .catch((error) => {
      dispatch(LogOutUser());
    })
    .finally(() => {
      dispatch({ type: LOADING_OFF });
    });
};


export const getData = () => async (dispatch) => {
  await admin
    .get("/users")
    .then((res) => {
      dispatch({
        type: GET_DATA,
        payload: {
          data: res.data,
        },
      });
    })
};


export const LoginUser = (email, password, remember) => async (dispatch) => {
  dispatch({ type: LOADING_ON });
  await admin
    .get("/users")
    .then((res) => {
      const data = res.data;
      const filtered = data.filter((f) => f.email === email);
      if (remember) {
        localStorage.setItem("access_token", filtered[0].id);
      } else {
        sessionStorage.setItem("access_token", filtered[0].id);
      }
      dispatch(getUser(filtered[0].id));
    })
    .catch((error) => {
      dispatch({
        type: USER_ERROR,
        payload: { message: "Username or password incorrect" },
      });
    })
    .finally(() => {
      dispatch({ type: LOADING_OFF });
    });
};

export const getUser = (id) => async (dispatch) => {
  dispatch({ type: LOADING_ON });
  admin
    .get(`/users/${id}`)
    .then((res) => {
      dispatch({
        type: USER_LOGGED_IN,
        payload: {
          isLoggedIn: true,
          data: res.data,
        },
      });
    })
    .catch((error) => {
      dispatch(LogOutUser());
    })
    .finally(() => {
      dispatch({ type: LOADING_OFF });
    });
};

export const LogOutUser = () => {
  localStorage.removeItem("access_token");
  return {
    type: USER_LOG_OUT,
    payload: {
      isLoggedIn: false,
      isRegistered: false,
      data: {},
    },
  };
};

export const EditedCompany =
  (id, companyname, username, email, password, companyId, role) => async (dispatch) => {
    dispatch({ type: LOADING_OFF });
    await admin
      .put(`/users/${id}`, {
        companyname,
        username,
        email,
        password,
        isCompany: true,
        companyId,
        role
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.id);
        dispatch(getUser(id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  export const EditedUser =
  (id, name, surname, username, phone, email, password, companyname, companyId, role) => async (dispatch) => {
    dispatch({ type: LOADING_OFF });
    await admin
      .put(`/users/${id}`, {
        name,
        surname,
        username,
        phone,
        email,
        password,
        isCompany: false,
        companyId,
        companyname,
        role
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.id);
        dispatch(getUser(id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  export const getTasks = () => async (dispatch) => {
    // dispatch({type: LOADING_ON})
    await admin.get(`/tasks/`).then((res) => {
      dispatch({
        type: GET_TASKS,
        payload: {
          data: res.data,
        },
      });
    })
  }
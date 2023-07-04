import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiService } from "../helpers";
import { alertActions } from "./alertSlice";

const name = "appointments";
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

export const appointmentsActions = { ...slice.actions, ...extraActions };
export const appointmentsReducer = slice.reducer;

function createInitialState() {
  return {
    lists: null,
    list: null,
    item: null,
    deletedAppointment: null,
    updatedAppointment: null,
  };
}

function createExtraActions() {
  let baseUrl = `${process.env.REACT_APP_API_URL}/appointments`;

  return {
    getAllAppointments: createAsyncThunk(
      `${name}/getAllAppointments`,
      async ({ startDate, endDate, page, limit }, { dispatch }) => {
        dispatch(alertActions.clear());
        try {
          const response = await apiService.get(
            `${baseUrl}?startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}`
          );
          return response.data;
        } catch (error) {
          console.log(error);
          const message =
            "Une erreur s'est produite lors de la récupération des rendez-vous. Veuillez réessayer plus tard.";
          dispatch(alertActions.error(message || error.message));
          throw error;
        }
      }
    ),

    getAppointmentByUser: createAsyncThunk(
      `${name}/getAppointmentByUser`,
      async ({ id, dateBlock, page, limit }, { dispatch }) => {
        dispatch(alertActions.clear());
        try {
          const response = await apiService.get(
            `${baseUrl}/user/${id}?date=${dateBlock}&page=${page}&limit=${limit}`
          );
          return response.data;
        } catch (error) {
          dispatch(alertActions.error(error.message));
        }
      }
    ),

    getAppointmentById: createAsyncThunk(
      `${name}/getAppointment`,
      async (id, { dispatch }) => {
        dispatch(alertActions.clear());
        try {
          const response = await apiService.get(`${baseUrl}/${id}`);
          return response.data;
        } catch (error) {
          dispatch(alertActions.error(error.message));
        }
      }
    ),
    createAppointment: createAsyncThunk(
      `${name}/createAppointment`,
      async ({ id, appointment }, { dispatch }) => {
        setTimeout(() => {
          dispatch(alertActions.clear());
        }, 5000);
        try {
          await apiService.post(`${baseUrl}/${id}/add-new`, appointment);
          const message = "Appointment added";
          dispatch(alertActions.success({ message, showAtterRedirect: true }));
        } catch (error) {
          dispatch(alertActions.error(error));
        }
      }
    ),
    updateAppointmentById: createAsyncThunk(
      `${name}/updateAppointmentById`,
      async ({ id, values }, { dispatch }) => {
        try {
          await apiService.put(`${baseUrl}/${id}`, values);
          const message = "Appointment updated";
          dispatch(alertActions.success({ message }));
        } catch (error) {
          dispatch(alertActions.error(error.message));
          throw error;
        }
      }
    ),

    deleteAppointmentById: createAsyncThunk(
      `${name}/deleteAppointment`,
      async (id, { dispatch }) => {
        try {
          await apiService.delete(`${baseUrl}/${id}`);
          const message = "Appointment deleted";
          dispatch(alertActions.success({ message }));
        } catch (error) {
          dispatch(alertActions.error(error.message));
        }
      }
    ),
  };
}

function createExtraReducers() {
  return (builder) => {
    builder

      .addCase(extraActions.getAllAppointments.pending, (state) => {
        state.lists.loading = true;
      })
      .addCase(extraActions.getAllAppointments.fulfilled, (state, action) => {
        state.lists = { value: action.payload };
      })
      .addCase(extraActions.getAllAppointments.rejected, (state, action) => {
        state.lists = action.error;
      })

      .addCase(extraActions.getAppointmentByUser.pending, (state) => {
        state.list = { loading: true };
      })
      .addCase(extraActions.getAppointmentByUser.fulfilled, (state, action) => {
        state.list = { value: action.payload };
      })
      .addCase(extraActions.getAppointmentByUser.rejected, (state, action) => {
        state.list = { error: action.error };
      })

      .addCase(extraActions.getAppointmentById.pending, (state) => {
        state.item.loading = true;
      })
      .addCase(extraActions.getAppointmentById.fulfilled, (state, action) => {
        state.item = action.payload;
      })
      .addCase(extraActions.getAppointmentById.rejected, (state, action) => {
        state.item = { error: action.error };
      })

      .addCase(extraActions.updateAppointmentById.pending, (state) => {
        state.item.loading = true;
      })
      .addCase(
        extraActions.updateAppointmentById.fulfilled,
        (state, action) => {
          state.item = action.payload;
        }
      )
      .addCase(extraActions.updateAppointmentById.rejected, (state, action) => {
        state.item = { error: action.error };
      })

      .addCase(extraActions.deleteAppointmentById.pending, (state) => {
        state.item.loading = true;
      })
      .addCase(
        extraActions.deleteAppointmentById.fulfilled,
        (state, action) => {
          state.item = action.payload;
        }
      )
      .addCase(extraActions.deleteAppointmentById.rejected, (state, action) => {
        state.item = { error: action.error };
      })
      .addDefaultCase((state) => state);
  };
}

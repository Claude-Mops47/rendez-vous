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
    lists: { value: null, loading: false, error: null },
    list: { value: null, loading: false, error: null },
    item: { value: null, loading: false, error: null },
    deletedAppointment: { value: null, loading: false, error: null },
    updatedAppointment: { value: null, loading: false, error: null },
  };
}

function createExtraActions() {
  let baseUrl = `${process.env.REACT_APP_API_URL}/appointments`;

  return {
    getAllAppointments: createAsyncThunk(
      `${name}/getAllAppointments`,
      async ({ dateBlock, page, limit }, { dispatch }) => {
        dispatch(alertActions.clear());
        try {
          const response = await apiService.get(
            `${baseUrl}?date=${dateBlock}&page=${page}&limit=${limit}`
          );
          return response.data;
        } catch (error) {
          console.log(error);
          const message =
            "Une erreur s'est produite lors de la récupération des rendez-vous. Veuillez réessayer plus tard.";
          dispatch(alertActions.error(message || error.message));
          throw error
        }
      }
    ),

    getAppointmentByUser: createAsyncThunk(
      `${name}/getAppointmentByUser`,
      async (id, { dispatch }) => {
        dispatch(alertActions.clear());
        try {
          const response = await apiService.get(`${baseUrl}/user/${id}`);
          return response.data;
        } catch (error) {
          dispatch(alertActions.error(error.message));
        }
      }
    ),

    getAppointment: createAsyncThunk(
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
      async ({id, appointment}, { dispatch }) =>{
        setTimeout(() => {
          dispatch(alertActions.clear())
        }, 5000);
        try {
          await apiService.post(`${baseUrl}/${id}/add-new`, appointment)
          const message = "Appointment added";
          dispatch(alertActions.success({ message, showAtterRedirect: true }));
        } catch (error) {
          dispatch(alertActions.error(error));
        }

      }
    ),

    updateAppointment: createAsyncThunk(
      `${name}/updateAppointment`,
      async ({ id, values }) => {
        await apiService.put(`${baseUrl}/${id}`, values);
      }
    ),

    deleteAppointment: createAsyncThunk(
      `${name}/deleteAppointment`,
      async (id) => {
        await apiService.delete(`${baseUrl}/${id}`);
      }
    ),
  };
}

function createExtraReducers() {
  return (builder) => {
    builder

      .addCase(extraActions.getAllAppointments.pending, (state) => {
        state.lists.loading =true;
      })
      .addCase(extraActions.getAllAppointments.fulfilled, (state, action) => {
        state.lists = { value: action.payload, loading: false };

        // state.lists.value = action.payload, 
        // state.lists.loading = false 
      })
      .addCase(extraActions.getAllAppointments.rejected, (state) => {
        // state.lists = { error: action.error, loading: false };

        // state.lists.error = action.error;
        // state.lists.loading= false ;
      })

      .addCase(extraActions.getAppointmentByUser.pending, (state) => {
        state.list = { ...state.list, loading: true };
      })
      .addCase(extraActions.getAppointmentByUser.fulfilled, (state, action) => {
        state.list = { value: action.payload, loading: false };
      })
      .addCase(extraActions.getAppointmentByUser.rejected, (state, action) => {
        state.list = { error: action.error, loading: false };
      })

      .addCase(extraActions.updateAppointment.pending, (state) => {
        state.item = { ...state.item, loading: true };
      })
      .addCase(extraActions.updateAppointment.fulfilled, (state, action) => {
        state.item = { value: action.payload, loading: false };
      })
      .addCase(extraActions.updateAppointment.rejected, (state, action) => {
        state.item = { error: action.error, loading: false };
      })

      .addCase(extraActions.deleteAppointment.pending, (state) => {
        state.item = { ...state.item, loading: true };
      })
      .addCase(extraActions.deleteAppointment.fulfilled, (state, action) => {
        state.item = { value: action.payload, loading: false };
      })
      .addCase(extraActions.deleteAppointment.rejected, (state, action) => {
        state.item = { error: action.error, loading: false };
      });

      builder.addDefaultCase((state)=>state)
  };
}

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AuthorizeUser,
  GetAllBusinessUnitHavingProductGroup,
  GetAllProductGroupInBusinessUnit,
  GetGenAiSolution,
  GetPredictionResults,
  GetSubDatasourceByBU,
  GetSummarize,
  GetUserInfo,
  UpdateWriteback,
  ToggleDocumentVote,
  GetActivityDetails,
  AddToKnowledgeBase,
} from "../actions/zendeskActions";

export const authorizeUser = createAsyncThunk(
  "authorizeUser",
  async (data, thunkAPI) => {
    const response = await AuthorizeUser(
      data.customer,
      data.username,
      data.password
    );

    return response;
  }
);
export const getPredictionResults = createAsyncThunk(
  "getPredictionResults",
  async (data, thunkAPI) => {
    const response = await GetPredictionResults(
      data.business_unit_uuid,
      data.query,
      data.product_group,
      data.sub_datasource_uuids,
      data.guide_filter

    );

    return response;
  }
);
export const toggleDocumentVote = createAsyncThunk(
  "toggleDocumentVote",
  async (data, thunkAPI) => {
    const response = await ToggleDocumentVote(
      data.business_unit_uuid,
      data.sub_datasource_uuid,
      data.document_id,
      data.query,
      data.product_group,
      data.vote_direction
    );

    return response;
  }
);
export const getGenAiSolution = createAsyncThunk(
  "getGenAiSolution",
  async (data, thunkAPI) => {
    const response = await GetGenAiSolution(
      data.business_unit_uuid,
      data.sub_datasource_uuids,
      data.document_id,
      data.options
    );

    return response;
  }
);
export const updateWriteback = createAsyncThunk(
  "updateWriteback",
  async (data, thunkAPI) => {
    const response = await UpdateWriteback(
      data.activity_id,
      data.summary
    );

    return response;
  }
);
export const getSummarize = createAsyncThunk(
  "getSummarize",
  async (activity_id, thunkAPI) => {
    const response = await GetSummarize(activity_id);

    return response;
  }
);
export const getActivityDetails = createAsyncThunk(
  "getActivityDetails",
  async (activity_id, thunkAPI) => {
    const response = await GetActivityDetails(activity_id);

    return response;
  }
);
export const getAllBU = createAsyncThunk("getAllBu", async (thunkAPI) => {
  const response = await GetAllBusinessUnitHavingProductGroup();

  return response;
});
export const getAllPG = createAsyncThunk(
  "getAllPG",
  async (organization_uuid, thunkAPI) => {
    const response = await GetAllProductGroupInBusinessUnit(organization_uuid);

    return response;
  }
);

export const getUserInfo = createAsyncThunk("getUserInfo", async (thunkAPI) => {
  const response = await GetUserInfo();

  return response;
});

export const getSubDatasource = createAsyncThunk(
  "getSubDatasource",
  async (business_unit_uuid, thunkAPI) => {
    const response = await GetSubDatasourceByBU(business_unit_uuid);

    return response;
  }
);
export const addToKnowledgeBase = createAsyncThunk(
  "addToKnowledgeBase",
  async (data, thunkAPI) => {
    const response = await AddToKnowledgeBase(
      data.business_unit_uuid,
      data.title,
      data.description,
      data.product
    );

    return response;
  }
);
const zendeskSlice = createSlice({
  name: "zendesk",
  initialState: {
    authorized: null,
    snack_message: null,
    summarize_details:null,
    is_summarizing:false,
    prediction_details: null,
    selected_bu: null,
    selected_pg: null,
    selected_ds: [],
    document_id: null,
    tab_value: 1,
    solution_isLoading: true,
    bu_details: [],
    pg_details: [],
    ds_details: [],
    user_details: null,
    solution_details: null,
    solution_loading: true,
    search_query: null,
    ticket_details: null,
    zendesk_error: null,
    select_all: false,
    activity_details:null,
    selected_doc:null,
    options:{
      length:"short",
      style:"paragraph",
      format:"informational"
    },
    preview_text:"",
    solution_text:"",
    gen_title:"",
  
    selected_guides:null

  },
  reducers: {
    updatePredictionDetails: (state, action) => {
      state.prediction_details = action.payload;
    },
    updateDocumentId: (state, action) => {
      state.document_id = action.payload;
    },
    updateTabValue: (state, action) => {
      state.tab_value = action.payload;
    },
    updateSolutionIsLoading: (state, action) => {
      state.solution_isLoading = action.payload;
    },
    updateSelectedBU: (state, action) => {
      state.selected_bu = action.payload;
    },
    updateSelectedPG: (state, action) => {
      state.selected_pg = action.payload;
    },
    updateSelectedDS: (state, action) => {
      state.selected_ds = action.payload;
    },
    updateQuery: (state, action) => {
      state.search_query = action.payload;
    },
    updateTicketDetails: (state, action) => {
      state.ticket_details = action.payload;
    },
    updateAuthorized: (state, action) => {
      localStorage.removeItem("auth");

      state.authorized = action.payload;
    },
    updateSnackMessage: (state, action) => {
      state.snack_message = action.payload;
    },
    updateSelectAll: (state, action) => {
      state.select_all = action.payload;
    },
    updateSolutionDetails:(state,action)=>{
      state.solution_details={summary:action.payload}
    }
    ,  updateSelectedDoc:(state,action)=>{
      state.selected_doc=action.payload
      state.gen_title=action.payload.Title
      state.preview_text=action.payload.Description
      
          },
          updateOptions:(state,action)=>{
            state.options={...state.options,...action.payload}
          },
          updatePreviewText:(state,action)=>{
            state.preview_text=action.payload
          },
          updateSolutionText:(state,action)=>{
            state.solution_text=action.payload
          },
          updateGenTitle:(state,action)=>{
            state.gen_title=action.payload
          },
          updateSelectedGuides:(state,action)=>{
            state.selected_guides=action.payload
          }
  },

  extraReducers: (builder) => {
    builder
      .addCase(authorizeUser.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          localStorage.setItem("at", action.payload.data.access_token);
          localStorage.setItem("rt", action.payload.data.refresh_token);
          localStorage.setItem("ci", action.payload.data.customer_uuid);
          localStorage.setItem("auth", true);
          state.authorized = true;
        } else {
          state.snack_message = action.payload.data.detail;
        }
      })
      .addCase(getSummarize.pending, (state) => {
        state.is_summarizing=true
        state.snack_message= null;

      })
      .addCase(getSummarize.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.summarize_details = action.payload.data;
          
        } else {
          state.snack_message = action.payload.data.detail;
        }
        state.is_summarizing=false

      })
      .addCase(getGenAiSolution.pending,(state)=>{
        state.snack_message=null
      })
      .addCase(getGenAiSolution.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.solution_details=action.payload.data
          state.solution_text = action.payload.data.summary;
          state.snack_message=action.payload.data.message

        }
        else{
          state.snack_message=action.payload.data.detail

        }
        state.solution_loading = false;


      })
      .addCase(getActivityDetails.pending,(state,action)=>{
        state.snack_message=null
      })
      .addCase(getActivityDetails.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.activity_details = action.payload.data.activity;
        }
        else {
          state.snack_message = action.payload.data.detail;
        }
      })
      .addCase(getPredictionResults.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.prediction_details = action.payload.data;
          state.solution_isLoading = false;
        }
      })
      .addCase(getAllBU.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.bu_details = action.payload.data;
          if (action.payload.data.length > 0)
            state.selected_bu = action.payload.data[0];
        }
      })
      .addCase(getAllPG.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.pg_details = action.payload.data;
          if (action.payload.data.length > 0)
            state.selected_pg = action.payload.data[0];
        }
      })
      .addCase(getSubDatasource.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.ds_details = action.payload.data;
          if (action.payload.data.length > 0)
            state.selected_ds = action.payload.data;
        }
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          localStorage.setItem("ui", action.payload.data.uuid);
          localStorage.setItem("ud",JSON.stringify(action.payload.data))
          state.user_details = action.payload.data;
        }
      })
      .addCase(updateWriteback.pending, (state, action) => {
       
        state.snack_message = null;
      

    })
      .addCase(updateWriteback.fulfilled, (state, action) => {
       if(action.payload.status===200)
          state.snack_message = action.payload.data.message;
        else
        state.snack_message=action.payload.data.detail
        

      })
      .addCase(addToKnowledgeBase.pending,(state)=>{
        state.snack_message=null
      })
      .addCase(addToKnowledgeBase.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.snack_message=action.payload.data.message

        }
        else{
          state.snack_message=action.payload.data.detail

        }


      })

  },
});

export default zendeskSlice.reducer;
export const {
  updatePredictionDetails,
  updateDocumentId,
  updateTabValue,
  updateSolutionIsLoading,
  updateSelectedBU,
  updateSelectedPG,
  updateSelectedDS,
  updateQuery,
  updateTicketDetails,
  updateAuthorized,
  updateSnackMessage,
  updateSelectAll,
  updateSolutionDetails,updateGenTitle,updateOptions,updatePreviewText,updateSelectedDoc,updateSolutionText,updateSelectedGuides
} = zendeskSlice.actions;

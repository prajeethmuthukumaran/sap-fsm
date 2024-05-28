import * as constant from "../../config/config";
import axios from "../../utils/axios"

export const AuthorizeUser = async (customer, username, password) => {
  // Generate a random boundary string
  const boundary = `----${Math.random().toString(36).substring(2)}`;

  const formData = new FormData();
  formData.append('username', username);  // Use the function parameter here
  formData.append('password', password);  // Use the function parameter here

  const headers = {
    // Set the Content-Type header with the boundary
    "Content-Type": `multipart/form-data; boundary=${boundary}`,
  };

  // Create the request body with the boundary
  const body = `--${boundary}\r\n` +
               `Content-Disposition: form-data; name="username"\r\n\r\n` +
               `${username}\r\n` +
               `--${boundary}\r\n` +
               `Content-Disposition: form-data; name="password"\r\n\r\n` +
               `${password}\r\n` +
               `--${boundary}--`;

  const response = await fetch(constant.IDENTITY + `oauth/${customer}/authorize`, {
    method: "POST",
    headers: headers,
    body: body,
  });
  const data = await response.json();
  return {data,status:response.status}
  // You should handle the response here, e.g., checking for success or errors.
}

export const GetSummarize = async (activity_id) => {
    let response = await axios(
        constant.DATA_INTEGRATION + `sap_fsm/${localStorage.getItem('ci')}/selected_activity_summary?activity_id=${activity_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data:{
          options: {
            style: "paragraph",
            formatting: "informational",
            length: "short"
          },
          page: 0
        }
      }
    );
    return { data: response.data, status: response.status };
  };

  export const GetActivityDetails = async (activity_id) => {
    let response = await axios(
        constant.DATA_INTEGRATION + `sap_fsm/${localStorage.getItem('ci')}/selected_activity?activity_id=${activity_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return { data: response.data, status: response.status };
  };



  export const GetPredictionResults = async (business_unit_uuid,query,product_group,sub_datasource_uuids,guide_filter) => {
    let response = await axios(
        constant.PREDICTION_SERVICES + `knowledge_base/${localStorage.getItem('ci')}/${business_unit_uuid}/predict?limit=3&api_trigger=${guide_filter?"guide":"search"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          query:query,
          product_group:product_group,
          sub_datasource_uuids:sub_datasource_uuids,
            guide_filter:guide_filter??{}
          },
      }
    );
    return { data: response.data, status: response.status };
  };


  export const GetAllBusinessUnitHavingProductGroup = async () => {
    let response = await axios(
        constant.IDENTITY + `organization/${localStorage.getItem('ci')}/get_all_bu_having_pg_under_user/${localStorage.getItem('ui')}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
       
      }
    );
    return { data: response.data, status: response.status };
  };

  export const GetAllProductGroupInBusinessUnit = async (organization_uuid) => {
    let response = await axios(
        constant.IDENTITY + `organization/${localStorage.getItem('ci')}/get_all_pg_in_bu_for_user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data:{
            organization_uuid:[organization_uuid]
        }
       
      }
    );
    return { data: response.data, status: response.status };
  };


  export const GetUserInfo = async () => {
    let response = await axios(
      constant.IDENTITY + `oauth/${localStorage.getItem('ci')}/user_info`,
      {
        method: "GET",
        headers: {
            "Content-Type": "application/json",

        },
      }
    );
    return { data: response.data, status: response.status };
  };
  
  export const GetSubDatasourceByBU = async (business_unit_uuid) => {
    let response = await axios(
      constant.DATA_INTEGRATION + `sub_datasource/${localStorage.getItem('ci')}/${business_unit_uuid}`,
      {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
      }
    );
    return { data: response.data, status: response.status };
  };
  
  export const GetGenAiSolution = async (business_unit_uuid,sub_datasource_uuids,document_id,options) => {
    let response = await axios(
      constant.DATA_INTEGRATION + `sap_fsm/${localStorage.getItem('ci')}/action_plan`,
      {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        data:{
document_id,
          filter:{
            module_uuids:["99bacfac-f168-484f-85d0-e47bc0253b91"],
            business_unit_uuids:[business_unit_uuid],
            sub_datasource_uuids:sub_datasource_uuids

          },
          options

        }
      }
    );
    return { data: response.data, status: response.status };
  };

  export const UpdateWriteback = async (activity_id,summary) => {
    let response = await axios(
      constant.DATA_INTEGRATION + `sap_fsm/${localStorage.getItem('ci')}/writeback?activity_id=${activity_id}`,

      {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        data:{
          summary


        }
      }
    );
    return { data: response.data, status: response.status };
  };

  export const ToggleDocumentVote = async(business_unit_uuid,sub_datasource_uuid,document_id,query,product_group,vote_direction)=>{
    let response = await axios(
      constant.PREDICTION_SERVICES+`knowledge_base/${localStorage.getItem('ci')}/${business_unit_uuid}/${sub_datasource_uuid}/${document_id}/toggle_vote?query=${query}&product_group=${product_group}&vote_direction=${vote_direction}&request_channel=${"AI Resolve"}`,
      {
        method:"POST",
        data:{}
      }
    );
    return { data: response.data, status: response.status };

  }
  
  export const AddToKnowledgeBase = async (business_unit_uuid,title,description,product) => {
    let response = await axios(
      constant.DATA_INTEGRATION + `gen_ai/${localStorage.getItem('ci')}/${business_unit_uuid}/add_to_knowledge_base`,
      {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        data:{
          title,
          description,
          product
        }
      }
    );
    return { data: response.data, status: response.status };
  };

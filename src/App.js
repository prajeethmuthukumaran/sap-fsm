import {
  Autocomplete,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Typography,
  Tooltip,
  ToggleButtonGroup,
  ToggleButton,
  Drawer,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Icon,
} from "@mui/material";
import "./App.scss";
import AscendoIcon from "./assets/AscendoIcon";
import UpvoteIcon from "./assets/UpvoteIcon";
import DownvoteIcon from "./assets/DownvoteIcon";
import ViewsIcon from "./assets/ViewsIcon";
import ToptechnicianIcon from "./assets/ToptechnicianIcon";
import SuperexpertIcon from "./assets/SuperexpertIcon";
import LogoutIcon from "./assets/LogoutIcon";
import GenAiIcon from "./assets/GenAiIcon";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShellSdk, SHELL_EVENTS } from "fsm-shell";
import "react-quill/dist/quill.snow.css";

import {
  authorizeUser,
  getActivityDetails,
  getAllBU,
  getAllPG,
  getGenAiSolution,
  getPredictionResults,
  getSubDatasource,
  getSummarize,
  getUserInfo,
  toggleDocumentVote,
  updateSnackMessage,
  updateAuthorized,
  updateDocumentId,
  updateGenTitle,
  updateOptions,
  updatePredictionDetails,
  updatePreviewText,
  updateQuery,
  updateSelectAll,
  updateSelectedBU,
  updateSelectedDS,
  updateSelectedPG,
  updateSolutionDetails,
  updateSolutionText,
  updateTabValue,
  updateWriteback,
  addToKnowledgeBase,
  updateSelectedDoc,
  updateSelectedGuides,
} from "./redux/slice/zendeskSlice";
import validator from "validator";
import ReactQuill from "react-quill";
import { Close, Launch, Loop } from "@mui/icons-material";
import GuideIcon from "./assets/guideIcon";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function App() {
  console.log("new");
  const [activityId, setActivityId] = useState();

  if (!ShellSdk.isInsideShell()) {
    // updateUI('Unable to reach shell eventAPI');
    console.log("Unable to reach shell eventAPI");
  } else {
    // Initialise ShellSDK to connect with parent shell library
    console.log("called shell");

    const shellSdk = ShellSdk.init(window.parent, "*");

    // Initialise the extension by requesting the fsm context
    shellSdk.emit(SHELL_EVENTS.Version1.REQUIRE_CONTEXT, {
      clientIdentifier: "service-contract",
      auth: {
        response_type: "token", // request a user token within the context
      },
    });
    shellSdk.on(SHELL_EVENTS.Version1.REQUIRE_CONTEXT, (event) => {
      const {
        // extract required context from event content
        cloudHost,
        account,
        company,
        user,
        viewState,
        // extract authentication data from event content
      } = JSON.parse(event);
      console.log("after emitted", JSON.parse(event));
      setActivityId(viewState?.selectedActivityId);

      // Add a listener expecting activityID
    });
  }

  const [query, setQuery] = useState();
  const [auth, setAuth] = useState(false);
  const {
    bu_details,
    selected_bu,
    user_details,
    pg_details,
    selected_pg,
    ds_details,
    selected_ds,
    zendesk_error,
    solution_isLoading,
    prediction_details,
    summarize_details,
    solution_loading,
    document_id,
    solution_details,
    tab_value,
    select_all,
    search_query,
    snack_message,
    authorized,
    activity_details,
    is_summarizing,
    selected_doc,
    gen_title,
    preview_text,
    solution_text,
    options,
    selected_guides
  } = useSelector((state) => state.zendeskReducer);
  const [customer, setCustomer] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidCustomer, setIsValidCustomer] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [customerHelper, setCustomerHelper] = useState();
  const [emailHelper, setEmailHelper] = useState();
  const [passHelper, setPassHelper] = useState();

  const [password, setPassword] = useState();
  const [openSnack, setOpenSnack] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [guideOpen,setGuideOpen]=useState(false)


  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    const newIsValid = validator.isEmail(newEmail);
    setUsername(e.target.value);
    setEmail(newEmail);
    setIsValidEmail(newIsValid);
    setEmailHelper(newIsValid ? null : "Enter a valid email address");
  };

  const handleEmailFocus = (e) => {
    const newEmail = e.target.value;
    const newIsValid = validator.isEmail(newEmail);
    setUsername(e.target.value);
    setEmail(newEmail);
    setIsValidEmail(newIsValid);
  };

  const handleEmailBlur = () => {
    setEmailHelper(isValidEmail ? null : "Enter a valid email address");
  };

  const handleCustomerFocus = (e) => {
    const customer = e.target.value;
    setIsValidCustomer(customer);
  };
  const handleCustomerBlur = () => {
    setCustomerHelper(
      isValidCustomer ? null : "Enter a valid organization name"
    );
  };

  const handleCustomerChange = (e) => {
    const customer = e.target.value;
    setIsValidCustomer(customer);
    setCustomer(e.target.value);
    setCustomerHelper(customer ? null : "Enter a valid organization name");
  };

  const handlePasswordFocus = (e) => {
    const password = e.target.value;
    setIsValidPassword(password);
  };

  const handlePasswordBlur = () => {
    setPassHelper(isValidPassword ? null : "Enter a valid password");
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setIsValidPassword(password);
    setPassword(e.target.value);
    setPassHelper(password ? null : "Enter a valid password");
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };
  const action = (
    <Button
      sx={{ color: "#F9BE02" }}
      size="small"
      onClick={handleSnackBarClose}
    >
      Okay
    </Button>
  );
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    handleClose();
    localStorage.clear();
    dispatch(updateTabValue(1));
    dispatch(updateSnackMessage("Successfully logged out" ));

    dispatch(updateAuthorized(false));
  };

  const handleLogin = () => {
    let details = {
      customer: customer,
      username: username,
      password: password,
    };
    if (customer && username && password) dispatch(authorizeUser(details));
    else {
      setIsValidCustomer(customer);
      setIsValidEmail(email);
      setIsValidPassword(password);
      setCustomerHelper(customer ? null : "Enter a valid organization name");

      setEmailHelper(email ? null : "Enter a valid email address");
      setPassHelper(password ? null : "Enter a valid password");
    }

    setOpenSnack(false);
  };
  useEffect(() => {
    if (snack_message) {
      setOpenSnack(true);
    }
  }, [snack_message]);
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setAuth(true);
      dispatch(getUserInfo());
    } else if (authorized === true) {
      dispatch(getUserInfo());

      setAuth(true);
    } else if (authorized === false) {
      localStorage.clear();

      setAuth(false);
    }
  }, [authorized]);

  const dispatch = useDispatch();

  const handleSelectedDS = (option) => {
    if (option.uuid === "home28082001") {
      if (select_all) {
        dispatch(updateSelectedDS([]));
        dispatch(updateSelectAll(false));
      } else {
        dispatch(updateSelectedDS(ds_details));
        dispatch(updateSelectAll(true));
      }
    } else if (selected_ds.includes(option)) {
      dispatch(
        updateSelectedDS(
          selected_ds.filter((item) => item.uuid !== option.uuid)
        )
      );
    } else {
      dispatch(updateSelectedDS([...selected_ds, option]));
    }
  };
  const handleGenAI = (doc) => {
    dispatch(updateSelectedDoc(doc))
    dispatch(updateDocumentId(doc?._id))
    dispatch(updateTabValue(2));
  };

  const handleToggleVote = (
    document_id,
    sub_datasource_uuid,
    vote_direction
  ) => {
    let vote_details = {
      business_unit_uuid: selected_bu.uuid,
      sub_datasource_uuid: sub_datasource_uuid,
      document_id: document_id,
      query: "",
      product_group: selected_pg.name,
      vote_direction: vote_direction,
    };
    const updatedPredictionResults = {
      data: prediction_details?.data?.map((item) =>
        item._id === document_id
          ? {
              ...item,
              user_vote_direction:
                vote_direction === item.user_vote_direction
                  ? null
                  : vote_direction,
              up_vote_count:
                vote_direction === "UP"
                  ? item.user_vote_direction === "UP"
                    ? item.up_vote_count - 1
                    : item.up_vote_count + 1
                  : vote_direction === "DOWN"
                  ? item.user_vote_direction === "UP"
                    ? item.up_vote_count - 1
                    : item.up_vote_count
                  : item.up_vote_count,
              down_vote_count:
                vote_direction === "DOWN"
                  ? item.user_vote_direction === "DOWN"
                    ? item.down_vote_count - 1
                    : item.down_vote_count + 1
                  : vote_direction === "UP"
                  ? item.user_vote_direction === "DOWN"
                    ? item.down_vote_count - 1
                    : item.down_vote_count
                  : item.down_vote_count,
            }
          : item
      ),
    };
    dispatch(updatePredictionDetails(updatedPredictionResults));
    dispatch(toggleDocumentVote(vote_details));
  };

  const handleAddToKnowledge = () => {
    let data = {
      business_unit_uuid: selected_bu.uuid,
      title: gen_title,
      description: solution_text,
      product: selected_doc["Product Group"],
    };
    dispatch(addToKnowledgeBase(data));
  };
  const handleGenAi = () => {
    let data = {
      business_unit_uuid: selected_bu.uuid,
      sub_datasource_uuids: selected_ds.map((item) => item.uuid),
      document_id: selected_doc?._id,
      options: options,
    };
    dispatch(getGenAiSolution(data));
  };

  const handlePredict = () => {
    dispatch(updateQuery(query));
    dispatch(updateTabValue(1));
  };
  const handleClear = () => {
    dispatch(updateSelectedDS([]));
  };

  useEffect(() => {
    if (localStorage.getItem("ci")) dispatch(getUserInfo());
  }, []);
  useEffect(() => {
    if (activityId && (localStorage.getItem("auth") || authorized)) {
      dispatch(getActivityDetails(activityId));
    }
  }, [activityId,authorized]);
  useEffect(() => {
    if (activity_details) {
      setQuery(activity_details?.subject);
      dispatch(updateQuery(activity_details?.subject));
    }
  }, [activity_details]);
  useEffect(() => {
    if (search_query && selected_bu && selected_pg && selected_ds.length > 0) {
      let data = {
        business_unit_uuid: selected_bu.uuid,
        query: search_query,
        product_group: selected_pg.name,
        sub_datasource_uuids: selected_ds.map((item) => item.uuid),
        guide_filter:selected_guides
      };

      dispatch(getPredictionResults(data));
    }
  }, [search_query, selected_bu, selected_ds, selected_pg,selected_guides]);

  useEffect(() => {
    if (user_details) {
      dispatch(getAllBU());
    }
  }, [user_details]);

  useEffect(() => {
    if (document_id) {
      let data = {
        business_unit_uuid: selected_bu.uuid,
        sub_datasource_uuids: selected_ds.map((item) => item.uuid),
        document_id: selected_doc?._id,
        options: options,
      };
      dispatch(getGenAiSolution(data));
    }
  }, [document_id]);

  useEffect(() => {
    if (selected_bu) {
      dispatch(getAllPG(selected_bu.uuid));
      dispatch(getSubDatasource(selected_bu.uuid));
    }
  }, [selected_bu]);

  return (
    <div>

{/* {modalOpen && (
        <div class="backDrop">
          <div class="msgBox">
            <div className="clsIcon" onClick={() => setModalOpen(false)}>
              <Close fontSize="12px" />{" "}
            </div>
            <iframe className="sapIframe"
              width={"100%"}
              height={"100%"}
              style={{ border: "none" }}
              src={`${
                JSON.parse(localStorage.getItem("ud"))?.customer?.app_url
              }/${localStorage.getItem("ci")}/detailed-doc/${
                selected_bu?.uuid
              }/${selected_doc?.sub_datasource_uuid}/${
                selected_doc?._id
              }/${search_query}/${localStorage.getItem(
                "at"
              )}/${localStorage.getItem("rt")}`}
            ></iframe>
          </div>
        </div>
      )} */}
    <div style={{overflow:"auto",height:"100vh"}}>
      <Grid
        sx={{
          height: "40px",
          bgcolor: "#071942",
          display: "flex",
          alignItems: "center",
          p: "16px",
          position:"relative"
        }}
      >
        <AscendoIcon />
        <div className="logout-wrap" title="Log out">
              <IconButton onClick={handleClickOpen}>
                <LogoutIcon />
              </IconButton>
            </div>
      </Grid>


      <Grid sx={{ p: "12px" }}>
        {!auth && (
          <Grid
            display="flex"
            flexDirection="column"
            gap="8px"
            pt="6px"
            overflow="hidden"
          >
            {/* <Box sx={{backgroundColor:"white",borderRadius:"6px",padding:"20px"}} display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="8px" > */}
            {/* <AscendoIcon/>
        <Typography>
            Please login to your account to continue
        </Typography> */}
            <Grid display="flex" flexDirection="column" gap="12px">
              <TextField
                fullWidth
                required
                label="Organization Name"
                size="small"
                onFocus={handleCustomerFocus}
                onBlur={handleCustomerBlur}
                helperText={customerHelper}
                error={!isValidCustomer}
                onChange={handleCustomerChange}
              />
              <TextField
                fullWidth
                required
                label="Email"
                size="small"
                type="email"
                onFocus={handleEmailFocus}
                onBlur={handleEmailBlur}
                helperText={emailHelper}
                error={!isValidEmail}
                onChange={handleEmailChange}
              />
              <TextField
                fullWidth
                required
                label="Password"
                size="small"
                type="password"
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
                helperText={passHelper}
                error={!isValidPassword}
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid
              display="flex"
              flexDirection="column"
              gap="12px"
              justifyContent="end"
              alignItems="end"
            >
              <Button
                fullWidth
                size="small"
                sx={{
                  backgroundColor: "#F9BE02",
                  color: "#071942",
                  mt: "10px",
                  maxWidth: "100px",
                }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Grid>

            {/* </Box> */}
          </Grid>
        )}
        {auth && (
          <Grid>
            <Grid mb="16px">
              <Grid sx={{ display: "flex", gap: "16px" }}>
                <TextField
                  sx={{ flex: "1 1 0", "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
                    height: "32px",
                    overflowY: "clip",
                  }, }}
                  size="small"
                  value={query}
                  type="search"
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter your query here..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handlePredict();
                    }
                  }}
                />
                <Grid
                  sx={{
                    height: "32px",
                    backgroundColor: "#F9BE02",
                    px: "12px",
                    py: "4px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    ":hover": { backgroundColor: "rgba(249, 190, 2, 0.88)" },
                  }}
                  onClick={handlePredict}
                >
                  <img src="https://storage.googleapis.com/exteneral_logo/sap/Predict.svg"></img>
                </Grid>
              </Grid>

              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  pt: "16px",
                }}
              >
                <Autocomplete
                  fullWidth
                  id="checkboxes-tags-demo"
                  disableClearable
                  options={bu_details}
                  value={selected_bu}
                  size="small"
                  onChange={(event, newValue) => {
                    dispatch(updateSelectedBU(newValue));
                  }}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) =>
                    option?.uuid === value?.uuid
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Business Unit" />
                  )}
                />
                <Autocomplete
                  fullWidth
                  id="checkboxes-tags-demo"
                  disableClearable
                  options={pg_details}
                  value={selected_pg}
                  size="small"
                  onChange={(event, newValue) => {
                    dispatch(updateSelectedPG(newValue));
                  }}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) =>
                    option.uuid === value.uuid
                  }
                  style={{ marginLeft: "16px" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Product Group" />
                  )}
                />

                <Autocomplete
                  fullWidth
                  multiple
                  id="checkboxes-tags-demo"
                  options={[
                    { name: "Select All", uuid: "home28082001" },
                    ...ds_details,
                  ]}
                  value={selected_ds}
                  limitTags={1}
                  size="small"
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) =>
                    option.uuid === value.uuid
                  }
                  slotProps={{ clearIndicator: { onClick: handleClear } }}
                  ChipProps={{
                    style: {
                      backgroundColor: "rgba(26, 115, 232, 0.08)",
                      color: "#1A73E8",
                      maxWidth: "100px",

                      width: "65px",
                      minWidth: "50px",
                      fontSize: "12px",
                      height: "18px",
                      borderRadius: "4px",
                      marginBottom: "6px",
                      flexDirection: "row",
                    },
                  }}
                  sx={{
                   
                    "& .MuiChip-deleteIcon": {
                      display: "none",
                    },
                    "& .MuiAutocomplete-tag.MuiAutocomplete-tagSizeSmall": {
                      fontSize: "12px",
                      color: "#1A73E8",
                    },
                  }}
                  renderOption={(props, option, { selected }) => {
                    const isSelected =
                      option.uuid !== "home28082001"
                        ? selected_ds?.includes(option)
                        : selected_ds.length === ds_details.length;
                    return (
                      <Tooltip title={option.name}>
                        <li
                          style={{ marginLeft: "-12px" }}
                          {...props}
                          onClick={() => handleSelectedDS(option)}
                        >
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            checked={isSelected}
                          />
                          {option.name}
                        </li>
                      </Tooltip>
                    );
                  }}
                  style={{ marginLeft: "16px" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Datasources" />
                  )}
                />
                 <button
                        className="openbtn previewguide-sel"
                        onClick={()=>setGuideOpen(true)}
                       
                      >
                        <GuideIcon />{" "}
                      </button>
                      <Drawer
                      anchor="right"
                      open={guideOpen}
                      sx={{width:"200px",height:"100vh"}}
                      
                      >
                        <div className="inner-card height100">
                            <div className="card-content">
                              <div className="tabs-bar tabs-black">
                                <button className="tabs-bar-item tabs-button tablink active-tab">
                                  Guides
                                </button>
                                <div className="guideClose">
                                <IconButton   onClick={()=>setGuideOpen(false)}>
                                  <Close fontSize="14px"/>
                                </IconButton>
                                </div>
                              </div>

                              <div
                                id="guides1"
                                className="tabs-container tabs-display-container"
                              >
                                
                                  <div className="radio-btn">
                                    <h5>{`Top Technician `}</h5>
                                    {prediction_details?.guide_filter?.top_technicians.options.map(
                                      (option, index) => (
                                        <Grid
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "4px",
                                            pt: "4px",
                                          }}
                                        >
                                          {/* <Avatar
                                            alt={option?.label}
                                            src={avatars[index]}
                                            sx={{
                                              width: "36px",
                                              height: "36px",
                                            }}
                                          /> */}

                                          <Typography className="topLabel">
                                            {option?.label}
                                          </Typography>
                                        </Grid>
                                      )
                                    )}
                                    <Grid
                                      display={"flex"}
                                      justifyContent={"space-between"}
                                      alignItems={"center"}
                                    >
                                      <h5>{`Categories`}</h5>

                                      <Typography
                                        fontSize={"12px"}
                                        color={
                                          selected_guides?.category
                                            ?.length > 0
                                            ? "primary"
                                            : "transparent"
                                        }
                                        sx={{
                                          cursor:
                                            selected_guides?.category
                                              ?.length > 0
                                              ? "pointer"
                                              : "default",
                                        }}
                                        onClick={() => {
                                        
                                          dispatch(updateSelectedGuides({category: "",
                                          sub_category: "",
                                          solutions: [],}));
                                         
                                        }}
                                      >
                                        {" "}
                                        x Clear
                                      </Typography>
                                    </Grid>

                                    <FormControl className="form-control">
                                      <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={
                                          selected_guides
                                            ?.category ?? ""
                                        }
                                        onChange={(e) => {
                                         
                                          dispatch(updateSelectedGuides({...selected_guides,

                                            category:
                                              e.target.value,}));
                                       
                                        }}
                                      >
                                        {prediction_details?.guide_filter?.categories?.options?.map(
                                          (category) => (
                                            <label className="form-control">
                                              <FormControlLabel
                                                className="labelWidth"
                                                value={category.label ?? ""}
                                                control={<Radio size="small" />}
                                                label={category.label}
                                              />
                                              <span className="percent">
                                                {`${category.score}%`}
                                              </span>
                                            </label>
                                          )
                                        )}
                                      </RadioGroup>
                                    </FormControl>
                                    <Grid
                                      display={"flex"}
                                      justifyContent={"space-between"}
                                      alignItems={"center"}
                                    >
                                      <h5>{`Sub-Categories`}</h5>
                                      <Typography
                                        fontSize={"12px"}
                                        color={
                                          selected_guides
                                            ?.sub_category?.length > 0
                                            ? "primary"
                                            : "transparent"
                                        }
                                        sx={{
                                          cursor:
                                            selected_guides
                                              ?.sub_category?.length > 0
                                              ? "pointer"
                                              : "default",
                                        }}
                                        onClick={() => {
                                         
                                          dispatch(updateSelectedGuides({...selected_guides,
                                            sub_category: "",
                                            solution: [],}));
                                       
                                        }}
                                      >
                                        {" "}
                                        x Clear
                                      </Typography>
                                    </Grid>

                                    <FormControl className="form-control">
                                      <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={
                                          selected_guides
                                            ?.sub_category ?? ""
                                        }
                                        onChange={(e) => {
                                      
                                          dispatch(updateSelectedGuides({...selected_guides,

                                            sub_category:
                                              e.target.value,
                                            solutions: [],}));
                                       
                                        }}
                                      >
                                        {prediction_details?.guide_filter?.sub_categories.options.map(
                                          (category) => (
                                            <label className="form-control">
                                              <FormControlLabel
                                                className="labelWidth"
                                                value={category.label ?? ""}
                                                control={<Radio size="small" />}
                                                label={category.label}
                                              />
                                              <span className="percent">
                                                {`${category.score}%`}
                                              </span>
                                            </label>
                                          )
                                        )}
                                      </RadioGroup>
                                    </FormControl>
                                    <Grid
                                      display={"flex"}
                                      justifyContent={"space-between"}
                                      alignItems={"center"}
                                    >
                                      <h5>{`Solutions`}</h5>

                                      <Typography
                                        fontSize={"12px"}
                                        color={
                                          selected_guides?.solutions
                                            ?.length > 0
                                            ? "primary"
                                            : "transparent"
                                        }
                                        sx={{
                                          cursor:
                                            selected_guides
                                              ?.solutions?.length > 0
                                              ? "pointer"
                                              : "default",
                                        }}
                                        onClick={() => {
                             
                                          dispatch(updateSelectedGuides({...selected_guides,

                                            solutions: [],}));
                                         
                                        }}
                                      >
                                        {" "}
                                        x Clear
                                      </Typography>
                                    </Grid>

                                    {prediction_details?.guide_filter?.solutions.options.map(
                                      (solution) => (
                                        <Grid
                                          className="form-control mb-0"
                                          mt="5px"
                                          display="flex"
                                          gap="5px"
                                          alignItems="center"
                                          sx={{ cursor: "pointer" }}
                                          onChange={() => {
                                            const updatedSolutions =
                                              selected_guides?.solutions
                                                ? selected_guides.solutions.some(
                                                    (item) =>
                                                      item.label ===
                                                        solution.label &&
                                                      item.score ===
                                                        solution.score
                                                  )
                                                  ? selected_guides.solutions.filter(
                                                      (item) =>
                                                        item.label !==
                                                          solution.label &&
                                                        item.score !==
                                                          solution.score
                                                    )
                                                  : [
                                                      ...selected_guides?.solutions,
                                                      solution,
                                                    ]
                                                : [solution];
                                            
                                            dispatch(updateSelectedGuides({...selected_guides,
                                              solutions:
                                                updatedSolutions,}));
                                          
                                          }}
                                        >
                                          <Checkbox
                                            size="small"
                                            disableRipple
                                            sx={{ padding: 0 }}
                                            checked={selected_guides?.solutions?.some(
                                              (selected) =>
                                                selected.label ===
                                                  solution.label &&
                                                selected.score ===
                                                  solution.score
                                            )}
                                          />{" "}
                                          <Typography
                                            className="labelWidth"
                                            fontSize="14px"
                                          >
                                            {solution.label}
                                          </Typography>
                                          <span className="percent">
                                            {`${solution.score}%`}
                                          </span>
                                        </Grid>
                                      )
                                    )}
                                    <h5>{`Parts`}</h5>
                                    {prediction_details?.guide_filter?.parts.options.map((option) => (
                                      <Grid
                                        className="form-control mb-0"
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                      >
                                        <Typography className="topLabel">
                                          {option?.label}
                                        </Typography>
                                        <span className="percent">
                                          {`${option.score}%`}
                                        </span>
                                      </Grid>
                                    ))}
                                  </div>
                                
                              </div>
                            </div>
                          </div>

                      </Drawer>
              </Grid>
              <Grid sx={{ borderBottom: "0.5px solid grey" }}>
                <Tabs
                  value={tab_value}
                  onChange={(e, newValue) => dispatch(updateTabValue(newValue))}

                >
                  <Tab value={1} label="Solution" />
                  <Tab value={2} label="Generate AI" />
                  {/* <Tab value={0} label="SUMMARIZE" /> */}
                </Tabs>
              </Grid>
            </Grid>
            <Grid >
              {tab_value === 0 && (
                <Grid>
                  <div className="summarize-wrap">
                    {!summarize_details ? (
                      !is_summarizing ? (
                        <div>
                          <Button
                            sx={{
                              color: "#071942",
                              backgroundColor: "#F9BE02",
                              textTransform: "none",
                              fontSize: "12px",
                              paddingX: "14px",
                            }}
                            onClick={() => dispatch(getSummarize(activityId))}
                          >
                            Summarize this Activity
                          </Button>
                        </div>
                      ) : (
                        <Typography fontSize="13px">Loading...</Typography>
                      )
                    ) : (
                      <>
                        {/* <ul>
                          <b>Intent</b>
                          <li>
                            {summarize_details?.intent ??
                              "No user interaction found"}
                          </li>
                        </ul>
                        <ul>
                          <b>Sentiment</b>
                          <li>
                            {summarize_details?.sentiment ??
                              "No user interaction found"}
                          </li>
                        </ul> */}
                        <ul>
                          <b>Summary</b>
                          <li
                            style={{ whiteSpace: "pre-line" }}
                            dangerouslySetInnerHTML={{
                              __html:
                                summarize_details?.summary ??
                                "No interaction found",
                            }}
                          ></li>
                        </ul>
                        <div className="btn-wrap">
                          <Button
                            sx={{
                              color: "#071942",
                              backgroundColor: "#F9BE02",
                              textTransform: "none",
                              fontSize: "12px",
                              paddingX: "14px",
                            }}
                            onClick={() =>
                              dispatch(
                                updateWriteback({
                                  activity_id: activityId,
                                  summary: summarize_details?.summary,
                                })
                              )
                            }
                          >
                            Add Summary To Activity
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </Grid>
              )}
              {tab_value === 1 && (
                <Grid>
                  {solution_isLoading ? (
                    <Typography fontSize="13px">Loading...</Typography>
                  ) : selected_ds.length > 0 ? (
                    prediction_details?.data?.length > 0 ? (
                      <div className="solution-wrap">
                        <div className="band search" id="searchPage">
                          <ul className="cards">
                            <li className="question-desc">
                              {prediction_details?.data?.map((item) => (
                                <div className="card" onClick={()=>{dispatch(updateSelectedDoc(item));setModalOpen(true)}}>
                                  <div className="card-content">
                                    <div className="cards-link">
                                      <div className="card-text">
                                        <Tooltip
                                          title={`Datasource : ${item.sub_datasource.name}`}
                                        >
                                          <span
                                            className="colored-dropdown"
                                            style={{
                                              backgroundColor:
                                                item.sub_datasource.color,
                                            }}
                                          >
                                            {
                                              item.sub_datasource.name.toUpperCase()[0]
                                            }
                                          </span>
                                        </Tooltip>
                                        <b title={item.Title}>{item.Title}</b>
                                        <Tooltip title="Relevance Score">
                                          <span
                                            className="count"
                                            style={{
                                              backgroundColor:
                                                item.probability > 70
                                                  ? "#32C49E"
                                                  : item.probability > 30
                                                  ? "#EF9E42"
                                                  : "E25757",
                                            }}
                                          >
                                            {item.probability}
                                          </span>
                                        </Tooltip>
                                        <p className="desc-id">
                                          <span className="alink">
                                            #{item["Unique Number"]}
                                          </span>
                                          {/* <span className="update-date">
                      Updated at 10 Jun, 2023
                    </span> */}
                                        </p>
                                        <p className="desc-answer">
                                          {item.Description}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="icon-list">
                                      <ul>
                                        <Tooltip title="Upvote">
                                          <li>
                                            <span>
                                              <IconButton
                                                className="updown-icons"
                                                onClick={() =>
                                                  handleToggleVote(
                                                    item._id,
                                                    item.sub_datasource_uuid,
                                                    "UP"
                                                  )
                                                }
                                              >
                                                <UpvoteIcon
                                                  fill={
                                                    item.user_vote_direction ===
                                                    "UP"
                                                      ? "#071942"
                                                      : "none"
                                                  }
                                                />
                                              </IconButton>
                                              {item.up_vote_count}
                                            </span>
                                          </li>
                                        </Tooltip>
                                        <Tooltip title="Downvote">
                                          <li>
                                            <span>
                                              <IconButton
                                                className="updown-icons"
                                                onClick={() =>
                                                  handleToggleVote(
                                                    item._id,
                                                    item.sub_datasource_uuid,
                                                    "DOWN"
                                                  )
                                                }
                                              >
                                                <DownvoteIcon
                                                  fill={
                                                    item.user_vote_direction ===
                                                    "DOWN"
                                                      ? "#071942"
                                                      : "none"
                                                  }
                                                />
                                              </IconButton>
                                              {item.down_vote_count}
                                            </span>
                                          </li>
                                        </Tooltip>
                                        <Tooltip title="Views">
                                          <li>
                                            <span className="links">
                                              <ViewsIcon />
                                              {item.view_data.count}
                                            </span>
                                          </li>
                                        </Tooltip>
                                        <Tooltip title="Top Technician Vote Count">
                                          <li>
                                            <span className="links">
                                              <ToptechnicianIcon />
                                              {item.expert_up_vote_count}
                                            </span>
                                          </li>
                                        </Tooltip>
                                        <Tooltip title="Super Expert Vote Count">
                                          <li>
                                            <span className="links">
                                              <SuperexpertIcon />
                                              {item.super_expert_up_vote_count}
                                            </span>
                                          </li>
                                        </Tooltip>
                                        <Tooltip title="Generate Solution">
                                          <li>
                                            <span
                                              className="links generatebtn"
                                              style={{ cursor: "pointer" }}
                                              onClick={() =>
                                                handleGenAI(item)
                                              }
                                            >
                                              <GenAiIcon />
                                            </span>
                                          </li>
                                        </Tooltip>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </li>
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <Typography fontSize="13px">No results found</Typography>
                    )
                  ) : (
                    <Typography fontSize="13px">
                      Please select atleast one datasource to view the results
                    </Typography>
                  )}
                </Grid>
              )}
              {tab_value === 2 && (
                <Grid>
                  {solution_loading ? (
                    <Typography fontSize="13px">
                      {" "}
                      {document_id
                        ? "Loading..."
                        : "Select a document from the solution tab to see Generate AI solution"}
                    </Typography>
                  ) : (
                    <div className="genAi-wrap">
                      {solution_details?.summary?.length > 0 ? (
                        <div className="generativeAi">
                          <div className="fixedWrap">
                            <TextField
                              size="small"
                              value={selected_doc?.Title}
                              sx={{
                                width: "100%",
                                "& .MuiInputBase-root.MuiOutlinedInput-root": {
                                  padding: 0,
                                },
                              }}
                              value={gen_title}
                              onChange={(e) =>
                                dispatch(updateGenTitle(e.target.value))
                              }
                              type="text"
                              label="Title"
                            />
                            <div className="borderBox">
                              <Typography className="smallTitle">
                                Draft Preview
                              </Typography>
                              <ReactQuill
                                value={preview_text}
                                onChange={(newValue) =>
                                  dispatch(updatePreviewText(newValue))
                                }
                              />
                            </div>

                            <div className="borderBox d-flex">
                              <div className="outerFormat">
                                <div className="innerformat">
                                  <Typography className="smallTitle">
                                    Tone
                                  </Typography>
                                  <ToggleButtonGroup
                                    exclusive
                                    value={options.format}
                                    onChange={(e, newValue) =>
                                      dispatch(
                                        updateOptions({ format: newValue })
                                      )
                                    }
                                  >
                                    <ToggleButton value="informational">
                                      Informational
                                    </ToggleButton>
                                    <ToggleButton value="formal">
                                      Formal
                                    </ToggleButton>
                                  </ToggleButtonGroup>
                                </div>
                                <div className="innerformat">
                                  <Typography className="smallTitle">
                                    Format
                                  </Typography>
                                  <ToggleButtonGroup
                                    exclusive
                                    value={options.style}
                                    onChange={(e, newValue) =>
                                      dispatch(
                                        updateOptions({ style: newValue })
                                      )
                                    }
                                  >
                                    <ToggleButton value="paragraph">
                                      Paragraph
                                    </ToggleButton>
                                    <ToggleButton value="bullet points">
                                      Bullet Points
                                    </ToggleButton>
                                  </ToggleButtonGroup>
                                </div>
                                <div className="innerformat">
                                  <Typography className="smallTitle">
                                    Length
                                  </Typography>
                                  <ToggleButtonGroup
                                    exclusive
                                    value={options.length}
                                    onChange={(e, newValue) =>
                                      dispatch(
                                        updateOptions({ length: newValue })
                                      )
                                    }
                                  >
                                    <ToggleButton value="short">
                                      Short
                                    </ToggleButton>
                                    <ToggleButton value="medium">
                                      Medium
                                    </ToggleButton>
                                    <ToggleButton value="long">
                                      Long
                                    </ToggleButton>
                                  </ToggleButtonGroup>
                                </div>
                              </div>
                            </div>
                            <div className="borderBox">
                              <Typography className="smallTitle">
                                Generated Response
                              </Typography>
                              <ReactQuill
                                value={solution_text}
                                onChange={(newValue) =>
                                  dispatch(updateSolutionText(newValue))
                                }
                              />
                            </div>
                            <div className="regenerateWrap">
                              <Button
                                className="howKnowledgeBTn"
                                sx={{ color: "#071942", textTransform: "none" }}
                                startIcon={<Launch />}
                                onClick={handleAddToKnowledge}
                              >
                                Add to Knowledge
                              </Button>
                              <Button
                                className="regenerateBTn"
                                sx={{
                                  color: "#071942",
                                  backgroundColor: "#F9BE02",
                                  textTransform: "none",
                                }}
                                startIcon={<Loop />}
                                onClick={handleGenAi}
                              >
                                Regenerate
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Typography fontSize="13px" whiteSpace="pre-line">
                          No results found
                        </Typography>
                      )}
                    </div>
                  )}
                </Grid>
              )}
            </Grid>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Are you sure?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to logout?
                </DialogContentText>
              </DialogContent>
              <DialogActions sx={{ pr: 3, pb: 2.5 }}>
                <Button
                  width="75px"
                  sx={{ color: "rgba(7, 25, 66)", textTransform: "none" }}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  width="75px"
                  sx={{
                    color: "rgba(7, 25, 66)",
                    textTransform: "none",
                    backgroundColor: "#F9BE02",
                  }}
                  onClick={handleLogout}
                  autoFocus
                >
                  Logout
                </Button>
              </DialogActions>
            </Dialog>
            
          </Grid>
        )}
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnack}
        message={snack_message}
        action={action}
        onClose={handleSnackBarClose}
        autoHideDuration={3500}
      />
    </div>
    </div>
  );
}

export default App;

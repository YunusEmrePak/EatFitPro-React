import React, { useState } from "react";

const unFilteredUserData = {
  name: null,
  surname: null,
  email: null,
  length: null,
  weight: null,
};

const unFilteredFoodData = {
  name: null,
  calories: null,
  foodCategoryName: null,
};

const unFilteredActivityData = {
  name: null,
  calories: null,
  activityCategoryName: null,
};

const unFilteredFoodCategoryData = {
  name: null,
};

const unFilteredActivityCategoryData = {
  name: null,
};

const unFilteredFoodAndActivityAssignmentData = {
  userName: null,
  userSurname: null,
  foodName: null,
  activityName: null,
  date: null,
};

const EatFitProContext = React.createContext({
  pageName: "",
  idOfDeletingItem: 0,
  isClickedDeleteButton: false,
  idOfUpdatingItem: 0,
  isClickedUpdateButton: false,
  isDatabaseConnected: false,

  updatingItem: {},
  updatedItem: {},

  filterUserData: [],
  filterFoodData: [],
  filterFoodCategoryData: [],
  filterActivityData: [],
  filterActivityCategoryData: [],
  filterFoodAndActivityAssignmentData: [],

  userListSize: 0,
  foodListSize: 0,
  foodCategoryListSize: 0,
  activityCategoryListSize: 0,
  activityListSize: 0,
  foodAndActivityAssignmentListSize: 0,

  currentPage: "",
  currentFormPage: "",
  currentListPage: "",

  setPageName: () => {},

  openDeleteDialog: () => {},
  closeDeleteDialog: () => {},
  openUpdateDialog: () => {},
  closeUpdateDialog: () => {},
  setIsDatabaseConnected: () => {},

  setIsClickedDeleteButton: () => {},
  setIsClickedUpdateButton: () => {},

  setUpdatingItem: () => {},
  setUpdatedItem: () => {},

  changePage: () => {},
  changeFormPage: () => {},
  changeListPage: () => {},

  setFilterUserData: () => {},
  setFilterFoodData: () => {},
  setFilterFoodCategoryData: () => {},
  setFilterActivityData: () => {},
  setFilterActivityCategoryData: () => {},
  setFilterFoodAndActivityAssignmentData: () => {},

  setUserListSize: () => {},
  setFoodListSize: () => {},
  setFoodCategoryListSize: () => {},
  setActivityListSize: () => {},
  setActivityCategoryListSize: () => {},
  setFoodAndActivityAssignmentListSize: () => {},
});

export const EatFitProContextProvider = (props) => {
  const [pageName, setPageName] = useState("Main Page");
  const [isClickedDeleteButton, setIsClickedDeleteButton] = useState(false);
  const [isClickedUpdateButton, setIsClickedUpdateButton] = useState(false);
  const [idOfDeletingItem, setIdOfDeletingItem] = useState(0);
  const [idOfUpdatingItem, setIdOfUpdatingItem] = useState(0);
  const [updatingItem, setUpdatingItem] = useState({});
  const [updatedItem, setUpdatedItem] = useState({});

  const [filterUserData, setFilterUserData] = useState(unFilteredUserData);
  const [filterFoodData, setFilterFoodData] = useState(unFilteredFoodData);
  const [filterActivityData, setFilterActivityData] = useState(
    unFilteredActivityData
  );
  const [filterFoodCategoryData, setFilterFoodCategoryData] = useState(
    unFilteredFoodCategoryData
  );
  const [filterActivityCategoryData, setFilterActivityCategoryData] = useState(
    unFilteredActivityCategoryData
  );
  const [
    filterFoodAndActivityAssignmentData,
    setFilterFoodAndActivityAssignmentData,
  ] = useState(unFilteredFoodAndActivityAssignmentData);

  const [userListSize, setUserListSize] = useState(10);
  const [foodListSize, setFoodListSize] = useState(10);
  const [foodCategoryListSize, setFoodCategoryListSize] = useState(10);
  const [activityListSize, setActivityListSize] = useState(10);
  const [activityCategoryListSize, setActivityCategoryListSize] = useState(10);
  const [
    foodAndActivityAssignmentListSize,
    setFoodAndActivityAssignmentListSize,
  ] = useState(10);

  const [isDatabaseConnected, setIsDatabaseConnected] = useState(true);

  const [currentPage, setCurrentPage] = useState("Main");
  const [currentFormPage, setCurrentFormPage] = useState("User");
  const [currentListPage, setCurrentListPage] = useState("User");

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const changeFormPage = (page) => {
    setCurrentFormPage(page);
  };

  const changeListPage = (page) => {
    setCurrentListPage(page);
  };

  const openDeleteDialog = (value) => {
    setIdOfDeletingItem(value.id);
    setIsClickedDeleteButton(true);
  };

  const closeDeleteDialog = () => {
    setIsClickedDeleteButton(false);
  };

  const openUpdateDialog = (value) => {
    setIdOfUpdatingItem(value.id);
    setIsClickedUpdateButton(true);
  };

  const closeUpdateDialog = () => {
    setIsClickedUpdateButton(false);
  };

  return (
    <EatFitProContext.Provider
      value={{
        pageName: pageName,
        isClickedDeleteButton: isClickedDeleteButton,
        idOfDeletingItem: idOfDeletingItem,
        isClickedUpdateButton: isClickedUpdateButton,
        idOfUpdatingItem: idOfUpdatingItem,
        isDatabaseConnected: isDatabaseConnected,

        updatingItem: updatingItem,
        updatedItem: updatedItem,

        filterUserData: filterUserData,
        filterFoodData: filterFoodData,
        filterActivityData: filterActivityData,
        filterFoodCategoryData: filterFoodCategoryData,
        filterActivityCategoryData: filterActivityCategoryData,
        filterFoodAndActivityAssignmentData:
          filterFoodAndActivityAssignmentData,

        userListSize: userListSize,
        foodListSize: foodListSize,
        foodCategoryListSize: foodCategoryListSize,
        activityListSize: activityListSize,
        activityCategoryListSize: activityCategoryListSize,
        foodAndActivityAssignmentListSize: foodAndActivityAssignmentListSize,

        currentPage: currentPage,
        currentFormPage: currentFormPage,
        currentListPage: currentListPage,

        setPageName: setPageName,

        changePage: changePage,
        changeFormPage: changeFormPage,
        changeListPage: changeListPage,

        openDeleteDialog: openDeleteDialog,
        closeDeleteDialog: closeDeleteDialog,

        openUpdateDialog: openUpdateDialog,
        closeUpdateDialog: closeUpdateDialog,

        setIsDatabaseConnected: setIsDatabaseConnected,

        setUpdatingItem: setUpdatingItem,
        setUpdatedItem: setUpdatedItem,

        setIsClickedDeleteButton: setIsClickedDeleteButton,
        setIsClickedUpdateButton: setIsClickedUpdateButton,

        setFilterUserData: setFilterUserData,
        setFilterFoodData: setFilterFoodData,
        setFilterActivityData: setFilterActivityData,
        setFilterFoodCategoryData: setFilterFoodCategoryData,
        setFilterActivityCategoryData: setFilterActivityCategoryData,
        setFilterFoodAndActivityAssignmentData:
          setFilterFoodAndActivityAssignmentData,

        setUserListSize: setUserListSize,
        setFoodListSize: setFoodListSize,
        setFoodCategoryListSize: setFoodCategoryListSize,
        setActivityListSize: setActivityListSize,
        setActivityCategoryListSize: setActivityCategoryListSize,
        setFoodAndActivityAssignmentListSize:
          setFoodAndActivityAssignmentListSize,
      }}
    >
      {props.children}
    </EatFitProContext.Provider>
  );
};

export default EatFitProContext;

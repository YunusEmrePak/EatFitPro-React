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
  mainPageVisible: false,
  addingPageVisible: false,
  listingPageVisible: false,

  userFormVisible: false,
  foodFormVisible: false,
  foodCategoryFormVisible: false,
  activityFormVisible: false,
  activityCategoryFormVisible: false,
  foodAndActivityAssignmentFormVisible: false,

  userListVisible: false,
  foodListVisible: false,
  foodCategoryListVisible: false,
  activityListVisible: false,
  activityCategoryListVisible: false,
  foodAndActivityAssignmentListVisible: false,

  pageName: "",
  idOfDeletingItem: 0,
  isClickedDeleteButton: false,

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

  openDeleteDialog: () => {},
  closeDeleteDialog: () => {},
  setIsClickedDeleteButton: () => {},

  showMainPage: () => {},
  showAddingPage: () => {},
  showListingPage: () => {},

  showUserForm: () => {},
  showFoodForm: () => {},
  showFoodCategoryForm: () => {},
  showActivityForm: () => {},
  showActivityCategoryForm: () => {},
  showFoodAndActivityAssignmentForm: () => {},

  showUserList: () => {},
  showFoodList: () => {},
  showFoodCategoryList: () => {},
  showActivityList: () => {},
  showActivityCategoryList: () => {},
  showFoodAndActivityAssignmentList: () => {},

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
  const [mainPageVisible, setMainPageVisible] = useState(true);
  const [addingPageVisible, setAddingPageVisible] = useState(false);
  const [listingPageVisible, setListingPageVisible] = useState(false);

  const [userFormVisible, setUserFormVisible] = useState(true);
  const [foodFormVisible, setFoodFormVisible] = useState(false);
  const [foodCategoryFormVisible, setFoodCategoryFormVisible] = useState(false);
  const [activityFormVisible, setActivityFormVisible] = useState(false);
  const [activityCategoryFormVisible, setActivityCategoryFormVisible] = useState(false);
  const [foodAndActivityAssignmentFormVisible, setFoodAndActivityAssignmentFormVisible] = useState(false);

  const [userListVisible, setUserListVisible] = useState(true);
  const [foodListVisible, setFoodListVisible] = useState(false);
  const [foodCategoryListVisible, setFoodCategoryListVisible] = useState(false);
  const [activityListVisible, setActivityListVisible] = useState(false);
  const [activityCategoryListVisible, setActivityCategoryListVisible] = useState(false);
  const [foodAndActivityAssignmentListVisible, setFoodAndActivityAssignmentListVisible] = useState(false);

  const [pageName, setPageName] = useState("Main Page");
  const [isClickedDeleteButton, setIsClickedDeleteButton] = useState(false);
  const [idOfDeletingItem, setIdOfDeletingItem] = useState(0);

  const [filterUserData, setFilterUserData] = useState(unFilteredUserData);
  const [filterFoodData, setFilterFoodData] = useState(unFilteredFoodData);
  const [filterActivityData, setFilterActivityData] = useState(unFilteredActivityData);
  const [filterFoodCategoryData, setFilterFoodCategoryData] = useState(unFilteredFoodCategoryData);
  const [filterActivityCategoryData, setFilterActivityCategoryData] = useState(unFilteredActivityCategoryData);
  const [filterFoodAndActivityAssignmentData, setFilterFoodAndActivityAssignmentData] = useState(unFilteredFoodAndActivityAssignmentData);

  const [userListSize, setUserListSize] = useState(10);
  const [foodListSize, setFoodListSize] = useState(10);
  const [foodCategoryListSize, setFoodCategoryListSize] = useState(10);
  const [activityListSize, setActivityListSize] = useState(10);
  const [activityCategoryListSize, setActivityCategoryListSize] = useState(10);
  const [foodAndActivityAssignmentListSize, setFoodAndActivityAssignmentListSize] = useState(10);

  const showMainPage = () => {
    setMainPageVisible(true);
    setAddingPageVisible(false);
    setListingPageVisible(false);
    setPageName("Main Page");
  };

  const showAddingPage = () => {
    setMainPageVisible(false);
    setAddingPageVisible(true);
    setListingPageVisible(false);
    setPageName("Adding Page");
  };

  const showListingPage = () => {
    setMainPageVisible(false);
    setAddingPageVisible(false);
    setListingPageVisible(true);
    setPageName("Listing Page");
  };

  const showUserForm = () => {
    setUserFormVisible(true);
    setFoodFormVisible(false);
    setFoodCategoryFormVisible(false);
    setActivityFormVisible(false)
    setActivityCategoryFormVisible(false);
    setFoodAndActivityAssignmentFormVisible(false)
  };

  const showFoodForm = () => {
    setUserFormVisible(false);
    setFoodFormVisible(true);
    setFoodCategoryFormVisible(false);
    setActivityFormVisible(false)
    setActivityCategoryFormVisible(false);
    setFoodAndActivityAssignmentFormVisible(false)
  };

  const showFoodCategoryForm = () => {
    setUserFormVisible(false);
    setFoodFormVisible(false);
    setFoodCategoryFormVisible(true);
    setActivityFormVisible(false)
    setActivityCategoryFormVisible(false);
    setFoodAndActivityAssignmentFormVisible(false)
  };

  const showActivityForm = () => {
    setUserFormVisible(false);
    setFoodFormVisible(false);
    setFoodCategoryFormVisible(false);
    setActivityFormVisible(true)
    setActivityCategoryFormVisible(false);
    setFoodAndActivityAssignmentFormVisible(false)
  };

  const showActivityCategoryForm = () => {
    setUserFormVisible(false);
    setFoodFormVisible(false);
    setFoodCategoryFormVisible(false);
    setActivityFormVisible(false)
    setActivityCategoryFormVisible(true);
    setFoodAndActivityAssignmentFormVisible(false)
  };

  const showFoodAndActivityAssignmentForm = () => {
    setUserFormVisible(false);
    setFoodFormVisible(false);
    setFoodCategoryFormVisible(false);
    setActivityFormVisible(false)
    setActivityCategoryFormVisible(false);
    setFoodAndActivityAssignmentFormVisible(true)
  };

  const showUserList = () => {
    setUserListVisible(true);
    setFoodListVisible(false);
    setFoodCategoryListVisible(false);
    setActivityListVisible(false);
    setActivityCategoryListVisible(false);
    setFoodAndActivityAssignmentListVisible(false);
  };

  const showFoodList = () => {
    setUserListVisible(false);
    setFoodListVisible(true);
    setFoodCategoryListVisible(false);
    setActivityListVisible(false);
    setActivityCategoryListVisible(false);
    setFoodAndActivityAssignmentListVisible(false);
  };

  const showFoodCategoryList = () => {
    setUserListVisible(false);
    setFoodListVisible(false);
    setFoodCategoryListVisible(true);
    setActivityListVisible(false);
    setActivityCategoryListVisible(false);
    setFoodAndActivityAssignmentListVisible(false);
  };

  const showActivityList = () => {
    setUserListVisible(false);
    setFoodListVisible(false);
    setFoodCategoryListVisible(false);
    setActivityListVisible(true);
    setActivityCategoryListVisible(false);
    setFoodAndActivityAssignmentListVisible(false);
  };

  const showActivityCategoryList = () => {
    setUserListVisible(false);
    setFoodListVisible(false);
    setFoodCategoryListVisible(false);
    setActivityListVisible(false);
    setActivityCategoryListVisible(true);
    setFoodAndActivityAssignmentListVisible(false);
  };

  const showFoodAndActivityAssignmentList = () => {
    setUserListVisible(false);
    setFoodListVisible(false);
    setFoodCategoryListVisible(false);
    setActivityListVisible(false);
    setActivityCategoryListVisible(false);
    setFoodAndActivityAssignmentListVisible(true);
  };

  const openDeleteDialog = (value) => {
    setIdOfDeletingItem(value.id);
    setIsClickedDeleteButton(true);
  }

  const closeDeleteDialog = () => {
    setIsClickedDeleteButton(false);
  };

  return (
    <EatFitProContext.Provider
      value={{
        mainPageVisible: mainPageVisible,
        addingPageVisible: addingPageVisible,
        listingPageVisible: listingPageVisible,

        userFormVisible: userFormVisible,
        foodFormVisible: foodFormVisible,
        foodCategoryFormVisible: foodCategoryFormVisible,
        activityFormVisible: activityFormVisible,
        activityCategoryFormVisible: activityCategoryFormVisible,
        foodAndActivityAssignmentFormVisible: foodAndActivityAssignmentFormVisible,

        userListVisible: userListVisible,
        foodListVisible: foodListVisible,
        foodCategoryListVisible: foodCategoryListVisible,
        activityListVisible: activityListVisible,
        activityCategoryListVisible: activityCategoryListVisible,
        foodAndActivityAssignmentListVisible: foodAndActivityAssignmentListVisible,

        pageName: pageName,
        isClickedDeleteButton: isClickedDeleteButton,
        idOfDeletingItem: idOfDeletingItem,

        filterUserData: filterUserData,
        filterFoodData: filterFoodData,
        filterActivityData: filterActivityData,
        filterFoodCategoryData: filterFoodCategoryData,
        filterActivityCategoryData: filterActivityCategoryData,
        filterFoodAndActivityAssignmentData: filterFoodAndActivityAssignmentData,

        userListSize: userListSize,
        foodListSize: foodListSize,
        foodCategoryListSize: foodCategoryListSize,
        activityListSize: activityListSize,
        activityCategoryListSize: activityCategoryListSize,
        foodAndActivityAssignmentListSize: foodAndActivityAssignmentListSize,

        openDeleteDialog: openDeleteDialog,
        closeDeleteDialog: closeDeleteDialog,
        setIsClickedDeleteButton: setIsClickedDeleteButton,

        showMainPage: showMainPage,
        showAddingPage: showAddingPage,
        showListingPage: showListingPage,

        showUserForm: showUserForm,
        showFoodForm: showFoodForm,
        showFoodCategoryForm: showFoodCategoryForm,
        showActivityForm: showActivityForm,
        showActivityCategoryForm: showActivityCategoryForm,
        showFoodAndActivityAssignmentForm: showFoodAndActivityAssignmentForm,

        showUserList: showUserList,
        showFoodList: showFoodList,
        showFoodCategoryList: showFoodCategoryList,
        showActivityList: showActivityList,
        showActivityCategoryList: showActivityCategoryList,
        showFoodAndActivityAssignmentList: showFoodAndActivityAssignmentList,

        setFilterUserData: setFilterUserData,
        setFilterFoodData: setFilterFoodData,
        setFilterActivityData: setFilterActivityData,
        setFilterFoodCategoryData: setFilterFoodCategoryData,
        setFilterActivityCategoryData: setFilterActivityCategoryData,
        setFilterFoodAndActivityAssignmentData: setFilterFoodAndActivityAssignmentData,

        setUserListSize: setUserListSize,
        setFoodListSize: setFoodListSize,
        setFoodCategoryListSize: setFoodCategoryListSize,
        setActivityListSize: setActivityListSize,
        setActivityCategoryListSize: setActivityCategoryListSize,
        setFoodAndActivityAssignmentListSize: setFoodAndActivityAssignmentListSize,

      }}
    >
      {props.children}
    </EatFitProContext.Provider>
  );
};

export default EatFitProContext;
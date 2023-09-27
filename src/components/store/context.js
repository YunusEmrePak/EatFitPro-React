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

const unFilteredFoodCategoryData = {
  name: null,
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

  filterUserData: [],
  filterFoodData: [],
  filterFoodCategoryData: [],
  filterActivityData: [],
  filterFoodAndActivityAssignmentData: [],

  userListSize: 0,
  foodListSize: 0,
  foodCategoryListSize: 0,
  activityListSize: 0,
  foodAndActivityAssignmentListSize: 0,

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
  setFilterFoodAndActivityAssignmentData: () => {},

  setUserListSize: () => {},
  setFoodListSize: () => {},
  setFoodCategoryListSize: () => {},
  setActivityListSize: () => {},
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

  const [filterUserData, setFilterUserData] = useState(unFilteredUserData);
  const [filterFoodData, setFilterFoodData] = useState(unFilteredFoodData);
  const [filterFoodCategoryData, setFilterFoodCategoryData] = useState(unFilteredFoodCategoryData);

  const [userListSize, setUserListSize] = useState(10);
  const [foodListSize, setFoodListSize] = useState(10);
  const [foodCategoryListSize, setFoodCategoryListSize] = useState(10);
  const [activityListSize, setActivityListSize] = useState(10);
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

        filterUserData: filterUserData,
        filterFoodData: filterFoodData,
        filterFoodCategoryData: filterFoodCategoryData,

        userListSize: userListSize,
        foodListSize: foodListSize,
        foodCategoryListSize: foodCategoryListSize,
        activityListSize: activityListSize,
        foodAndActivityAssignmentListSize: foodAndActivityAssignmentListSize,

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
        setFilterFoodCategoryData: setFilterFoodCategoryData,

        setUserListSize: setUserListSize,
        setFoodListSize: setFoodListSize,
        setFoodCategoryListSize: setFoodCategoryListSize,
        setActivityListSize: setActivityListSize,
        setFoodAndActivityAssignmentListSize: setFoodAndActivityAssignmentListSize,

      }}
    >
      {props.children}
    </EatFitProContext.Provider>
  );
};

export default EatFitProContext;

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

const EatFitProContext = React.createContext({
  mainPageVisible: false,
  addingPageVisible: false,
  listingPageVisible: false,
  userFormVisible: false,
  foodFormVisible: false,
  foodCategoryFormVisible: false,
  userListVisible: false,
  foodListVisible: false,
  foodCategoryListVisible: false,
  pageName: "",
  filterUserData: [],
  filterFoodData: [],
  userListSize: 0,
  foodListSize: 0,
  showMainPage: () => {},
  showAddingPage: () => {},
  showListingPage: () => {},
  showUserForm: () => {},
  showFoodForm: () => {},
  showFoodCategoryForm: () => {},
  showUserList: () => {},
  showFoodList: () => {},
  showFoodCategoryList: () => {},
  setFilterUserData: () => {},
  setFilterFoodData: () => {},
  setUserListSize: () => {},
  setFoodListSize: () => {},
});

export const EatFitProContextProvider = (props) => {
  const [mainPageVisible, setMainPageVisible] = useState(true);
  const [addingPageVisible, setAddingPageVisible] = useState(false);
  const [listingPageVisible, setListingPageVisible] = useState(false);
  const [userFormVisible, setUserFormVisible] = useState(true);
  const [foodFormVisible, setFoodFormVisible] = useState(false);
  const [foodCategoryFormVisible, setFoodCategoryFormVisible] = useState(false);
  const [userListVisible, setUserListVisible] = useState(true);
  const [foodListVisible, setFoodListVisible] = useState(false);
  const [foodCategoryListVisible, setFoodCategoryListVisible] = useState(false);
  const [pageName, setPageName] = useState("Main Page");
  const [filterUserData, setFilterUserData] = useState(unFilteredUserData);
  const [filterFoodData, setFilterFoodData] = useState(unFilteredFoodData);
  // const [filterFoodCategoryData, setFilterFoodCategoryData] = useState(un);
  const [userListSize, setUserListSize] = useState(5);
  const [foodListSize, setFoodListSize] = useState(5);

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
  };

  const showFoodForm = () => {
    setUserFormVisible(false);
    setFoodFormVisible(true);
    setFoodCategoryFormVisible(false);
  };

  const showFoodCategoryForm = () => {
    setUserFormVisible(false);
    setFoodFormVisible(false);
    setFoodCategoryFormVisible(true);
  };

  const showUserList = () => {
    setUserListVisible(true);
    setFoodListVisible(false);
    setFoodCategoryListVisible(false);
  };

  const showFoodList = () => {
    setUserListVisible(false);
    setFoodListVisible(true);
    setFoodCategoryListVisible(false);
  };

  const showFoodCategoryList = () => {
    setUserListVisible(false);
    setFoodListVisible(false);
    setFoodCategoryListVisible(true);
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
        userListVisible: userListVisible,
        foodListVisible: foodListVisible,
        foodCategoryListVisible: foodCategoryListVisible,
        pageName: pageName,
        filterUserData: filterUserData,
        filterFoodData: filterFoodData,
        userListSize: userListSize,
        foodListSize: foodListSize,
        showMainPage: showMainPage,
        showAddingPage: showAddingPage,
        showListingPage: showListingPage,
        showUserForm: showUserForm,
        showFoodForm: showFoodForm,
        showFoodCategoryForm: showFoodCategoryForm,
        showUserList: showUserList,
        showFoodList: showFoodList,
        showFoodCategoryList: showFoodCategoryList,
        setFilterUserData: setFilterUserData,
        setFilterFoodData: setFilterFoodData,
        setUserListSize: setUserListSize,
        setFoodListSize: setFoodListSize,
      }}
    >
      {props.children}
    </EatFitProContext.Provider>
  );
};

export default EatFitProContext;

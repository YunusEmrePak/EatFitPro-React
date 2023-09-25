import React, { useState } from "react";

const unFilteredData = {
  name: null,
  surname: null,
  email: null,
  length: null,
  weight: null,
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
  userListSize: 0,
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
  setUserListSize: () => {},
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
  const [filterUserData, setFilterUserData] = useState(unFilteredData);
  const [userListSize, setUserListSize] = useState(5);

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
        userListSize: userListSize,
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
        setUserListSize: setUserListSize,
      }}
    >
      {props.children}
    </EatFitProContext.Provider>
  );
};

export default EatFitProContext;

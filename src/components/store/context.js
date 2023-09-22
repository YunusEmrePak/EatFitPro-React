import React, { useState } from "react";

const EatFitProContext = React.createContext({
  mainPageVisible: false,
  addingPageVisible: false,
  listingPageVisible: false,
  userFormVisible: false,
  foodFormVisible: false,
  userListVisible: false,
  foodListVisible: false,
  pageName: "",
  showMainPage: () => {},
  showAddingPage: () => {},
  showListingPage: () => {},
  showUserForm: () => {},
  showFoodForm: () => {},
  showUserList: () => {},
  showFoodList: () => {},
});

export const EatFitProContextProvider = (props) => {
  const [mainPageVisible, setMainPageVisible] = useState(true);
  const [addingPageVisible, setAddingPageVisible] = useState(false);
  const [listingPageVisible, setListingPageVisible] = useState(false);
  const [userFormVisible, setUserFormVisible] = useState(true);
  const [foodFormVisible, setFoodFormVisible] = useState(false);
  const [userListVisible, setUserListVisible] = useState(true);
  const [foodListVisible, setFoodListVisible] = useState(false);
  const [pageName, setPageName] = useState("Adding Page");

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
  };

  const showFoodForm = () => {
    setUserFormVisible(false);
    setFoodFormVisible(true);
  };

  const showUserList = () => {
    setUserListVisible(true);
    setFoodListVisible(false);
  };

  const showFoodList = () => {
    setUserListVisible(false);
    setFoodListVisible(true);
  };

  return (
    <EatFitProContext.Provider
      value={{
        mainPageVisible: mainPageVisible,
        addingPageVisible: addingPageVisible,
        listingPageVisible: listingPageVisible,
        userFormVisible: userFormVisible,
        foodFormVisible: foodFormVisible,
        userListVisible: userListVisible,
        foodListVisible: foodListVisible,
        pageName: pageName,
        showMainPage: showMainPage,
        showAddingPage: showAddingPage,
        showListingPage: showListingPage,
        showUserForm: showUserForm,
        showFoodForm: showFoodForm,
        showUserList: showUserList,
        showFoodList: showFoodList,
      }}
    >
      {props.children}
    </EatFitProContext.Provider>
  );
};

export default EatFitProContext;

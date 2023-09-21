import { useState } from "react";
import AddingPage from "../AdminPages/AddingPage/AddingPage";
import PageController from "../Controller/PageController/PageController";
import ListingPage from "../AdminPages/ListingPage/ListingPage";

import styles from "./AdminPanel.module.css";

const AdminPanel = () => {
  const [addingPageVisible, setAddingPageVisible] = useState(true);
  const [listingPageVisible, setListingPageVisible] = useState(false);

  const showAddingPage = () => {
    setAddingPageVisible(true);
    setListingPageVisible(false);
  };

  const showListingPage = () => {
    setAddingPageVisible(false);
    setListingPageVisible(true);
  };

  return (
    <div>
      <PageController
        showAddingPage={showAddingPage}
        showListingPage={showListingPage}
        addingPageVisible={addingPageVisible}
        listingPageVisible={listingPageVisible}
      />
      {(addingPageVisible && <AddingPage />) ||
        (listingPageVisible && <ListingPage />)}
    </div>
  );
};

export default AdminPanel;

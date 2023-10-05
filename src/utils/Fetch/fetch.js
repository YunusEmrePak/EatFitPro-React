import React, { useContext, useEffect, useState } from "react";
const [isLoading, setIsLoading] = useState(true);
const [pageNumber, setPageNumber] = useState(1);
const [totalPage, setTotalPage] = useState(0);
const [isDatabaseConnected, setIsDatabaseConnected] = useState(true);

const getFilteredData = async (whichData, filterData, pageNumber, listSize) => {
  const url = `http://localhost:8080/${whichData}/get/filtered?page=${
    pageNumber - 1
  }&size=${listSize}`;
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filterData),
  })
    .then((response) => response.json())
    .then((data) => {
      setIsLoading(false);
      setUserList(data.content);
      setTotalPage(data.totalPages);
      setIsDatabaseConnected(true);
    })
    .catch((error) => {
      console.log(error);
      setIsDatabaseConnected(false);
    });
};

const getAllData = async () => {};

const addData = async () => {};

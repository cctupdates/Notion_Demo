import React, { createContext, useState, useEffect } from "react";

import uuid from "uuid/v4";

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [open, setOpen] = React.useState(false);

  const [title, setTitle] = useState("");

  const [status, setStatus] = useState("");

  const [description, setDescription] = useState("");

  const [id, setId] = useState("");

  const [typeStatus, setTypeStatus] = useState("");

  const [isClicked, setisClicked] = useState(false);

  const [btnClicked, setbtnClicked] = useState(false);

  //data

  const [itemsFromBackend, setitemsFromBackend] = useState([
    { id: uuid(), content: "", status: "Not Started", title: "First task" },
    { id: uuid(), content: "", status: "Not Started", title: "Second task" },
    { id: uuid(), content: "", status: "Not Started", title: "Third task" },
    { id: uuid(), content: "", status: "Not Started", title: "Fourth task" },
    { id: uuid(), content: "", status: "In Progress", title: "First task" },
    { id: uuid(), content: "", status: "Completed", title: "First task" },
  ]);

  const [itemsFromBackendR2, setitemsFromBackendR2] = useState([
    { id: uuid(), content: "", status: "In Progress", title: "First task" },
    { id: uuid(), content: "", status: "In Progress", title: "Second task" },
    { id: uuid(), content: "", status: "In Progress", title: "Third task" },
  ]);

  const [itemsFromBackendR3, setitemsFromBackendR3] = useState([
    { id: uuid(), content: "", status: "Completed", title: "First task" },
  ]);

  const columnsFromBackend = {
    ["NotStarted"]: {
      name: "Not Started",
      items: itemsFromBackend.filter((obj) => obj.status === "Not Started"),
      color: "#FFCCD1",
    },
    ["InProgress"]: {
      name: "In Progress",
      items: itemsFromBackend.filter((obj) => obj.status === "In Progress"),
      color: "#FBEECC",
    },
    ["Completed"]: {
      name: "Completed",
      items: itemsFromBackend.filter((obj) => obj.status === "Completed"),
      color: "#CCE7E1",
    },
  };

  const [columns, setColumns] = useState(columnsFromBackend);

  //fucntions
  const handleClickOpen = (id, status, item) => {
    setId(id);
    setTypeStatus(status);
    setOpen(true);
    setTitle(item.title);
    setDescription(item.content);
    setStatus(item.status);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (id, type) => {
    setitemsFromBackend(
      itemsFromBackend.map((obj) =>
        obj.id === id
          ? {
              ...obj,

              title: title,
              content: description,
              status: status,
            }
          : obj
      )
    );

    const newtype = status.replace(/\s/g, "");

    const findItem = columnsFromBackend[newtype].items.find(
      (obj) => obj.id === id
    );

    if (findItem) {
      //update

      setitemsFromBackend(
        itemsFromBackend.map((obj) =>
          obj.id === id
            ? {
                ...obj,

                title: title,
                content: description,
                status: status,
              }
            : obj
        )
      );

      columnsFromBackend[newtype].items = [
        ...columnsFromBackend[newtype].items.map((obj) =>
          obj.id === id
            ? {
                ...obj,

                title: title,
                content: description,
                status: status,
              }
            : obj
        ),
      ];

      setColumns(columnsFromBackend);
    } else if (findItem === undefined) {
      //add
      const checkType = type.replace(/\s/g, "");

      const removeIndex = columnsFromBackend[checkType].items.findIndex(
        (obj) => obj.id === id
      );

      columnsFromBackend[newtype].items = [
        ...columnsFromBackend[newtype].items,
        { id: uuid(), status: status, title: title, content: description },
      ];

      columnsFromBackend[checkType].items = columnsFromBackend[
        checkType
      ].items.filter((obj) => obj.id !== id);

      setColumns(columnsFromBackend);
    }

    setisClicked(!isClicked);
    localStorage.setItem("itemsFromBackend", JSON.stringify(itemsFromBackend));
    setTitle("");
    setDescription("");
    setStatus("");
  };

  let handleDelete = (id, type) => {
    const checkType = type.replace(/\s/g, "");
    setitemsFromBackend(itemsFromBackend.filter((obj) => obj.id !== id));
    columnsFromBackend[checkType].items.filter((obj) => obj.id !== id);
    setColumns(columnsFromBackend);
  };

  return (
    <ItemContext.Provider
      value={{
        handleClickOpen,
        handleClose,
        open,
        setOpen,
        title,
        setTitle,
        description,
        setDescription,
        status,
        setStatus,
        handleDescription,
        handleStatus,
        handleTitle,
        itemsFromBackend,
        setitemsFromBackend,
        itemsFromBackendR2,
        setitemsFromBackendR2,
        itemsFromBackendR3,
        setitemsFromBackendR3,
        columnsFromBackend,
        handleSubmit,
        id,
        setId,
        typeStatus,
        setTypeStatus,
        columns,
        setColumns,
        isClicked,
        setisClicked,
        handleDelete,
        // btnClicked,
        // setbtnClicked,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export default ItemContext;

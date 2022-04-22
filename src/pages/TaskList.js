import React, { useState, useContext } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import EditDescription from "../components/EditDescription";
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import ItemContext from "../context/ItemFunctions";
import CustomizedDialogs from "../components/EditDescription";
import Grid from "@mui/material/Grid";

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

const TaskList = () => {
  const {
    handleClickOpen,
    handleClose,
    open,
    setOpen,
    itemsFromBackend,
    setitemsFromBackend,
    itemsFromBackendR2,
    setitemsFromBackendR2,
    itemsFromBackendR3,
    setitemsFromBackendR3,
    columnsFromBackend,
    columns,
    setColumns,
    isClicked,
    setisClicked,
    btnClicked,
    setbtnClicked,
  } = useContext(ItemContext);

  let i = 0;
  const handleAdd = (type) => {
    setitemsFromBackend([
      ...itemsFromBackend,
      { id: uuid(), status: type, title: "Newly created" },
    ]);

    if (type === "Not Started") {
      columnsFromBackend.NotStarted.items = [
        ...columnsFromBackend.NotStarted.items,
        { id: uuid(), status: type, title: "Newly created" },
      ];
      setColumns(columnsFromBackend);
    } else if (type === "In Progress") {
      columnsFromBackend.InProgress.items = [
        ...columnsFromBackend.InProgress.items,
        { id: uuid(), status: type, title: "Newly created" },
      ];
      setColumns(columnsFromBackend);
    } else if (type === "Completed") {
      columnsFromBackend.Completed.items = [
        ...columnsFromBackend.Completed.items,
        { id: uuid(), status: type, title: "Newly created" },
      ];
      setColumns(columnsFromBackend);
    }
    localStorage.setItem(
      "columnsFromBackend",
      JSON.stringify(columnsFromBackend)
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        width: "85%",
        margin: "auto",
      }}
    >
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <Grid
          container
          direction="column"
          spacing={{ xs: 2, md: 5 }}
          columns={{ xs: 4, sm: 7, md: 9 }}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <Grid key={columnId} item xs={6} sm={6} md={10}>
                <div
                  style={{
                    display: "flex",
                    width: "90%",
                    justifyContent: "space-between",
                    margin: "auto",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <p style={{ backgroundColor: column.color }}>
                      {column.name}
                    </p>
                    <p style={{ marginLeft: "1em" }}>{column.items.length}</p>
                  </div>
                  <div style={{ display: "flex" }}>
                    {" "}
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <MoreHorizIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                </div>

                <div style={{ margin: 8, width: "100%" }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "wheat"
                              : "white",
                            padding: 4,
                            width: "100%",

                            minHeight: 500,
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      onClick={() => {
                                        handleClickOpen(
                                          item.id,
                                          item.status,
                                          item
                                        );
                                      }}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 20,
                                        margin: "0 0 8px 0",
                                        height: "15px",
                                        borderRadius: "5px",
                                        color: "black",
                                        boxShadow:
                                          "5px 4px 17px -2px rgba(0,0,0,0.46)",
                                        border: "0.5px solid grey",

                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {item.title}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                          <Button
                            style={{
                              width: "100%",
                              display: "flex",
                              opacity: 0.6,

                              textAlign: "left",
                              alignItems: "left",
                            }}
                            variant="none"
                            startIcon={<AddIcon />}
                            onClick={() => handleAdd(column.name)}
                          >
                            New
                          </Button>

                          <CustomizedDialogs />
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </DragDropContext>
    </div>
  );
};

export default TaskList;

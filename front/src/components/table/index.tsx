"use client";

import React, { JSX, useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, ChipProps } from "@mui/material";
import { Priority, TodoItem } from "@/app/types/todo";

type PartialTodo = Partial<TodoItem>;

type TableProps = {
  todoItems?: PartialTodo[];
};

const getPriorityColor = (priority?: Priority): ChipProps["color"] => {
  switch (priority) {
    case Priority.High:
      return "error";
    case Priority.Medium:
      return "warning";
    case Priority.Low:
      return "info";
    default:
      return "default";
  }
};

const TodoTable = ({ todoItems = [] }: TableProps): JSX.Element => {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const itemsToDisplay = Array.isArray(todoItems) ? todoItems : [];

  const formatDateForDisplay = (dateValue?: Date): string => {
    if (!dateValue) return "";
    if (!isClient) return ""; 
    return new Date(dateValue).toLocaleDateString();
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", overflowX: "auto" }}>
      <Table sx={{ minWidth: 650 }} aria-label="タスク一覧テーブル">
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>タスク名</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
              優先度
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
              ステータス
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
              開始日・終了日
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
              ラベル
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
              詳細
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itemsToDisplay.map((task) => (
            <TableRow
              key={task.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": { backgroundColor: "#f9f9f9" },
              }}
            >
              <TableCell component="th" scope="row">
                {task.title || ""}
              </TableCell>
              <TableCell align="center">{task.priority ? <Chip label={task.priority} color={getPriorityColor(task.priority)} size="small" sx={{ fontWeight: "medium" }} /> : ""}</TableCell>
              <TableCell align="center">{task.status ? task.status : ""}</TableCell>
              <TableCell align="left">{[formatDateForDisplay(task.startDate), formatDateForDisplay(task.endDate)].filter(Boolean).join(" - ")}</TableCell>
              <TableCell align="left">{task.labels && task.labels.length > 0 ? task.labels.map((label, index) => <Chip key={`${task.id}-label-${index}`} label={label} variant="outlined" size="small" sx={{ marginRight: "4px", marginBottom: "4px" }} />) : ""}</TableCell>
              <TableCell align="left">{task.description || ""}</TableCell>
            </TableRow>
          ))}
          {itemsToDisplay.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} align="center">
                該当するタスクが見つかりません。
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TodoTable.displayName = "TodoTable";

export default TodoTable;

"use client";

import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, ChipProps, Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";

// GraphQLから取得したデータに基づく型定義
type TodoItem = {
  id: string;
  title: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  priority?: { __typename?: string; id: string; name: string } | null;
  status?: { __typename?: string; id: string; name: string } | null;
  labels?: { __typename?: string; id: string; name: string }[];
};

type PartialTodo = Partial<TodoItem>;

type TableProps = {
  todoItems?: PartialTodo[];
};

const getPriorityColor = (priority?: string): ChipProps["color"] => {
  if (!priority) return "default";

  switch (priority.toLowerCase()) {
    case "high":
      return "error";
    case "medium":
      return "warning";
    case "low":
      return "info";
    default:
      return "default";
  }
};

const getStatusColor = (status?: string): ChipProps["color"] => {
  if (!status) return "default";

  switch (status.toLowerCase()) {
    case "完了":
      return "success";
    case "着手":
      return "primary";
    case "未着手":
      return "warning";
    default:
      return "default";
  }
};

const TodoTable = ({ todoItems = [] }: TableProps) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const itemsToDisplay = Array.isArray(todoItems) ? todoItems : [];

  const formatDateForDisplay = (dateValue?: Date): string => {
    if (!dateValue) return "";
    if (!isClient) return "";

    try {
      return new Date(dateValue).toLocaleDateString("ja-JP");
    } catch (error) {
      return "";
    }
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 0, boxShadow: "none", height: "100%" }}>
      <Table sx={{ minWidth: 650 }} aria-label="タスク一覧テーブル" stickyHeader>
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell style={{ width: "200px" }} sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
              タスク名
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
              優先度
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
              ステータス
            </TableCell>
            <TableCell style={{ width: "200px" }} align="left" sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
              開始日・終了日
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
              ラベル
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
              説明
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itemsToDisplay.map((task, index) => (
            <TableRow
              key={task.id || `todo-${index}`}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": { backgroundColor: "#f9f9f9" },
              }}
            >
              <TableCell component="th" scope="row">
                {task.title || ""}
              </TableCell>
              <TableCell align="center">{task.priority ? <Chip label={typeof task.priority === "string" ? task.priority : task.priority.name || ""} color={getPriorityColor(typeof task.priority === "string" ? task.priority : task.priority.name)} size="small" sx={{ fontWeight: "medium" }} /> : "-"}</TableCell>
              <TableCell align="center">{task.status ? <Chip label={typeof task.status === "string" ? task.status : task.status.name || ""} color={getStatusColor(typeof task.status === "string" ? task.status : task.status.name)} size="small" variant="outlined" sx={{ fontWeight: "medium" }} /> : "-"}</TableCell>
              <TableCell align="left">{[formatDateForDisplay(task.startDate), formatDateForDisplay(task.endDate)].filter(Boolean).join(" - ") || "-"}</TableCell>
              <TableCell align="left">
                {task.labels && task.labels.length > 0 ? (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {task.labels.map((label, labelIndex) => (
                      <Chip key={`${task.id || index}-label-${labelIndex}`} label={typeof label === "string" ? label : label?.name || ""} variant="outlined" size="small" color="secondary" />
                    ))}
                  </div>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell align="left">
                <Stack direction="row" alignItems="center" spacing={1} sx={{ maxWidth: 300 }}>
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{task.description || "-"}</span>
                  <Button variant="outlined" size="small" onClick={() => router.push(`/edit-task?id=${task.id}`)}>
                    編集
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
          {itemsToDisplay.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
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

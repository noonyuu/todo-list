"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, Chip, Typography, Paper, Grid, OutlinedInput, SelectChangeEvent, Pagination } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useGetTodosQuery, useGetPrioritiesQuery, useGetLabelsQuery, useGetStatusesQuery } from "@/generated/graphql";
import TodoTable from "@/components/table";
import { useRouter } from "next/navigation";

// 検索フィルターの型定義
interface SearchFilters {
  titleKeyword: string;
  descriptionKeyword: string;
  selectedStatuses: string[];
  selectedPriority: string;
  selectedLabels: string[];
  endDateSortOrder: "ASC" | "DESC" | "";
}

// デフォルト値を定数として定義
const DEFAULT_FILTERS: SearchFilters = {
  titleKeyword: "",
  descriptionKeyword: "",
  selectedStatuses: [],
  selectedPriority: "",
  selectedLabels: [],
  endDateSortOrder: "",
};

export default function TodoManagementPage() {
  const router = useRouter();

  // ページネーションの状態管理
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentCursor, setCurrentCursor] = useState<string | null>(null);
  const [cursors, setCursors] = useState<string[]>([]);
  const itemsPerPage = 10;

  // 検索フィルターの状態管理
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS);

  // 基本データ取得
  const { data: statusesData, loading: statusesLoading } = useGetStatusesQuery();
  const { data: prioritiesData, loading: prioritiesLoading } = useGetPrioritiesQuery();
  const { data: labelsData, loading: labelsLoading } = useGetLabelsQuery();

  // Todoデータ取得クエリ（フィルターとページネーション付き）
  const { data, loading, error, refetch } = useGetTodosQuery({
    variables: {
      first: itemsPerPage,
      after: currentCursor,
      filter: {
        keywordTitle: filters.titleKeyword || undefined,
        keywordDescription: filters.descriptionKeyword || undefined,
        priorityIds: filters.selectedPriority ? prioritiesData?.priorities?.find((priority) => priority.name === filters.selectedPriority)?.id : undefined,
        statusIds: filters.selectedStatuses.length > 0 ? statusesData?.statuses?.filter((status: { name: string }) => filters.selectedStatuses.includes(status.name))?.map((status) => status.id) : undefined,
        labelIds: filters.selectedLabels.length > 0 ? labelsData?.labels?.filter((label) => filters.selectedLabels.includes(label.name))?.map((label) => label.id) : undefined,
      },
      sort: {
        order: filters.endDateSortOrder ? filters.endDateSortOrder : undefined, // 優先度のソート順
      },
    },
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  // ページネーション状態を更新
  useEffect(() => {
    if (data?.todos?.totalCount) {
      const total = Math.ceil(data.todos.totalCount / itemsPerPage);
      setTotalPages(total);
    }
  }, [data?.todos?.totalCount, itemsPerPage]);

  const { uniqueStatuses, uniquePriorities, uniqueLabels } = useMemo(() => {
    // ステータスを取得1
    const statuses = statusesData?.statuses?.map((status: { name: string }) => status.name).sort() || [];

    // 優先度を取得
    const priorities = prioritiesData?.priorities?.map((priority) => priority.name).sort() || [];

    // ラベルを取得
    const labels = labelsData?.labels?.map((label) => label.name).sort() || [];

    return {
      uniqueStatuses: statuses,
      uniquePriorities: priorities,
      uniqueLabels: labels,
    };
  }, [statusesData, prioritiesData, labelsData]);

  // タスクアイテムの変換とフィルタリング
  const todoItems = useMemo(() => {
    if (!data?.todos?.edges) return [];

    let items = data.todos.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      description: node.description || undefined,
      startDate: node.startDate ? new Date(node.startDate) : undefined,
      endDate: node.endDate ? new Date(node.endDate) : undefined,
      priority: node.priority,
      status: node.status,
      labels: node.labels || [],
    }));

    // 優先度フィルタリング（クライアントサイド）
    if (filters.selectedPriority) {
      items = items.filter((item) => item.priority?.name === filters.selectedPriority);
    }
    return items;
  }, [data, filters.selectedPriority]);

  // フィルター更新ハンドラー
  const handleFilterChange = (field: keyof SearchFilters, value: string | string[]) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
    resetPagination();
  };

  // 複数選択のハンドラー
  const handleMultiSelectChange = (field: keyof SearchFilters) => (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    handleFilterChange(field, typeof value === "string" ? value.split(",") : value);
  };

  // フィルターのクリア
  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    resetPagination();
  };

  // ページネーション処理
  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);

    if (page === 1) {
      // 1ページ目に戻る
      setCurrentCursor(null);
      setCursors([]);
    } else if (page > currentPage) {
      // 次のページへ
      if (data?.todos?.pageInfo?.hasNextPage && data.todos.pageInfo.endCursor) {
        setCursors((prev) => [...prev, currentCursor || ""]);
        setCurrentCursor(data.todos.pageInfo.endCursor);
      }
    } else if (page < currentPage) {
      // 前のページへ
      if (cursors.length > 0) {
        const newCursors = [...cursors];
        const targetCursor = newCursors[page - 2] || null;
        setCursors(newCursors.slice(0, page - 1));
        setCurrentCursor(targetCursor);
      }
    }
  };

  // フィルタが変更された時にページネーションをリセット
  const resetPagination = () => {
    setCurrentPage(1);
    setCurrentCursor(null);
    setCursors([]);
  };

  if (loading || statusesLoading || prioritiesLoading || labelsLoading) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          タスク管理
        </Typography>
        <Typography>読み込み中...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          タスク管理
        </Typography>
        <Typography color="error">エラー: {error.message}</Typography>
        <Button onClick={() => refetch()} variant="outlined" sx={{ mt: 2 }}>
          再試行
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* ヘッダー */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", color: "#333" }}>
          タスク管理
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => router.push("/create-task")}
          sx={{
            backgroundColor: "#010101",
            color: "white",
            borderRadius: "21px",
            px: 3,
          }}
        >
          タスク追加
        </Button>
      </Box>

      {/* 検索フィルター */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: "14px" }}>
        <Grid container spacing={2} alignItems="center">
          {/* キーワード検索 */}
          <Grid size={{ xs: 12, md: 3, lg: 2 }}>
            <TextField fullWidth label="タスク名で検索" variant="outlined" size="small" value={filters?.titleKeyword ?? ""} onChange={(e) => handleFilterChange("titleKeyword", e.target.value)} />
          </Grid>

          <Grid size={{ xs: 12, md: 3, lg: 2 }}>
            <TextField fullWidth label="説明で検索" variant="outlined" size="small" value={filters?.descriptionKeyword ?? ""} onChange={(e) => handleFilterChange("descriptionKeyword", e.target.value)} />
          </Grid>

          {/* 終了日ソート */}
          <Grid size={{ xs: 12, md: 3, lg: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>終了日</InputLabel>
              <Select value={filters?.endDateSortOrder ?? ""} onChange={(e) => handleFilterChange("endDateSortOrder", e.target.value)} input={<OutlinedInput label="終了日ソート" />}>
                <MenuItem value="">
                  <em>なし</em>
                </MenuItem>
                <MenuItem value="ASC">昇順</MenuItem>
                <MenuItem value="DESC">降順</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* 優先度選択 */}
          <Grid size={{ xs: 12, md: 3, lg: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>優先度</InputLabel>
              <Select value={filters?.selectedPriority ?? ""} onChange={(e) => handleFilterChange("selectedPriority", e.target.value)} input={<OutlinedInput label="優先度" />}>
                <MenuItem value="">
                  <em>すべて</em>
                </MenuItem>
                {uniquePriorities.map((priority) => (
                  <MenuItem key={priority} value={priority}>
                    {priority}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* ステータス選択 */}
          <Grid size={{ xs: 12, md: 3, lg: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>ステータス</InputLabel>
              <Select
                multiple
                value={filters?.selectedStatuses ?? []}
                onChange={handleMultiSelectChange("selectedStatuses")}
                input={<OutlinedInput label="ステータス" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </Box>
                )}
              >
                {uniqueStatuses.map((status: string) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* ラベル選択 */}
          <Grid size={{ xs: 12, md: 3, lg: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>ラベル</InputLabel>
              <Select
                multiple
                value={filters?.selectedLabels ?? []}
                onChange={handleMultiSelectChange("selectedLabels")}
                input={<OutlinedInput label="ラベル" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </Box>
                )}
              >
                {uniqueLabels.map((label) => (
                  <MenuItem key={label} value={label}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* フィルタークリアボタン */}
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={clearFilters} variant="outlined" size="small">
            フィルターをクリア
          </Button>
        </Box>
      </Paper>

      {/* 結果表示 */}
      <TodoTable todoItems={todoItems} />

      {/* ページネーション */}
      {totalPages > 1 && (
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
            sx={{
              "& .MuiPaginationItem-root": {
                fontSize: "1rem",
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}

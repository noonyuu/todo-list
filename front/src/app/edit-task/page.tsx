"use client";

import * as React from "react";
import { useCallback, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Container, Typography, Box, Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button as MuiButton } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { TextInputForm } from "@/components/form/input-form";
import { TextAreaInputForm } from "@/components/form/text-area-input-form";
import { Select } from "@/components/form/select";
import { Button } from "@/components/button";
import { useGetTodoQuery, useGetLabelsQuery, useGetPrioritiesQuery, useGetStatusesQuery, useUpdateTodoMutation, useDeleteTodoMutation } from "@/generated/graphql";
import { formatDateForGraphQL, formatDateFromGraphQL } from "@/utils/dateFormatter";
import { theme } from "@/styles";

const formInputSchema = z.object({
  description: z.string().optional(),
  priority: z.string().nonempty({ message: "優先度は必須です" }),
  status: z.string().nonempty({ message: "ステータスは必須です" }),
  label: z.array(z.string()).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

const formOutputSchema = formInputSchema.extend({
  priority: z.string().nonempty(),
  status: z.string().nonempty(),
});

type FormSchema = z.infer<typeof formInputSchema>;
type OutputSchema = z.infer<typeof formOutputSchema>;

function EditTaskPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("id");

  // すべてのHooksを最初に配置
  const { control, handleSubmit, reset } = useForm<FormSchema>({
    defaultValues: {
      priority: "",
      status: "",
      label: [],
    },
    resolver: zodResolver(formInputSchema),
  });

  const { data: labelData, loading: labelLoading } = useGetLabelsQuery();
  const { data: priorityData, loading: priorityLoading } = useGetPrioritiesQuery();
  const { data: statusData, loading: statusLoading } = useGetStatusesQuery();

  // 既存タスクデータを取得
  const {
    data: todoData,
    loading: todoLoading,
    error: todoError,
  } = useGetTodoQuery({
    variables: { id: taskId || "" },
    skip: !taskId,
  });

  // 既存データをフォームに設定
  useEffect(() => {
    if (todoData?.todo) {
      const todo = todoData.todo;
      reset({
        description: todo.description || "",
        priority: todo.priority.id,
        status: todo.status.id,
        label: todo.labels.map((label) => label.id),
        startDate: formatDateFromGraphQL(todo.startDate),
        endDate: formatDateFromGraphQL(todo.endDate),
      });
    }
  }, [todoData, reset]);

  // updateTodo mutation hook
  const [updateTodo] = useUpdateTodoMutation();
  // deleteTodo mutation hook
  const [deleteTodo] = useDeleteTodoMutation();

  const onSubmit: SubmitHandler<FormSchema> = useCallback(
    async (data) => {
      try {
        // 送信時にデータを変換
        const transformedData: OutputSchema = formOutputSchema.parse(data);

        // updateTodo mutationを実行
        await updateTodo({
          variables: {
            id: taskId!,
            input: {
              title: todoData?.todo?.title ?? "",
              description: transformedData.description,
              priorityId: transformedData.priority,
              statusId: transformedData.status,
              labelIds: transformedData.label ?? [],
              startDate: formatDateForGraphQL(transformedData.startDate),
              endDate: formatDateForGraphQL(transformedData.endDate),
            },
          },
          refetchQueries: ["GetTodos"],
          awaitRefetchQueries: true,
        });

        alert("タスクが更新されました");
        router.push("/");
      } catch (error) {
        console.error("Update error:", error);
        alert("更新に失敗しました");
      }
    },
    [taskId, router, updateTodo, todoData]
  );

  const handleDelete = useCallback(async () => {
    if (!taskId) {
      alert("タスクIDが指定されていません");
      return;
    }
    try {
      // deleteTodo mutationを実行
      await deleteTodo({
        variables: { id: taskId },
        refetchQueries: ["GetTodos"],
        awaitRefetchQueries: true,
      });

      alert("タスクが削除されました");
      router.push("/");
    } catch (error) {
      console.error("Delete error:", error);
      alert("削除に失敗しました");
    }
  }, [taskId, router, deleteTodo]);

  // GraphQLから取得したラベルをselectOptionsに変換
  const selectOptions =
    labelData?.labels?.map((label) => ({
      label: label.name,
      value: label.id,
    })) || [];

  // 優先度のオプションをGraphQLから取得
  const priorityOptions =
    priorityData?.priorities?.map((priority) => ({
      label: priority.name,
      value: priority.id,
    })) || [];

  // ステータスのオプションをGraphQLから取得
  const statusOptions =
    statusData?.statuses?.map((status) => ({
      label: status.name,
      value: status.id,
    })) || [];

  if (!taskId) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: "center", mb: 4 }}>
          エラー: タスクIDが指定されていません
        </Typography>
      </Container>
    );
  }

  if (todoLoading || labelLoading || priorityLoading || statusLoading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: "center", mb: 4 }}>
          読み込み中...
        </Typography>
      </Container>
    );
  }

  if (todoError || !todoData?.todo) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: "center", mb: 4 }}>
          エラー: タスクが見つかりません
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <MuiButton variant="text" startIcon={<ArrowBackIcon />} onClick={() => router.push("/")} sx={{ color: "black", mb: 4 }}>
        タスク一覧
      </MuiButton>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ backgroundColor: "#fff" }}>
        <Grid container spacing={3}>
          {/* タイトル表示 */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" component="h1" sx={{ fontWeight: "bold" }}>
              {todoData.todo.title}
            </Typography>
          </Grid>

          {/* 説明入力 */}
          <Grid size={{ xs: 12 }}>
            <TextAreaInputForm name="description" control={control} label="説明文" />
          </Grid>

          {/* 優先度選択 */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Select name="priority" control={control} label="優先度" options={priorityOptions} />
          </Grid>

          {/* ステータス選択 */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Select name="status" control={control} label="ステータス" options={statusOptions} />
          </Grid>

          {/* ラベル選択 */}
          <Grid size={{ xs: 12 }}>
            <Select name="label" control={control} label="ラベル" options={selectOptions} multiple />
          </Grid>

          {/* 開始日 */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextInputForm name="startDate" control={control} label="開始日" type="date" />
          </Grid>

          {/* 終了日 */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextInputForm name="endDate" control={control} label="終了日" type="date" />
          </Grid>

          {/* ボタン */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
              <Button variant="outlined" onClick={handleDelete}>
                削除
              </Button>
              <Button variant="contained" color={`${theme.palette.primary.main}`} onClick={handleSubmit(onSubmit)}>
                タスクを更新
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default function EditTaskPage() {
  return (
    <Suspense fallback={
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: "center", mb: 4 }}>
          読み込み中...
        </Typography>
      </Container>
    }>
      <EditTaskPageContent />
    </Suspense>
  );
}

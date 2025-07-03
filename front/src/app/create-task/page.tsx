"use client";

import * as React from "react";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Container, Typography, Box, Grid, Chip } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { TextInputForm } from "@/components/form/input-form";
import { TextAreaInputForm } from "@/components/form/text-area-input-form";
import { Select } from "@/components/form/select";
import { Button } from "@/components/button";
import { useCreateTodoMutation, useGetLabelsQuery, useGetPrioritiesQuery, useGetStatusesQuery } from "@/generated/graphql";
import { formatDateForGraphQL } from "@/utils/dateFormatter";

const formInputSchema = z.object({
  titleInput: z.string().nonempty({ message: "タイトル入力は必須です" }).min(2, { message: "2文字以上入力してください" }),
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

export default function CreateTaskPage() {
  const router = useRouter();

  // すべてのHooksを最初に配置
  const { control, handleSubmit } = useForm<FormSchema>({
    defaultValues: {
      titleInput: "",
      priority: "",
      status: "",
      label: [],
    },
    resolver: zodResolver(formInputSchema),
  });

  const { data: labelData } = useGetLabelsQuery();
  const { data: priorityData } = useGetPrioritiesQuery();
  const { data: statusData } = useGetStatusesQuery();
  const [createTodo] = useCreateTodoMutation();

  const onSubmit: SubmitHandler<FormSchema> = useCallback(async (data) => {
    try {
      // 送信時にデータを変換
      const transformedData: OutputSchema = formOutputSchema.parse(data);

      const result = await createTodo({
        variables: {
          input: {
            title: transformedData.titleInput,
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
      // ホーム画面にリダイレクト
      if (result.data?.createTodo) {
        alert("タスクが作成されました");
        router.push("/");
      } else {
        alert("タスクの作成に失敗しました");
      }
    } catch (error) {
      console.error("Validation error:", error);
    }
  }, [createTodo, router]);

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

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: "center", mb: 4 }}>
        タスクの作成
      </Typography>

      <Box>
        <TextInputForm control={control} name="titleInput" label={"タスク名"} />
        <TextAreaInputForm control={control} name="description" label={"説明文"} />

        <Grid container spacing={2} sx={{ mb: 1.5 }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Select control={control} options={priorityOptions} name={"priority"} label={"優先度"} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Select control={control} options={statusOptions} name={"status"} label={"ステータス"} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Select
              control={control}
              options={selectOptions}
              name="label"
              label="ラベル"
              multiple={true}
              renderValue={(selected: string | string[]) => {
                if (Array.isArray(selected)) {
                  return (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => {
                        const option = selectOptions.find((opt) => opt.value === value);
                        return <Chip key={value} label={option?.label || value} />;
                      })}
                    </Box>
                  );
                }
                // 単一選択の場合
                const option = selectOptions.find((opt) => opt.value === selected);
                return option?.label || selected;
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2.5 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextInputForm control={control} name={"startDate"} label={"開始日"} type="date" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextInputForm control={control} name={"endDate"} label={"終了日"} type="date" />
          </Grid>
        </Grid>

        <Button onClick={handleSubmit(onSubmit)} variant="outlined">
          タスクを作成
        </Button>
      </Box>
    </Container>
  );
}

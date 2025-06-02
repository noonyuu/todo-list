"use client";

import * as React from "react";
import { useCallback } from "react";
import { Container, Typography, Box, Grid, Chip } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInputForm } from "../../components/form/input-form";
import { TextAreaInputForm } from "../../components/form/text-area-input-form";
import { Select } from "@/components/form/select";
import { Button } from "@/components/button";

const formSchema = z.object({
  textInput: z.string().nonempty({ message: "テキスト入力は必須です" }).min(2, { message: "2文字以上入力してください" }),
  description: z.string(),
  priority: z.number().int().min(1, { message: "優先度を選択してください" }),
  status: z.number().int().min(1, { message: "ステータスを選択してください" }),
  label: z.array(z.number({ invalid_type_error: "ラベルの値は数値である必要があります" })).nonempty({ message: "少なくとも1つのラベルを選択してください" }),
  startDate: z.string().nonempty({ message: "開始日を選択してください" }),
  endDate: z.string().nonempty({ message: "終了日を選択してください" }),
});

type FormSchema = z.input<typeof formSchema>;

export default function CreateTaskPage() {
  const { control, handleSubmit } = useForm<FormSchema>({
    defaultValues: {
      textInput: "",
    },
    resolver: zodResolver(formSchema),
  });

  const selectOptions = [
    { label: "バグ", value: 1 },
    { label: "機能追加", value: 2 },
    { label: "改善", value: 3 },
    { label: "ドキュメント", value: 4 },
    { label: "緊急", value: 5 },
  ];

  const onSubmit: SubmitHandler<FormSchema> = useCallback((data) => {
    alert(JSON.stringify(data));
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: "center", mb: 4 }}>
        タスクの作成
      </Typography>

      <Box>
        <TextInputForm control={control} name="textInput" label={"タスク名"}></TextInputForm>
        <TextAreaInputForm control={control} name="description" label={"説明文"}></TextAreaInputForm>

        <Grid container spacing={2} sx={{ mb: 1.5 }}>
          {/* Gridのマージンを少し調整 */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <Select
              control={control}
              options={[
                { label: "高", value: 1 },
                { label: "中", value: 2 },
                { label: "低", value: 3 },
              ]}
              name={"priority"}
              label={"優先度"}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Select
              control={control}
              options={[
                { label: "未着手", value: 1 },
                { label: "作業中", value: 2 },
                { label: "レビュー待ち", value: 3 },
                { label: "完了", value: 4 },
              ]}
              name={"status"}
              label={"ステータス"}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Select
              control={control}
              options={selectOptions}
              name="label"
              label="ラベル"
              multiple={true}
              renderValue={(selected: number | number[]) => {
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

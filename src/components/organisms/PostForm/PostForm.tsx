"use client";

import { useEffect, useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Field from "@/components/molecules/Field";
import { useUsersList } from "@/hooks/users/useUsers";
import { postSchema, type PostFormValues } from "@/validation/post.schema";

type PostFormProps = {
  title?: string;
  submitLabel?: string;
  cancelLabel?: string;
  onSubmit?: (values: PostFormValues) => void;
  isSubmitting?: boolean;
  onCancel?: () => void;
  defaultValues?: {
    title?: string;
    body?: string;
    userId?: number;
  };
  errors?: {
    title?: string;
    body?: string;
    userId?: string;
  };
};

export default function PostForm({
  title = "Nuevo post",
  submitLabel = "Crear",
  cancelLabel = "Cancelar",
  onSubmit,
  isSubmitting = false,
  onCancel,
  defaultValues,
  errors,
}: PostFormProps) {
  const { data: users } = useUsersList();
  const initialValues = useMemo(
    () => ({
      title: defaultValues?.title ?? "",
      body: defaultValues?.body ?? "",
      userId: defaultValues?.userId ?? undefined,
    }),
    [defaultValues]
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors, isDirty, isValid },
  } = useForm<PostFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(postSchema),
    mode: "onChange",
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const mergedErrors = {
    title: errors?.title ?? formErrors.title?.message,
    body: errors?.body ?? formErrors.body?.message,
    userId: errors?.userId ?? formErrors.userId?.message,
  };

  return (
    <form
      className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm"
      onSubmit={handleSubmit((values) => {
        if (!onSubmit) {
          return;
        }
        onSubmit(values);
      })}
    >
      <h1 className="text-center text-sm font-semibold text-gray-800">{title}</h1>
      <div className="mt-4 space-y-4">
        <Field label="Title" error={mergedErrors.title}>
          <Input placeholder="Escribe el titulo..." {...register("title")} />
        </Field>
        <Field label="Body" error={mergedErrors.body}>
          <Textarea
            rows={4}
            placeholder="Escribe el contenido del post..."
            {...register("body")}
          />
        </Field>
        <Field label="User" error={mergedErrors.userId}>
          <select
            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            {...register("userId")}
          >
            <option value="" disabled>
              Selecciona un usuario...
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="mt-5 flex gap-3">
        <Button
          variant="secondary"
          className="flex-1"
          type="button"
          onClick={onCancel}
        >
          {cancelLabel}
        </Button>
        <Button
          className="flex-1"
          disabled={!isDirty || !isValid || isSubmitting}
          type="submit"
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

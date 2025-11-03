"use client";

import { useState, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { createStartupAction, updateStartupAction, deleteStartupAction } from "@/action/startups";
import { createStartupClientSchema, createStartupFieldValidators } from "@/lib/schemas";
import { useAction } from "next-safe-action/hooks";
import { startup } from "@/db/schema";

type StartupDialogProps = {
  startup?: typeof startup.$inferSelect;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function AddStartupDialog({ startup: startupData, trigger, open: controlledOpen, onOpenChange }: StartupDialogProps = {}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isEditMode = !!startupData;
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;

  const { execute: executeCreate, status: createStatus } = useAction(createStartupAction, {
    onSuccess: () => {
      toast.success("Startup added");
      form.reset();
      setOpen(false);
    },
    onError: ({ error }) => {
      if (!error.validationErrors && error.serverError) {
        toast.error(error.serverError);
      }
    },
  });

  const { execute: executeUpdate, status: updateStatus } = useAction(updateStartupAction, {
    onSuccess: () => {
      toast.success("Startup updated");
      form.reset();
      setOpen(false);
    },
    onError: ({ error }) => {
      if (!error.validationErrors && error.serverError) {
        toast.error(error.serverError);
      }
    },
  });

  const { execute: executeDelete, status: deleteStatus } = useAction(deleteStartupAction, {
    onSuccess: () => {
      toast.success("Startup deleted");
      setOpen(false);
    },
    onError: ({ error }) => {
      if (!error.validationErrors && error.serverError) {
        toast.error(error.serverError);
      }
    },
  });

  const status = isEditMode ? updateStatus : createStatus;

  const form = useForm({
    defaultValues: {
      startupName: startupData?.startupName || "",
      startupLink: startupData?.startupLink || "",
      founderName: startupData?.founderName || "",
      founderXUsername: startupData?.founderXUsername || "",
      tags: startupData?.tags?.join(", ") || "",
    },
    validators: {
      onSubmit: createStartupClientSchema,
    },
    onSubmit: async ({ value }) => {
      if (isEditMode && startupData) {
        executeUpdate({
          id: startupData.id,
          ...value,
        });
      } else {
        executeCreate(value);
      }
    },
  });

  useEffect(() => {
    if (startupData && open) {
      form.setFieldValue("startupName", startupData.startupName);
      form.setFieldValue("startupLink", startupData.startupLink);
      form.setFieldValue("founderName", startupData.founderName);
      form.setFieldValue("founderXUsername", startupData.founderXUsername || "");
      form.setFieldValue("tags", startupData.tags?.join(", ") || "");
    } else if (!open) {
      form.reset();
    }
  }, [open, form, startupData]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger ? (
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      ) : !isEditMode ? (
        <DialogTrigger asChild>
          <Button variant="outline" className="border-sky-200 text-sky-700 hover:text-sky-800 hover:bg-sky-50 cursor-pointer">
            Add startup
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit startup" : "Add a new startup"}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          noValidate
        >
          <FieldGroup>
            <form.Field
              name="startupName"
              validators={{
                onChange: createStartupFieldValidators.startupName,
                onBlur: createStartupFieldValidators.startupName,
              }}
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Startup name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="kaotech e.U."
                      required
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />

            <form.Field
              name="startupLink"
              validators={{
                onChange: createStartupFieldValidators.startupLink,
                onBlur: createStartupFieldValidators.startupLink,
              }}
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Startup link</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="url"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="https://easepop.dev"
                      required
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />

            <form.Field
              name="founderName"
              validators={{
                onChange: createStartupFieldValidators.founderName,
                onBlur: createStartupFieldValidators.founderName,
              }}
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Founder name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Paul"
                      required
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />

            <form.Field
              name="founderXUsername"
              validators={{
                onChange: createStartupFieldValidators.founderXUsername,
                onBlur: createStartupFieldValidators.founderXUsername,
              }}
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Founder X username (optional)</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="kaotechio"
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />

            <form.Field
              name="tags"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Tags (comma-separated)</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="B2B, SaaS, AI"
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />

            <Field orientation="horizontal">
              <Button type="submit" disabled={status === "executing" || deleteStatus === "executing"}>
                {status === "executing" ? "Saving..." : "Save"}
              </Button>
              {isEditMode && startupData && (
                <Button
                  type="button"
                  variant="destructive"
                  disabled={status === "executing" || deleteStatus === "executing"}
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this startup? This action cannot be undone.")) {
                      executeDelete({ id: startupData.id });
                    }
                  }}
                >
                  {deleteStatus === "executing" ? "Deleting..." : "Delete"}
                </Button>
              )}
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}



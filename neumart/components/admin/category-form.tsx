"use client";

import { useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { generateSlug } from "@/lib/slug";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  description: z.string().optional(),
  sortOrder: z.coerce.number().int().min(0).optional(),
  isActive: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

interface CategoryFormProps {
  mode: "create" | "edit";
  categoryId?: Id<"categories">;
  defaultValues?: Partial<FormValues>;
}

export function CategoryForm({ mode, categoryId, defaultValues }: CategoryFormProps) {
  const router = useRouter();
  const adminCreate = useMutation(api.categories.adminCreate);
  const adminUpdate = useMutation(api.categories.adminUpdate);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema) as Resolver<FormValues>,
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      sortOrder: undefined,
      isActive: true,
      ...defaultValues,
    },
  });

  const { watch, setValue, formState } = form;
  const nameValue = watch("name");

  // Track whether slug has been manually edited
  const slugTouched = formState.dirtyFields.slug;

  useEffect(() => {
    if (!slugTouched && mode === "create") {
      setValue("slug", generateSlug(nameValue), { shouldValidate: false });
    }
  }, [nameValue, slugTouched, mode, setValue]);

  async function onSubmit(values: FormValues) {
    try {
      if (mode === "create") {
        await adminCreate({
          name: values.name,
          slug: values.slug,
          description: values.description || undefined,
          sortOrder: values.sortOrder,
          isActive: values.isActive,
        });
        toast.success("Category created");
        router.push("/admin/categories");
      } else {
        await adminUpdate({
          categoryId: categoryId!,
          name: values.name,
          slug: values.slug,
          description: values.description || undefined,
          sortOrder: values.sortOrder,
          isActive: values.isActive,
        });
        toast.success("Category updated");
        router.push("/admin/categories");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-lg">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Fruits & Vegetables" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Slug */}
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="fruits-vegetables" {...field} />
              </FormControl>
              <FormDescription>URL-safe identifier. Auto-generated from name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Short description (optional)" rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Sort order */}
        <FormField
          control={form.control}
          name="sortOrder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sort order</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  placeholder="0"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription>Lower numbers appear first.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Active toggle */}
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3">
              <FormControl>
                <input
                  type="checkbox"
                  id="isActive"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="h-4 w-4 rounded border"
                />
              </FormControl>
              <Label htmlFor="isActive" className="cursor-pointer">Active (visible on storefront)</Label>
            </FormItem>
          )}
        />

        <div className="flex gap-3">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting
              ? mode === "create" ? "Creating…" : "Saving…"
              : mode === "create" ? "Create category" : "Save changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/categories")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}

"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  description: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
  price: z.coerce.number().min(0, "Price must be 0 or more"),
  unit: z.string().min(1, "Unit is required"),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  stockQuantity: z.coerce.number().int().min(0, "Stock must be 0 or more"),
  isActive: z.boolean(),
  isFeatured: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

interface ProductFormProps {
  mode: "create" | "edit";
  productId?: Id<"products">;
  defaultValues?: Partial<FormValues>;
}

export function ProductForm({ mode, productId, defaultValues }: ProductFormProps) {
  const router = useRouter();
  const adminCreate = useMutation(api.products.adminCreate);
  const adminUpdate = useMutation(api.products.adminUpdate);
  const categories = useQuery(api.categories.getActiveCategories);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      categoryId: "",
      price: 0,
      unit: "",
      imageUrl: "",
      stockQuantity: 0,
      isActive: true,
      isFeatured: false,
      ...defaultValues,
    },
  });

  const { watch, setValue, formState } = form;
  const nameValue = watch("name");
  const slugTouched = formState.dirtyFields.slug;

  useEffect(() => {
    if (!slugTouched && mode === "create") {
      setValue("slug", generateSlug(nameValue), { shouldValidate: false });
    }
  }, [nameValue, slugTouched, mode, setValue]);

  async function onSubmit(values: FormValues) {
    try {
      const categoryId = values.categoryId as Id<"categories">;
      const priceInPaise = Math.round(values.price * 100);
      const imageUrl = values.imageUrl?.trim() || undefined;

      if (mode === "create") {
        await adminCreate({
          name: values.name,
          slug: values.slug,
          description: values.description || undefined,
          categoryId,
          price: priceInPaise,
          unit: values.unit,
          imageUrl,
          stockQuantity: values.stockQuantity,
          isActive: values.isActive,
          isFeatured: values.isFeatured || undefined,
        });
        toast.success("Product created");
        router.push("/admin/products");
      } else {
        await adminUpdate({
          productId: productId!,
          name: values.name,
          slug: values.slug,
          description: values.description || undefined,
          categoryId,
          price: priceInPaise,
          unit: values.unit,
          imageUrl,
          stockQuantity: values.stockQuantity,
          isActive: values.isActive,
          isFeatured: values.isFeatured || undefined,
        });
        toast.success("Product updated");
        router.push("/admin/products");
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
                <Input placeholder="Organic Apples" {...field} />
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
                <Input placeholder="organic-apples" {...field} />
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

        {/* Category */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories === undefined ? (
                    <SelectItem value="" disabled>Loading…</SelectItem>
                  ) : categories.length === 0 ? (
                    <SelectItem value="" disabled>No active categories</SelectItem>
                  ) : (
                    categories.map((cat) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (₹)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  placeholder="0.00"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter price in rupees. Stored internally as paise.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Unit */}
        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit</FormLabel>
              <FormControl>
                <Input placeholder="500g / 1L / 6 pcs" {...field} />
              </FormControl>
              <FormDescription>Shown below the product name (e.g. "500g", "1L", "dozen").</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image URL */}
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://…" {...field} />
              </FormControl>
              <FormDescription>Direct link to image. Leave blank to show placeholder icon.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Stock quantity */}
        <FormField
          control={form.control}
          name="stockQuantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock quantity</FormLabel>
              <FormControl>
                <Input type="number" min={0} placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Toggles */}
        <div className="space-y-3">
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

          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3">
                <FormControl>
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="h-4 w-4 rounded border"
                  />
                </FormControl>
                <Label htmlFor="isFeatured" className="cursor-pointer">Featured</Label>
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-3">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting
              ? mode === "create" ? "Creating…" : "Saving…"
              : mode === "create" ? "Create product" : "Save changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/products")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}

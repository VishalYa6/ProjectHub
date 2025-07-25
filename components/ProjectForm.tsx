"use client";
import React, { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { formSchema } from "@/lib/validation";
import { createProject } from "@/lib/action";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toast } from "sonner";

const ProjectForm = () => {
  const [details, setDetails] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        details,
      };
      await formSchema.parseAsync(formValues);
      const result = await createProject(prevState, formData, details);
      if (result.status == "Success") {
        toast("Success", {
          
          description: "✅ Success: Your project has been created successfully!",
        });
        router.push(`/project/${result._id}`);
      }
      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast("Fill form Correctly", {
          description: "❌ Error: Something went wrong. Please try again.",
        });
        return { ...prevState, error: "Validation Error", status: "Error" };
      }
      toast("Failure Occured", {
        
        description: "❌ Error: Something went wrong. Please try again.",
      });
      return {
        ...prevState,
        error: "An unknown error occured",
        status: "Error",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });
  return (
    <form action={formAction} className="project-form">
      <div>
        <label htmlFor="title" className="project-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="project-form_input"
          required
          placeholder="Project Title"
        />
        {errors.title && <p className="project-form_error">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="description" className="project-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="project-form_textarea"
          required
          placeholder="Project Description"
        />
        {errors.description && (
          <p className="project-form_error">{errors.description}</p>
        )}
      </div>
      <div className="">
        <label htmlFor="category" className="project-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="project-form_input"
          required
          placeholder="Project Category(DIY, Python , Java, Next JS)"
        />
        {errors.category && (
          <p className="project-form_error">{errors.category}</p>
        )}
      </div>
      <div className="">
        <label htmlFor="category" className="project-form_label">
          Image Url
        </label>
        <Input
          id="link"
          name="link"
          className="project-form_input"
          required
          placeholder="Project Thumbnail Url"
        />
        {errors.link && <p className="project-form_error">{errors.link}</p>}
      </div>
      <div data-color-mode="light">
        <label htmlFor="details" className="project-form_label">
          Details
        </label>
        <MDEditor
          value={details}
          onChange={(value) => setDetails(value as string)}
          id="details"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder: "Describe Your project in  details",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        {errors.details && (
          <p className="project-form_error">{errors.details}</p>
        )}
      </div>
      <Button type="submit" className="project-form_btn text-white">
        Submit Your Project
      </Button>
    </form>
  );
};

export default ProjectForm;

/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import services from "../../Appwrite/Conf.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Input from "../Input.jsx";
import RTE from "../RTE.jsx";
import Select from "../Select.jsx";
import Button from "../Button.jsx";
import ClipLoader from "react-spinners/ClipLoader.js";
import { toast } from "react-toastify";

function PostForm({ post }) {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const [loading, setLoading] = useState(false);
  const color = "#000000";
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    setLoading(true);
    try {
      let fileId;
      if (data.image && data.image[0]) {
        const file = await services.uploadFile(data.image[0]);

        fileId = file.$id;

        if (post && post.featuredImage) {
          await services.deleteFile(post.featureimg);
        }
      }

      if (post) {
        const dbPost = await services.updatePost(post.$id, {
          ...data,
          featureimg: fileId || post.featureimg,
        });
        console.log(dbPost);

        if (dbPost) {
          toast.success("Post updated successfully");
          navigate("/");
        }
      } else {
        const dbpost = await services.CreatePost({
          ...data,
          featureimg: fileId,
          userid: userData.$id,
        });

        if (dbpost) {
          toast.success("Post created successfully");
          navigate(`/`);
        }
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    } finally {
      setLoading(false);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <>
      {loading && (
        <div className="flex justify-center">
          <ClipLoader
            color={color}
            loading={loading}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
          <Input
            label="Title:"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug:"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
          <RTE
            label="Content :"
            name="Content"
            control={control}
            defaultValues={getValues("content")}
          />
        </div>
        <div className="w-1/3 px-2">
          <Input
            label="featured Images :"
            type="file"
            className="mb-4"
            accept="image/png ,image/jpg ,image/jpeg , image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                src={services.getfilePreview(post.featureimg)}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />
          <Button
            type="submit"
            bgcolor={post ? "bg-green-500" : undefined}
            className="w-full0"
          >
            {post ? "update" : "submit"}
          </Button>
        </div>
      </form>
    </>
  );
}

export default PostForm;

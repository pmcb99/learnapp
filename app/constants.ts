import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required."
  }),
});


export const LC_BUCKET_NAME = "lc-papers-and-marking-schemes";
export const JC_BUCKET_NAME = "jc-papers-and-marking-schemes";

// function that returns the correct bucket name based on examType
export const getBucketName = (examType: string) => {
  if (examType === "jc") {
    return JC_BUCKET_NAME;
  } else if (examType === "lc") {
    return LC_BUCKET_NAME;
  } else {
    throw new Error("Invalid exam type");
  }
};
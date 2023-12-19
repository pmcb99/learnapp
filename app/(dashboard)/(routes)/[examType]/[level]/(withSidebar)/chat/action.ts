"use server";
import { openai } from "@/lib/openai";

export async function getEmbedding(input: string) {
  const embeddingResponse = await openai.embeddings.create({
    input,
    model: "text-embedding-ada-002",
  });
  return embeddingResponse.data[0].embedding;
}
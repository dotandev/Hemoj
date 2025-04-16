import { z } from "zod";

export const EmojiSchema = z.object({
    emoji: z.string(),
    locale: z.string(),
  });
  

export type EmojiInput = z.infer<typeof EmojiSchema>;

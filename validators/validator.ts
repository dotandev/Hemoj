import { z } from 'zod';
import { EmojiToTextInput, TextToEmojiInput } from '../types/emoji.types';

export const emojiToTextInputSchema = z.object({
  emoji: z.string().min(1, { message: 'Emoji is required.' }), 
  locale: z.string().optional(), 
});

export const textToEmojiInputSchema = z.object({
  text: z.string().min(1, { message: 'Text is required.' }), 
  locale: z.string().optional(), 
});

export function validateEmojiToTextInput(input: EmojiToTextInput) {
  try {
    emojiToTextInputSchema.parse(input); 
    return null; 
  } catch (error: any) {
    return error.errors[0]?.message || 'Invalid input'; 
  }
}

export function validateTextToEmojiInput(input: TextToEmojiInput) {
  try {
    textToEmojiInputSchema.parse(input); 
    return null; 
  } catch (error: any) {
    return error.errors[0]?.message || 'Invalid input'; 
  }
}

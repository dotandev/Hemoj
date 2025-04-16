import express from 'express';
import { EmojiController } from '../controllers';

export const emojiRouter = express.Router();
const emojiController = new EmojiController()

const {
    emojiToText,
    textToEmoji,
    getAllEmojisByLocale
} = emojiController

emojiRouter.post('/emoji', emojiToText);
emojiRouter.post('/text', textToEmoji);
emojiRouter.get("/:locale", getAllEmojisByLocale)


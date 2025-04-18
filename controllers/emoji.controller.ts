import { Request, Response } from 'express';
import { validateEmojiToTextInput, validateTextToEmojiInput } from '../validators';
import { EmojiService } from '../services';

const emojiService = new EmojiService()

const {
  getEmojiLabel,
  findEmojiFromText,
  getAllEmojis,
  getEmojisCount
} = emojiService

export class EmojiController {

  public async emojiToText(req: Request, res: Response) {
    const error = validateEmojiToTextInput(req.body);
    if (error) res.status(400).json({ error });

    let { emoji, locale } = req.body;
    if (locale === null) {
      locale = 'en'
    }
    const emojiEntry = await getEmojiLabel(emoji, locale);

    if (!emojiEntry) {
      res.status(400).json({ error: 'Invalid input: Not a recognized emoji.' });
    }

    res.json({ text: emojiEntry?.label });
  }

  public async textToEmoji(req: Request, res: Response) {
    const error = validateTextToEmojiInput(req.body);
    if (error) res.status(400).json({ error });

    let { text, locale } = req.body;
    
    if (locale === null) {
      locale = 'en'
    }
    const emojiEntry = await findEmojiFromText(text, locale);

    if (!emojiEntry) {
      res.status(400).json({ error: 'Invalid input: No matching emoji found for text.' });
    }

    res.json({ emoji: emojiEntry.emoji });
  }

  public async getAllEmojisByLocale(req: Request, res: Response) {
    const locale = req.params.locale
    const emojiCount = await getEmojisCount()
    const emojis = await getAllEmojis()
    if (!emojis) {
      res.status(400).json({ error: 'Invalid input: No matching emoji found for locale.' });
    }
    res.status(200).json({
      emojis,
      emojiCount
    })
  }

}
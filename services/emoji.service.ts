
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export class EmojiService {
  public async getEmojiLabel(emoji: string, locale: string) {
    return prisma.emoji.findUnique({
      where: {
        emoji_locale: {
          emoji,
          locale,
        },
      },
    });
  }

  public async findEmojiFromText(text: string, locale: string) {
    const results = await prisma.emoji.findMany({
      where: {
        locale,
        OR: [
          { label: { contains: text } },
          { shortcodes: { contains: text } },
          { keywords: { contains: text } },
        ],
      },
      take: 1,
    });

    return results[0] ?? null;
  }

  public async getEmojisCount() {
    return prisma.emoji.count();
  }

  public async getAllEmojis(locale?: string) {
    return prisma.emoji.findMany({
      where: locale ? { locale } : {},
    });
  }
}

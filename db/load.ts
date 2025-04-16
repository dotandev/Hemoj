import { PrismaClient } from '../generated/prisma';
import { Locale } from 'emojibase';

const prisma = new PrismaClient();

const locales = [
  "ja", "ko", "zh", "de", "es", "fr", "it", "pt", "ru", "en", "da", "en-gb", "es-mx", "et", "fi", "hu", "lt", "ms", "nb", "nl", "pl", "sv", "th", "uk", "zh-hant"
]; 

async function seedEmojis(locale: string) {
  const url = `https://cdn.jsdelivr.net/npm/emojibase-data@15.0.0/${locale}/compact.json`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch emoji data for "${locale}": ${response.statusText}`);
  }

  const emojis = await response.json();

  for (const emoji of emojis) {

    await prisma.emoji.upsert({
      where: {
        emoji_locale: {
          emoji: emoji.unicode,
          locale: locale,
        },
      },
      update: {},
      create: {
        emoji: emoji.unicode,
        label: emoji.label ?? '',
        shortcodes: JSON.stringify(emoji.shortcodes ?? []),
        keywords: JSON.stringify(emoji.tags ?? []),
        locale,
      },
    });
    
  }

  console.log(`Seeded ${emojis.length} emojis for locale "${locale}"`);
}

(async () => {
  for (const locale of locales) {
    try {
      await seedEmojis(locale);
    } catch (error) {
      console.error(`Error seeding locale "${locale}":`, error);
    }
  }

  await prisma.$disconnect();
})();


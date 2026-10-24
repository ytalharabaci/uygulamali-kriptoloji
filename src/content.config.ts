import { defineCollection, z } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				banner: z.object({
					content: z.string(),
				}).optional().default({
					content: '🚀 Bu rehber açık kaynaklıdır ve katkılarınıza açıktır! Katkıda bulunmak, hata bildirmek veya öneri sunmak için <a href="https://github.com/ytalharabaci/isletim-sistemleri-ve-sistem-programlama">GitHub Depomuzu</a> ziyaret edin ve Pull Request açın.'
				})
			})
		})
	}),
	i18n: defineCollection({
		loader: i18nLoader(),
		schema: i18nSchema(),
	}),
};


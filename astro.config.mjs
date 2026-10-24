import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';
import rehypeSectionNumber from './src/plugins/rehype-section-number.mjs';

export default defineConfig({
	site: 'https://ytalharabaci.github.io',
	base: '/uygulamali-kriptoloji',
	compressHTML: true,
	prefetch: {
		prefetchAll: true,
		defaultStrategy: 'hover',
	},
	markdown: {
		rehypePlugins: [rehypeSectionNumber],
	},
	integrations: [
		mermaid({
			theme: 'neutral',
			autoTheme: true,
		}),
		starlight({
			title: 'Uygulamalı Kriptoloji',
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'Türkçe',
					lang: 'tr',
				},
			},
			tableOfContents: {
				minHeadingLevel: 2,
				maxHeadingLevel: 3,
			},
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/ytalharabaci/uygulamali-kriptoloji',
				},
			],
			editLink: {
				baseUrl: 'https://github.com/ytalharabaci/uygulamali-kriptoloji/edit/main/',
			},
			components: {
				Footer: './src/components/Footer.astro',
			},
			customCss: [
				'./src/styles/tokens.css',
				'./src/styles/typography.css',
				'./src/styles/layout.css',
				'./src/styles/responsive.css',
			],
			head: [
				{
					tag: 'link',
					attrs: {
						rel: 'preconnect',
						href: 'https://fonts.googleapis.com',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'preconnect',
						href: 'https://fonts.gstatic.com',
						crossorigin: true,
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'stylesheet',
						href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Geist:wght@400;500;600;700;800&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600;8..60,700&family=Fira+Code:wght@400;500&display=swap',
					},
				},
				{
					tag: 'script',
					content: `
						(function () {
							function splitSidebarLabels() {
								var labels = document.querySelectorAll('.sidebar-content a > span:first-child');
								for (var i = 0; i < labels.length; i++) {
									var span = labels[i];
									if (span.querySelector('.chapter-num')) continue;
									var match = /^(\\d+\\.\\d+)\\s+(.+)$/.exec(span.textContent);
									if (!match) continue;
									span.textContent = '';
									var numEl = document.createElement('span');
									numEl.className = 'chapter-num';
									numEl.textContent = match[1];
									span.appendChild(numEl);
									span.appendChild(document.createTextNode(match[2]));
								}
							}
							function revealActiveSidebarLink() {
								var active = document.querySelector('.sidebar-content [aria-current="page"]');
								if (active) active.scrollIntoView({ block: 'nearest', inline: 'nearest' });
							}
							function init() {
								splitSidebarLabels();
								revealActiveSidebarLink();
							}
							if (document.readyState === 'loading') {
								document.addEventListener('DOMContentLoaded', init);
							} else {
								init();
							}
							document.addEventListener('astro:page-load', init);
						})();
					`,
				},
			],
			sidebar: [
				{
					label: '01. Kriptolojinin Temelleri ve Matematiksel Altyapı',
					collapsed: true,
					items: [{ autogenerate: { directory: '01-kriptolojinin-temelleri-ve-matematiksel-altyapi' } }],
				},
				{
					label: '02. Klasik Şifreleme ve Kriptanaliz Teknikleri',
					collapsed: true,
					items: [{ autogenerate: { directory: '02-klasik-sifreleme-ve-kriptanaliz-teknikleri' } }],
				},
				{
					label: '03. Simetrik Kriptografi ve Blok Şifreleyiciler',
					collapsed: true,
					items: [{ autogenerate: { directory: '03-simetrik-kriptografi-ve-blok-sifreleyiciler' } }],
				},
				{
					label: '04. Asimetrik Kriptografi ve Anahtar Değişimi',
					collapsed: true,
					items: [{ autogenerate: { directory: '04-asimetrik-kriptografi-ve-anahtar-degisimi' } }],
				},
				{
					label: '05. Kriptografik Özetler, Bütünlük ve Dijital İmzalar',
					collapsed: true,
					items: [{ autogenerate: { directory: '05-kriptografik-ozetler-butunluk-ve-dijital-imzalar' } }],
				},
				{
					label: '06. Güvenli Ağ ve Sistem Protokolleri',
					collapsed: true,
					items: [{ autogenerate: { directory: '06-guvenli-ag-ve-sistem-protokolleri-gercek-dunya' } }],
				},
				{
					label: '07. İleri Düzey Paradigmalar ve Kriptolojinin Geleceği',
					collapsed: true,
					items: [{ autogenerate: { directory: '07-ileri-duzey-paradigmalar-ve-kriptolojinin-gelecegi' } }],
				},
			],
		}),
	],
});


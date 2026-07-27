import fs from 'node:fs';
import path from 'node:path';
import type {Config, Plugin} from '@docusaurus/types';
import {themes as prismThemes} from 'prism-react-renderer';
import remarkCrossRepoLinks from './plugins/remarkCrossRepoLinks';

type ProjectSnapshot = {
  decisions: number;
  openQuestions: number;
  activeExperiments: number;
  systemDocuments: number;
};

function projectSnapshotPlugin(): Plugin<ProjectSnapshot> {
  const repositoryRoot = path.resolve(__dirname, '..');
  const read = (relativePath: string) =>
    fs.readFileSync(path.join(repositoryRoot, relativePath), 'utf8');

  return {
    name: 'krp-project-snapshot',
    async loadContent() {
      const decisions = read('design/decisions.md').match(/^## DEC-\d{3}\b/gm)?.length ?? 0;
      const openQuestions = read('design/open-questions.md').match(/^- /gm)?.length ?? 0;
      const activeExperiments = fs
        .readdirSync(path.join(repositoryRoot, 'design/thought-experiments/active'))
        .filter((file) => file.endsWith('.md')).length;
      const systemDocuments = fs
        .readdirSync(path.join(repositoryRoot, 'design'))
        .filter((file) => file.endsWith('.md'))
        .filter((file) => !['README.md', 'decisions.md', 'open-questions.md', 'backlog.md'].includes(file)).length;

      return {decisions, openQuestions, activeExperiments, systemDocuments};
    },
    async contentLoaded({content, actions}) {
      actions.setGlobalData(content);
    },
  };
}

const config: Config = {
  title: 'KRP Vision',
  tagline: 'Цельная модель сезонной survival-RPG',
  url: 'https://enchantinggg4.github.io',
  baseUrl: '/krp-vision/',
  organizationName: 'enchantinggg4',
  projectName: 'krp-vision',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru'],
  },
  staticDirectories: [
    'static',
    path.resolve(__dirname, '../concept-art/images'),
  ],
  presets: [
    [
      'classic',
      {
        docs: {
          path: '../design',
          routeBasePath: 'design',
          sidebarPath: './sidebars.ts',
          beforeDefaultRemarkPlugins: [remarkCrossRepoLinks],
          showLastUpdateTime: true,
          editUrl: 'https://github.com/enchantinggg4/krp-vision/edit/main/design/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],
  plugins: [
    projectSnapshotPlugin,
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'concept-art',
        path: '../concept-art',
        routeBasePath: 'concept-art',
        sidebarPath: './sidebarsConcept.ts',
        beforeDefaultRemarkPlugins: [remarkCrossRepoLinks],
        showLastUpdateTime: true,
        editUrl: 'https://github.com/enchantinggg4/krp-vision/edit/main/concept-art/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'research',
        path: '../research',
        routeBasePath: 'research',
        sidebarPath: './sidebarsResearch.ts',
        beforeDefaultRemarkPlugins: [remarkCrossRepoLinks],
        showLastUpdateTime: true,
        editUrl: 'https://github.com/enchantinggg4/krp-vision/edit/main/research/',
      },
    ],
  ],
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'KRP Vision',
      items: [
        {type: 'docSidebar', sidebarId: 'designSidebar', label: 'Системы', position: 'left'},
        {to: '/design/decisions', label: 'Решения', position: 'left'},
        {to: '/design/open-questions', label: 'Вопросы', position: 'left'},
        {to: '/concept-art/', label: 'Концепт-арт', position: 'left'},
        {
          href: 'https://github.com/enchantinggg4/krp-vision',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Основа',
          items: [
            {label: 'Образ игры', to: '/design/'},
            {label: 'Основной цикл', to: '/design/core-loop'},
            {label: 'Столпы дизайна', to: '/design/design-pillars'},
          ],
        },
        {
          title: 'Состояние работы',
          items: [
            {label: 'Принятые решения', to: '/design/decisions'},
            {label: 'Открытые вопросы', to: '/design/open-questions'},
            {label: 'Активные эксперименты', to: '/design/thought-experiments/active/TE-030-offensive-theses'},
          ],
        },
        {
          title: 'Материалы',
          items: [
            {label: 'Концепт-арт', to: '/concept-art/'},
            {label: 'Исследования', to: '/research/historical-settlements-and-alliances'},
            {label: 'GitHub', href: 'https://github.com/enchantinggg4/krp-vision'},
          ],
        },
      ],
      copyright: `KRP Vision. Теоретическая модель, не подтверждённая плейтестом.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;

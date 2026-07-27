import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {usePluginData} from '@docusaurus/useGlobalData';
import clsx from 'clsx';
import styles from './index.module.css';

type ProjectSnapshot = {
  decisions: number;
  openQuestions: number;
  activeExperiments: number;
  systemDocuments: number;
};

const systemPath = [
  {title: 'Личная игра', text: 'Хозяйство, исследование, PvE и развитие работают даже в одиночной сессии.', to: '/design/core-loop'},
  {title: 'Специализация', text: 'Пути развития создают сильные стороны и реальную причину обмениваться результатами труда.', to: '/design/specialization'},
  {title: 'Физическая экономика', text: 'Ресурсы нужно добыть, сохранить и физически доставить туда, где они нужны.', to: '/design/economy-and-resources'},
  {title: 'Королевство', text: 'Общие дела расширяют личные цели и не превращают участие в повинность.', to: '/design/kingdoms-and-local-cooperation'},
  {title: 'Сезонная победа', text: 'Два королевства соревнуются через доминацию или культурный путь к Граалю.', to: '/design/victory-conditions'},
];

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const snapshot = usePluginData('krp-project-snapshot') as ProjectSnapshot;
  const householdImage = useBaseUrl('/img/home-first-household.webp');
  const choppingImage = useBaseUrl('/img/home-tree-chopping.webp');

  return (
    <Layout>
      <Head>
        <title>Дизайн-кодекс | KRP Vision</title>
        <meta name="description" content={siteConfig.tagline} />
      </Head>
      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Дизайн-кодекс KRP</p>
            <h1>Собираем игру в систему.</h1>
            <p className={styles.heroLead}>Канон, гипотезы и нерешённые развилки сезонной survival-RPG в одной структуре.</p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryAction} to="/design/">Начать с образа игры</Link>
              <Link className={styles.secondaryAction} to="/design/open-questions">Открытые вопросы</Link>
            </div>
          </div>
          <figure className={styles.heroVisual}>
            <img
              src={householdImage}
              alt="Первое личное хозяйство игрока в лесной долине"
              width="1672"
              height="944"
              fetchPriority="high"
            />
            <figcaption>Визуальный эксперимент: масштаб человека и первого хозяйства</figcaption>
          </figure>
        </section>

        <section className={styles.snapshot} aria-label="Состояние дизайн-документации">
          <div><strong>{snapshot.systemDocuments}</strong><span>системных документов</span></div>
          <div><strong>{snapshot.decisions}</strong><span>решений принято</span></div>
          <div><strong>{snapshot.openQuestions}</strong><span>вопросов открыто</span></div>
          <div><strong>{snapshot.activeExperiments}</strong><span>экспериментов активно</span></div>
        </section>

        <section className={styles.systemSection}>
          <div className={styles.sectionIntro}>
            <h2>Читать как причинную цепочку</h2>
            <p>Каждая система должна объяснять, какое поведение она создаёт и к каким последствиям приводит на общем сервере.</p>
          </div>
          <ol className={styles.systemPath}>
            {systemPath.map((item, index) => (
              <li key={item.title}>
                <span className={styles.pathIndex}>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3><Link to={item.to}>{item.title}</Link></h3>
                  <p>{item.text}</p>
                </div>
                <Link className={styles.pathLink} to={item.to} aria-label={`Открыть раздел «${item.title}»`}>Открыть</Link>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.physicalSection}>
          <div className={styles.physicalVisual}>
            <img
              src={choppingImage}
              alt="Рубка дерева от первого лица с физической точкой удара"
              width="1672"
              height="944"
              loading="lazy"
            />
          </div>
          <div className={styles.physicalCopy}>
            <h2>Правила существуют в мире</h2>
            <p>Строительство, торговля, разведка и война должны читаться как физические процессы, а не как абстрактные меню.</p>
            <Link to="/design/design-pillars">Открыть столпы дизайна</Link>
          </div>
        </section>

        <section className={styles.workbenchSection}>
          <div className={styles.sectionIntro}>
            <h2>Отделяем принятое от исследуемого</h2>
            <p>Сайт не сглаживает неопределённость. У каждого типа материала есть собственное место и статус.</p>
          </div>
          <div className={styles.workbenchGrid}>
            <Link className={clsx(styles.workbenchItem, styles.workbenchPrimary)} to="/design/decisions">
              <span>Канон</span>
              <h3>Принятые решения</h3>
              <p>Короткие правила, на которых уже держится текущая модель игры.</p>
            </Link>
            <Link className={styles.workbenchItem} to="/design/open-questions">
              <span>Развилки</span>
              <h3>Открытые вопросы</h3>
              <p>Только механические неопределённости, способные изменить игровой цикл.</p>
            </Link>
            <Link className={styles.workbenchItem} to="/design/thought-experiments/active/TE-030-offensive-theses">
              <span>Работа</span>
              <h3>Thought experiments</h3>
              <p>Сценарии, требования и проверки до переноса решения в канон.</p>
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}

import { GetStaticProps } from 'next';
import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi'

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home() {
  return (
    <main className={commonStyles.container}>
      <Link href="/post/a">
        <article className={styles.content}>
          <strong>Como utilizar Hooks</strong>
          <p>Pensando em sincronização em vez de cicles de vida.</p>
          <div className={commonStyles.containerIcons}>
            <span>
              <FiCalendar />
              15 de março de 2021
            </span>
            <span>
              <FiUser />
              Paulo Marolla
            </span>
          </div>
        </article>
      </Link>

      <Link href="/post/a">
        <article className={styles.content}>
          <strong>Como utilizar Hooks</strong>
          <p>Pensando em sincronização em vez de cicles de vida.</p>
          <div className={commonStyles.containerIcons}>
            <span>
              <FiCalendar />
              15 de março de 2021
            </span>
            <span>
              <FiUser />
              Paulo Marolla
            </span>
          </div>
        </article>
     </Link>

      <button
      className={styles.button}
      type="button"
      >
        Carregar mais posts
      </button>
    </main>
  )
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };

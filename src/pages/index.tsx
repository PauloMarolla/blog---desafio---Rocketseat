import { GetStaticProps } from 'next';
import { FiUser, FiCalendar } from 'react-icons/fi';
import Prismic from '@prismicio/client';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import Header from '../components/Header';

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

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const [pagination, setPagination] = useState(postsPagination);

  const { results, next_page } = pagination;

  const handlePagination = async (): Promise<void> => {
    const response = await fetch(next_page);
    const data = await response.json();

    const formattedResults = data.results.map(post => {
      return {
        uid: post.uid,
        first_publication_date: post.first_publication_date,
        data: {
          title: post.data.title,
          subtitle: post.data.subtitle,
          author: post.data.author,
        },
      };
    });

    const formattedData: PostPagination = {
      results: [...results, ...formattedResults],
      next_page: data.next_page,
    };

    setPagination(formattedData);
  };

  return (
    <>
      <Header />
      <Head>
        <title>Home | spacetraveling</title>
      </Head>

      <main className={commonStyles.container}>
        {results.map(post => (
          <Link key={post.uid} href={`/post/${post.uid}`}>
            <a className={styles.content}>
              <strong>{post.data.title}</strong>
              <p>{post.data.subtitle}</p>
              <div className={commonStyles.containerIcons}>
                <time>
                  <FiCalendar />
                  {format(
                    new Date(post.first_publication_date),
                    'dd MMM yyyy',
                    {
                      locale: ptBR,
                    }
                  )}
                </time>
                <address>
                  <FiUser />
                  {post.data.author}
                </address>
              </div>
            </a>
          </Link>
        ))}

        {next_page && (
          <button
            className={styles.button}
            type="button"
            onClick={handlePagination}
          >
            Carregar mais posts
          </button>
        )}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
      pageSize: 2,
    }
  );

  const results: Post[] = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  const postsPagination: PostPagination = {
    next_page: postsResponse.next_page,
    results,
  };

  // TODO

  return {
    props: {
      postsPagination,
    },
  };
};

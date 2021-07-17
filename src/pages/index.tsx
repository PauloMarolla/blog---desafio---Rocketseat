import { GetStaticProps } from 'next';
import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';

import Prismic from '@prismicio/client';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { useState } from 'react';

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
  posts: PostPagination;
}

export default function Home({ posts }: HomeProps): JSX.Element {
  const [paginationPosts, setPaginationPosts] = useState(posts);

  function formatedPosts(data): PostPagination {
    const results = data.results.map(post => {
      return {
        uid: post.uid,
        first_publication_date: new Date(
          post.last_publication_date
        ).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),

        data: {
          title: post.data.title,
          subtitle: post.data.subtitle,
          author: post.data.author,
        },
      };
    });

    const postsPagination = { next_page: posts.next_page, results };

    return postsPagination;
  }

  async function handlePagination(): Promise<void> {
    const response = await fetch(paginationPosts.next_page);
    const data = await response.json();

    const postFormated = formatedPosts(data);

    setPaginationPosts({
      next_page: data.next_page,
      results: [...paginationPosts.results, ...postFormated.results],
    });
  }

  return (
    <main className={commonStyles.container}>
      {paginationPosts.results.map(post => {
        return (
          <Link key={post.uid} href={`/posts/${post.uid}`}>
            <article className={styles.content}>
              <strong>{post.data.title}</strong>
              <p>{post.data.subtitle}</p>
              <div className={commonStyles.containerIcons}>
                <span>
                  <FiCalendar />
                  {post.first_publication_date}
                </span>
                <span>
                  <FiUser />
                  {post.data.author}
                </span>
              </div>
            </article>
          </Link>
        );
      })}

      {paginationPosts.next_page && (
        <button
          onClick={handlePagination}
          className={styles.button}
          type="button"
        >
          Carregar mais posts
        </button>
      )}
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.subtitle', 'post.author'],
      pageSize: 1,
    }
  );

  const results = posts.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: new Date(
        post.last_publication_date
      ).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),

      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  const postsPagination = { next_page: posts.next_page, results };

  return {
    props: {
      posts: postsPagination,
    },
    revalidate: 10,
  };
};

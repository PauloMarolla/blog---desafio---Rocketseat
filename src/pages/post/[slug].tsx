import Link from 'next/link';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

// interface PostProps {
//   post: Post;
// }

export default function Post(): JSX.Element {
  return (
    <>
      <img src="/images/Logo.svg" className={styles.banner} alt="banner" />

      <main className={commonStyles.container}>
        <div className={styles.descriptions}>
          <h1>Criando um app CRA do zero</h1>
          <div className={commonStyles.containerIcons}>
            <span>
              <FiCalendar />
              15 de março de 2021
            </span>
            <span>
              <FiUser />
              Paulo Marolla
            </span>
            <span>
              <FiClock />4 min
            </span>
          </div>
        </div>

        <article className={styles.content}>
          <strong>Proint et varius</strong>
          <p>
            Proin et varius Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Nullam dolor sapien, vulputate eu diam at, condimentum
            hendrerit tellus. Nam facilisis sodales felis, pharetra pharetra
            lectus auctor sed. Ut venenatis mauris vel libero pretium, et
            pretium ligula faucibus. Morbi nibh felis, elementum a posuere et,
            vulputate et erat. Nam venenatis. Cras laoreet mi Nulla auctor sit
            amet quam vitae commodo. Sed risus justo, vulputate quis neque eget,
            dictum sodales sem. In eget felis finibus, mattis magna a, efficitur
            ex. Curabitur vitae justo consequat sapien gravida auctor a non
            risus. Sed malesuada mauris nec orci congue, interdum efficitur
          </p>
          <p>
            vulputate quis neque eget, dictum sodales sem. In eget felis
            finibus, mattis magna a, efficitur ex. Curabitur vitae justo
            consequat sapien gravida auctor a non risus. Sed malesuada mauris
            nec orc
          </p>
        </article>

        <article className={styles.content}>
          <strong>Proint et varius</strong>
          <p>
            <Link href="/">Proin et varius Lorem ipsum</Link> dolor sit amet,
            consectetur adipiscing elit. Nullam dolor sapien, vulputate eu diam
            at, condimentum hendrerit tellus. Nam facilisis sodales felis,
            pharetra pharetra lectus auctor sed. Ut venenatis mauris vel libero
            pretium, et pretium ligula faucibus. Morbi nibh felis, elementum a
            posuere et, vulputate et erat. Nam venenatis. Cras laoreet mi Nulla
            auctor sit amet quam vitae commodo. Sed risus justo, vulputate quis
            neque eget, dictum sodales sem. In eget felis finibus, mattis magna
            a, efficitur ex. Curabitur vitae justo consequat sapien gravida
            auctor a non risus. Sed malesuada mauris nec orci congue, interdum
            efficitur
          </p>
          <p>
            vulputate quis neque eget, dictum sodales sem. In eget felis
            finibus, mattis magna a, efficitur ex. Curabitur vitae justo
            consequat sapien gravida auctor a non risus. Sed malesuada mauris
            nec orc
          </p>
        </article>
      </main>
    </>
  );
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient();
//   const posts = await prismic.query('S');

//   // TODO
// };

// export const getStaticProps = async context => {
//   const prismic = getPrismicClient();
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };

import fs from 'fs';
import matter from 'gray-matter';
import Image from 'next/image';
import Link from 'next/link';

const customLoader = ({ src }) => {
  return src
}

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

export async function getStaticProps() {
  const files = fs.readdirSync('posts');

  const posts = files.map((fileName) => {
    const slug = fileName.replace('.md', '');
    const readFile = fs.readFileSync(`posts/${fileName}`, 'utf-8');
    const { data: frontmatter } = matter(readFile);
    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-0'>
      {posts.map(({ slug, frontmatter }) => (
        <div
          key={slug}
          className='border border-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col'
        >
          <Link href={`/post/${slug}`}>
            <a>
              <Image
                loader={customLoader}
                width={800}
                height={450}
                alt={frontmatter.title}
                src={prefix+`/${frontmatter.socialImage}`}
              />
              <div className='p-4'>
                <h1 className='text-2xl font-bold'>{frontmatter.title}</h1>
                <p className='font-medium text-neutral-500 text-sm'>{frontmatter.date}</p>
                <p className='mt-2 text-neutral-600'>{frontmatter.metaDesc}</p>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}
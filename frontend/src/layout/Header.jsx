import React, { useMemo } from 'react';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import MyLink from '../components/Link';

const linksRaw = [
  // The order of these items matter!
  {
    name: 'GitHubReposPage',
    checkIsCurrentPage: ({ pathname }) => /^\/$/.test(pathname),
    to: '/',
    text: 'GitHub Repos',
  },
  {
    name: 'TvShowsPage',
    checkIsCurrentPage: ({ pathname }) => /^\/tv-shows/.test(pathname),
    to: '/tv-shows',
    text: 'TV Shows',
  },
];

export default function Header() {
  const { pathname } = useLocation();

  const headerLinks = useMemo(
    () =>
      linksRaw.map(({ checkIsCurrentPage, to, text }) => ({
        isCurrentPage: checkIsCurrentPage({ pathname }),
        to,
        text,
      })),
    [pathname]
  );

  //------------------- Render GUI ---------------------
  return (
    <header className='sticky top-0 flex justify-start items-center h-20 z-30 shadow-mini bg-blue-200'>
      {headerLinks.map(({ isCurrentPage, text, to }) => (
        <MyLink
          key={text}
          to={to}
          style={{ WebkitTextStrokeColor: 'black' }}
          className={clsx(
            'w-auto whitespace-nowrap text-2xl font-bold mx-2.5 my-0 bg-transparent text-white cursor-pointer webkitText-20',
            isCurrentPage ? '!text-rose-400 !cursor-default link-shadow' : 'hover:text-[#fff2ba] hover:webkitText-0'
          )}
        >
          {text}
        </MyLink>
      ))}
    </header>
  );
}

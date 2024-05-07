import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'id'],
  defaultLocale: 'en',
  localePrefix: 'never',
});

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};

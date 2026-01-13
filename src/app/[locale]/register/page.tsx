import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { FileText } from 'lucide-react';
import { RegisterForm } from '@/components/auth/register-form';
import { ThemeToggle } from '@/components/theme-toggle';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('register.metadata');

  return {
    title: t('title'),
    description: t('description'),
  };
}

interface RegisterPageProps {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const t = await getTranslations('register');
  const { redirect } = await searchParams;

  return (
    <div className="min-h-screen bg-secondary-background bg-grid flex flex-col">
      {/* Header with logo */}
      <header className="w-full border-b-[3px] border-border bg-secondary-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-base border-2 border-border bg-main">
              <FileText className="size-5 text-main-foreground" />
            </div>
            <span className="text-xl font-heading">{t('brandName')}</span>
          </Link>
        </div>
      </header>

      {/* Register content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <RegisterForm redirectTo={redirect || '/'} />

          {/* Additional info */}
          <div className="text-center space-y-4">
            <p className="text-base text-muted-foreground">
              {t('alreadyHaveAccount')}{' '}
              <Link href="/login" className="font-medium text-main hover:underline">
                {t('signIn')}
              </Link>
            </p>
            <Link
              href="/"
              className="inline-flex items-center text-base font-medium text-main hover:underline"
            >
              <ArrowLeftIcon className="mr-1 h-4 w-4" />
              {t('backToHome')}
            </Link>
          </div>
        </div>
      </main>

      {/* Theme Toggle - Bottom Right */}
      <div className="fixed bottom-16 right-16">
        <ThemeToggle />
      </div>
    </div>
  );
}

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

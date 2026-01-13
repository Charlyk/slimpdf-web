'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { LogOut, User, CreditCard, Key, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/auth-context';
import { Badge } from '@/components/ui/badge';

export function UserMenu() {
  const { user, firebaseUser, isAuthenticated, isLoading, signOut } = useAuth();
  const router = useRouter();
  const t = useTranslations('userMenu');

  if (isLoading) {
    return (
      <div className="h-9 w-9 animate-pulse rounded-full bg-secondary-background" />
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
    router.refresh();
  };

  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : user.email?.[0].toUpperCase() || 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="neutral"
          size="icon"
          className="relative h-9 w-9 rounded-full"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={firebaseUser?.photoURL || undefined}
              alt={user.name || 'User'}
            />
            <AvatarFallback className="bg-main text-main-foreground text-sm font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium leading-none">
                {user.name || t('account')}
              </p>
              {user.is_pro && (
                <Badge variant="default" className="text-xs px-1.5 py-0">
                  Pro
                </Badge>
              )}
            </div>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push('/dashboard')}
          className="cursor-pointer"
        >
          <User className="mr-2 h-4 w-4" />
          {t('dashboard')}
        </DropdownMenuItem>
        {user.is_pro && (
          <DropdownMenuItem
            onClick={() => router.push('/dashboard/api-keys')}
            className="cursor-pointer"
          >
            <Key className="mr-2 h-4 w-4" />
            {t('apiKeys')}
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          onClick={() => router.push('/dashboard/billing')}
          className="cursor-pointer"
        >
          <CreditCard className="mr-2 h-4 w-4" />
          {t('billing')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push('/dashboard/settings')}
          className="cursor-pointer"
        >
          <Settings className="mr-2 h-4 w-4" />
          {t('settings')}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          {t('signOut')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { AuthForm } from './auth-form';

interface LoginFormProps {
  redirectTo?: string;
}

export function LoginForm({ redirectTo = '/' }: LoginFormProps) {
  return <AuthForm mode="login" redirectTo={redirectTo} />;
}

import { AuthForm } from './auth-form';

interface RegisterFormProps {
  redirectTo?: string;
}

export function RegisterForm({ redirectTo = '/' }: RegisterFormProps) {
  return <AuthForm mode="register" redirectTo={redirectTo} />;
}

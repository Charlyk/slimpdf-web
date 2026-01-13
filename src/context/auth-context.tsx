'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged, type User as FirebaseUser, type AuthProvider } from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '@/lib/firebase';
import { SlimPdfClient, type User, type AuthTokenResponse, type ApiEnvironment } from '@/lib/slimpdf-client/dist';

const API_ENVIRONMENT = (process.env.NEXT_PUBLIC_API_ENVIRONMENT as ApiEnvironment) || 'production';
const TOKEN_KEY = 'slimpdf_token';
const USER_KEY = 'slimpdf_user';

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
  signInWithGoogle: () => Promise<AuthTokenResponse>;
  signInWithGithub: () => Promise<AuthTokenResponse>;
  signOut: () => Promise<void>;
  getClient: () => SlimPdfClient;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize client with stored token
  const getClient = useCallback(() => {
    return new SlimPdfClient({
      environment: API_ENVIRONMENT,
      accessToken: accessToken || undefined,
    });
  }, [accessToken]);

  // Load stored auth state on mount
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);

    if (storedToken && storedUser) {
      setAccessToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        // Invalid stored user, clear storage
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }
  }, []);

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setFirebaseUser(fbUser);
      setIsLoading(false);

      // If Firebase user signs out, clear our state
      if (!fbUser && user) {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const signInWithProvider = useCallback(async (provider: AuthProvider): Promise<AuthTokenResponse> => {
    setIsLoading(true);

    try {
      // Sign in with provider via Firebase
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      // Exchange Firebase ID token for SlimPDF JWT
      const client = new SlimPdfClient({ environment: API_ENVIRONMENT });
      const authResponse = await client.auth.loginWithFirebase(idToken);

      // Store auth state
      setAccessToken(authResponse.access_token);
      setUser(authResponse.user);
      localStorage.setItem(TOKEN_KEY, authResponse.access_token);
      localStorage.setItem(USER_KEY, JSON.stringify(authResponse.user));

      return authResponse;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signInWithGoogle = useCallback(() => signInWithProvider(googleProvider), [signInWithProvider]);
  const signInWithGithub = useCallback(() => signInWithProvider(githubProvider), [signInWithProvider]);

  const signOut = useCallback(async () => {
    setIsLoading(true);

    try {
      // Sign out from Firebase
      await firebaseSignOut(auth);

      // Clear local state
      setUser(null);
      setAccessToken(null);
      setFirebaseUser(null);
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value: AuthContextType = {
    user,
    firebaseUser,
    isLoading,
    isAuthenticated: !!accessToken && !!user,
    accessToken,
    signInWithGoogle,
    signInWithGithub,
    signOut,
    getClient,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

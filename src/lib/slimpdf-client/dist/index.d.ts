/**
 * SlimPDF Client Types
 */
type CompressionQuality = 'low' | 'medium' | 'high' | 'maximum';
type PageSize = 'a4' | 'letter' | 'original';
type JobStatus = 'pending' | 'processing' | 'completed' | 'failed';
type ToolType = 'compress' | 'merge' | 'image_to_pdf';
type Plan = 'free' | 'pro';
type BillingInterval = 'month' | 'year';
/** Supported languages for API responses */
type SupportedLanguage = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'it' | 'ja' | 'zh' | 'ko';
interface ClientOptions {
    /** Base URL of the SlimPDF API (e.g., 'https://api.slimpdf.io') */
    baseUrl: string;
    /** Optional access token (JWT or API key) for authenticated requests */
    accessToken?: string;
    /** Optional language for API responses (default: 'en') */
    language?: SupportedLanguage;
    /** Optional custom fetch function for testing or custom implementations */
    fetch?: typeof fetch;
}
interface PollOptions {
    /** Maximum number of polling attempts (default: 60) */
    maxAttempts?: number;
    /** Initial polling interval in milliseconds (default: 1000) */
    initialIntervalMs?: number;
    /** Maximum polling interval in milliseconds (default: 5000) */
    maxIntervalMs?: number;
    /** Callback when status changes */
    onStatusChange?: (status: JobStatusResponse) => void;
}
interface User {
    id: string;
    email: string | null;
    name: string | null;
    plan: Plan;
    is_pro: boolean;
}
interface UsageStats {
    used: number;
    limit: number;
    remaining: number;
}
interface UsageResponse {
    compress: UsageStats;
    merge: UsageStats;
    image_to_pdf: UsageStats;
}
interface MeResponse {
    user: User;
    usage: UsageResponse;
}
interface AuthTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    user: User;
    is_new_user: boolean;
}
interface VerifyResponse {
    authenticated: boolean;
    user_id: string | null;
    plan: Plan;
    is_pro: boolean;
}
/**
 * Rate limit information returned from API responses.
 * Only present for free tier users - Pro users have unlimited access.
 */
interface RateLimitInfo {
    /** Maximum requests allowed per day */
    limit: number;
    /** Requests remaining in current period */
    remaining: number;
    /** Unix timestamp when the limit resets (midnight UTC) */
    resetAt: number;
}
interface CompressResponse {
    job_id: string;
    status: string;
    message: string;
    /** Rate limit info (only present for free tier users) */
    rateLimit?: RateLimitInfo;
}
interface MergeResponse {
    job_id: string;
    status: string;
    message: string;
    file_count: number;
    /** Rate limit info (only present for free tier users) */
    rateLimit?: RateLimitInfo;
}
interface ImageToPdfResponse {
    job_id: string;
    status: string;
    message: string;
    image_count: number;
    /** Rate limit info (only present for free tier users) */
    rateLimit?: RateLimitInfo;
}
interface JobStatusResponse {
    job_id: string;
    status: JobStatus;
    tool: ToolType;
    original_size: number | null;
    output_size: number | null;
    reduction_percent: number | null;
    download_url: string | null;
    expires_at: string | null;
    error_message: string | null;
    created_at: string;
    completed_at: string | null;
}
interface CheckoutResponse {
    checkout_url: string;
    session_id: string;
}
interface PortalResponse {
    portal_url: string;
}
interface ApiKey {
    id: string;
    name: string;
    key_prefix: string;
    created_at: string;
    last_used_at: string | null;
    is_active: boolean;
}
interface ApiKeyCreateResponse {
    id: string;
    name: string;
    /** The full API key - only shown once! */
    key: string;
    key_prefix: string;
    created_at: string;
    message: string;
}
interface CompressOptions {
    /** Compression quality preset */
    quality?: CompressionQuality;
    /** Target file size in MB (Pro only) */
    targetSizeMb?: number;
}
interface ImageToPdfOptions {
    /** Page size for the output PDF */
    pageSize?: PageSize;
}
interface JobResult {
    status: JobStatusResponse;
    /** Download the processed file as a Blob */
    download: () => Promise<Blob>;
}
interface ErrorResponse {
    detail: string;
}

/**
 * Base HTTP client for API requests
 */
interface RequestContext {
    baseUrl: string;
    getAccessToken: () => string | undefined;
    getLanguage: () => string;
    fetch: typeof fetch;
}

/**
 * Cross-platform FormData utilities
 * Works in both browser and Node.js (18+)
 */
/**
 * File-like object that can be used with FormData
 */
type FileInput = File | Blob;

/**
 * Compress endpoint client
 */

declare class CompressClient {
    private ctx;
    private jobs;
    constructor(ctx: RequestContext);
    /**
     * Submit a PDF for compression
     * Returns immediately with a job ID. Use jobs.getStatus() or jobs.waitForCompletion() to track progress.
     *
     * @param file - PDF file to compress
     * @param options - Compression options
     * @returns Job info with job_id
     */
    submit(file: FileInput, options?: CompressOptions): Promise<CompressResponse>;
    /**
     * Submit a PDF for compression and wait for completion
     * Convenience method that handles polling automatically.
     *
     * @param file - PDF file to compress
     * @param options - Compression options
     * @param pollOptions - Polling configuration
     * @returns Job result with status and download function
     */
    submitAndWait(file: FileInput, options?: CompressOptions, pollOptions?: PollOptions): Promise<JobResult>;
}

/**
 * Merge endpoint client
 */

declare class MergeClient {
    private ctx;
    private jobs;
    constructor(ctx: RequestContext);
    /**
     * Submit PDFs for merging
     * Returns immediately with a job ID. Files are merged in the order provided.
     *
     * @param files - PDF files to merge (in order)
     * @returns Job info with job_id and file_count
     */
    submit(files: FileInput[]): Promise<MergeResponse>;
    /**
     * Submit PDFs for merging and wait for completion
     * Convenience method that handles polling automatically.
     *
     * @param files - PDF files to merge (in order)
     * @param pollOptions - Polling configuration
     * @returns Job result with status and download function
     */
    submitAndWait(files: FileInput[], pollOptions?: PollOptions): Promise<JobResult>;
}

/**
 * Image to PDF endpoint client
 */

declare class ImageToPdfClient {
    private ctx;
    private jobs;
    constructor(ctx: RequestContext);
    /**
     * Submit images for PDF conversion
     * Returns immediately with a job ID. Images are added to the PDF in order.
     *
     * Supported formats: JPG, PNG, WebP, TIFF, BMP, GIF
     *
     * @param files - Image files to convert (in order)
     * @param options - Conversion options
     * @returns Job info with job_id and image_count
     */
    submit(files: FileInput[], options?: ImageToPdfOptions): Promise<ImageToPdfResponse>;
    /**
     * Submit images for PDF conversion and wait for completion
     * Convenience method that handles polling automatically.
     *
     * @param files - Image files to convert (in order)
     * @param options - Conversion options
     * @param pollOptions - Polling configuration
     * @returns Job result with status and download function
     */
    submitAndWait(files: FileInput[], options?: ImageToPdfOptions, pollOptions?: PollOptions): Promise<JobResult>;
}

/**
 * Jobs endpoint client - status checking and downloads
 */

declare class JobsClient {
    private ctx;
    constructor(ctx: RequestContext);
    /**
     * Get the status of a job
     */
    getStatus(jobId: string): Promise<JobStatusResponse>;
    /**
     * Download the processed file
     * @throws {JobExpiredError} if the download link has expired
     * @throws {NotFoundError} if the job or file is not found
     */
    download(jobId: string): Promise<Blob>;
    /**
     * Wait for a job to complete with exponential backoff polling
     * @throws {JobFailedError} if the job fails
     * @throws {PollingTimeoutError} if polling times out
     */
    waitForCompletion(jobId: string, options?: PollOptions): Promise<JobStatusResponse>;
}

/**
 * Auth endpoint client
 */

declare class AuthClient {
    private ctx;
    constructor(ctx: RequestContext);
    /**
     * Authenticate with Google OAuth
     * Exchange a Google ID token for a SlimPDF JWT access token.
     *
     * @param idToken - Google ID token from Google Sign-In
     * @returns Auth response with access_token and user info
     */
    loginWithGoogle(idToken: string): Promise<AuthTokenResponse>;
    /**
     * Get current user info and usage stats
     * Requires authentication (JWT or API key)
     *
     * @returns User info and usage statistics
     */
    getCurrentUser(): Promise<MeResponse>;
    /**
     * Verify current token validity
     * Works with or without authentication.
     *
     * @returns Token verification status
     */
    verifyToken(): Promise<VerifyResponse>;
}

/**
 * Billing endpoint client
 */

declare class BillingClient {
    private ctx;
    constructor(ctx: RequestContext);
    /**
     * Create a Stripe checkout session for Pro subscription
     * Requires authentication.
     *
     * @param interval - Billing interval ('month' or 'year')
     * @returns Checkout URL to redirect the user to
     */
    createCheckout(interval: BillingInterval): Promise<CheckoutResponse>;
    /**
     * Create a Stripe customer portal session
     * Requires authentication and an existing Stripe customer.
     *
     * @returns Portal URL to redirect the user to
     */
    createPortalSession(): Promise<PortalResponse>;
}

/**
 * API Keys endpoint client
 */

declare class ApiKeysClient {
    private ctx;
    constructor(ctx: RequestContext);
    /**
     * List all API keys for the current user
     * Requires Pro subscription.
     *
     * @returns List of API keys (without the full key value)
     */
    list(): Promise<ApiKey[]>;
    /**
     * Create a new API key
     * Requires Pro subscription. Maximum 5 active keys per user.
     *
     * IMPORTANT: The full key is only returned once! Store it securely.
     *
     * @param name - Optional name for the API key
     * @returns The created API key with full key value (shown only once!)
     */
    create(name?: string): Promise<ApiKeyCreateResponse>;
    /**
     * Revoke an API key
     * Requires Pro subscription.
     *
     * @param keyId - ID of the API key to revoke
     */
    revoke(keyId: string): Promise<void>;
}

/**
 * SlimPDF Client - Main client class
 */

/**
 * SlimPDF API Client
 *
 * @example
 * ```typescript
 * const client = new SlimPdfClient({
 *   baseUrl: 'https://api.slimpdf.io',
 *   accessToken: 'your-jwt-or-api-key', // optional
 *   language: 'es', // optional, defaults to 'en'
 * });
 *
 * // Compress a PDF
 * const result = await client.compress.submitAndWait(file, { quality: 'high' });
 * const blob = await result.download();
 *
 * // Merge PDFs
 * const merged = await client.merge.submitAndWait([pdf1, pdf2]);
 *
 * // Convert images to PDF
 * const pdf = await client.imageToPdf.submitAndWait(images, { pageSize: 'a4' });
 * ```
 */
declare class SlimPdfClient {
    private _accessToken;
    private _language;
    private readonly ctx;
    /** Compress PDF files */
    readonly compress: CompressClient;
    /** Merge multiple PDFs */
    readonly merge: MergeClient;
    /** Convert images to PDF */
    readonly imageToPdf: ImageToPdfClient;
    /** Check job status and download files */
    readonly jobs: JobsClient;
    /** Authentication (Google OAuth) */
    readonly auth: AuthClient;
    /** Billing (Stripe) */
    readonly billing: BillingClient;
    /** API key management (Pro) */
    readonly apiKeys: ApiKeysClient;
    constructor(options: ClientOptions);
    /**
     * Set the access token for authenticated requests
     * Can be a JWT token or an API key (sk_live_...)
     */
    setAccessToken(token: string): void;
    /**
     * Clear the access token
     */
    clearAccessToken(): void;
    /**
     * Check if the client has an access token set
     */
    get isAuthenticated(): boolean;
    /**
     * Set the language for API responses
     * Supported: 'en', 'es', 'fr', 'de', 'pt', 'it', 'ja', 'zh', 'ko'
     */
    setLanguage(language: SupportedLanguage): void;
    /**
     * Get the current language
     */
    get language(): SupportedLanguage;
}

/**
 * SlimPDF Client Error Classes
 */
/**
 * Base error class for all SlimPDF errors
 */
declare class SlimPdfError extends Error {
    readonly statusCode: number;
    readonly detail?: string | undefined;
    constructor(statusCode: number, message: string, detail?: string | undefined);
}
/**
 * Thrown when authentication fails (401)
 */
declare class AuthenticationError extends SlimPdfError {
    constructor(message?: string, detail?: string);
}
/**
 * Thrown when access is forbidden (403)
 */
declare class ForbiddenError extends SlimPdfError {
    constructor(message?: string, detail?: string);
}
/**
 * Thrown when a resource is not found (404)
 */
declare class NotFoundError extends SlimPdfError {
    constructor(message?: string, detail?: string);
}
/**
 * Thrown when a download link has expired (410)
 */
declare class JobExpiredError extends SlimPdfError {
    constructor(message?: string, detail?: string);
}
/**
 * Thrown when file size exceeds the limit (413)
 */
declare class FileSizeError extends SlimPdfError {
    constructor(message?: string, detail?: string);
}
/**
 * Thrown when rate limit is exceeded (429)
 */
declare class RateLimitError extends SlimPdfError {
    constructor(message?: string, detail?: string);
}
/**
 * Thrown when the request is invalid (400)
 */
declare class ValidationError extends SlimPdfError {
    constructor(message?: string, detail?: string);
}
/**
 * Thrown when job processing fails (500)
 */
declare class ProcessingError extends SlimPdfError {
    constructor(message?: string, detail?: string);
}
/**
 * Thrown when polling times out
 */
declare class PollingTimeoutError extends SlimPdfError {
    readonly jobId: string;
    constructor(jobId: string, message?: string);
}
/**
 * Thrown when job fails during processing
 */
declare class JobFailedError extends SlimPdfError {
    readonly jobId: string;
    readonly errorMessage: string;
    constructor(jobId: string, errorMessage: string);
}

export { type ApiKey, type ApiKeyCreateResponse, ApiKeysClient, AuthClient, type AuthTokenResponse, AuthenticationError, BillingClient, type BillingInterval, type CheckoutResponse, type ClientOptions, CompressClient, type CompressOptions, type CompressResponse, type CompressionQuality, type ErrorResponse, FileSizeError, ForbiddenError, ImageToPdfClient, type ImageToPdfOptions, type ImageToPdfResponse, JobExpiredError, JobFailedError, type JobResult, type JobStatus, type JobStatusResponse, JobsClient, type MeResponse, MergeClient, type MergeResponse, NotFoundError, type PageSize, type Plan, type PollOptions, PollingTimeoutError, type PortalResponse, ProcessingError, RateLimitError, type RateLimitInfo, SlimPdfClient, SlimPdfError, type SupportedLanguage, type ToolType, type UsageResponse, type UsageStats, type User, ValidationError, type VerifyResponse };

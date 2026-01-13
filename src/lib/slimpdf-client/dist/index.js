// src/errors.ts
var SlimPdfError = class _SlimPdfError extends Error {
  constructor(statusCode, message, detail) {
    super(message);
    this.statusCode = statusCode;
    this.detail = detail;
    this.name = "SlimPdfError";
    Object.setPrototypeOf(this, _SlimPdfError.prototype);
  }
};
var AuthenticationError = class _AuthenticationError extends SlimPdfError {
  constructor(message = "Authentication required", detail) {
    super(401, message, detail);
    this.name = "AuthenticationError";
    Object.setPrototypeOf(this, _AuthenticationError.prototype);
  }
};
var ForbiddenError = class _ForbiddenError extends SlimPdfError {
  constructor(message = "Access forbidden", detail) {
    super(403, message, detail);
    this.name = "ForbiddenError";
    Object.setPrototypeOf(this, _ForbiddenError.prototype);
  }
};
var NotFoundError = class _NotFoundError extends SlimPdfError {
  constructor(message = "Resource not found", detail) {
    super(404, message, detail);
    this.name = "NotFoundError";
    Object.setPrototypeOf(this, _NotFoundError.prototype);
  }
};
var JobExpiredError = class _JobExpiredError extends SlimPdfError {
  constructor(message = "Download link has expired", detail) {
    super(410, message, detail);
    this.name = "JobExpiredError";
    Object.setPrototypeOf(this, _JobExpiredError.prototype);
  }
};
var FileSizeError = class _FileSizeError extends SlimPdfError {
  constructor(message = "File size exceeds limit", detail) {
    super(413, message, detail);
    this.name = "FileSizeError";
    Object.setPrototypeOf(this, _FileSizeError.prototype);
  }
};
var RateLimitError = class _RateLimitError extends SlimPdfError {
  constructor(message = "Rate limit exceeded", detail) {
    super(429, message, detail);
    this.name = "RateLimitError";
    Object.setPrototypeOf(this, _RateLimitError.prototype);
  }
};
var ValidationError = class _ValidationError extends SlimPdfError {
  constructor(message = "Invalid request", detail) {
    super(400, message, detail);
    this.name = "ValidationError";
    Object.setPrototypeOf(this, _ValidationError.prototype);
  }
};
var ProcessingError = class _ProcessingError extends SlimPdfError {
  constructor(message = "Processing failed", detail) {
    super(500, message, detail);
    this.name = "ProcessingError";
    Object.setPrototypeOf(this, _ProcessingError.prototype);
  }
};
var PollingTimeoutError = class _PollingTimeoutError extends SlimPdfError {
  constructor(jobId, message = "Polling timed out") {
    super(408, message);
    this.jobId = jobId;
    this.name = "PollingTimeoutError";
    Object.setPrototypeOf(this, _PollingTimeoutError.prototype);
  }
};
var JobFailedError = class _JobFailedError extends SlimPdfError {
  constructor(jobId, errorMessage) {
    super(500, `Job ${jobId} failed: ${errorMessage}`);
    this.jobId = jobId;
    this.errorMessage = errorMessage;
    this.name = "JobFailedError";
    Object.setPrototypeOf(this, _JobFailedError.prototype);
  }
};
async function handleErrorResponse(response) {
  let detail;
  try {
    const body = await response.json();
    detail = body.detail || body.message || JSON.stringify(body);
  } catch {
    detail = await response.text().catch(() => void 0);
  }
  const message = detail || response.statusText || "Request failed";
  switch (response.status) {
    case 400:
      throw new ValidationError(message, detail);
    case 401:
      throw new AuthenticationError(message, detail);
    case 403:
      throw new ForbiddenError(message, detail);
    case 404:
      throw new NotFoundError(message, detail);
    case 410:
      throw new JobExpiredError(message, detail);
    case 413:
      throw new FileSizeError(message, detail);
    case 429:
      throw new RateLimitError(message, detail);
    case 500:
    case 502:
    case 503:
    case 504:
      throw new ProcessingError(message, detail);
    default:
      throw new SlimPdfError(response.status, message, detail);
  }
}

// src/endpoints/base.ts
function parseRateLimitHeaders(response) {
  const limit = response.headers.get("X-RateLimit-Limit");
  const remaining = response.headers.get("X-RateLimit-Remaining");
  const resetAt = response.headers.get("X-RateLimit-Reset");
  if (!limit || !remaining || !resetAt) {
    return void 0;
  }
  return {
    limit: parseInt(limit, 10),
    remaining: parseInt(remaining, 10),
    resetAt: parseInt(resetAt, 10)
  };
}
async function request(ctx, method, path, options = {}) {
  const { body, query, headers: customHeaders, includeRateLimit } = options;
  let url = `${ctx.baseUrl}${path}`;
  if (query) {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== void 0) {
        params.append(key, String(value));
      }
    });
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }
  const headers = { ...customHeaders };
  const token = ctx.getAccessToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  if (body && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  const response = await ctx.fetch(url, {
    method,
    headers,
    body: body instanceof FormData ? body : body ? JSON.stringify(body) : void 0
  });
  if (!response.ok) {
    await handleErrorResponse(response);
  }
  const data = await response.json();
  if (includeRateLimit) {
    const rateLimit = parseRateLimitHeaders(response);
    if (rateLimit) {
      data.rateLimit = rateLimit;
    }
  }
  return data;
}
async function requestBlob(ctx, method, path) {
  const url = `${ctx.baseUrl}${path}`;
  const headers = {};
  const token = ctx.getAccessToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await ctx.fetch(url, {
    method,
    headers
  });
  if (!response.ok) {
    await handleErrorResponse(response);
  }
  return response.blob();
}

// src/utils/form-data.ts
function createFileFormData(fieldName, file, filename) {
  const formData = new FormData();
  const name = (file instanceof File ? file.name : "file");
  formData.append(fieldName, file, name);
  return formData;
}
function createMultiFileFormData(fieldName, files, filenames) {
  const formData = new FormData();
  files.forEach((file, index) => {
    const name = (file instanceof File ? file.name : `file_${index}`);
    formData.append(fieldName, file, name);
  });
  return formData;
}
function appendFormFields(formData, fields) {
  Object.entries(fields).forEach(([key, value]) => {
    if (value !== void 0) {
      formData.append(key, String(value));
    }
  });
  return formData;
}

// src/utils/polling.ts
var DEFAULT_MAX_ATTEMPTS = 60;
var DEFAULT_INITIAL_INTERVAL_MS = 1e3;
var DEFAULT_MAX_INTERVAL_MS = 5e3;
function getNextInterval(currentInterval, maxInterval) {
  const nextInterval = Math.min(currentInterval * 1.5, maxInterval);
  const jitter = nextInterval * 0.1 * (Math.random() * 2 - 1);
  return Math.round(nextInterval + jitter);
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function pollUntilComplete(jobId, getStatus, options = {}) {
  const {
    maxAttempts = DEFAULT_MAX_ATTEMPTS,
    initialIntervalMs = DEFAULT_INITIAL_INTERVAL_MS,
    maxIntervalMs = DEFAULT_MAX_INTERVAL_MS,
    onStatusChange
  } = options;
  let attempts = 0;
  let currentInterval = initialIntervalMs;
  let lastStatus = null;
  while (attempts < maxAttempts) {
    const status = await getStatus();
    if (onStatusChange && status.status !== lastStatus?.status) {
      onStatusChange(status);
    }
    lastStatus = status;
    if (status.status === "completed") {
      return status;
    }
    if (status.status === "failed") {
      throw new JobFailedError(jobId, status.error_message || "Unknown error");
    }
    attempts++;
    await sleep(currentInterval);
    currentInterval = getNextInterval(currentInterval, maxIntervalMs);
  }
  throw new PollingTimeoutError(
    jobId,
    `Job ${jobId} did not complete within ${maxAttempts} polling attempts`
  );
}

// src/endpoints/jobs.ts
var JobsClient = class {
  constructor(ctx) {
    this.ctx = ctx;
  }
  /**
   * Get the status of a job
   */
  async getStatus(jobId) {
    return request(this.ctx, "GET", `/v1/status/${jobId}`);
  }
  /**
   * Download the processed file
   * @throws {JobExpiredError} if the download link has expired
   * @throws {NotFoundError} if the job or file is not found
   */
  async download(jobId) {
    return requestBlob(this.ctx, "GET", `/v1/download/${jobId}`);
  }
  /**
   * Wait for a job to complete with exponential backoff polling
   * @throws {JobFailedError} if the job fails
   * @throws {PollingTimeoutError} if polling times out
   */
  async waitForCompletion(jobId, options) {
    return pollUntilComplete(
      jobId,
      () => this.getStatus(jobId),
      options
    );
  }
};

// src/endpoints/compress.ts
var CompressClient = class {
  constructor(ctx) {
    this.ctx = ctx;
    this.jobs = new JobsClient(ctx);
  }
  /**
   * Submit a PDF for compression
   * Returns immediately with a job ID. Use jobs.getStatus() or jobs.waitForCompletion() to track progress.
   *
   * @param file - PDF file to compress
   * @param options - Compression options
   * @returns Job info with job_id
   */
  async submit(file, options = {}) {
    const formData = createFileFormData("file", file);
    appendFormFields(formData, {
      quality: options.quality,
      target_size_mb: options.targetSizeMb
    });
    return request(this.ctx, "POST", "/v1/compress", {
      body: formData,
      includeRateLimit: true
    });
  }
  /**
   * Submit a PDF for compression and wait for completion
   * Convenience method that handles polling automatically.
   *
   * @param file - PDF file to compress
   * @param options - Compression options
   * @param pollOptions - Polling configuration
   * @returns Job result with status and download function
   */
  async submitAndWait(file, options = {}, pollOptions) {
    const job = await this.submit(file, options);
    const status = await this.jobs.waitForCompletion(job.job_id, pollOptions);
    return {
      status,
      download: () => this.jobs.download(job.job_id)
    };
  }
};

// src/endpoints/merge.ts
var MergeClient = class {
  constructor(ctx) {
    this.ctx = ctx;
    this.jobs = new JobsClient(ctx);
  }
  /**
   * Submit PDFs for merging
   * Returns immediately with a job ID. Files are merged in the order provided.
   *
   * @param files - PDF files to merge (in order)
   * @returns Job info with job_id and file_count
   */
  async submit(files) {
    const formData = createMultiFileFormData("files", files);
    return request(this.ctx, "POST", "/v1/merge", {
      body: formData,
      includeRateLimit: true
    });
  }
  /**
   * Submit PDFs for merging and wait for completion
   * Convenience method that handles polling automatically.
   *
   * @param files - PDF files to merge (in order)
   * @param pollOptions - Polling configuration
   * @returns Job result with status and download function
   */
  async submitAndWait(files, pollOptions) {
    const job = await this.submit(files);
    const status = await this.jobs.waitForCompletion(job.job_id, pollOptions);
    return {
      status,
      download: () => this.jobs.download(job.job_id)
    };
  }
};

// src/endpoints/image-to-pdf.ts
var ImageToPdfClient = class {
  constructor(ctx) {
    this.ctx = ctx;
    this.jobs = new JobsClient(ctx);
  }
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
  async submit(files, options = {}) {
    const formData = createMultiFileFormData("files", files);
    appendFormFields(formData, {
      page_size: options.pageSize
    });
    return request(this.ctx, "POST", "/v1/image-to-pdf", {
      body: formData,
      includeRateLimit: true
    });
  }
  /**
   * Submit images for PDF conversion and wait for completion
   * Convenience method that handles polling automatically.
   *
   * @param files - Image files to convert (in order)
   * @param options - Conversion options
   * @param pollOptions - Polling configuration
   * @returns Job result with status and download function
   */
  async submitAndWait(files, options = {}, pollOptions) {
    const job = await this.submit(files, options);
    const status = await this.jobs.waitForCompletion(job.job_id, pollOptions);
    return {
      status,
      download: () => this.jobs.download(job.job_id)
    };
  }
};

// src/endpoints/auth.ts
var AuthClient = class {
  constructor(ctx) {
    this.ctx = ctx;
  }
  /**
   * Authenticate with Google OAuth
   * Exchange a Google ID token for a SlimPDF JWT access token.
   *
   * @param idToken - Google ID token from Google Sign-In
   * @returns Auth response with access_token and user info
   */
  async loginWithGoogle(idToken) {
    return request(this.ctx, "POST", "/v1/auth/google", {
      body: { id_token: idToken }
    });
  }
  /**
   * Get current user info and usage stats
   * Requires authentication (JWT or API key)
   *
   * @returns User info and usage statistics
   */
  async getCurrentUser() {
    return request(this.ctx, "GET", "/v1/auth/me");
  }
  /**
   * Verify current token validity
   * Works with or without authentication.
   *
   * @returns Token verification status
   */
  async verifyToken() {
    return request(this.ctx, "GET", "/v1/auth/verify");
  }
};

// src/endpoints/billing.ts
var BillingClient = class {
  constructor(ctx) {
    this.ctx = ctx;
  }
  /**
   * Create a Stripe checkout session for Pro subscription
   * Requires authentication.
   *
   * @param interval - Billing interval ('month' or 'year')
   * @returns Checkout URL to redirect the user to
   */
  async createCheckout(interval) {
    return request(this.ctx, "POST", "/v1/billing/checkout", {
      query: { interval }
    });
  }
  /**
   * Create a Stripe customer portal session
   * Requires authentication and an existing Stripe customer.
   *
   * @returns Portal URL to redirect the user to
   */
  async createPortalSession() {
    return request(this.ctx, "POST", "/v1/billing/portal");
  }
};

// src/endpoints/api-keys.ts
var ApiKeysClient = class {
  constructor(ctx) {
    this.ctx = ctx;
  }
  /**
   * List all API keys for the current user
   * Requires Pro subscription.
   *
   * @returns List of API keys (without the full key value)
   */
  async list() {
    return request(this.ctx, "GET", "/v1/keys");
  }
  /**
   * Create a new API key
   * Requires Pro subscription. Maximum 5 active keys per user.
   *
   * IMPORTANT: The full key is only returned once! Store it securely.
   *
   * @param name - Optional name for the API key
   * @returns The created API key with full key value (shown only once!)
   */
  async create(name) {
    return request(this.ctx, "POST", "/v1/keys", {
      body: { name: name || "Default" }
    });
  }
  /**
   * Revoke an API key
   * Requires Pro subscription.
   *
   * @param keyId - ID of the API key to revoke
   */
  async revoke(keyId) {
    await request(this.ctx, "DELETE", `/v1/keys/${keyId}`);
  }
};

// src/client.ts
var SlimPdfClient = class {
  constructor(options) {
    this._accessToken = options.accessToken;
    this.ctx = {
      baseUrl: options.baseUrl.replace(/\/$/, ""),
      // Remove trailing slash
      getAccessToken: () => this._accessToken,
      fetch: options.fetch || globalThis.fetch.bind(globalThis)
    };
    this.compress = new CompressClient(this.ctx);
    this.merge = new MergeClient(this.ctx);
    this.imageToPdf = new ImageToPdfClient(this.ctx);
    this.jobs = new JobsClient(this.ctx);
    this.auth = new AuthClient(this.ctx);
    this.billing = new BillingClient(this.ctx);
    this.apiKeys = new ApiKeysClient(this.ctx);
  }
  /**
   * Set the access token for authenticated requests
   * Can be a JWT token or an API key (sk_live_...)
   */
  setAccessToken(token) {
    this._accessToken = token;
  }
  /**
   * Clear the access token
   */
  clearAccessToken() {
    this._accessToken = void 0;
  }
  /**
   * Check if the client has an access token set
   */
  get isAuthenticated() {
    return !!this._accessToken;
  }
};

export { ApiKeysClient, AuthClient, AuthenticationError, BillingClient, CompressClient, FileSizeError, ForbiddenError, ImageToPdfClient, JobExpiredError, JobFailedError, JobsClient, MergeClient, NotFoundError, PollingTimeoutError, ProcessingError, RateLimitError, SlimPdfClient, SlimPdfError, ValidationError };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
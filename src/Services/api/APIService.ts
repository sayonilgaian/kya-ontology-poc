type RequestInterceptor = (
  config: RequestInit
) => Promise<RequestInit> | RequestInit;

type ResponseInterceptor<T = any> = (
  response: Response
) => Promise<Response> | Response;

type ResponseErrorInterceptor = (error: any) => any;

interface FetchServiceOptions {
  baseUrl?: string;
  defaultHeaders?: Record<string, string>;
  interceptors?: {
    request?: RequestInterceptor;
    response?: ResponseInterceptor;
    responseError?: ResponseErrorInterceptor;
  };
  serviceMap?: Record<string, string>;
}

export class FetchService {
  private baseUrl: string;
  private globalHeaders: Record<string, string>;
  private serviceMap: Record<string, string>;
  private serviceHeaders: Record<string, Record<string, string>>;
  private interceptors: {
    request: RequestInterceptor;
    response: ResponseInterceptor;
    responseError: ResponseErrorInterceptor;
  };

  constructor({
    baseUrl = "",
    defaultHeaders = {},
    interceptors = {},
    serviceMap = {},
  }: FetchServiceOptions = {}) {
    this.baseUrl = baseUrl;
    this.globalHeaders = { ...defaultHeaders };
    this.serviceMap = { ...serviceMap };
    this.serviceHeaders = {};
    this.interceptors = {
      request: interceptors.request || ((config) => config),
      response: interceptors.response || ((response) => response),
      responseError:
        interceptors.responseError ||
        ((error) => {
          throw error;
        }),
    };
  }

  // ─── BASE URL ────────────────────────────────────────────────
  public setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  // ─── HEADERS ─────────────────────────────────────────────────
  public setHeader(key: string, value: string) {
    this.globalHeaders[key] = value;
  }

  public removeHeader(key: string) {
    delete this.globalHeaders[key];
  }

  public setHeaders(headers: Record<string, string>) {
    this.globalHeaders = { ...headers };
  }

  public getHeaders(): Record<string, string> {
    return { ...this.globalHeaders };
  }

  // ─── SERVICE MAP ─────────────────────────────────────────────
  public setServiceMap(map: Record<string, string>) {
    this.serviceMap = { ...map };
  }

  public getServiceMap(): Record<string, string> {
    return { ...this.serviceMap };
  }

  public setService(key: string, url: string) {
    this.serviceMap[key] = url;
  }

  public getService(key: string): string | undefined {
    return this.serviceMap[key];
  }

  public removeService(key: string) {
    delete this.serviceMap[key];
    delete this.serviceHeaders[key];
  }

  // ─── SERVICE-SPECIFIC HEADERS ───────────────────────────────
  public setServiceHeaders(
    serviceKey: string,
    headers: Record<string, string>
  ) {
    this.serviceHeaders[serviceKey] = { ...headers };
  }

  public getServiceHeaders(
    serviceKey: string
  ): Record<string, string> | undefined {
    return this.serviceHeaders[serviceKey];
  }

  public removeServiceHeaders(serviceKey: string) {
    delete this.serviceHeaders[serviceKey];
  }

  // ─── INTERCEPTORS ────────────────────────────────────────────
  public setRequestInterceptor(interceptor: RequestInterceptor) {
    this.interceptors.request = interceptor;
  }

  public setResponseInterceptor(interceptor: ResponseInterceptor) {
    this.interceptors.response = interceptor;
  }

  public setResponseErrorInterceptor(interceptor: ResponseErrorInterceptor) {
    this.interceptors.responseError = interceptor;
  }

  public getInterceptors(): {
    request: RequestInterceptor;
    response: ResponseInterceptor;
    responseError: ResponseErrorInterceptor;
  } {
    return { ...this.interceptors };
  }

  // ─── INTERNAL: MERGE HEADERS ─────────────────────────────────
  private mergeHeaders(
    perRequestHeaders: HeadersInit = {},
    serviceKey?: string
  ): Headers {
    const final = new Headers(this.globalHeaders);

    // Add service-specific headers
    if (serviceKey && this.serviceHeaders[serviceKey]) {
      for (const [key, value] of Object.entries(
        this.serviceHeaders[serviceKey]
      )) {
        final.set(key, value);
      }
    }

    // Override with per-request headers
    const override = new Headers(perRequestHeaders);
    override.forEach((value, key) => {
      final.set(key, value);
    });

    return final;
  }

  // ─── REQUEST ─────────────────────────────────────────────────
  async request<T = any>(
    url: string,
    options: RequestInit = {},
    streamHandler?: (chunk: string) => void,
    serviceKey?: string
  ): Promise<T | void> {
    try {
      const headers = this.mergeHeaders(options.headers, serviceKey);
      const finalOptions = await this.interceptors.request({
        ...options,
        headers,
      });

      const resolvedBase = url.startsWith("http")
        ? ""
        : serviceKey && this.serviceMap[serviceKey]
        ? this.serviceMap[serviceKey]
        : this.baseUrl;

      const fullUrl = url.startsWith("http") ? url : resolvedBase + url;
      const response = await fetch(fullUrl, finalOptions);

      if (streamHandler && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          streamHandler(decoder.decode(value, { stream: true }));
        }
        return;
      }

      const processed = await this.interceptors.response(response);

      if (!processed.ok) {
        throw new Error(`HTTP error: ${processed.status}`);
      }

      return await processed.json();
    } catch (error) {
      return this.interceptors.responseError(error);
    }
  }

  // ─── HTTP HELPERS ────────────────────────────────────────────
  public get<T = any>(
    url: string,
    headers: HeadersInit = {},
    serviceKey?: string
  ): Promise<T | void> {
    return this.request<T>(
      url,
      { method: "GET", headers },
      undefined,
      serviceKey
    );
  }

  public post<T = any, U = any>(
    url: string,
    data: U,
    headers: HeadersInit = {},
    serviceKey?: string
  ): Promise<T | void> {
    return this.request<T>(
      url,
      {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      },
      undefined,
      serviceKey
    );
  }

  public put<T = any, U = any>(
    url: string,
    data: U,
    headers: HeadersInit = {},
    serviceKey?: string
  ): Promise<T | void> {
    return this.request<T>(
      url,
      {
        method: "PUT",
        headers,
        body: JSON.stringify(data),
      },
      undefined,
      serviceKey
    );
  }

  public delete<T = any, U = any>(
    url: string,
    data?: U,
    headers: HeadersInit = {},
    serviceKey?: string
  ): Promise<T | void> {
    return this.request<T>(
      url,
      {
        method: "DELETE",
        headers,
        body: data !== undefined ? JSON.stringify(data) : undefined,
      },
      undefined,
      serviceKey
    );
  }

  public stream(
    url: string,
    streamHandler: (chunk: string) => void,
    headers: HeadersInit = {},
    serviceKey?: string
  ): Promise<void> {
    return this.request(
      url,
      { method: "GET", headers },
      streamHandler,
      serviceKey
    );
  }
}

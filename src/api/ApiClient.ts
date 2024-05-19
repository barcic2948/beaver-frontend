export interface ApiResponse<T> {
  data: T;
  status: number;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getAuthToken(): string | null {
    const token = localStorage.getItem("access_token");
    return token ? `Bearer ${token}` : null;
  }

  private prepareHeaders(headers: HeadersInit): Headers {
    const authToken = this.getAuthToken();
    const newHeaders = new Headers(headers);
    if (authToken) {
      newHeaders.set("Authorization", authToken);
    }
    newHeaders.set("Content-Type", "application/json");
    return newHeaders;
  }

  private async refreshToken(): Promise<void> {
    const response = await fetch(`${this.baseUrl}/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      console.log("Access token", data.access_token);
    } else {
      throw new Error("Failed to refresh token");
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit,
    retry = true
  ): Promise<ApiResponse<T>> {
    let response = await fetch(`${this.baseUrl}${endpoint}`, options);

    if (response.status === 401) {
      const errorData = await response.json();
      console.log(errorData.code);
      if (errorData.code === "EXPIRED_JWT" && retry) {
        console.log("Refresh token");
        await this.refreshToken();
        options.headers = this.prepareHeaders(options.headers);
        response = await fetch(`${this.baseUrl}${endpoint}`, options);
      }
    }

    const data = await response.json();
    return {
      data,
      status: response.status,
    };
  }

  public async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const authToken = this.getAuthToken();
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    if (authToken) {
      headers.append("Authorization", authToken);
    }

    return this.request<T>(endpoint, {
      method: "GET",
      headers: headers,
    });
  }

  public async post<T, U>(endpoint: string, body: U): Promise<ApiResponse<T>> {
    const authToken = this.getAuthToken();
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    if (authToken) {
      headers.append("Authorization", authToken);
    }

    return this.request<T>(endpoint, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
  }
}

export default new ApiClient("http://localhost:8080");

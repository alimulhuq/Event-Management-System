// client/js/api.js

// Configurable base URL – change to production URL during deployment
const API_BASE = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Optional: you can also read from window.location in some setups
// const API_BASE = window.location.origin + '/api';

class ApiError extends Error {
    constructor(message, status, data = null) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}

async function apiRequest(endpoint, options = {}) {
    const token = localStorage.getItem('token');

    // Skip auth check for public routes (login, register, maybe some others)
    const isPublicRoute = endpoint.startsWith('/auth/') || endpoint === '/public/something';

    if (!token && !isPublicRoute) {
        // Instead of alert + redirect, throw → let caller decide what to do
        throw new ApiError('Authentication required', 401);
    }

    const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),  // ← standard JWT header
        ...options.headers,
    };

    const config = {
        ...options,
        headers,
        credentials: 'same-origin', // important if using cookies + JWT
    };

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

        const response = await fetch(API_BASE + endpoint, {
            ...config,
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        let data;
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        if (!response.ok) {
            // Handle common auth errors
            if (response.status === 401 || response.status === 403) {
                // Do NOT clear everything – only remove auth tokens
                localStorage.removeItem('token');
                localStorage.removeItem('user_name');
                localStorage.removeItem('user_id');

                // Let the app handle redirect (better UX)
                throw new ApiError(
                    data.message || 'Your session has expired. Please log in again.',
                    response.status,
                    data
                );
            }

            throw new ApiError(
                data.message || data.msg || 'Request failed',
                response.status,
                data
            );
        }

        return data;

    } catch (err) {
        if (err.name === 'AbortError') {
            throw new ApiError('Request timed out', 504);
        }

        if (err instanceof ApiError) {
            throw err;
        }

        // Network / CORS / parse errors
        console.error('[API]', endpoint, err);
        throw new ApiError(
            err.message || 'Network error – please check your connection',
            0,
            null
        );
    }
}

// Optional: helper for GET with query params
apiRequest.get = async (endpoint, params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url = query ? `${endpoint}?${query}` : endpoint;
    return apiRequest(url);
};

// Optional: helper for POST/PUT with JSON body
apiRequest.post = (endpoint, body) =>
    apiRequest(endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
    });

apiRequest.put = (endpoint, body) =>
    apiRequest(endpoint, {
        method: 'PUT',
        body: JSON.stringify(body),
    });

apiRequest.del = (endpoint) =>
    apiRequest(endpoint, { method: 'DELETE' });

// Export if using modules (optional)
export default apiRequest;
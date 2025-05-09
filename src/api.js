import fetch from 'node-fetch';

// Cache for access token
let accessTokenCache = {
    token: null,
    expiry: null
};

/**
 * Makes an authenticated request to the Airbyte API with retry logic
 * @param {string} url - The API endpoint URL
 * @param {Object} options - Fetch options
 * @returns {Promise<Response>} The API response
 */
async function makeAuthenticatedRequest(url, options) {
    const accessToken = await getAccessToken();
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        ...options.headers
    };

    let response;
    for (let i = 0; i < 2; i++) {
        response = await fetch(url, { ...options, headers });

        if (response.status === 401 || response.status === 403) {
            // Clear the cache and try one more time
            accessTokenCache = { token: null, expiry: null };
            continue;
        }

        return response;
    }
    
    throw new Error(`API request failed: ${response.json().message || response.statusText}`);
}

/**
 * Generates a new access token from the Airbyte API
 * @returns {Promise<string>} The access token
 */
export async function getAccessToken() {
    // Check if we have a valid cached token
    const now = Date.now();
    if (accessTokenCache.token && accessTokenCache.expiry && now < accessTokenCache.expiry) {
        return accessTokenCache.token;
    }

    try {
        const response = await fetch('https://api.airbyte.com/v1/applications/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                client_id: process.env.AIRBYTE_CLIENT_ID,
                client_secret: process.env.AIRBYTE_CLIENT_SECRET,
                "grant-type": "client_credentials"
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to get access token: ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        const accessToken = data.access_token;
        const expiresIn = data.expires_in || 600; // Default to 10 minutes if not provided

        // Cache the token with the actual expiry time
        accessTokenCache = {
            token: accessToken,
            expiry: now + (expiresIn * 1000) // Convert seconds to milliseconds
        };

        return accessToken;
    } catch (error) {
        console.error('Error getting access token:', error);
        throw error;
    }
}

/**
 * Creates a new workspace in the external service
 * @param {string} email - The email of the user creating the workspace
 * @returns {Promise<string>} The created workspace ID
 */
export async function createWorkspace(email) {
    try {
        const response = await makeAuthenticatedRequest('https://api.airbyte.com/v1/workspaces', {
            method: 'POST',
            body: JSON.stringify({
                name: `embedded-workspace_${email.replace(/[^a-zA-Z0-9]/g, '_')}`,
                organizationId: process.env.AIRBYTE_ORGANIZATION_ID
            })
        });

        const data = await response.json();
        return data.workspaceId;
    } catch (error) {
        console.error('Error creating workspace:', error);
        throw error;
    }
}

/**
 * Creates a new destination in the external service
 * @param {string} workspaceId - The ID of the workspace to create the destination in
 * @returns {Promise<string>} The created destination ID
 */
export async function createDestination(workspaceId) {
    try {
        const response = await makeAuthenticatedRequest('https://api.airbyte.com/v1/destinations', {
            method: 'POST',
            body: JSON.stringify({
                name: `destination_${Date.now()}`,
                workspaceId: workspaceId,
                definitionId: "4816b78f-1489-44c1-9060-4b19d5fa9362",
                configuration: {
                    s3_bucket_name: process.env.S3_BUCKET,
                    s3_bucket_region: process.env.S3_BUCKET_REGION,
                    s3_bucket_path: process.env.S3_BUCKET_PREFIX,
                    access_key_id: process.env.AWS_ACCESS_KEY,
                    secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
                    format: {
                        format_type: "JSONL"
                    }
                }
            })
        });

        const data = await response.json();
        return data.destinationId;
    } catch (error) {
        console.error('Error creating destination:', error);
        throw error;
    }
}

/**
 * Generates a widget token for the Airbyte API
 * @param {string} organizationId - The ID of the organization
 * @param {string} externalUserId - The ID of the external user
 * @param {string} allowedOrigin - The origin of the allowed request
 * @returns {Promise<string>} The widget token
 */
export async function generateWidgetToken(organizationId, externalUserId, allowedOrigin) {
    try {
        const response = await makeAuthenticatedRequest('https://api.airbyte.com/v1/embedded/widget_token', {
            method: 'POST',
            body: JSON.stringify({
                organizationId: organizationId,
                externalUserId: externalUserId,
                allowedOrigin: allowedOrigin,
            })
        });

        const data = await response.json();
        return data.token;
    } catch (error) {
        console.error('Error generating widget token:', error);
        throw error;
    }
}

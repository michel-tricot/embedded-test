#! /bin/bash

# Load .env file
source .env

# Get Access Token from Airbyte API
ACCESS_TOKEN=$(curl -sX POST \
  'https://api.airbyte.com/v1/applications/token' \
  -H 'Content-Type: application/json' \
  -d "{
    \"client_id\": \"${SONAR_AIRBYTE_CLIENT_ID}\",
    \"client_secret\": \"${SONAR_AIRBYTE_CLIENT_SECRET}\",
    \"grant-type\": \"client_credentials\"
  }" | jq -r '.access_token')

# Create connection template that will replicate data to S3
curl -X POST 'https://api.airbyte.com/v1/config_templates/connections' \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer ${ACCESS_TOKEN}" \
    -d "{
      \"destinationName\": \"S3\", 
      \"organizationId\": \"${SONAR_AIRBYTE_ORGANIZATION_ID}\",
      \"destinationActorDefinitionId\": \"4816b78f-1489-44c1-9060-4b19d5fa9362\",
      \"destinationConfiguration\": {
        \"access_key_id\": \"${SONAR_AWS_ACCESS_KEY}\",
        \"secret_access_key\": \"${SONAR_AWS_SECRET_ACCESS_KEY}\",
        \"s3_bucket_name\": \"${SONAR_S3_BUCKET}\",
        \"s3_bucket_path\": \"${SONAR_S3_BUCKET_PREFIX}\",
        \"s3_bucket_region\": \"${SONAR_S3_BUCKET_REGION}\",
        \"format\": {
            \"format_type\": \"CSV\",
            \"compression\": {
                \"compression_type\": \"No Compression\"
            },
        \"flattening\": \"No flattening\"
      }
    }
  }
}"

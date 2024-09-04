import os
import requests
from dotenv import load_dotenv

load_dotenv()

def send_for_signature(file_path, signer_email):
    api_token = os.getenv('SIGNREQUEST_API_TOKEN')
    url = "https://api.signrequest.com/v1/signrequests/quick-create/"
    
    headers = {
        'Authorization': f'Token {api_token}',
        'Content-Type': 'application/json'
    }
    
    data = {
        "signers": [{"email": signer_email}],
        "from_email": "your-email@example.com",
        "subject": "Please sign this document",
        "message": "Please sign the attached document.",
        "file_from_url": file_path
    }
    
    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()
        api_response = response.json()
        print(f"Document sent for signing. SignRequest ID: {api_response['uuid']}")
        return api_response['uuid']
    except requests.exceptions.RequestException as e:
        print(f"Exception when calling SignRequest API: {e}")
        return None

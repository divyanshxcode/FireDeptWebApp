import os
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from signrequest_client import SignRequestClient
from signrequest_client.apis import SignRequestQuickCreateApi
from signrequest_client.models import QuickCreate

from dotenv import load_dotenv

load_dotenv()

def generate_pdf(application_data, output_path):
    c = canvas.Canvas(output_path, pagesize=letter)
    width, height = letter

    # Add content to the PDF
    c.drawString(100, height - 100, f"Applicant Name: {application_data['applicantName']}")
    c.drawString(100, height - 120, f"Address: {application_data['address']}")
    c.drawString(100, height - 140, f"Contact Info: {application_data['contactInfo']}")
    c.drawString(100, height - 160, f"Status: {application_data['status']}")
    c.drawString(100, height - 180, f"Submission Date: {application_data['submissionDate']}")

    c.save()

def send_for_signature(file_path, signer_email):
    # Configure API key authorization
    configuration = SignRequestClient.Configuration()
    configuration.api_key['Authorization'] = os.getenv('SIGNREQUEST_API_TOKEN')    
    configuration.api_key_prefix['Authorization'] = 'Token'

    # Create an instance of the API class
    api_instance = SignRequestQuickCreateApi(SignRequestClient.ApiClient(configuration))

    # Create a document to sign
    quick_create = QuickCreate(
        signers=[{'email': signer_email}],
        from_email='your-email@example.com',
        subject='Please sign this document',
        message='Please sign the attached document.',
        file_from_url=file_path
    )

    try:
        # Send document for signing
        api_response = api_instance.quick_create(data=quick_create)
        print(f"Document sent for signing. SignRequest ID: {api_response.uuid}")
        return api_response.uuid
    except Exception as e:
        print(f"Exception when calling SignRequestQuickCreateApi->quick_create: {e}")
        return None

def main(application_data):
    pdf_path = 'application.pdf'
    generate_pdf(application_data, pdf_path)
    
    signer_email = application_data['contactInfo']  # Assuming contactInfo is the email
    signature_request_id = send_for_signature(pdf_path, signer_email)
    
    if signature_request_id:
        print(f"PDF generated and sent for signature. SignRequest ID: {signature_request_id}")
    else:
        print("Failed to send the document for signature.")

# Example usage
if __name__ == "__main__":
    sample_application = {
        'applicantName': 'John Doe',
        'address': '123 Main St, Anytown, USA',
        'contactInfo': 'john.doe@example.com',
        'status': 'Pending',
        'submissionDate': '2023-08-30'
    }
    main(sample_application)
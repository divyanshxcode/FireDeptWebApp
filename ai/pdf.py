import sqlite3
from fpdf import FPDF

# Create a connection to the SQLite database
conn = sqlite3.connect('database_name.db')  # Replace with your database name
cursor = conn.cursor()

# Fetch data from the database
cursor.execute("SELECT name, address, inspector_name FROM noc_details WHERE id=1")  # Replace with your query
data = cursor.fetchone()

name = data[0]
address = data[1]
inspector_name = data[2]

# Create a PDF class inheriting from FPDF
class PDF(FPDF):
    def header(self):
        # Organization details
        self.set_font('Arial', 'B', 12)
        self.cell(0, 10, 'Organization Name', 0, 1, 'R')
        self.set_font('Arial', '', 10)
        self.cell(0, 10, 'Street Address', 0, 1, 'R')
        self.cell(0, 10, 'City, Zip Code', 0, 1, 'R')
        self.cell(0, 10, 'Phone Number or Email', 0, 1, 'R')
        self.ln(20)

    def footer(self):
        # Signature area
        self.set_y(-30)
        self.set_font('Arial', '', 10)
        self.cell(0, 10, 'Signature:', 0, 1, 'L')
        self.cell(0, 10, 'Date:', 0, 1, 'L')

    def noc_body(self, name, address, inspector_name):
        # Title
        self.set_font('Arial', 'B', 16)
        self.cell(0, 10, 'No Objection Certificate', 0, 1, 'C')
        self.ln(10)

        # Body
        self.set_font('Arial', '', 12)
        self.multi_cell(0, 10, f"TO WHOM IT MAY CONCERN:\n\n"
                               f"This is to certify that {name}, resident of {address}, is the owner of "
                               f"the property located at the aforementioned address.\n\n"
                               f"Certified further is that {inspector_name}, interposes no objection to the "
                               f"mentioned property of the said applicant.\n\n"
                               f"ISSUED on this date as requested by {name} in support of their application for the required approvals.")

# Instantiate PDF
pdf = PDF()

# Add a page
pdf.add_page()

# Add content
pdf.noc_body(name, address, inspector_name)

# Save the PDF
pdf.output('noc_certificate.pdf')

# Close the database connection
conn.close()

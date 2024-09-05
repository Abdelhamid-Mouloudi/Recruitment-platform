# src/resume_ranker.py

import spacy
import PyPDF2
from sentence_transformers import SentenceTransformer, util
import re
import csv
import os

# Loading the SentenceTransformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Loading the spaCy model for NER
nlp = spacy.load("en_core_web_sm")

# Job description
job_description = "NLP Specialist: Develop and implement NLP algorithms. Proficiency in Python, NLP libraries, and ML frameworks required."

# Directory containing resumes
resume_dir = "data/resumes/"

# Output CSV file
csv_filename = "data/ranked_resumes.csv"

# Function to extract text from a PDF file
def extract_text_from_pdf(pdf_path):
    with open(pdf_path, "rb") as pdf_file:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        return text

# Function to extract emails and names using spaCy NER
def extract_entities(text):
    emails = re.findall(r'\S+@\S+', text)
    doc = nlp(text)
    names = [ent.text for ent in doc.ents if ent.label_ == "PERSON"]
    return emails, names

# Embed the job description
job_desc_embedding = model.encode(job_description, convert_to_tensor=True)

# Process each resume
ranked_resumes = []
for filename in os.listdir(resume_dir):
    if filename.endswith(".pdf"):
        resume_path = os.path.join(resume_dir, filename)
        resume_text = extract_text_from_pdf(resume_path)
        emails, names = extract_entities(resume_text)
        resume_embedding = model.encode(resume_text, convert_to_tensor=True)
        similarity = util.pytorch_cos_sim(job_desc_embedding, resume_embedding).item()
        ranked_resumes.append((names, emails, similarity))

# Sorting resumes by similarity score
ranked_resumes.sort(key=lambda x: x[2], reverse=True)

# Saving results to CSV
with open(csv_filename, "w", newline="") as csvfile:
    csv_writer = csv.writer(csvfile)
    csv_writer.writerow(["Rank", "Name", "Email", "Similarity"])
    for rank, (names, emails, similarity) in enumerate(ranked_resumes, start=1):
        name = names[0] if names else "N/A"
        email = emails[0] if emails else "N/A"
        csv_writer.writerow([rank, name, email, similarity])

# Printing ranked resumes
for rank, (names, emails, similarity) in enumerate(ranked_resumes, start=1):
    print(f"Rank {rank}: Names: {names}, Emails: {emails}, Similarity: {similarity:.2f}")
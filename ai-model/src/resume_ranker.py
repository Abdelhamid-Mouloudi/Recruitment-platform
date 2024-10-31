import sys
import spacy
import PyPDF2
from sentence_transformers import SentenceTransformer, util
import re
import warnings

warnings.filterwarnings("ignore", category=FutureWarning)

# Charger le modèle SentenceTransformer et spaCy
model = SentenceTransformer('all-MiniLM-L6-v2')
nlp = spacy.load("en_core_web_sm")

# Récupérer les arguments (chemin du CV et description de l'offre)
cv_path = sys.argv[1]
job_description = sys.argv[2]

# Fonction pour extraire le texte d'un fichier PDF
def extract_text_from_pdf(pdf_path):
    with open(pdf_path, "rb") as pdf_file:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        return text

# Fonction pour extraire les entités nommées (noms, emails) à l'aide de spaCy
def extract_entities(text):
    emails = re.findall(r'\S+@\S+', text)
    doc = nlp(text)
    names = [ent.text for ent in doc.ents if ent.label_ == "PERSON"]
    return emails, names

# Extraire le texte du CV
resume_text = extract_text_from_pdf(cv_path)

# Embedding du CV et de la description du job
job_desc_embedding = model.encode(job_description, convert_to_tensor=True)
resume_embedding = model.encode(resume_text, convert_to_tensor=True)

# Calculer la similarité entre la description de l'offre et le CV
similarity = util.pytorch_cos_sim(job_desc_embedding, resume_embedding).item()

# Extraire les noms et emails du texte du CV
emails, names = extract_entities(resume_text)

# Forcer l'encodage de sortie en UTF-8
sys.stdout.reconfigure(encoding='utf-8')

# Afficher les résultats
name = names[0] if names else "N/A"
email = emails[0] if emails else "N/A"
print(f"Similarité : {similarity:.2f}")
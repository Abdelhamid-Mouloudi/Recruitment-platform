 # AI Model for Resume Matching

## Overview

This directory contains a machine learning model for matching resumes to job descriptions. The model uses natural language processing (NLP) techniques to evaluate how well a resume fits a given job description.

## Features

- **Resume Parsing**: Extracts text from PDF resumes.
- **Entity Extraction**: Identifies and extracts names and emails from resumes.
- **Similarity Scoring**: Computes similarity scores between job descriptions and resumes using Sentence Transformers.

## Directory Structure

ai-model/ 
├── data/
 │ ├── resumes/ # Directory to store resume PDFs
  │ └── ranked_resumes.csv # Output CSV file for ranked resumes

├── src/
 │ └── resume_ranker.py # Python script for resume ranking
 
└── requirements.txt # Dependencies for the project


## Installation

1. Clone the repository:

   git clone https://github.com/Abdelhamid-Mouloudi/Recruitment-platform.git
Navigate to the ai-model directory:


cd Recruitment-platform/ai-model
2. Install the required Python packages:

pip install -r requirements.txt
Usage
Place your resume PDFs in the data/resumes/ directory.

Update the job_description variable in src/resume_ranker.py with the job description you want to match.

Run the script:


python src/resume_ranker.py
Check the data/ranked_resumes.csv file for the ranked results.

## Dependencies
The project requires the following Python packages:

spacy
PyPDF2
sentence-transformers
re
csv
os
You can install these dependencies using:


pip install spacy PyPDF2 sentence-transformers
python -m spacy download en_core_web_sm
License
This project is licensed under the MIT License - see the LICENSE file for details.

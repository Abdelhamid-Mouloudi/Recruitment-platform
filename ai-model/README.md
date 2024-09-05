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
│   ├── resumes/             # Directory to store resume PDFs  
│   └── ranked_resumes.csv   # Output CSV file for ranked resumes  
├── src/  
│   └── resume_ranker.py     # Python script for resume ranking  
└── requirements.txt         # Dependencies for the project




## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Abdelhamid-Mouloudi/Recruitment-platform.git
    ```

2. Navigate to the `ai-model` directory:

    ```bash
    cd Recruitment-platform/ai-model
    ```

3. Install the required Python packages:

    ```bash
    pip install -r requirements.txt
    ```

## Usage

1. Place your resume PDFs in the `data/resumes/` directory.

2. Update the `job_description` variable in `src/resume_ranker.py` with the job description you want to match.

3. Run the script:

    ```bash
    python src/resume_ranker.py
    ```

4. Check the `data/ranked_resumes.csv` file for the ranked results.

## Dependencies

The project requires the following Python packages:

- `spacy`  
- `PyPDF2`  
- `sentence-transformers`  

To install these dependencies, run:

```bash
pip install spacy PyPDF2 sentence-transformers

python -m spacy download en_core_web_sm
License
This project is licensed under the MIT License - see the LICENSE file for details.

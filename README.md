# Talent Aligner

Talent Aligner is an innovative platform for talent management and alignment. It allows employers to post job offers, receive applications, and use AI-based tools to evaluate talent. Candidates can apply for job offers and share their profiles with potential employers.

## Key Features

- **Job Management**: Employers can create, edit, and publish job offers.
- **Applications**: Candidates can apply directly to job offers with their CVs and cover letters.
- **AI Evaluation**: An AI-based system evaluates applications based on various criteria.
- **Secure Authentication**: Robust user authentication system.

## Project Structure

The project is organized into three main directories:

1. **Frontend**: The source code for the front end, developed using Angular.
2. **Backend**: The API and business logic, developed using Spring Boot.
3. **Screenshots**: A collection of screenshots illustrating various interfaces of the platform.

## Screenshots

The `Screenshots` directory contains a few sample screenshots that showcase key features of the project, such as job management, received applications, and other main functionalities. To explore all features and interact with the platform, you need to run the project locally (see the section below).

## Running the Project

### Prerequisites

- **Node.js** and **npm** for the frontend.
- **Java** and **Maven** for the backend.
- A **PostgreSQL** database configured to store the project data.

### Steps to Run the Project

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/talent-aligner.git
   cd talent-aligner
   ```

2. **Set Up the Backend**:
   - Navigate to the `backend` directory.
   - Configure the `application.properties` file with your database information.
   - Build and run the backend:
     ```bash
     mvn spring-boot:run
     ```

3. **Set Up the Frontend**:
   - Navigate to the `frontend` directory.
   - Install dependencies and start the Angular development server:
     ```bash
     npm install
     npm start
     ```

4. **Access the Application**:
   Open your browser and go to [http://localhost:4200](http://localhost:4200).

## Contribution

Contributions are welcome! If you want to contribute, please submit a pull request or open an issue.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

package com.recruitmentapp.controllers;


import com.recruitmentapp.entities.CandidateApplication;
import com.recruitmentapp.entities.Employer;
import com.recruitmentapp.entities.Offer;
import com.recruitmentapp.entities.User;
import com.recruitmentapp.repositories.ApplicationRepository;
import com.recruitmentapp.repositories.EmployerRepository;
import com.recruitmentapp.repositories.OfferRepository;
import com.recruitmentapp.repositories.UserRepository;
import com.recruitmentapp.services.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private OfferRepository offerRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmployerRepository employerRepository;
    @Autowired
    private FileStorageService fileStorageService;


    @PostMapping("/apply/{offerId}")
    public ResponseEntity<CandidateApplication> applyForOffer(
            @PathVariable Long offerId,
            @RequestParam("file") MultipartFile file,  // Réception du fichier
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("age") int age,
            @RequestParam("motivationLetter") String motivationLetter,
            Authentication authentication) {

        String email = authentication.getName();
        User user = userRepository.findFirstByEmail(email);
        Offer offer = offerRepository.findById(offerId).orElse(null);

        if (user != null && offer != null) {
            // Créer une nouvelle candidature
            CandidateApplication application = new CandidateApplication();
            application.setUser(user);
            application.setOffer(offer);
            application.setFirstName(firstName);
            application.setLastName(lastName);
            application.setAge(age);
            application.setMotivationLetter(motivationLetter);

            // Stocker le fichier et récupérer le chemin
            String filePath = fileStorageService.storeFile(file);
            application.setCvPath(filePath);  // Stocker le chemin du fichier

            // Appeler le modèle AI pour analyser le fichier PDF en utilisant la description de l'offre
            String result = callAIModel(filePath, offer.getDescription());  // Passer le chemin du CV et la description de l'offre
            System.out.println("Résultat AI : " + result);

            // Limiter la taille du résultat AI à 255 caractères avant de l'insérer dans la base de données
            if (result.length() > 255) {
                result = result.substring(0, 255);  // Limiter la taille à 255 caractères
            }

            // Sauvegarder le résultat AI dans la colonne `ai_rank`
            application.setAiRank(result);  // Stocker le résultat AI

            // Sauvegarder la candidature
            applicationRepository.save(application);
            return ResponseEntity.ok(application);
        }

        return ResponseEntity.badRequest().build();
    }




    private String callAIModel(String filePath, String jobDescription) {
        try {
            // Chemin absolu du script Python
            String scriptPath = "C:/Users/HP/Downloads/Spring_Secuirty-Angular_Authentication-CodeElevate-main/Spring_Secuirty-Angular_Authentication-CodeElevate-main/ai-model/src/resume_ranker.py";

            // Créer le ProcessBuilder pour exécuter le script Python avec le chemin du CV et la description de l'offre
            ProcessBuilder processBuilder = new ProcessBuilder("python", scriptPath, filePath, jobDescription);
            processBuilder.redirectErrorStream(true);

            // Démarrer le processus
            Process process = processBuilder.start();

            // Lire la sortie du script Python
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            String result = null;
            while ((line = reader.readLine()) != null) {
                // Extraire uniquement la ligne contenant la similarité
                if (line.startsWith("Similarité :")) {
                    result = line;
                    break;
                }
            }

            process.waitFor();

            // Retourner le résultat (score de similarité uniquement)
            return result != null ? result : "Erreur lors de l'analyse";
        } catch (Exception e) {
            e.printStackTrace();
            return "Erreur lors de l'exécution du modèle AI";
        }
    }





    // Nouvelle méthode pour récupérer le fichier PDF
    @GetMapping(value = "/cv/{applicationId}", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> getCvFile(@PathVariable Long applicationId) throws IOException {
        // Récupérer la candidature correspondant à l'ID donné
        CandidateApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new IllegalArgumentException("Application not found with id: " + applicationId));

        // Obtenir le chemin du fichier associé à la candidature
        String filePath = application.getCvPath();

        // Lire le fichier à partir de son chemin et le retourner sous forme de tableau de bytes
        byte[] fileContent = fileStorageService.getFileContent(filePath);

        // Retourner le fichier PDF sous forme de réponse HTTP
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .body(fileContent);
    }



    // Récupérer les candidatures d'un utilisateur
    @GetMapping("/user")
    public List<CandidateApplication> getUserApplications(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findFirstByEmail(email);
        if (user != null) {
            return applicationRepository.findByUser(user);
        }
        return List.of();
    }
    // Récupérer les candidatures pour les offres d'un employeur connecté


    // Récupérer les candidatures pour les offres d'un employeur connecté
    @GetMapping("/employer-applications")
    public ResponseEntity<List<CandidateApplication>> getEmployerApplications(Authentication authentication) {
        String email = authentication.getName(); // Récupérer l'email de l'employeur connecté
        Employer employer = employerRepository.findFirstByContactEmail(email); // Trouver l'employeur par email

        if (employer != null) {
            // Trouver toutes les offres de cet employeur
            List<Offer> employerOffers = offerRepository.findByEmployer(employer);

            // Récupérer les candidatures pour ces offres
            List<CandidateApplication> applications = applicationRepository.findByOfferIn(employerOffers);

            // Afficher le résultat AI avec chaque candidature
            for (CandidateApplication application : applications) {
                String result = callAIModel(application.getCvPath(), application.getOffer().getDescription());
                System.out.println("Résultat AI pour " + application.getFirstName() + " " + application.getLastName() + " : " + result);
            }

            return ResponseEntity.ok(applications); // Retourner les candidatures
        }
        return ResponseEntity.badRequest().build();
    }

}

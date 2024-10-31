package com.recruitmentapp.controllers;

import com.recruitmentapp.entities.JobOffer;
import com.recruitmentapp.entities.Employer;
import com.recruitmentapp.repositories.JobOfferRepository;
import com.recruitmentapp.repositories.EmployerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.recruitmentapp.exceptions.ResourceNotFoundException;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/job-offers")
public class JobOfferController {

    @Autowired
    private JobOfferRepository jobOfferRepository;

    @Autowired
    private EmployerRepository employerRepository;

    // Récupérer toutes les offres d'emploi
    @GetMapping("/all")
    public List<JobOffer> getAllJobOffers() {
        return jobOfferRepository.findAll();
    }

    @PostMapping("/add")
    public ResponseEntity<JobOffer> addJobOffer(@RequestBody JobOffer jobOffer, Authentication authentication) {
        String email = authentication.getName();  // Récupérer l'employeur connecté
        Employer employer = employerRepository.findFirstByContactEmail(email);
        if (employer != null) {
            jobOffer.setEmployer(employer);  // Associer l'employeur à l'offre
            jobOffer.setPostedDate(new Date()); // Ajoutez la date de publication ici
            jobOfferRepository.save(jobOffer);
            return ResponseEntity.ok(jobOffer);
        }
        return ResponseEntity.badRequest().build();
    }


    // Récupérer les JobOffers spécifiques à l'employeur connecté
    @GetMapping("/employer")
    public List<JobOffer> getEmployerJobOffers(Authentication authentication) {
        String email = authentication.getName();
        Employer employer = employerRepository.findFirstByContactEmail(email);
        if (employer != null) {
            return jobOfferRepository.findByEmployer(employer);
        }
        return List.of();
    }
    // Mettre à jour une JobOffer existante
    @PutMapping("/update/{offerId}")
    public ResponseEntity<JobOffer> updateJobOffer(@PathVariable Long offerId, @RequestBody JobOffer jobOfferDetails) {
        JobOffer jobOffer = jobOfferRepository.findById(offerId).orElseThrow(() -> new ResourceNotFoundException("Job offer not found"));

        // Mise à jour des champs de l'offre
        jobOffer.setTitle(jobOfferDetails.getTitle());
        jobOffer.setDescription(jobOfferDetails.getDescription());
        jobOffer.setContractType(jobOfferDetails.getContractType());

        final JobOffer updatedJobOffer = jobOfferRepository.save(jobOffer);
        return ResponseEntity.ok(updatedJobOffer);
    }

}

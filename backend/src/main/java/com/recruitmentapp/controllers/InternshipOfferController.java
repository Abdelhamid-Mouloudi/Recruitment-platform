package com.recruitmentapp.controllers;

import com.recruitmentapp.entities.InternshipOffer;
import com.recruitmentapp.entities.Employer;
import com.recruitmentapp.repositories.InternshipOfferRepository;
import com.recruitmentapp.repositories.EmployerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.recruitmentapp.exceptions.ResourceNotFoundException;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/internship-offers")
public class InternshipOfferController {

    @Autowired
    private InternshipOfferRepository internshipOfferRepository;

    @Autowired
    private EmployerRepository employerRepository;

    // Récupérer toutes les offres de stage
    @GetMapping("/all")
    public List<InternshipOffer> getAllInternshipOffers() {
        return internshipOfferRepository.findAll();
    }

    @PostMapping("/add")
    public ResponseEntity<InternshipOffer> addInternshipOffer(@RequestBody InternshipOffer internshipOffer, Authentication authentication) {
        String email = authentication.getName();  // Récupérer l'employeur connecté
        Employer employer = employerRepository.findFirstByContactEmail(email);
        if (employer != null) {
            internshipOffer.setEmployer(employer);  // Associer l'employeur à l'offre
            internshipOffer.setPostedDate(new Date()); // Ajoutez la date de publication ici
            internshipOfferRepository.save(internshipOffer);
            return ResponseEntity.ok(internshipOffer);
        }
        return ResponseEntity.badRequest().build();
    }


    // Récupérer les InternshipOffers spécifiques à l'employeur connecté
    @GetMapping("/employer")
    public List<InternshipOffer> getEmployerInternshipOffers(Authentication authentication) {
        String email = authentication.getName();
        Employer employer = employerRepository.findFirstByContactEmail(email);
        if (employer != null) {
            return internshipOfferRepository.findByEmployer(employer);
        }
        return List.of();
    }
    // Mettre à jour une InternshipOffer existante
    @PutMapping("/update/{offerId}")
    public ResponseEntity<InternshipOffer> updateInternshipOffer(@PathVariable Long offerId, @RequestBody InternshipOffer internshipOfferDetails) {
        InternshipOffer internshipOffer = internshipOfferRepository.findById(offerId).orElseThrow(() -> new ResourceNotFoundException("Internship offer not found"));

        // Mise à jour des champs de l'offre
        internshipOffer.setTitle(internshipOfferDetails.getTitle());
        internshipOffer.setDescription(internshipOfferDetails.getDescription());
        internshipOffer.setDurationInMonths(internshipOfferDetails.getDurationInMonths());

        final InternshipOffer updatedInternshipOffer = internshipOfferRepository.save(internshipOffer);
        return ResponseEntity.ok(updatedInternshipOffer);
    }

}

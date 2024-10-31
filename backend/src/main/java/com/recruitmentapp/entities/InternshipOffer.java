package com.recruitmentapp.entities;

import jakarta.persistence.Entity;
import lombok.Data;

@Entity
@Data
public class InternshipOffer extends Offer {
    private int durationInMonths;  // Ajoutez des attributs spécifiques à InternshipOffer
}

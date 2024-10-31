package com.recruitmentapp.entities;

import jakarta.persistence.Entity;
import lombok.Data;

@Entity
@Data
public class JobOffer extends Offer {
    private String contractType;  // Ajoutez des attributs spécifiques à JobOffer
}

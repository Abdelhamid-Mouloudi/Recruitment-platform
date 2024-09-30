package com.recruitmentapp.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


@Entity

public class JobOffer extends Offer {
    private String contractType;  // Ajoutez des attributs spécifiques à JobOffer

	public String getContractType() {
		return contractType;
	}

	public void setContractType(String contractType) {
		this.contractType = contractType;
	}

	
}

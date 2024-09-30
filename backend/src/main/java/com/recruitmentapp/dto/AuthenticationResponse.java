package com.recruitmentapp.dto;

public class AuthenticationResponse {

    private final String jwt;
    private final String role;  // Nouveau champ

    public AuthenticationResponse(String jwt, String role) {
        this.jwt = jwt;
        this.role = role;  // Initialisation du rôle
    }

    public String getJwt() {
        return jwt;
    }

    public String getRole() {
        return role;  // Getter pour le rôle
    }
}

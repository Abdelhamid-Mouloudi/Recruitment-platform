package com.recruitmentapp.controllers;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.recruitmentapp.dto.AuthenticationDTO;
import com.recruitmentapp.dto.AuthenticationResponse;
import com.recruitmentapp.entities.Employer;
import com.recruitmentapp.entities.User;
import com.recruitmentapp.repositories.EmployerRepository;
import com.recruitmentapp.repositories.UserRepository;
import com.recruitmentapp.services.jwt.UserDetailsServiceImpl;
import com.recruitmentapp.util.JwtUtil;

import java.io.IOException;

@RestController
public class AuthenticationController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployerRepository employerRepository;

    @PostMapping("/authenticate")
    public AuthenticationResponse createAuthenticationToken(@RequestBody AuthenticationDTO authenticationDTO, HttpServletResponse response) throws BadCredentialsException, DisabledException, UsernameNotFoundException, IOException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationDTO.getEmail(), authenticationDTO.getPassword()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Incorrect username or password!");
        } catch (DisabledException disabledException) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "User is not activated");
            return null;
        }

        // Récupérer les détails de l'utilisateur à partir de l'email
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationDTO.getEmail());

        String role;

        // Vérifier si l'email appartient à un User
        User user = userRepository.findFirstByEmail(authenticationDTO.getEmail());
        if (user != null) {
            role = "USER"; // Si c'est un utilisateur
        } else {
            // Vérifier si l'email appartient à un Employer
            Employer employer = employerRepository.findFirstByContactEmail(authenticationDTO.getEmail());
            if (employer != null) {
                role = "EMPLOYER"; // Si c'est un employeur
            } else {
                throw new UsernameNotFoundException("No user or employer found with this email");
            }
        }

        // Générer le token JWT avec le rôle inclus
        final String jwt = jwtUtil.generateToken(userDetails.getUsername(), role);

        // Retourner le token et le rôle
        return new AuthenticationResponse(jwt, role);
    }

}


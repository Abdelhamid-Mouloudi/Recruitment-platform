package com.recruitmentapp.services.jwt;

import com.recruitmentapp.entities.Employer;
import com.recruitmentapp.entities.User;
import com.recruitmentapp.repositories.EmployerRepository;
import com.recruitmentapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployerRepository employerRepository;  // Ajouter si nécessaire

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        // Vérification si c'est un utilisateur
        User user = userRepository.findFirstByEmail(email);
        if (user != null) {
            return new org.springframework.security.core.userdetails.User(
                    user.getEmail(),
                    user.getPassword(),
                    getAuthorities("USER")  // Retourner le rôle USER
            );
        }

        // Vérification si c'est un employeur
        Employer employer = employerRepository.findFirstByContactEmail(email);
        if (employer != null) {
            return new org.springframework.security.core.userdetails.User(
                    employer.getContactEmail(),
                    employer.getPassword(),
                    getAuthorities("EMPLOYER")  // Retourner le rôle EMPLOYER
            );
        }

        throw new UsernameNotFoundException("No user or employer found with this email");
    }

    // Méthode pour obtenir les autorités (rôles)
    private Collection<? extends GrantedAuthority> getAuthorities(String role) {
        return List.of(new SimpleGrantedAuthority(role));
    }
}

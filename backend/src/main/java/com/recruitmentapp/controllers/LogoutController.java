package com.recruitmentapp.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class LogoutController {

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        // Si vous utilisez des sessions (ce qui n'est pas le cas pour JWT)
        // request.getSession().invalidate();
        return new ResponseEntity<>("Logged out successfully", HttpStatus.OK);
    }
}

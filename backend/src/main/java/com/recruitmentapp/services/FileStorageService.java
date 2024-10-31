package com.recruitmentapp.services;


import com.recruitmentapp.exceptions.FileStorageException;
import com.recruitmentapp.exceptions.MyFileNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageService {

    private final Path fileStorageLocation;

    @Autowired
    public FileStorageService() throws Exception {
        this.fileStorageLocation = Paths.get("uploads").toAbsolutePath().normalize();
        Files.createDirectories(this.fileStorageLocation);  // Crée le répertoire s'il n'existe pas
    }

    public String storeFile(MultipartFile file) {
        // On récupère le nom du fichier
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            // On vérifie que le nom du fichier est valide
            if(fileName.contains("..")) {
                throw new FileStorageException("Nom de fichier invalide : " + fileName);
            }
            // On copie le fichier dans le répertoire de destination (uploads/)
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return targetLocation.toString();
        } catch (IOException ex) {
            throw new FileStorageException("Impossible de stocker le fichier " + fileName + ". Réessayez!", ex);
        }
    }

    public byte[] getFileContent(String filePath) throws IOException {
        // Lire le fichier à partir de son chemin et le retourner sous forme de tableau de bytes
        Path path = Paths.get(filePath);
        return Files.readAllBytes(path);
    }

    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {
                throw new MyFileNotFoundException("Fichier non trouvé " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new MyFileNotFoundException("Fichier non trouvé " + fileName, ex);
        }
    }
}

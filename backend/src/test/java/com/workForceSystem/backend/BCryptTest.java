package com.workForceSystem.backend;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
public class BCryptTest {
    public static void main(String[] args) {
        /*
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        // 1. SIROVA LOZINKA KOJU KORISNIK UNOSI
        String rawPassword = "goldstar21";

        // 2. HASH KOJI JE TRENUTNO U TVOJOJ BAZI PODATAKA
        String hashFromDatabase = "$2a$10$cRu3E3OvhreVmVmQTaaMPuJrbi/oGYMEDEsxEX6E2BYtW.uOHnjyG";

        // Provjera da li se sirova lozinka podudara s hashom iz baze
        boolean matches = encoder.matches(rawPassword, hashFromDatabase);

        System.out.println("Sirova lozinka: " + rawPassword);
        System.out.println("Hash u bazi:    " + hashFromDatabase);
        System.out.println("Rezultat podudaranja (MATCHES): " + matches);

        // Opcionalno: Generiranje novog hasha za unos u bazu
        // System.out.println("Novi Hash za GoldStar21: " + encoder.encode(rawPassword));

         */

        // 1. OVDJE UNESI SIROVU LOZINKU koju ćeš koristiti za login
        String rawPassword = "Goldstar21";

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String hashedPassword = encoder.encode(rawPassword);

        System.out.println("----------------------------------------");
        System.out.println("Sirova lozinka za login: " + rawPassword);
        System.out.println("----------------------------------------");
        System.out.println("HASH ZA BAZU (KOPIRAJ OVO): " + hashedPassword);
        System.out.println("----------------------------------------");
    }
}

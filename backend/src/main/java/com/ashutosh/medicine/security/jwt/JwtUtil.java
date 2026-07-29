package com.ashutosh.medicine.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET =
            "MediFindSuperSecretKey2026ChangeThisInProduction";

    private static final long EXPIRATION =
            1000L * 60 * 60 * 24;

    // ==========================
    // Generate JWT
    // ==========================
    public String generateToken(String username) {

        return Jwts.builder()

                .setSubject(username)

                .setIssuedAt(new Date())

                .setExpiration(
                        new Date(System.currentTimeMillis() + EXPIRATION)
                )

                .signWith(
                        SignatureAlgorithm.HS256,
                        SECRET
                )

                .compact();

    }

    // ==========================
    // Extract Username
    // ==========================
    public String extractUsername(String token) {

        return extractClaims(token).getSubject();

    }

    // ==========================
    // Validate Token
    // ==========================
    public boolean validateToken(String token) {

        try {

            extractClaims(token);

            return true;

        }

        catch (Exception e) {

            return false;

        }

    }

    // ==========================
    // Extract Claims
    // ==========================
    private Claims extractClaims(String token) {

        return Jwts.parser()

                .setSigningKey(SECRET)

                .parseClaimsJws(token)

                .getBody();

    }

}
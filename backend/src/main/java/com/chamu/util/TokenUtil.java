package com.chamu.util;

import com.chamu.entity.User;

import java.util.Base64;

public class TokenUtil {

    private static final String SECRET = "chamu-secret";

    public static String generateToken(User user) {

        long expiry = System.currentTimeMillis() + (24 * 60 * 60 * 1000);

        String data =
                user.getId() + ":" +
                        user.getEmail() + ":" +
                        expiry + ":" +
                        SECRET;

        return Base64.getEncoder()
                .encodeToString(data.getBytes());
    }

    public static User validateToken(String token) {

        try {
            String decoded = new String(
                    Base64.getDecoder().decode(token)
            );

            String[] parts = decoded.split(":");

            if (parts.length != 4) return null;

            long expiry = Long.parseLong(parts[2]);
            String secret = parts[3];

            if (!SECRET.equals(secret)) return null;
            if (System.currentTimeMillis() > expiry) return null;

            User user = new User();
            user.setId(Integer.parseInt(parts[0]));
            user.setEmail(parts[1]);

            return user;

        } catch (Exception e) {
            return null;
        }
    }
}

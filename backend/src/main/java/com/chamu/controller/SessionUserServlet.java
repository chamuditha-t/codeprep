package com.chamu.controller;

import com.chamu.entity.User;
import com.chamu.util.TokenUtil;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/sessionUser")
public class SessionUserServlet extends HttpServlet {

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        resp.setHeader("Access-Control-Allow-Credentials", "true");
        resp.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {

        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        Gson gson = new Gson();
        JsonObject responseObject = new JsonObject();

        // 🔹 1. Read Authorization header
        String authHeader = req.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            responseObject.addProperty("status", false);
            responseObject.addProperty("message", "User not logged in");
            resp.getWriter().write(gson.toJson(responseObject));
            return;
        }

        // 🔹 2. Extract token
        String token = authHeader.replace("Bearer ", "");

        // 🔹 3. Validate token (THIS REPLACES getSession)
        User user = TokenUtil   .validateToken(token);

        if (user == null) {
            responseObject.addProperty("status", false);
            responseObject.addProperty("message", "Invalid or expired token");
        } else {
            responseObject.addProperty("status", true);
            responseObject.addProperty("email", user.getEmail());
            responseObject.addProperty("name", user.getName());
            System.out.println("User from token: " + user.getEmail());
        }

        resp.getWriter().write(gson.toJson(responseObject));
    }

}
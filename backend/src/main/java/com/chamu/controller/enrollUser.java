package com.chamu.controller;

import com.chamu.entity.*;
import com.chamu.util.HibernateUtil;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@WebServlet("/enrollUser")
public class enrollUser extends HttpServlet {
    private UserEnrollment userEnrollment;

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        resp.setHeader("Access-Control-Allow-Credentials", "true");
        resp.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        resp.setHeader("Access-Control-Allow-Credentials", "true");
        resp.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        Gson gson = new Gson();
        JsonObject userJson = gson.fromJson(req.getReader(), JsonObject.class);
        JsonObject responseObject = new JsonObject();

        String email = userJson.get("email").getAsString();
        int phaseId = userJson.get("phaseId").getAsInt();
        String language = userJson.get("language").getAsString();

        System.out.println("phaseId: " + phaseId);
        System.out.println("language: " + language);
        System.out.println("email: " + email);

        // Basic input validation
        if (email.isEmpty() || phaseId != 1 || language.isEmpty()) {
            responseObject.addProperty("status", "false");
            responseObject.addProperty("message", "Invalid email, phase id, or language");
            resp.getWriter().write(gson.toJson(responseObject));
            return;
        }

        Session session = null;
        try {
            session = HibernateUtil.getSessionFactory().openSession();

            // Fetch user
            User user1 = (User) session.createCriteria(User.class)
                    .add(Restrictions.eq("email", email))
                    .uniqueResult();

            if (user1 == null) {
                responseObject.addProperty("status", "false");
                responseObject.addProperty("message", "User not found");
                System.out.println("User not found");
                resp.getWriter().write(gson.toJson(responseObject));
                return;
            }

            PhaseOrder phaseOrder = (PhaseOrder) session.get(PhaseOrder.class, phaseId);

            if (phaseOrder == null) {
                responseObject.addProperty("status", "false");
                responseObject.addProperty("message", "Phase not found");
                System.out.println("Phase not found");
                resp.getWriter().write(gson.toJson(responseObject));
                return;
            }

            // Fetch language
            Language language1 = (Language) session.createCriteria(Language.class)
                    .add(Restrictions.eq("language", language))
                    .uniqueResult();

            if (language1 == null) {
                responseObject.addProperty("status", "false");
                responseObject.addProperty("message", "Language not found");
                System.out.println("Language not found");
                resp.getWriter().write(gson.toJson(responseObject));
                return;
            }

            // Fetch status
            Status status = (Status) session.createCriteria(Status.class)
                    .add(Restrictions.eq("status", "Enrolled"))
                    .uniqueResult();

            if (status == null) {
                responseObject.addProperty("status", "false");
                responseObject.addProperty("message", "Status not found");
                System.out.println("Status not found");
                resp.getWriter().write(gson.toJson(responseObject));
                return;
            }

            // Prepare UserEnrollment
            UserEnrollment userEnrollment = new UserEnrollment();
            userEnrollment.setUser(user1);
            userEnrollment.setPhase(phaseOrder);
            userEnrollment.setLanguage(language1);
            userEnrollment.setStatus(status);
            userEnrollment.setDate(Date.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant()));

            // Save enrollment inside a transaction
            session.beginTransaction();
            session.save(userEnrollment);
            session.getTransaction().commit();

            responseObject.addProperty("status", "true");
            responseObject.addProperty("message", "UserEnrollment saved successfully");
            System.out.println("UserEnrollment saved successfully");

        } catch (Exception e) {
            e.printStackTrace();
            if (session != null && session.getTransaction().isActive()) {
                session.getTransaction().rollback();
            }
            responseObject.addProperty("status", "false");
            responseObject.addProperty("message", "Error occurred: " + e.getMessage());
        } finally {
            if (session != null) session.close();
        }

        resp.getWriter().write(gson.toJson(responseObject));
    }

}

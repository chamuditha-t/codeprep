package com.chamu.controller;

import com.chamu.entity.Problem;
import com.chamu.entity.Status;
import com.chamu.entity.User;
import com.chamu.entity.UserProgress;
import com.chamu.util.HibernateUtil;
import com.chamu.util.TokenUtil;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

@WebServlet("/submitProblem")
public class SubmitProblem extends HttpServlet {

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        resp.setHeader("Access-Control-Allow-Credentials", "true");
        resp.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        System.out.println("==== SubmitProblemServlet START ====");

        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        resp.setHeader("Access-Control-Allow-Credentials", "true");
        resp.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        Gson gson = new Gson();
        JsonObject responseObject = new JsonObject();

        // =========================
        // 1️⃣ Validate token
        // =========================
        String authHeader = req.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            responseObject.addProperty("status", false);
            responseObject.addProperty("message", "Unauthorized");
            resp.getWriter().write(gson.toJson(responseObject));
            return;
        }

        String token = authHeader.replace("Bearer ", "");
        User tokenUser = TokenUtil.validateToken(token);

        if (tokenUser == null) {
            responseObject.addProperty("status", false);
            responseObject.addProperty("message", "Invalid token");
            resp.getWriter().write(gson.toJson(responseObject));
            return;
        }

        // =========================
        // 2️⃣ Read request body
        // =========================
        JsonObject data = gson.fromJson(req.getReader(), JsonObject.class);
        int problemId = data.get("problemId").getAsInt();

        if (problemId <= 0) {
            responseObject.addProperty("status", false);
            responseObject.addProperty("message", "Invalid problem id");
            resp.getWriter().write(gson.toJson(responseObject));
            return;
        }

        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = null;

        try {
            tx = session.beginTransaction();
            User selectedUser = (User) session.createCriteria(User.class)
                    .add(Restrictions.eq("email", tokenUser.getEmail()))
                    .uniqueResult();

            Problem selectedProblem = (Problem) session.createCriteria(Problem.class)
                    .add(Restrictions.eq("id", problemId))
                    .uniqueResult();

            if (selectedProblem == null) {
                responseObject.addProperty("status", false);
                responseObject.addProperty("message", "Problem not found");
                resp.getWriter().write(gson.toJson(responseObject));
                return;
            }
            Status completedStatus = (Status) session.createCriteria(Status.class)
                    .add(Restrictions.eq("status", "Completed"))
                    .uniqueResult();

            UserProgress userProgress = new UserProgress();
            userProgress.setUser(selectedUser);
            userProgress.setProblem(selectedProblem);
            userProgress.setStatus(completedStatus);
            userProgress.setDate(new Date());

            session.save(userProgress);
            tx.commit();

            responseObject.addProperty("status", true);
            responseObject.addProperty("message", "Problem marked as completed");

        } catch (Exception e) {
            if (tx != null) tx.rollback();
            e.printStackTrace();

            responseObject.addProperty("status", false);
            responseObject.addProperty("message", "Server error");

        } finally {
            session.close();
            System.out.println("==== SubmitProblemServlet END ====");
        }

        resp.getWriter().write(gson.toJson(responseObject));
    }

}

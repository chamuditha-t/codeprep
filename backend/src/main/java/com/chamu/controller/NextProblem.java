package com.chamu.controller;

import com.chamu.entity.*;
import com.chamu.util.HibernateUtil;
import com.chamu.util.TokenUtil;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/nextProblem")
public class NextProblem extends HttpServlet {

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

        System.out.println("=== getNextProblem API called ===");

        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        resp.setHeader("Access-Control-Allow-Credentials", "true");
        resp.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        Gson gson = new Gson();
        JsonObject response = new JsonObject();
        response.addProperty("status", false);

        // 🔹 TOKEN
        String authHeader = req.getHeader("Authorization");
        System.out.println("Authorization Header: " + authHeader);

        String token = authHeader.replace("Bearer ", "");
        User user = TokenUtil.validateToken(token);

        System.out.println("Token validated for user email: " + user.getEmail());

        Session session = HibernateUtil.getSessionFactory().openSession();
        System.out.println("Hibernate session opened");

        // 🔹 USER
        Criteria criteria = session.createCriteria(User.class);
        criteria.add(Restrictions.eq("email", user.getEmail()));
        User selectedUser = (User) criteria.uniqueResult();

        System.out.println("Selected User ID: " + selectedUser.getId());

        // 🔹 STATUS
        Criteria statusCriteria = session.createCriteria(Status.class);
        statusCriteria.add(Restrictions.eq("status", "Completed"));
        Status selectedStatus = (Status) statusCriteria.uniqueResult();

        System.out.println("Selected Status: " + selectedStatus.getStatus());

        // 🔹 USER PROGRESS
        Criteria progressCriteria = session.createCriteria(UserProgress.class);
        progressCriteria.add(Restrictions.eq("user", selectedUser));
        progressCriteria.add(Restrictions.eq("status", selectedStatus));
        progressCriteria.setProjection(Projections.max("problem.id"));

        Integer lastSolvedProblemId =
                (Integer) progressCriteria.uniqueResult();

        System.out.println("Last Solved Problem ID: " + lastSolvedProblemId);

        // 🔹 NEXT PROBLEM
        Criteria problemCriteria = session.createCriteria(Problem.class);

        if (lastSolvedProblemId != null) {
            System.out.println("User has solved problems. Finding next problem...");
            problemCriteria.add(Restrictions.gt("id", lastSolvedProblemId));
        } else {
            System.out.println("User has not solved any problem. Getting first problem...");
        }

        problemCriteria.addOrder(Order.asc("id"));
        problemCriteria.setMaxResults(1);

        Problem nextProblem =
                (Problem) problemCriteria.uniqueResult();

        if (nextProblem != null) {
            System.out.println("Next Problem Found:");
            System.out.println("Problem ID: " + nextProblem.getId());
            System.out.println("Problem Title: " + nextProblem.getTitle());

            Criteria criteria1 =  session.createCriteria(Content.class);
            criteria1.add(Restrictions.eq("problem", nextProblem));
            Content content = (Content) criteria1.list().get(0);
            response.add("content",gson.toJsonTree(content));

//            Criteria criteria2 = session.createCriteria(Solution.class);
//            criteria2.add(Restrictions.eq("problem", nextProblem));
//            Solution solution = (Solution) criteria2.list().get(0);
//            response.add("solution",gson.toJsonTree(solution));

            Criteria criteria3 = session.createCriteria(TestCase.class);
            criteria3.add(Restrictions.eq("problem", nextProblem));
            TestCase  testCase = (TestCase) criteria3.list().get(0);
            response.add("testCase",gson.toJsonTree(testCase));

            response.add("problem", gson.toJsonTree(nextProblem));
            response.addProperty("status", true);
        } else {
            System.out.println("No next problem found. Course completed.");
            response.addProperty("courseCompleted", true);
        }

        session.close();
        System.out.println("Hibernate session closed");

        resp.getWriter().write(gson.toJson(response));
        System.out.println("=== Response sent ===");
    }

}

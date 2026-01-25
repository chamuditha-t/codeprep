package com.chamu.controller;

import com.chamu.entity.User;
import com.chamu.util.HibernateUtil;
import com.chamu.util.TokenUtil;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.List;

@WebServlet("/login")
public class signinServlet extends HttpServlet {

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        resp.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
        resp.setHeader("Access-Control-Allow-Credentials", "true");
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // CORS headers
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        resp.setHeader("Access-Control-Allow-Credentials", "true");
        resp.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        Gson gson = new Gson();
        JsonObject responseObject = new JsonObject();

        Session s = null;
        try {
            s = HibernateUtil.getSessionFactory().openSession();
            JsonObject user = gson.fromJson(req.getReader(), JsonObject.class);

            String email = user.get("email").getAsString();
            String password = user.get("password").getAsString();

            if (email.isEmpty()) {
                responseObject.addProperty("status", false);
                responseObject.addProperty("message", "Please Enter Email!");
            } else if (password.isEmpty()) {
                responseObject.addProperty("status", false);
                responseObject.addProperty("message", "Please Enter Password!");
            } else {
                Criteria criteria = s.createCriteria(User.class);
                criteria.add(Restrictions.eq("email", email));
                criteria.add(Restrictions.eq("password", password));

                List<User> userList = criteria.list();

                if (userList.isEmpty()) {
                    responseObject.addProperty("status", false);
                    responseObject.addProperty("message", "Invalid Credentials!");
                } else {
                    User u = userList.get(0);

                    String token = TokenUtil.generateToken(u);

                    responseObject.addProperty("status", true);
                    responseObject.addProperty("message", "You have been logged in!");
                    responseObject.addProperty("token", token);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            responseObject.addProperty("status", false);
            responseObject.addProperty("message", "Server error: " + e.getMessage());
        } finally {
            if (s != null) {
                s.close();
            }
        }

        resp.setStatus(HttpServletResponse.SC_OK);
        resp.getWriter().write(gson.toJson(responseObject));
    }
}

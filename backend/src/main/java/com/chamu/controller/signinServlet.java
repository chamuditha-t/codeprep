package com.chamu.controller;

import com.chamu.entity.User;
import com.chamu.util.HibernateUtil;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet("/login")
public class signinServlet extends HttpServlet {

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        resp.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        Gson gson = new Gson();
        JsonObject responseObject = new JsonObject();

        Session s = HibernateUtil.getSessionFactory().openSession();
        JsonObject user = gson.fromJson(req.getReader(), JsonObject.class);

        String email = user.get("email").getAsString();
        String password = user.get("password").getAsString();

        if (email.isEmpty()) {
            responseObject.addProperty("status", "false");
            responseObject.addProperty("message", "Please Enter Email!");
        } else if (password.isEmpty()) {
            responseObject.addProperty("status", "false");
            responseObject.addProperty("message", "Please Enter Password!");
        } else {
            s.beginTransaction();

            Criteria criteria =  s.createCriteria(User.class);

            Criterion criterion = Restrictions.eq("email", email);
            Criterion criterion2 = Restrictions.eq("password", password);

            criteria.add(criterion);
            criteria.add(criterion2);

            if(criteria.list().isEmpty()){
                responseObject.addProperty("status", "false");
                responseObject.addProperty("message", "Invalid Credentials!");
            }else {
                HttpSession session = req.getSession();
                session.setAttribute("user", email);
                responseObject.addProperty("status", "true");
                responseObject.addProperty("message", "You have been logged in!");
                s.close();
            }
        }
        String json = gson.toJson(responseObject);
        resp.setContentType("application/json");
        resp.getWriter().write(json);
    }
}

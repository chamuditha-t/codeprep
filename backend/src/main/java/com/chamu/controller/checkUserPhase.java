package com.chamu.controller;

import com.chamu.entity.Phase;
import com.chamu.entity.User;
import com.chamu.entity.UserEnrollment;
import com.chamu.util.HibernateUtil;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/checkUserPhase")
public class checkUserPhase extends HttpServlet {

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        resp.setHeader("Access-Control-Allow-Credentials", "true");
        resp.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        Gson gson = new Gson();
        JsonObject responseObject = new JsonObject();
        JsonObject user = gson.fromJson(req.getReader(), JsonObject.class);
        String email = user.get("email").getAsString();
        Session session = HibernateUtil.getSessionFactory().openSession();

        Criteria userCriteria = session.createCriteria(User.class);
        userCriteria.add(Restrictions.eq("email", email));

        User selectedUser = (User) userCriteria.uniqueResult();

        if (selectedUser != null) {

            Criteria enrollCriteria = session.createCriteria(UserEnrollment.class);
            enrollCriteria.add(Restrictions.eq("user", selectedUser));

            UserEnrollment enrollment = (UserEnrollment) enrollCriteria.setMaxResults(1).uniqueResult();

            if (enrollment != null) {
                responseObject.addProperty("status", true);
            } else {
                responseObject.addProperty("status", false);
            }

        } else {
            responseObject.addProperty("status", false);
        }


        resp.getWriter().print(gson.toJson(responseObject));
    }
}

    package com.chamu.controller;

    import com.chamu.entity.User;
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

    @WebServlet("/signin") // matches frontend fetch
    public class signupServlet extends HttpServlet {

        @Override
        protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws IOException {
            resp.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
            resp.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
            resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
            resp.setStatus(HttpServletResponse.SC_OK);
        }

        @Override
        protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
            Session s = HibernateUtil.getSessionFactory().openSession();
            s.beginTransaction();
        }

        @Override
        protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
            resp.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
            resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
            resp.setContentType("application/json");
            resp.setCharacterEncoding("UTF-8");

            System.out.println("Awa");
            Gson gson = new Gson();
            JsonObject responseObject = new JsonObject();

            // Open Hibernate session in try-with-resources to auto-close
            try {
                Session s = HibernateUtil.getSessionFactory().openSession();
                JsonObject user = gson.fromJson(req.getReader(), JsonObject.class);
                String name = user.get("name").getAsString();
                String email = user.get("email").getAsString();
                String password = user.get("password").getAsString();

                // Validation
                if (name.isEmpty()) {
                    responseObject.addProperty("status", "false");
                    responseObject.addProperty("message", "Please Enter First Name!");
                } else if (email.isEmpty()) {
                    responseObject.addProperty("status", "false");
                    responseObject.addProperty("message", "Please Enter Email!");
                } else if (password.isEmpty()) {
                    responseObject.addProperty("status", "false");
                    responseObject.addProperty("message", "Please Enter Password!");
                } else {
                    s.beginTransaction();

                    Criteria criteria = s.createCriteria(User.class);
                    criteria.add(Restrictions.eq("email", email));

                    if (!criteria.list().isEmpty()) {
                        responseObject.addProperty("status", "false");
                        responseObject.addProperty("message", "Email Already Exists!");
                        s.getTransaction().rollback();
                    } else {
                        User newUser = new User();
                        newUser.setName(name);
                        newUser.setEmail(email);
                        newUser.setPassword(password);

                        s.save(newUser);
                        s.getTransaction().commit();

                        responseObject.addProperty("status", "true");
                        responseObject.addProperty("message", "User successfully Created!");
                    }
                }

            } catch (Exception e) {
                // Catch any Hibernate / JSON parsing exceptions
                responseObject.addProperty("status", "false");
                responseObject.addProperty("message", "Server error: " + e.getMessage());
            }

            resp.getWriter().print(gson.toJson(responseObject));
        }
    }



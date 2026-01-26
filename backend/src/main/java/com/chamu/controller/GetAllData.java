package com.chamu.controller;

import com.chamu.dto.ModuleDTO;
import com.chamu.dto.PhaseDTO;
import com.chamu.dto.PhaseOrderDTO;
import com.chamu.dto.ProblemDTO;
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
import javax.swing.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/getData")
public class GetAllData extends HttpServlet {

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

        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        resp.setHeader("Access-Control-Allow-Credentials", "true");
        resp.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        Gson gson = new Gson();
        JsonObject response = new JsonObject();
        response.addProperty("status", false);

        Session session = HibernateUtil.getSessionFactory().openSession();

        try {
            List<Phase> phases = session.createCriteria(Phase.class).list();
            List<PhaseDTO> phaseDTOList = new ArrayList<>();

            for (Phase phase : phases) {

                PhaseDTO phaseDTO = new PhaseDTO();
                phaseDTO.setId(phase.getId());
                phaseDTO.setName(phase.getPhase_name());

                // 🔹 MODULES
                Criteria moduleCriteria = session.createCriteria(Module.class);
                moduleCriteria.add(Restrictions.eq("phase", phase));
                List<Module> modules = moduleCriteria.list();

                List<ModuleDTO> moduleDTOList = new ArrayList<>();

                for (Module module : modules) {

                    ModuleDTO moduleDTO = new ModuleDTO();
                    moduleDTO.setId(module.getId());
                    moduleDTO.setName(module.getName());

                    // 🔹 PROBLEMS
                    Criteria problemCriteria = session.createCriteria(Problem.class);
                    problemCriteria.add(Restrictions.eq("module", module));
                    List<Problem> problems = problemCriteria.list();

                    List<ProblemDTO> problemDTOList = new ArrayList<>();

                    for (Problem problem : problems) {

                        ProblemDTO problemDTO = new ProblemDTO();
                        problemDTO.setId(problem.getId());
                        problemDTO.setName(problem.getTitle());
                        problemDTO.setDifficultyId(problem.getDifficulty().getId());

                        problemDTOList.add(problemDTO);
                    }

                    moduleDTO.setProblems(problemDTOList);
                    moduleDTOList.add(moduleDTO);
                }

                phaseDTO.setModules(moduleDTOList);
                phaseDTOList.add(phaseDTO);
            }

            response.add("phases", gson.toJsonTree(phaseDTOList));
            response.addProperty("status", true);

        } catch (Exception e) {
            e.printStackTrace();
            response.addProperty("message", "Server error");
        } finally {
            session.close();
        }

        resp.getWriter().write(gson.toJson(response));
    }
}

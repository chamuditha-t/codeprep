package com.chamu.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.concurrent.TimeUnit;

@WebServlet("/RunCode")
public class RunCode extends HttpServlet {
    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        resp.setHeader("Access-Control-Allow-Credentials", "true");
        resp.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("awa");
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
        JsonObject responseJson = new JsonObject();
        StringBuilder requestBody = new StringBuilder();
        BufferedReader reader = req.getReader();
        String line;
        while ((line = reader.readLine()) != null) {
            requestBody.append(line);
        }

        JsonObject requestJson = gson.fromJson(requestBody.toString(), JsonObject.class);

        String language = requestJson.get("language").getAsString().toLowerCase();
        String code = requestJson.get("code").getAsString();
        String input = requestJson.has("input") ? requestJson.get("input").getAsString() : "";

        try {
            switch (language) {
                case "java":
                    executeJava(code, input, responseJson);
                    break;

                case "python":
                    executePython(code, input, responseJson);
                    break;

                case "cpp":
                    executeCpp(code, input, responseJson);
                    break;

                case "javascript":
                    executeJs(code, input, responseJson);
                    break;

                default:
                    responseJson.addProperty("success", false);
                    responseJson.addProperty("type", "INVALID_LANGUAGE");
                    responseJson.addProperty("error", "Language not supported");
            }

        } catch (Exception e) {
            e.printStackTrace();
            responseJson.addProperty("success", false);
            responseJson.addProperty("type", "SERVER_ERROR");
            responseJson.addProperty("error", e.getMessage());
        }

        resp.getWriter().write(gson.toJson(responseJson));
    }

    private void executeJava(String code, String input, JsonObject responseJson) throws Exception {

        File javaFile = new File("Main.java");
        File classFile = new File("Main.class");

        try {
            writeFile(javaFile, code);

            Process compile = new ProcessBuilder("javac", "Main.java").start();
            compile.waitFor();

            String compileError = readStream(compile.getErrorStream());
            if (!compileError.isEmpty()) {
                responseJson.addProperty("success", false);
                responseJson.addProperty("type", "COMPILE_ERROR");
                responseJson.addProperty("error", compileError);
                return;
            }

            Process run = new ProcessBuilder("java", "-cp", ".", "Main").start();
            sendInput(run, input);

            if (!run.waitFor(3, TimeUnit.SECONDS)) {
                run.destroyForcibly();
                responseJson.addProperty("success", false);
                responseJson.addProperty("type", "TIME_LIMIT");
                return;
            }

            String output = readStream(run.getInputStream());
            String error = readStream(run.getErrorStream());

            if (!error.isEmpty() && !error.contains("Picked up JDK_JAVA_OPTIONS")) {
                responseJson.addProperty("success", false);
                responseJson.addProperty("type", "RUNTIME_ERROR");
                responseJson.addProperty("error", error);
            } else {
                responseJson.addProperty("success", true);
                responseJson.addProperty("output", output);
            }

        } finally {
            javaFile.delete();
            classFile.delete();
        }
    }

    private void executePython(String code, String input, JsonObject responseJson) throws Exception {

        File pyFile = new File("main.py");
        writeFile(pyFile, code);

        Process run = new ProcessBuilder("python", "main.py").start();
        sendInput(run, input);

        if (!run.waitFor(3, TimeUnit.SECONDS)) {
            run.destroyForcibly();
            responseJson.addProperty("success", false);
            responseJson.addProperty("type", "TIME_LIMIT");
            return;
        }

        String output = readStream(run.getInputStream());
        String error = readStream(run.getErrorStream());

        if (!error.isEmpty()) {
            responseJson.addProperty("success", false);
            responseJson.addProperty("type", "RUNTIME_ERROR");
            responseJson.addProperty("error", error);
        } else {
            responseJson.addProperty("success", true);
            responseJson.addProperty("output", output);
        }

        pyFile.delete();
    }

    private void executeCpp(String code, String input, JsonObject responseJson) throws Exception {

        File cppFile = new File("main.cpp");
        File exeFile = new File("main");

        writeFile(cppFile, code);

        Process compile = new ProcessBuilder("g++", "main.cpp", "-o", "main").start();
        compile.waitFor();

        String compileError = readStream(compile.getErrorStream());
        if (!compileError.isEmpty()) {
            responseJson.addProperty("success", false);
            responseJson.addProperty("type", "COMPILE_ERROR");
            responseJson.addProperty("error", compileError);
            return;
        }

        Process run = new ProcessBuilder("./main").start();
        sendInput(run, input);

        run.waitFor(3, TimeUnit.SECONDS);

        String output = readStream(run.getInputStream());
        String error = readStream(run.getErrorStream());

        if (!error.isEmpty()) {
            responseJson.addProperty("success", false);
            responseJson.addProperty("type", "RUNTIME_ERROR");
            responseJson.addProperty("error", error);
        } else {
            responseJson.addProperty("success", true);
            responseJson.addProperty("output", output);
        }

        cppFile.delete();
        exeFile.delete();
    }

    private void executeJs(String code, String input, JsonObject responseJson) throws Exception {

        File jsFile = new File("main.js");
        writeFile(jsFile, code);

        Process run = new ProcessBuilder("node", "main.js").start();
        sendInput(run, input);

        run.waitFor(3, TimeUnit.SECONDS);

        String output = readStream(run.getInputStream());
        String error = readStream(run.getErrorStream());

        if (!error.isEmpty()) {
            responseJson.addProperty("success", false);
            responseJson.addProperty("type", "RUNTIME_ERROR");
            responseJson.addProperty("error", error);
        } else {
            responseJson.addProperty("success", true);
            responseJson.addProperty("output", output);
        }

        jsFile.delete();
    }

    private void writeFile(File file, String code) throws IOException {
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(file))) {
            bw.write(code);
        }
    }

    private void sendInput(Process process, String input) throws IOException {
        if (input != null && !input.trim().isEmpty()) {
            BufferedWriter writer = new BufferedWriter(
                    new OutputStreamWriter(process.getOutputStream()));
            writer.write(input);
            writer.flush();
            writer.close();
        } else {
            process.getOutputStream().close();
        }
    }

    private String readStream(InputStream is) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(is));
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            sb.append(line).append("\n");
        }
        return sb.toString();
    }


}


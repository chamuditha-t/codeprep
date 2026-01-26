package com.chamu.dto;
import java.util.List;

public class ModuleDTO {
    private int id;
    private String name;
    private List<ProblemDTO> problems;

    // getters and setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public List<ProblemDTO> getProblems() { return problems; }
    public void setProblems(List<ProblemDTO> problems) { this.problems = problems; }
}

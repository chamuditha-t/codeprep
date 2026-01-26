package com.chamu.dto;

import java.util.List;

public class PhaseDTO {
    private int id;
    private String name;
    private List<ModuleDTO> modules;

    // getters and setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public List<ModuleDTO> getModules() { return modules; }
    public void setModules(List<ModuleDTO> modules) { this.modules = modules; }
}

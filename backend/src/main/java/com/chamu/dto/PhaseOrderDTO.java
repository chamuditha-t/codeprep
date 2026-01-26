package com.chamu.dto;

import java.util.List;

public class PhaseOrderDTO {
    private int id;
    private String phaseOrderName;
    private List<PhaseDTO> phases;

    // getters and setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getPhaseOrderName() { return phaseOrderName; }
    public void setPhaseOrderName(String phaseOrderName) { this.phaseOrderName = phaseOrderName; }

    public List<PhaseDTO> getPhases() { return phases; }
    public void setPhases(List<PhaseDTO> phases) { this.phases = phases; }
}

package com.chamu.dto;
public class ProblemDTO {
    private int id;
    private int difficultyId;
    private String name;

    // getters and setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getDifficultyId() { return difficultyId; }
    public void setDifficultyId(int difficultyId) { this.difficultyId = difficultyId; }
}

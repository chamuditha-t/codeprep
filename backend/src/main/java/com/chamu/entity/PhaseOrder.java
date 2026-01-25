package com.chamu.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "phase_order")
public class PhaseOrder implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "phase_order", nullable = false, length = 45)
    private String phaseOrder;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPhaseOrder() {
        return phaseOrder;
    }

    public void setPhaseOrder(String phaseOrder) {
        this.phaseOrder = phaseOrder;
    }
}

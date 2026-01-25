package com.chamu.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "phase")
public class Phase implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String phase_name;

    @ManyToOne
    @JoinColumn(name = "phase_order_id", nullable = false)
    private PhaseOrder phaseOrder;

    public PhaseOrder getPhaseOrder() {
        return phaseOrder;
    }

    public void setPhaseOrder(PhaseOrder phaseOrder) {
        this.phaseOrder = phaseOrder;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setPhase_name(String phase_name) {
        this.phase_name = phase_name;
    }

    public String getPhase_name() {
        return phase_name;
    }

}

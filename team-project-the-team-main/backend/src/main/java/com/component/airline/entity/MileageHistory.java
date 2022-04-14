package com.component.airline.entity;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name="mileage_history")
public class MileageHistory implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
	@Column(name = "id")
    private Integer id;

	@Column(name = "date_avl")
	private Date date_avl;
	
	@Column(name = "date_exp")
	private Date date_exp;
	
	@Column(name = "points")
	private double points;
	
	@Column(name = "rem_points",columnDefinition = "integer default 0")
	private double remiaingPoints;
	
	@Column(name = "status",columnDefinition = "varchar(255) default 'Availed'")
	private String status;
	
	@JsonBackReference
	@ManyToOne(fetch=FetchType.EAGER,cascade=CascadeType.MERGE)
	@JoinColumn(name = "mileage_account", referencedColumnName = "id")
	private Mileage mileage;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getDate_avl() {
		return date_avl;
	}

	public void setDate_avl(Date date_avl) {
		this.date_avl = date_avl;
	}

	public Date getDate_exp() {
		return date_exp;
	}

	public void setDate_exp(Date date_exp) {
		this.date_exp = date_exp;
	}

	public double getPoints() {
		return points;
	}

	public void setPoints(double points) {
		this.points = points;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public double getRemiaingPoints() {
		return remiaingPoints;
	}

	public void setRemiaingPoints(double remiaingPoints) {
		this.remiaingPoints = remiaingPoints;
	}

	public Mileage getMileage() {
		return mileage;
	}

	public void setMileage(Mileage mileage) {
		this.mileage = mileage;
	}
	
	
}

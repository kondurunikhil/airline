package com.component.airline.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "seat")
public class Seat {

	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
	@Column(name = "id")
    private Integer id;
	
	@Column(name = "rowValue")
	public int rowValue;
	
	@Column(name = "seatNumber")
	public String seatNumber;
	
	@Column(name = "type")
	public String type;
	
	@Column(name = "rate")
	public Double rate;
	
	@ManyToOne
	@JoinColumn(name = "flight", referencedColumnName = "id")
	public Flight flight;
	
	@Column(name = "status", columnDefinition = "int default 0")
	public Integer status;
	
	public Seat() {
		
	}
	
	public Seat(Integer id, int rowValue, String seatNumber, Flight flightId, Integer status) {
		super();
		this.id = id;
		this.rowValue = rowValue;
		this.seatNumber = seatNumber;
		this.flight = flightId;
		this.status = status;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public int getRowValue() {
		return rowValue;
	}

	public void setRowValue(int rowValue) {
		this.rowValue = rowValue;
	}

	public String getSeatNumber() {
		return seatNumber;
	}

	public void setSeatNumber(String seatNumber) {
		this.seatNumber = seatNumber;
	}

	public Flight getFlight() {
		return flight;
	}

	public void setFlight(Flight flight) {
		this.flight = flight;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Double getRate() {
		return rate;
	}

	public void setRate(Double rate) {
		this.rate = rate;
	}
	
	
}

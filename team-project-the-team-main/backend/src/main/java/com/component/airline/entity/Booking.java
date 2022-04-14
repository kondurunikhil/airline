package com.component.airline.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@JsonSerialize
@Table(name = "booking_tbl")
public class Booking implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	@Column(name = "id")
	private int id;

	@Column(name = "travel_date")
	private Date date;
	
	@JsonBackReference
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user", referencedColumnName = "id")
	private User user;

	@OneToOne
	@JoinColumn(name = "flight_id", referencedColumnName = "id")
	private Flight flight;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "transaction", referencedColumnName = "id")
	public Transaction transaction;


	@JsonManagedReference
	@OneToMany(fetch=FetchType.EAGER, cascade = CascadeType.ALL)
	private List<Passenger> passengers;
	 
	@Column(name = "status", columnDefinition = "varchar(20) default 'Scheduled'")
	private String status;

	@Column(name = "mileage_points")
	private double mileagePoints;

	@Column(name = "mileage_status", columnDefinition = "varchar(255) default 'Pending'")
	private String mileageStatus;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Flight getFlight() {
		return flight;
	}

	public void setFlight(Flight flight) {
		this.flight = flight;
	}

	public Transaction getTransaction() {
		return transaction;
	}

	public void setTransaction(Transaction transaction) {
		this.transaction = transaction;
	}
	
	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public double getMileagePoints() {
		return mileagePoints;
	}

	public void setMileagePoints(double mileagePoints) {
		this.mileagePoints = mileagePoints;
	}

	public String getMileageStatus() {
		return mileageStatus;
	}

	public void setMileageStatus(String mileageStatus) {
		this.mileageStatus = mileageStatus;
	}

	public List<Passenger> getPassengers() {
		return passengers;
	}

	public void setPassengers(List<Passenger> passengers) {
		this.passengers = passengers;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	
}

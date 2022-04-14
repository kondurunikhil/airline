package com.component.airline.entity;

import java.io.Serializable;
import java.sql.Timestamp;

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

import org.hibernate.annotations.Proxy;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.sun.istack.NotNull;

@Entity
@Table(name = "flight")
@JsonSerialize
@Proxy(lazy = false)
public class Flight implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
	@Column(name = "id")
    private Integer id;
	
	@NotNull
	@Column(name = "flightName")
	public String flightName;
	
	@NotNull
	@Column(name = "departureTime")
	public Timestamp departureTime;
	
	@NotNull
	@Column(name = "arrivalTime")
	public Timestamp arrivalTime;
	
	@NotNull
	@Column(name = "tripStops")
	public String stops;
	
	@NotNull
	@Column(name = "tripDuration")
	public String duration;
	
	@Column(name = "tripType")
	public String tripType;
	
	@NotNull
	@Column(name = "tripSource")
	public String tripSource;
	
	@NotNull
	@Column(name = "tripDestination")
	public String tripDestination;
	
	@NotNull
	@Column(name = "price")
	public Double price;
	
	@NotNull
	@JsonBackReference(value="pilot1")
	@ManyToOne(fetch=FetchType.EAGER,cascade=CascadeType.ALL)
	@JoinColumn(name = "pilot1", referencedColumnName = "id")
	public User pilot1;
	
	@NotNull
	@JsonBackReference(value="pilot2")
	@ManyToOne(fetch=FetchType.EAGER,cascade=CascadeType.ALL)
	@JoinColumn(name = "pilot2", referencedColumnName = "id")
	public User pilot2;
	
	@Column(name = "status",columnDefinition = "varchar(255) default 'Scheduled'")
	public String status;
	
	public Flight(Integer id, String flightName, Timestamp departureTime, Timestamp arrivalTime, String stops,
			String duration, String tripType, String tripSource, String tripDestination, Double price) {
		super();
		this.id = id;
		this.flightName = flightName;
		this.departureTime = departureTime;
		this.arrivalTime = arrivalTime;
		this.stops = stops;
		this.duration = duration;
		this.tripType = tripType;
		this.tripSource = tripSource;
		this.tripDestination = tripDestination;
		this.price = price;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}
	
	public Flight(){
		
	}
	
	@Override
	public String toString() {
		return "Flight [id=" + id + ", flightName=" + flightName + ", departureTime=" + departureTime + ", arrivalTime="
				+ arrivalTime + ", stops=" + stops + ", duration=" + duration + ", tripType=" + tripType
				+ ", tripSource=" + tripSource + ", tripDestination=" + tripDestination + "]";
	}



	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getFlightName() {
		return flightName;
	}

	public void setFlightName(String flightName) {
		this.flightName = flightName;
	}

	public Timestamp getDepartureTime() {
		return departureTime;
	}

	public void setDepartureTime(Timestamp departureTime) {
		this.departureTime = departureTime;
	}

	public Timestamp getArrivalTime() {
		return arrivalTime;
	}

	public void setArrivalTime(Timestamp arrivalTime) {
		this.arrivalTime = arrivalTime;
	}

	public String getStops() {
		return stops;
	}

	public void setStops(String stops) {
		this.stops = stops;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public String getTripType() {
		return tripType;
	}

	public void setTripType(String tripType) {
		this.tripType = tripType;
	}

	public String getTripSource() {
		return tripSource;
	}

	public void setTripSource(String tripSource) {
		this.tripSource = tripSource;
	}

	public String getTripDestination() {
		return tripDestination;
	}

	public void setTripDestination(String tripDestination) {
		this.tripDestination = tripDestination;
	}

	public User getPilot1() {
		return pilot1;
	}

	public void setPilot1(User pilot1) {
		this.pilot1 = pilot1;
	}

	public User getPilot2() {
		return pilot2;
	}

	public void setPilot2(User pilot2) {
		this.pilot2 = pilot2;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	
}

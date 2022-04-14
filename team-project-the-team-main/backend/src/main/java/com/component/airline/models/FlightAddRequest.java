package com.component.airline.models;

import java.sql.Timestamp;

import com.sun.istack.NotNull;

public class FlightAddRequest {
	
	@NotNull
	public String flightName;
	
	@NotNull
	public Timestamp departureTime;
	
	@NotNull
	public Timestamp arrivalTime;
	
	@NotNull
	public String stops;
	
	@NotNull
	public String duration;
	
	@NotNull
	public String tripType;
	
	@NotNull
	public String tripSource;
	
	@NotNull
	public String tripDestination;
	
	@NotNull
	public Double price;

	public String pilot1;
	
	public String pilot2;
	
	public int seats;
	
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

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getPilot1() {
		return pilot1;
	}

	public void setPilot1(String pilot1) {
		this.pilot1 = pilot1;
	}

	public String getPilot2() {
		return pilot2;
	}

	public void setPilot2(String pilot2) {
		this.pilot2 = pilot2;
	}

	public int getSeats() {
		return seats;
	}

	public void setSeats(int seats) {
		this.seats = seats;
	}
	
	

}

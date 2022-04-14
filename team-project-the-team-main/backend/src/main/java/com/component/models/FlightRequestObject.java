package com.component.models;

import java.sql.Timestamp;

public class FlightRequestObject {
public String flightName;

	public Timestamp departureTime;
	
	public Timestamp arrivalTime;
	
	public String tripType;
	
	public String tripSource;
	
	public String tripDestination;
	
	public long adults;
	
	public long children;

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

	public long getAdults() {
		return adults;
	}

	public void setAdults(long adults) {
		this.adults = adults;
	}

	public long getChildren() {
		return children;
	}

	public void setChildren(long children) {
		this.children = children;
	}
	
	

}

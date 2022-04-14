package com.component.airline.models;

import java.sql.Timestamp;

public class FlightSearchObject {

	private String tripSource;
	private String tripDestination;
	private Timestamp departureDate;
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
	public Timestamp getDepartureDate() {
		return departureDate;
	}
	public void setDepartureDate(Timestamp departureDate) {
		this.departureDate = departureDate;
	}

	
	
}

package com.component.airline.repository;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.component.airline.entity.Flight;
import com.component.airline.entity.Seat;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Integer>{

	@Query("SELECT e from Flight e where e.tripSource =:tripSource AND e.tripDestination =:tripDestination"
			+ " AND date(e.departureTime) =:departureTime and e.status!=:status and e.id in (select s.flight from Seat s where s.status=0 group by s.flight having count(s.id) >=(:adults+:children))")
	List<Flight> findBySourceAndDestination(@Param("tripSource") String tripSource,@Param("tripDestination")String tripDestination,
			@Param("departureTime") Timestamp departureTime, @Param("status") String status, @Param("adults") long adults, @Param("children") long children);
	
	@Query("SELECT e from Flight e where e.tripSource =:tripDestination AND e.tripDestination =:tripSource"
			+ " AND date(e.arrivalTime) =:arrivalTime and e.id in (select s.flight from Seat s where s.status=0 group by s.flight having count(s.id) >=(:adults+:children))")
	List<Flight> findReturnFlights(@Param("tripSource") String tripSource,@Param("tripDestination")String tripDestination,
			@Param("arrivalTime") Timestamp arrivalTime, @Param("adults") long adults, @Param("children") long children);
	
	@Modifying
	@Query(value ="insert into Flight (arrivalTime,departureTime,tripDuration,flightName,tripStops,tripDestination,tripSource,tripType) VALUES (:arrivalTime,:departureTime,:tripDuration,:flightName,:tripStops,:tripDestination,:tripSource,:tripType)",nativeQuery = true)
	List<Flight> addFlight(@Param("arrivalTime") String arrivalTime, @Param("departureTime") String departureTime,
			@Param("tripDuration") String tripDuration, @Param("flightName") String flightName,
			@Param("tripStops") String tripStops, @Param("tripDestination") String tripDestination,
			@Param("tripSource") String tripSource, @Param("tripType") String tripType);
	
	@Query("SELECT e from Flight e where e.tripSource =:tripSource AND e.tripDestination =:tripDestination AND date(e.departureTime) =:departureTime")
	List<Flight> getFlightByCriteria( @Param("tripSource") String tripStops, @Param("tripDestination") String tripDestination,@Param("departureTime") Timestamp departureTime);
	
	@Query("SELECT s from Seat s where s.flight.id =:id and s.status=0")
	List<Seat> getAvailableSeatsForFlight(@Param("id") Integer flightId);

}

package com.component.airline.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.component.airline.entity.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer>{

	//Booking findBookingByUser(int userId);
	
	
	 @Query("SELECT p from Booking p where p.user.Id =:user") 
	 List<Booking>findByUserId(@Param("user") int user);
	 
	@Modifying
	 @Query("update Booking p set p.status=:status where p.flight.id =:flightId") 
	void cancelBookingByFlightId(@Param("flightId")int flightId,@Param("status") String status);
	
	@Modifying
	 @Query("update Booking p set p.status=:status where p.flight.id =:flightId") 
	void updateBookingByFlightId(@Param("flightId")int flightId,@Param("status") String status);
}

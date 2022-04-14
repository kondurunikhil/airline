package com.component.airline.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.component.airline.entity.Seat;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Integer>{

}

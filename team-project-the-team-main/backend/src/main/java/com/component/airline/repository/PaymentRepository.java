package com.component.airline.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.component.airline.entity.Payment;



@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer>{

	
	@Query("SELECT p from Payment p where p.user =:user")
	List<Payment> findByUserId(@Param("user") int user);
	
	@Query("Delete from Payment p where p.user =:user")
	List<Payment> deleteByUserId(@Param("user") Payment payment);
}

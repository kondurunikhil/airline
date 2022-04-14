package com.component.airline.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.component.airline.entity.MileageHistory;

@Repository
public interface MileageHistoryRepository extends JpaRepository<MileageHistory, Integer>{
	 @Query("SELECT p from MileageHistory p where p.mileage.id =:mileageId order by date_avl ASC") 
	 List<MileageHistory>getMileageHisotry(@Param("mileageId") int mileageId);
}

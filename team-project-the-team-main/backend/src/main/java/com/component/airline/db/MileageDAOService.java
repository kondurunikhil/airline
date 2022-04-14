package com.component.airline.db;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.component.airline.entity.Mileage;
import com.component.airline.entity.MileageHistory;
import com.component.airline.models.MileageRequestObject;
import com.component.airline.repository.MileageRepository;
import com.component.airline.repository.UserRepository;

@Service
public class MileageDAOService{

	@Autowired
	MileageRepository mileageRepository;
	
	@Autowired
	UserRepository userRepository;
	
	public Object addMileage(MileageRequestObject mileageRequestObject){
		Mileage mileage = userRepository.getById(mileageRequestObject.getUserid()).getMileage();
		int finaRewards = (int) (mileage.getAvailableRewards()+mileageRequestObject.getPoints());
		MileageHistory mileageHistory = new MileageHistory();
		mileageHistory.setPoints(mileageRequestObject.getPoints());
		mileageHistory.setRemiaingPoints(finaRewards);
		Date sqlDate = new Date(System.currentTimeMillis());
		mileageHistory.setDate_avl(sqlDate);
		mileageHistory.setDate_exp(sqlDate);
		List<MileageHistory> mh= mileage.getTransactions();
		mh.add(mileageHistory);
		mileage.setTransactions(mh);
		mileage.setAvailableRewards(finaRewards);
		mileageRepository.save(mileage);
		return mileage;
	}
	
	public Object getMileage(int userId) {
		return mileageRepository.getByUserId(userId);
	}
}

package com.component.airline.db;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.component.airline.entity.MileageHistory;
import com.component.airline.repository.MileageHistoryRepository;

@Service
public class MIleageHistoryDaoService {
	@Autowired
	MileageHistoryRepository mileageHistoryRepository;

	public List<MileageHistory> getMileage(int  mileageId){
		return mileageHistoryRepository.getMileageHisotry(mileageId);
	}
}

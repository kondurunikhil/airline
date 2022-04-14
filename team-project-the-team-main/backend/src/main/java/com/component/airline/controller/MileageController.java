package com.component.airline.controller;

import javax.ws.rs.QueryParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.component.airline.db.MIleageHistoryDaoService;
import com.component.airline.db.MileageDAOService;
import com.component.airline.models.MileageRequestObject;

@RestController
public class MileageController {

	@Autowired
	MileageDAOService mileageDAOService;
	
	@Autowired
	MIleageHistoryDaoService mileageHistoryDAOService;
	
	@PostMapping(path = "/addMileage", produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Object addMileage(@RequestBody MileageRequestObject mileage) {
		return mileageDAOService.addMileage(mileage);
	}
	
	@GetMapping(path = "/getMileage", produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Object getMileage(@QueryParam(value = "mileageId") int mileageId) {
		return mileageHistoryDAOService.getMileage(mileageId);
	}
}

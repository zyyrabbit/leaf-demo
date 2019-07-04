export const getUserTenantInfo = {
	"code": 0,
	"data": [{
		"userId": 6,
		"userAcount": "admin",
		"userName": "Leaf",
		"memberId": 6,
		"orgId": 2,
		"tenantId": 2,
		"tenantName": "Leaf",
		"tenantCode": "CTGITGZ"
	}]
}

export const getUserInfo ={
	"code": 0,
	"data": {
		"generalSituationDetail": {
			"countOfUser": null,
			"countOfOrganization": null,
			"countOfDesktopPool": null,
			"countOfDesktop": null,
			"countOfUserGroup": null,
			"countOfOnlineUser": null,
			"countOfOnlineDesktop": null,
			"countOfTodayLoginUser": null,
			"countRestOfTodayLoginUser": null,
			"countOfTodayLoginDesktop": null,
			"averageSecondOfTodayLoginUser": null,
			"averageTimeOfTodayLoginUser": null,
			"tenantName": "Leaf",
			"orgName": "Leaf",
			"sysRoleNames": ["Leaf"],
			"userName": "Leaf",
			"orgId": null,
			"tenantId": null
		},
		"desktopModes": null,
		"orgMembers": null,
		"desktopNumOfOrg": null,
		"topOfDesktop": null,
		"topOfUser": null
	}
}

export const getGeneralInfo = {
	"code": 0,
	"data": {
		"generalSituationDetail": {
			"countOfUser": 17,
			"countOfOrganization": null,
			"countOfDesktopPool": 4,
			"countOfDesktop": 4,
			"countOfUserGroup": 1,
			"countOfOnlineUser": 0,
			"countOfOnlineDesktop": 0,
			"countOfTodayLoginUser": null,
			"countRestOfTodayLoginUser": null,
			"countOfTodayLoginDesktop": null,
			"averageSecondOfTodayLoginUser": null,
			"averageTimeOfTodayLoginUser": null,
			"tenantName": null,
			"orgName": null,
			"sysRoleNames": null,
			"userName": null,
			"orgId": 2,
			"tenantId": 2
		},
		"desktopModes": null,
		"orgMembers": null,
		"desktopNumOfOrg": null,
		"topOfDesktop": null,
		"topOfUser": null
	}
}


export const getRunningDesktop ={
	"code": 0,
	"data": {
		"plannedMaxDesktopNum": [{
			"userNum": null,
			"desktopNum": 16,
			"userMode": 0
		}],
		"createdDesktopNum": [{
			"userNum": null,
			"desktopNum": 4,
			"userMode": 0
		}],
		"freedomDesktopNum": [],
		"assignedDesktopNum": [{
			"userNum": null,
			"desktopNum": 4,
			"userMode": 0
		}]
	}
}



export const getQuotaDetail = {
	"code": 0,
	"data": {
		"tenantQuotaDTOs": [],
		"desktopFlavorInstDtos": [{
			"quotaId": null,
			"quotaUnit": "GB",
			"shard1": null,
			"updateDate": null,
			"statusDate": null,
			"createStaff": null,
			"orderBy": null,
			"updateStaff": null,
			"createDate": null,
			"status": null,
			"quotaCode": "system_disk",
			"quotaName": "高速云盘",
			"remark": null,
			"sumOfQuotaValue": 400
		}, {
			"quotaId": null,
			"quotaUnit": "GB",
			"shard1": null,
			"updateDate": null,
			"statusDate": null,
			"createStaff": null,
			"orderBy": null,
			"updateStaff": null,
			"createDate": null,
			"status": null,
			"quotaCode": "data_disk",
			"quotaName": "高速云盘",
			"remark": null,
			"sumOfQuotaValue": 90
		}, {
			"quotaId": null,
			"quotaUnit": "核",
			"shard1": null,
			"updateDate": null,
			"statusDate": null,
			"createStaff": null,
			"orderBy": 1,
			"updateStaff": null,
			"createDate": null,
			"status": null,
			"quotaCode": "vCPU",
			"quotaName": "vCPU",
			"remark": null,
			"sumOfQuotaValue": 16
		}, {
			"quotaId": null,
			"quotaUnit": "GB",
			"shard1": null,
			"updateDate": null,
			"statusDate": null,
			"createStaff": null,
			"orderBy": 2,
			"updateStaff": null,
			"createDate": null,
			"status": null,
			"quotaCode": "memory",
			"quotaName": "内存",
			"remark": null,
			"sumOfQuotaValue": 20
		}]
	}
}

export const getflavorAndOrg = {
	"code": 0,
	"data": {
		"generalSituationDetail": null,
		"desktopModes": [{
			"desktopId": null,
			"poolId": null,
			"poolName": null,
			"desktopName": null,
			"nickname": null,
			"vpcId": null,
			"userMode": null,
			"expireTime": null,
			"strategyId": null,
			"securityGroupId": null,
			"remark": null,
			"createDate": null,
			"createStaff": null,
			"updateDate": null,
			"updateStaff": null,
			"tenantId": null,
			"strategyDtId": null,
			"flavorId": 1,
			"flavorName": "默认模板",
			"mirrorId": null,
			"mirrorName": null,
			"ustatusDate": null,
			"useStatus": null,
			"mstatusDate": null,
			"manageStatus": null,
			"laterUserId": null,
			"laterUserName": null,
			"allotUserId": null,
			"allotUserName": null,
			"orgId": null,
			"orgName": null,
			"spiceIp": null,
			"spicePort": null,
			"floatingIp": null,
			"ipAddr": null,
			"allotFlag": null,
			"speedStatus": null,
			"certId": null,
			"certNbr": null,
			"count": 2,
			"countAll": 4,
			"flavorInstList": null,
			"onWayTaskInstDetailList": null,
			"strategyUpdateFlag": null,
			"strategyName": null,
			"userAcount": null,
			"taskInstOnWayCount": null,
			"taskInstOnFailCount": null,
			"foreignDesktopId": null,
			"licenseId": null,
			"encryptCode": null
		}, {
			"desktopId": null,
			"poolId": null,
			"poolName": null,
			"desktopName": null,
			"nickname": null,
			"vpcId": null,
			"userMode": null,
			"expireTime": null,
			"strategyId": null,
			"securityGroupId": null,
			"remark": null,
			"createDate": null,
			"createStaff": null,
			"updateDate": null,
			"updateStaff": null,
			"tenantId": null,
			"strategyDtId": null,
			"flavorId": 3,
			"flavorName": "YOYtest",
			"mirrorId": null,
			"mirrorName": null,
			"ustatusDate": null,
			"useStatus": null,
			"mstatusDate": null,
			"manageStatus": null,
			"laterUserId": null,
			"laterUserName": null,
			"allotUserId": null,
			"allotUserName": null,
			"orgId": null,
			"orgName": null,
			"spiceIp": null,
			"spicePort": null,
			"floatingIp": null,
			"ipAddr": null,
			"allotFlag": null,
			"speedStatus": null,
			"certId": null,
			"certNbr": null,
			"count": 1,
			"countAll": 4,
			"flavorInstList": null,
			"onWayTaskInstDetailList": null,
			"strategyUpdateFlag": null,
			"strategyName": null,
			"userAcount": null,
			"taskInstOnWayCount": null,
			"taskInstOnFailCount": null,
			"foreignDesktopId": null,
			"licenseId": null,
			"encryptCode": null
		}, {
			"desktopId": null,
			"poolId": null,
			"poolName": null,
			"desktopName": null,
			"nickname": null,
			"vpcId": null,
			"userMode": null,
			"expireTime": null,
			"strategyId": null,
			"securityGroupId": null,
			"remark": null,
			"createDate": null,
			"createStaff": null,
			"updateDate": null,
			"updateStaff": null,
			"tenantId": null,
			"strategyDtId": null,
			"flavorId": 4,
			"flavorName": "高级模板",
			"mirrorId": null,
			"mirrorName": null,
			"ustatusDate": null,
			"useStatus": null,
			"mstatusDate": null,
			"manageStatus": null,
			"laterUserId": null,
			"laterUserName": null,
			"allotUserId": null,
			"allotUserName": null,
			"orgId": null,
			"orgName": null,
			"spiceIp": null,
			"spicePort": null,
			"floatingIp": null,
			"ipAddr": null,
			"allotFlag": null,
			"speedStatus": null,
			"certId": null,
			"certNbr": null,
			"count": 1,
			"countAll": 4,
			"flavorInstList": null,
			"onWayTaskInstDetailList": null,
			"strategyUpdateFlag": null,
			"strategyName": null,
			"userAcount": null,
			"taskInstOnWayCount": null,
			"taskInstOnFailCount": null,
			"foreignDesktopId": null,
			"licenseId": null,
			"encryptCode": null
		}],
		"orgMembers": null,
		"desktopNumOfOrg": null,
		"topOfDesktop": null,
		"topOfUser": null
	}
}

export const getTop10UserAndDesktop = {
	"code": 0,
	"data": {
		"generalSituationDetail": null,
		"desktopModes": null,
		"orgMembers": null,
		"desktopNumOfOrg": null,
		"topOfDesktop": [{
			"desktopId": 19,
			"desktopName": "default-Fm65Z1YC",
			"userId": null,
			"userName": null,
			"secondOfUsingTime": 1190
		}, {
			"desktopId": 21,
			"desktopName": "default-g2Z2OA5u",
			"userId": null,
			"userName": null,
			"secondOfUsingTime": 356
		}, {
			"desktopId": 26,
			"desktopName": "default-AR4B3NlK",
			"userId": null,
			"userName": null,
			"secondOfUsingTime": 142
		}, {
			"desktopId": 25,
			"desktopName": "default-xLEm4ob7",
			"userId": null,
			"userName": null,
			"secondOfUsingTime": 10
		}],
		"topOfUser": [{
			"desktopId": null,
			"desktopName": null,
			"userId": 12,
			"userName": "徐南浩",
			"secondOfUsingTime": 1546
		}, {
			"desktopId": null,
			"desktopName": null,
			"userId": 21,
			"userName": "赵悦酉",
			"secondOfUsingTime": 142
		}, {
			"desktopId": null,
			"desktopName": null,
			"userId": 11,
			"userName": "邵颖",
			"secondOfUsingTime": 10
		}]
	}
}
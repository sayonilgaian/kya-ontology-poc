const threeDGraph = {
    tag: "force-graph-screen",
    atoms: [
        { type: 'ColourAtom', config: { role: 'background', value: '#202939' } },
        {
            type: 'LayoutAtom',
            config: {
                display: 'flex',
                width: '100%',
                height: '100%',
                justify: 'center',
                align: 'center',
            },
        },
        {
            "type": "ThirdPartyAtom",
            "config": {
                "op": "Create",
                "thirdPartyLibraryName": "3dForceGraph",
                "name": "graph-1"
            }
        },
        {
            "type": "InteractionAtom",
            "id": "loop1",
            "config": {
                "trigger": "OnLoad",
                "dependencies": [],
                "params": [
                    {
                        "source": "exact",
                        "value": "graph-1"
                    },
                    {
                        "source": "exact",
                        "value": "setContainer"
                    }
                ],
                "action": "callThirdPartyService"
            }
        },
        {
            "type": "InteractionAtom",
            "id": "loop11",
            "config": {
                "trigger": null,
                "dependencies": [
                    "loop1"
                ],
                "params": [
                    {
                        "source": "exact",
                        "value": "graph-1"
                    },
                    {
                        "source": "exact",
                        "value": "init"
                    },
                    {
                        "source": "exact",
                        "value": {
                            "width": '100%',
                            "height": '100%',
                            "backgroundColor": "gray",
                            "data": {
  "nodes": [
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:26",
      "name": "time",
      "type": "rdfs:Datatype",
      "uri": "http://www.w3.org/2001/XMLSchema#time",
      "nodeType": "datatype",
      "size": 8,
      "color": "#FF6D00",
      "group": "datatype"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:1",
      "name": "AttendanceAlerts",
      "type": "rdfs:Class",
      "uri": "http://example.org/hrms#AttendanceAlerts",
      "nodeType": "class",
      "size": 18,
      "color": "#00E676",
      "group": "class"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:36",
      "name": "date",
      "type": "rdfs:Datatype",
      "uri": "http://www.w3.org/2001/XMLSchema#date",
      "nodeType": "datatype",
      "size": 8,
      "color": "#FF6D00",
      "group": "datatype"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:60",
      "name": "AuthenticationLog",
      "type": "rdfs:Class",
      "uri": "http://example.org/hrms#AuthenticationLog",
      "nodeType": "class",
      "size": 18,
      "color": "#00E676",
      "group": "class"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "name": "string",
      "type": "rdfs:Datatype",
      "uri": "http://www.w3.org/2001/XMLSchema#string",
      "nodeType": "datatype",
      "size": 8,
      "color": "#FF6D00",
      "group": "datatype"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:52",
      "name": "AttendanceValidation",
      "type": "rdfs:Class",
      "uri": "http://example.org/hrms#AttendanceValidation",
      "nodeType": "class",
      "size": 18,
      "color": "#00E676",
      "group": "class"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:55",
      "name": "BehaviorMonitoring",
      "type": "rdfs:Class",
      "uri": "http://example.org/hrms#BehaviorMonitoring",
      "nodeType": "class",
      "size": 18,
      "color": "#00E676",
      "group": "class"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:66",
      "name": "HRMSIntegration",
      "type": "rdfs:Class",
      "uri": "http://example.org/hrms#HRMSIntegration",
      "nodeType": "class",
      "size": 18,
      "color": "#00E676",
      "group": "class"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:22",
      "name": "decimal",
      "type": "rdfs:Datatype",
      "uri": "http://www.w3.org/2001/XMLSchema#decimal",
      "nodeType": "datatype",
      "size": 8,
      "color": "#FF6D00",
      "group": "datatype"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:11",
      "name": "EmployeeAttendance",
      "type": "rdfs:Class",
      "uri": "http://example.org/hrms#EmployeeAttendance",
      "nodeType": "class",
      "size": 18,
      "color": "#00E676",
      "group": "class"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:68",
      "name": "boolean",
      "type": "rdfs:Datatype",
      "uri": "http://www.w3.org/2001/XMLSchema#boolean",
      "nodeType": "datatype",
      "size": 8,
      "color": "#FF6D00",
      "group": "datatype"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:57",
      "name": "integer",
      "type": "rdfs:Datatype",
      "uri": "http://www.w3.org/2001/XMLSchema#integer",
      "nodeType": "datatype",
      "size": 8,
      "color": "#FF6D00",
      "group": "datatype"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:71",
      "name": "behaviorPurgeId",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#behaviorPurgeId",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:70",
      "name": "alertPurgeId",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#alertPurgeId",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:37",
      "name": "behaviorStatus",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#behaviorStatus",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:39",
      "name": "cardAuthentication",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#cardAuthentication",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:38",
      "name": "hrmsStatusUpdated",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#hrmsStatusUpdated",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:9",
      "name": "authLogEmployeeId",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#authLogEmployeeId",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:72",
      "name": "hasAttendanceAlert",
      "type": "owl:ObjectProperty",
      "uri": "http://example.org/hrms#hasAttendanceAlert",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:75",
      "name": "validationStatus",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#validationStatus",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:31",
      "name": "employeeId",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#employeeId",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:74",
      "name": "managerApproval",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#managerApproval",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:30",
      "name": "alertRecipient",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#alertRecipient",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:77",
      "name": "attendanceValidationId",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#attendanceValidationId",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:33",
      "name": "integrationPurgeId",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#integrationPurgeId",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:5",
      "name": "workingHours",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#workingHours",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:76",
      "name": "authenticationMethod",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#authenticationMethod",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:32",
      "name": "authDate",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#authDate",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:6",
      "name": "attemptCount",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#attemptCount",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:35",
      "name": "breakCount",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#breakCount",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:7",
      "name": "validatedBy",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#validatedBy",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:8",
      "name": "integrationEmployeeId",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#integrationEmployeeId",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:34",
      "name": "alertDate",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#alertDate",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:2",
      "name": "attendanceDate",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#attendanceDate",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:3",
      "name": "alertsRecipient",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#alertsRecipient",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:4",
      "name": "exitTime",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#exitTime",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:48",
      "name": "behaviorAnalytics",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#behaviorAnalytics",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:47",
      "name": "integrationStatus",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#integrationStatus",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:49",
      "name": "approvalStatus",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#approvalStatus",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:40",
      "name": "hasAttendanceValidation",
      "type": "owl:ObjectProperty",
      "uri": "http://example.org/hrms#hasAttendanceValidation",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:42",
      "name": "alertType",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#alertType",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:41",
      "name": "authenticationLogId",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#authenticationLogId",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:44",
      "name": "alertsTriggered",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#alertsTriggered",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:43",
      "name": "alertReason",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#alertReason",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:46",
      "name": "maxAllowedBreaks",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#maxAllowedBreaks",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:45",
      "name": "entryTime",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#entryTime",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:59",
      "name": "hrmsIntegrationId",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#hrmsIntegrationId",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:15",
      "name": "authStatus",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#authStatus",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:14",
      "name": "validationDate",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#validationDate",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:58",
      "name": "employeeStatus",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#employeeStatus",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:17",
      "name": "attendanceAlertId",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#attendanceAlertId",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:16",
      "name": "hrmsStatus",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#hrmsStatus",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:19",
      "name": "behaviorEmployeeId",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#behaviorEmployeeId",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:18",
      "name": "alertsSent",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#alertsSent",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:51",
      "name": "integrationReason",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#integrationReason",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:50",
      "name": "facialRecognitionStatus",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#facialRecognitionStatus",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:53",
      "name": "hrmsAbsenceReason",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#hrmsAbsenceReason",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:54",
      "name": "authTime",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#authTime",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:10",
      "name": "behaviorMonitoringId",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#behaviorMonitoringId",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:13",
      "name": "validationEmployeeId",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#validationEmployeeId",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:12",
      "name": "failureReason",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#failureReason",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:56",
      "name": "purgeId",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#purgeId",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:25",
      "name": "lastAlertDate",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#lastAlertDate",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:69",
      "name": "alertStatus",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#alertStatus",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:28",
      "name": "monitoredBreakCount",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#monitoredBreakCount",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:27",
      "name": "validationReason",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#validationReason",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:29",
      "name": "attendanceReason",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#attendanceReason",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:62",
      "name": "validationPurgeId",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#validationPurgeId",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:61",
      "name": "authenticationStatus",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#authenticationStatus",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:20",
      "name": "hasHRMSIntegration",
      "type": "owl:ObjectProperty",
      "uri": "http://example.org/hrms#hasHRMSIntegration",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:64",
      "name": "hasAuthenticationLog",
      "type": "owl:ObjectProperty",
      "uri": "http://example.org/hrms#hasAuthenticationLog",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:63",
      "name": "employeeAttendanceId",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#employeeAttendanceId",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:65",
      "name": "approvalDate",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#approvalDate",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:21",
      "name": "hasBehaviorMonitoring",
      "type": "owl:ObjectProperty",
      "uri": "http://example.org/hrms#hasBehaviorMonitoring",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:24",
      "name": "alertEmployeeId",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#alertEmployeeId",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:23",
      "name": "authLogPurgeId",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#authLogPurgeId",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    },
    {
      "id": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:67",
      "name": "exitGateStatus",
      "type": "owl:DatatypeProperty",
      "uri": "http://example.org/hrms#exitGateStatus",
      "nodeType": "property",
      "size": 12,
      "color": "#2979FF",
      "group": "property"
    }
  ],
  "links": [
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:55",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:71",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:71",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:1",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:70",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:70",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:55",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:37",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:37",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:11",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:39",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:39",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:68",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:66",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:38",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:38",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:68",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:60",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:9",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:9",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:11",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:72",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:72",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:1",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:52",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:75",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:75",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:11",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:31",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:31",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:11",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:74",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:74",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:1",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:30",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:30",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:52",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:77",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:77",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:66",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:33",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:33",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:11",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:5",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:5",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:22",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:60",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:76",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:76",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:60",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:32",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:32",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:36",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:60",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:6",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:6",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:57",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:11",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:35",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:35",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:57",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:52",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:7",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:7",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:66",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:8",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:8",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:1",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:34",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:34",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:36",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:11",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:2",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:2",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:36",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:11",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:3",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:3",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:11",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:4",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:4",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:26",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:11",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:48",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:48",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:66",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:47",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:47",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:66",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:49",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:49",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:11",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:40",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:40",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:52",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:1",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:42",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:42",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:60",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:41",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:41",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:55",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:44",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:44",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:68",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:1",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:43",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:43",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:55",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:46",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:46",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:57",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:11",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:45",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:45",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:26",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:66",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:59",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:59",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:60",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:15",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:15",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:52",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:14",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:14",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:36",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:11",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:58",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:58",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:1",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:17",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:17",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:11",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:16",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:16",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:55",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:19",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:19",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:11",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:18",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:18",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:68",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:66",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:51",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:51",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:11",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:50",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:50",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:11",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:53",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:53",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:60",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:54",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:54",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:26",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:55",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:10",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:10",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:52",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:13",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:13",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:60",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:12",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:12",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:11",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:56",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:56",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:55",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:25",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:25",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:36",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:1",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:69",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:69",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:55",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:28",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:28",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:57",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:52",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:27",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:27",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:11",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:29",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:29",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:52",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:62",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:62",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:11",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:61",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:61",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:11",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:20",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:20",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:66",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:11",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:64",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:64",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:60",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:11",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:63",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:63",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:66",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:65",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:65",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:36",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:11",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:21",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:21",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:55",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:1",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:24",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:24",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:60",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:23",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:23",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:11",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:67",
      "type": "domain",
      "name": "hasDomain",
      "value": 4
    },
    {
      "source": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:67",
      "target": "4:4fc47bae-26c4-442d-95ef-d93e13a2e899:73",
      "type": "range",
      "name": "hasRange",
      "value": 4
    }
  ]
}
                        }
                    }
                ],
                "action": "callThirdPartyService"
            }
        }
    ],
    children: []
}

export default threeDGraph
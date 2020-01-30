# R.A.M-API
A caching API for R.A.M.

## Scope

A simple REST API for tracking data from R.A.M, An ETS2 self driving vehicle.

## Parameters

The following parameters are tracked within the API.

### vehicle

This value is the current model of vehicle, expected to be anything.

### task

The current task, expected to be 

- drive
- instructor
- pilot

Other values are accepted, but may not be correctly handled by downstream applications.

### mode

Any value expected, returned as received (with sterilization of course)

### path

The AI's current path, expected to be city/location.

Location could be a distribution company, repair or garage.

### control_mode

The state the control surface is currently in, expected to be 

- USER_CONTROL
- FULL_AUTO

## Endpoints

### Data 'uplink'

`POST /api/uplink`

**Auth**: Yes

**Content-Type**: `application/json`

**Headers**: `Authorization: [token]`

#### Data

This endpoint expects any of the parameters to be sent, multiple can be sent at once, any omitted from the POST
will remain the same. 

Below is an example of updating the task & control mode
` 
{
    "task": "drive",
    "control_mode": "USER_CONTROL"
}
`

#### Success Response

Code: `204 NO-CONTENT`

The body will be empty, but if a 204 is sent the data sent in the request has been applied to the database & should be 
available on the public API instantly, along with edit-dates.

#### Failed Response

Code: `4XX`

Probably due to an invalid token, see expect a human-readable JSON response with specific reasons for the rejection.

### Data Aggregates

`GET /api/aggregates`

**Auth**: No

**Expect Content-Type**: `application/json`

This endpoint returns all information from R.A.M from the cache database.

### Success Response

Code: `200 OK`

Data:
`
{
    "ram_online": true,
    "ram_location": "calais",
    "ram_parameters": {
        "vehicle": {"data": "Car", "last_changed": "2020-01-30T21:52:16+0000"},
        "task": {"data": "Pilot", "last_changed": "2020-01-30T21:52:16+0000"},
        "mode": {"data": "Piloting", "last_changed": "2020-01-30T21:52:16+0000"},
        "control_mode": {"data": "user_control", "last_changed": "2020-01-30T21:52:16+0000"},
        "path": {"data": "Brussels, Garage", "last_changed": "2020-01-30T21:52:16+0000"}
    },
    "last_uplink_time": "2020-01-30T21:52:16+0000"
}
`

### Failure

It's unlikely that this endpoint would fail, some data may be missing (in the event the system has recently re-initialized)

A 5XX error will be returned if the API suffers issues in contacting it's database, along with a human-readable JSON payload.
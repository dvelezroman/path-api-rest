# Node JS server with Express

## to install

```
yarn
```

## to run server in development mode

```
yarn start
```

## Endpoints

### Get All Routes [GET]

```
/maps/routes
```

### Get Route [GET]

```
/maps/routes?from={originCityName}&to={DestinationCityName}
```

### Create new Route [POST]

```
/maps/route
```

```
{
	"data": {
		"from": "Quito",
		"to": "Caracas",
		"distance": 2500
	}
}
```

### Update a Route [PUT]

```
/maps/route
```

```
{
	"data": {
		"from": "Quito",
		"to": "Caracas",
		"distance": 2500
	}
}
```

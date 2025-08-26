# Parking-Lot

## The goal is to manage a parking lot efficiently and effectively.

# HLD :
## 🖼️ System Diagram
![This is an alt text.](/image/sample.webp "This is a sample image.")
<!-- ###### This is a Heading h6 -->

## API's

| Method | Endpoint      | Body                    | Response                |
| ------------- |:-------------:| -- | -- | 
|POST |/car  |  {carID : string , kind : string} | {code : 200 ,positonID : string}     |
| POST| /releaseCar   | {carID : string , positonID : string}   | {code : 200 , massge : OK}     |
|GET |/isEmpty  |    | {code : 200 , massge : boolean }    |
|GET |/isFull   |   | {code : 200 , massge : boolean   }  |
|GET| /stats    |  | {code : 200 , massge : {carsSum : number , carsType : { MOTORCYCLE :number , CAR :number , VAN :number }}  }  |

## error model
| Method| Req | Body   | Res|
| ------------- |:-------------:| ----| ----|
|POST | /car |    {carID : null , kind : string} | {code : 400 ,massge : error}     |
| POST | /releaseCar |    {carID : null , positonID : string}   | {code : 400 , massge : error}     |

## schema
| floor  | SpotID |SpotSize | carID| DateOfStratParking | TimeOfStratParking |
| ------------- |:-------------:|:-------------:| :-------------:|:-------------:| :-------------:|
| number|   number  | number| number |Date | Date



## Emphasis

**indexes:**  
* SpotID 
* carID

**For security purposes, all vehicle details are encrypted,**  

__And every call from the client should have a JWT cookie.__

__There is a limit on the number of API call's from each IP address to a maximum of 10 every 60 seconds.__

__The reason I used MongoDB is mainly because of the flexibility and ease of planning that suits me because of the project and the limited time I have to plan.__

## Tests
|   | | TestType|
| ------------- |:-------------:|:-------------:|
|POST /car    {carID : string , kind : string} | {code : 200 ,positonID : string}     | success
| POST /releaseCar    {carID : string , positonID : string}   | {code : 200 , massge : OK}     | success 
| POST /releaseCar    {carID : null , positonID : string}   | {code : 400 , massge : error}     | error
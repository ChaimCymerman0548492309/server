# Emergency room

## The goal is to manage a Emergency room efficiently and effectively.  we are not taking care of the user detals and editem them.

---

## ⚙️ **Installation Guide (Local Setup)**

```bash
git clone https://github.com/ChaimCymerman0548492309/ER
cd app

# Install dependencies
npm install

npm run dev
```


__The reception works so that if the patient's condition is classified as serious or worse, he goes straight to the treatment room and the staff receives an alert.__

__The remaining patients wait in a queue in the order they arrived at HR.__


---


# HLD :
## 🖼️ System Diagram
![This is an alt text.](./HLDdiagram.png)
<!-- ###### This is a Heading h6 -->


## TYP'S
```
SymptomsCode : number[]

 Patient {
    patientID  :string ,
    name :string
    age : number ,
    symptoms : SymptomsCode[]
    arrivalTime : Date ,
    urgency  : "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
 }

treatmentRoom {
    roomId : string ,
    isAvailable : boolean ,
    currentpatient? : Patient
}

PatientAssignment {
    roomId : string ,
     patientID  :string
}
```
## API's
| Method | Endpoint      | Body                    | Response                |
| ------------- |:-------------:| -- | -- | 
|POST |/adimidPatient  |  {patient :Patient} | {patientAssignment : PatientAssignment}     |
| POST| /dischargPatient   | {patientID : string}   | {massege : boolean}     |
|GET |/getRoomStatus  |    | {freeRooms : number , occupiedRooms : number }    |
|GET |/getQueeStatus   |   | {high : number , medium : number , low : number }  |


## error model
| Method| Req | Body   | Res|
| ------------- |:-------------:| ----| ----|
|POST | /adimidPatient |   {patient :string} | {code : 400 ,massge : error}     |
| POST | /dischargPatient |    {patientID : number}   | {code : 400 , massge : error}     |

## schema of treatmentRoom
| roomId  | isAvailable |currentpatient |
| ------------- |:-------------:|:-------------:|
| string|   boolean  | patient| 
## schema of patient
| patientID  | name |age | symptoms | arrivalTime | urgency |
| ------------- |:-------------:|:-------------:| :-------------:|:-------------:| :-------------:|
| string|   string  | number| SymptomsCode[] |Date | Urgency




**indexes:**  
* patientID 
* roomId

**For security purposes, all vehicle details are encrypted,**  

__And every call from the client should have a JWT cookie.__

__There is a limit on the number of API call's from each IP address to a maximum of 10 every 60 seconds.__

__The reason I used MongoDB is mainly because of the flexibility .__

__Currently all the information is written into a JSON file. Later I will write the information into the MONGODB schema .__


## Tests
|   | | TestType|
| ------------- |:-------------:|:-------------:|
|POST /adimidPatient    {patient :Patient} | {patientAssignment : PatientAssignment}      | success
| POST /dischargPatient    {patientID : string}   | {massege : boolean}     | success 
| POST /dischargPatient     {patientID : number}   | {code : 400 , massge : error}     | error

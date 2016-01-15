'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

function PriceForDriver(cars, rentals, tabAct)
{
  for(var i=0; i<rentals.length; i++)
  {
      var idrent = rentals[i].carId;
      var dist = rentals[i].distance;

      for (var j=0; j<cars.length ; j++)
      {
        var idcar = cars[j].id;
        var carPriceDay = cars[j].pricePerDay;
        var carPriceKm = cars[j].pricePerKm;

        if (idrent==idcar)
        {
          var time = NumberDay(rentals[i].pickupDate, rentals[i].returnDate)
          
          var priceDist = dist * carPriceKm;
          var priceTime = 0;

          for (var t=1; t<=time ; t++)
          {
            if (t==1)
            {
              priceTime = carPriceDay;

            }
            else if (t > 1 && t <5)
              {
                priceTime = 0.9 *carPriceDay;
              }

              else if(t > 4 && t <11)
              {
                priceTime = 0.7 *carPriceDay;
              }    
              else if(t>10)
              {
                priceTime = 0.5 *carPriceDay;
              } 
          }
      }
  }
  var rentalPrice = priceTime *time + priceDist;
  
 rentals[i].price= rentalPrice;

  var commiss = 0.3* rentalPrice;
  var insu = commiss *0.5;
  var assist= time;
  var drivy = commiss - (insu+assist);

  rentals[i].commission.insurance = insu;
  rentals[i].commission.assistance = assist;
  rentals[i].commission.drivy = drivy;

  var deduct = 4 * time;

  if (rentals[i].options.deductibleReduction== true)
  rentals[i].price += deduct;

for (var a = 0; a < tabAct.length; a++)
  {
    if (tabAct[a].rentalId == rentals[i].id)
    {
      for (var p=0; p < tabAct[a].payment.length; p++)
      {
        if (tabAct[a].payment[p].who == "driver")
          tabAct[a].payment[p].amount = rentals[i].price;

        else if (tabAct[a].payment[p].who == "owner")
           tabAct[a].payment[p].amount = rentals[i].price -commiss;

        else if (tabAct[a].payment[p].who == "insurance") 
           tabAct[a].payment[p].amount = insu;

        else if (tabAct[a].payment[p].who == "assistance")
          tabAct[a].payment[p].amount = assist;

        else if (tabAct[a].payment[p].who == "drivy")   
         tabAct[a].payment[p].amount = drivy+ deduct;

      }
    }
  }

}
}

function NumberDay (date1, date2)
{
    var pickD = new Date(date1);
    var returnD = new Date(date2);

    return 1 + (returnD - pickD)/ (24* 3600 * 1000); 
}

function ModifOfRentals(rentals, cars)
{
  for(var m = 0; m < rentalModifications.length ; m++)
  {

    for(var r = 0 ; r < rentals.length ; r++)
    {

      if(rentals[r].id == rentals[m].rentalId )
      {
        if(rentalModifications[i].distance)
          rentals[r].distance =  rentalModifications[m].distance; 
        
        if(rentalModifications[i].pickupDate)
          rentals[r].pickupDate =  rentalModifications[m].pickupDate; 
                  
        if(rentalModifications[i].returnDate)
          rentals[r].returnDate =  rentalModifications[m].returnDate; 
        
        if(rentalModifications[i].options)
          rentals[r].options.deductibleReduction = rentalModifications[m].options.deductibleReduction; 

      }                  
    }
  }                      
}

//console.log(cars);
console.log(rentals);
console.log(actors);
//console.log(rentalModifications);

PriceForDriver(cars, rentals, actors);
ModifOfRentals(rentals,cars);
var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];
      /* solve using filter() & all() / any() */
      productsICanEat = (products).filter(
        function(product) {
          return (product.containsNuts === false);
        }).filter(
          function (product) {
            return !_(product.ingredients).any(
              function (item){
                return item === 'mushrooms'
              })
          });

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = 0;
    sum = (_.range(1, 1000)).filter(
      function (num) {
        return (num % 3 === 0 || num % 5 === 0);
      }
    ).reduce(
      function (lastCall, sum) {
        return lastCall + sum;
      }, 0
    );

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    ingredientCount = _(products).chain().map(function (product) {
        return product.ingredients
      }).flatten().reduce(
        function (obj, item) {
          obj[item] = (obj[item] || 0) + 1;
          return obj;
        }, {}).value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */

  it("should find the largest prime factor of a composite number",
  function () {
    var largestPrimeFactor = function (num) {
      var divisor = 2;
      while (num > 1) {
        if (num % divisor === 0) {
          num = num / divisor;
        } else {
          divisor++;
        }
      }
      return divisor;
    }

    expect(largestPrimeFactor(19440)).toBe(5); // 600851475143 : 6857

  });

  /*********************************************************************************/

  it("should find the largest palindrome made from the product of two 3 digit numbers",
  function () {
    var largestPalindrome = function() {
      function isPalindrome(num) {
        num = '' + num;
        var reversed = num.split('').reverse().join('');
        return num === reversed;
      }

      var largest = 0;

      for (var i = 100; i < 1000; i++) {
        for (var j = i; j < 1000; j++) {
          var product = i * j;

          if (isPalindrome(product) && product > largest) {
            largest = product;
          }
        }
      }
      return largest;
    }

    expect(largestPalindrome()).toBe(906609);
  });

  /*********************************************************************************/

  it("should find the smallest number divisible by each of the numbers 1 to 20",
  function () {
    var smallestDivisibleNumber = function (num) {
      var factors = [];
      // loop thru 1 - 20 //
      for (var i = 1; i <= num; i++) {
        var j = i;
        factors.forEach(function (val) {
          // Get the L.C.M of each number
          if (j % val === 0) {
            j /= val;
          }
        });
        factors.push(j);
      }
      // mulitply each number.
      var mulitply = factors.reduce(function (acc, val) {
        return acc *= val;
      }, 1);
      return mulitply;
    };

    expect(smallestDivisibleNumber(20)).toBe(232792560);
  });

  /*********************************************************************************/

  it("should find the difference between the sum of the squares and the square of the sums",
  function () {
    var sumSquareDifference = function (num) {
      var sum = 0;
      var squaredArrSum = 0;
      var squaredArr = []
      var squareOfTheSum;
      var squareSumDifference;

      for (var i = 1; i <= num; i++) {
        sum += i;
        squaredArr.push(Math.pow(i, 2));
      }
      for (var j = 0; j < squaredArr.length; j++) {
        squaredArrSum += squaredArr[j];
      }
      squareOfTheSum = Math.pow(sum, 2);
      squareSumDifference = Math.abs(squareOfTheSum - squaredArrSum);

      return squareSumDifference;

    }

    expect(sumSquareDifference(10)).toBe(2640);
  });

  /*********************************************************************************/

  it("should find the 10001st prime",
  function () {
    var find10001Prime = function (position) {
      var prime = true;
      var counter = 0;
      var primes = [];
      var current = 1;

      while (counter < position) {
        current++;
        prime = true;
        for (var i = 2; i < current; i++) {
          if (current % i === 0) {
            prime = false;
            break;
          }
        }
        if (prime) {
          primes.push(current);
          counter++
        }
      }

      return primes[position - 1];
    }

    expect(find10001Prime(10001)).toBe(104743);
  });

});

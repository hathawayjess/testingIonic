angular.module('starter.controllers', [])

var app = angular.module('starter.controllers');

app.controller("calendarDemo", function($scope) {
  $scope.day = moment();
});


app.directive("calendar", function() {

  return {
    restrict: "E",
    templateUrl: "templates/calendar.html",
    scope:   {
      selected: "=",
      startDate: "=startDate",
      cycleLength: "=cycleLength"
    },
    link: function(scope) {

      scope.selected = _removeTime(scope.selected || moment());
      scope.month = scope.selected.clone();


      var start = scope.selected.clone();
      start.date(1);
      _removeTime(start.day(0));

      _buildMonth(scope, start, scope.month);


      scope.select = function(day) {
        scope.selected = day.date;
        console.log(day);


      };

      scope.next = function() {
        var next = scope.month.clone();
        _removeTime(next.month(next.month() + 1).date(1));
        scope.month.month(scope.month.month() + 1);
        _buildMonth(scope, next, scope.month);
      };

      scope.previous = function() {
        var previous = scope.month.clone();
        _removeTime(previous.month(previous.month() - 1).date(1));
        scope.month.month(scope.month.month() - 1);
        _buildMonth(scope, previous, scope.month);
      };
    }
  };



  function _removeTime(date) {
    return date.day(0).hour(0).minute(0).second(0).millisecond(0);
  }

  function _buildMonth(scope, start, month) {
    scope.weeks = [];
    var done = false,
      date = start.clone(),
      monthIndex = date.month(),
      count = 0;
    while (!done) {
      scope.weeks.push({
        days: _buildWeek(date.clone(), month)
      });
      date.add(1, "w");
      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }

  }

  function _buildWeek(date, month, phase) {
    var days = [];

    // var phase = function() {
    //   if (date.date() === 3) {
    //     phase = "woo";
    //   }
    // }

    for (var i = 0; i < 7; i++) {
      days.push({
        name: date.format("dd").substring(0, 1),
        number: date.date(),
        isCurrentMonth: date.month() === month.month(),
        isToday: date.isSame(new Date(), "day"),
        date: date,
        phase: phase
      });
      date = date.clone();
      // console.log(date.date());
      date.add(1, "d");
    }

//date.date() is the day number

    // console.log(days)
    return days;
  }




//startDate and cycleLength are on scope



});



//three if statements for length of months; feb, 30day months, leap years
// take input date, add (input range / 4)
// do stuff to (input range/ 4)[each division]
// .get('/stuff/:day', callback) => DO NOT WRITE 28 ENPOINTS FOR THE LOVE OF ALL THAT IS HOLY DO NOT DO IT
// bloodTime.push(input-range.length)
//



app.controller('DashCtrl', function($scope) {

$scope.startDate = '';
$scope.cycleLength = '';
$scope.dayOfCycle = '';
$scope.cycleLengthArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                          13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
                          24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34];
$scope.userCycleLengthArray = [];
//cycleLength - 14 = ovulation day
//startDate + cycleLength = full length of cycle




$scope.changedCycleLength = function(val) {
    $scope.userCycleLengthArray = [];
    $scope.cycleLength = val;
    for (var i = 1; i <= val; i++) {
      $scope.userCycleLengthArray.push(i);
    }

    console.log($scope.userCycleLengthArray);
}



// function arrayLength(val) {
//   parseInt(val);
//   for (var i = 1; i <= $scope.cycleLength; i++) {
//     $scope.cycleLengthArray.push(i);
//   }
//   console.log($scope.cycleLengthArray);
//   return $scope.cycleLengthArray;
// }
//
// $scope.$watch('cycleLength', function(val) {
//   console.log(val);
//   arrayLength(val);
//   // $scope.cycleLength = val;
//   console.log("on-change", $scope.cycleLength);
//
// })

$scope.startDateChange = function(val) {
  $scope.startDate = val;
  console.log("on-change", $scope.startDate);
}







$scope.dayOfCycleChange = function(val) {
  $scope.dayOfCycle = val;
  console.log("on-change", $scope.dayOfCycle);
}

})


app.directive('mainDir', function() {

  function lengthArray() {
    for (var i = 0; i <= $scope.cycleLength; i++) {
      $scope.cycleLengthArray.push(i);
    }
    console.log($scope.cycleLengthArray);
    return $scope.cycleLengthArray;
  }
})


app.controller('modalCtrl', function($scope, $ionicModal) {
  $scope.contact = {
  name: 'Mittens Cat',
  info: 'Tap anywhere on the card to open the modal'
}

$ionicModal.fromTemplateUrl('contact-modal.html', {
  scope: $scope,
  animation: 'slide-in-up'
}).then(function(modal) {
  $scope.modal = modal
})

$scope.openModal = function() {
  $scope.modal.show()
}

$scope.closeModal = function() {
  $scope.modal.hide();
};

$scope.$on('$destroy', function() {
  $scope.modal.remove();
});
})



app.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

app.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

app.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

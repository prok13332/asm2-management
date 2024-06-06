var app = angular.module("myapp", ["ngRoute"]);
app.config(function ($routeProvider) {
  $routeProvider
    .when("/", { templateUrl: "trangchu.html", controller: "myCtrl" })
    .when("/gioithieu", { templateUrl: "gioithieu.html", controller: "myCtrl" })
    .when("/lienhe", { templateUrl: "lienhe.html", controller: "myCtrl" })
    .when("/detail/:id", {
      templateUrl: "sanpham_chitiet.html",
      controller: "myCtrl",
    })
    .when("/mien_bac", { templateUrl: "mien_bac.html", controller: "myCtrl" })
    .when("/mien_nam", { templateUrl: "mien_nam.html", controller: "myCtrl" })
    .when("/mien_trung", {
      templateUrl: "mien_trung.html",
      controller: "myCtrl",
    })
    .when("/header", { templateUrl: "header.html", controller: "myCtrl" })
    .otherwise({ templateUrl: "trangchu.html", controller: "myCtrl" });
});
app.controller("myCtrl", function ($scope, $rootScope, $routeParams, $http) {
  // Load products
  $scope.loggedInUser = $rootScope.loggedInUser;
  $scope.show = false;

  $scope.username = "";
  $scope.password = "";

  $scope.products = [];
  $http.get("http://localhost:3000/products").then(function (response) {
    $scope.products = response.data;
    console.log($scope.products);
    $scope.detailPro = $scope.products.find(
      (item) => item.id == $routeParams.id
    );
  });

  $scope.sort = "price";
  $scope.tang = function () {
    $scope.sort = "price";
  };
  $scope.giam = function () {
    $scope.sort = "-price";
  };
});

app.controller(
  "LoginController",
  function ($scope, $http, $window, $rootScope) {
    $scope.username = "";
    $scope.password = "";
    $scope.message = "";
    $scope.loggedInUser = "";

    $scope.login = function () {
      $http
        .post("http://localhost:4000/login", {
          username: $scope.username,
          password: $scope.password,
        })
        .then(
          function (response) {
            alert("Đăng nhập thành công");
            $rootScope.loggedInUser = "user1"; // Đặt tên người dùng đã đăng nhập
            $("#exampleModal").modal("hide"); // Đóng modal đăng nhập

            // Remove modal backdrop manually
            $(".modal-backdrop").remove();

            $window.location.href = "#!index"; // Chuyển hướng đến trang index
          },
          function (error) {
            alert("Login failed: " + error.data);
          }
        );
    };
  }
);
app.controller(
  "SignUpController",
  function ($scope, $http, $window, $rootScope) {
    $scope.signUp = function () {
      console.log("Name:", $scope.txtHoten);
      console.log("Email:", $scope.txtEmail);
      console.log("Password:", $scope.txtPass);
      console.log("Re-entered Password:", $scope.txtRePass);
      console.log("Gender:", $scope.gender);
      console.log("Country:", $scope.country);
      console.log("Agree to terms:", $scope.agree);

      alert("Đăng ký thành công");
      $scope.clearForm();
      $("#exampleModal2").modal("hide"); // Đóng modal đăng ký
      $window.location.href = "#!index"; // Chuyển hướng đến trang index
      // console.log({{txtHoten}});
      $("#exampleModal").modal("show"); // Mở modal đăng nhập
    };

    $scope.countries = ["Việt Nam", "Trung Quốc", "Mỹ"];

    $scope.clearForm = function () {
      $scope.txtHoten = "";
      $scope.txtEmail = "";
      $scope.txtPass = "";
      $scope.txtRePass = "";
      $scope.gender = null;
      $scope.country = "";
      $scope.agree = false;
      $scope.frmSignUp.$setUntouched();
      $scope.frmSignUp.$setPristine();
    };

    $scope.checkPassMatch = function () {
      return $scope.txtPass === $scope.txtRePass;
    };
  }
);

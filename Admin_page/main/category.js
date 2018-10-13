var category = {
  fetchCategory: function() {
    project.showBusy();
    axios
      .get(app.API + "api/category", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmJkZDU1Y2U5NDQzZDYwMDk4MjlhMmEiLCJpYXQiOjE1MzkxNzAxOTksImV4cCI6MTU3MDcwNjE5OX0.uA7Q_oItU57M4-Xcbd4v2RGLKAF9w-pDXvzWLW-VWPY"
        }
      })
      .then(function(response) {
        console.log(response);
        project.hideBusy();
        if (response.status !== 200) return app.alert(response.status);

        events.categories = response.data.data;

        var list = "";
        response.data.data.forEach((event, index) => {
          list += `<tr>
            <td>${index + 1}</td>
            <td>${event.categoryName}</td>
            <td>${event.createdBy}</td>
            <td>
                <div class="btn-group btn-group-sm" role="group">
                    <button  onClick=category.categoryDetails(this) type="button" class="btn btn-outline-info" data-toggle="modal"
                         data-id=${event._id}>
                        <span class="fa fa-pencil" aria-hidden="true"></span>
                    </button>
                    <button onclick="category.showcategorydeleteModal(this)" type="button" class="btn btn-outline-danger" data-toggle="modal"
                          data-id=${event._id}>
                        <span class="fa fa-trash" aria-hidden="true"></span>
                    </button>
                </div>
            </td>
        </tr>`;
        });
        views.element("categoryTable").innerHTML = list;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  categoryDetails: function(target) {
    $("#editcategorymodal").modal("show");
    var id = target.getAttribute("data-id");
    events.selectedid = id;
    for (var event of events.categories) {
      if (event._id === id) {
        events.selected = event;
        break;
      }
    }
    let categoryName = `
        <label for="editcategoryName">Category Name</label>
        <input type="name" class="form-control" id="editcategoryName" value='${
          events.selected.categoryName
        }'>
    `;

    views.element("categoryName").innerHTML = categoryName;
  },
  editCategory: function() {
    project.removeError();
    project.showSmallBusy();
    var editData = {
      categoryName: views.element("editcategoryName").value
    };
    console.log(events.selectedid);
    axios
      .put(app.API + `api/category/${events.selectedid}`, editData, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmJkZDU1Y2U5NDQzZDYwMDk4MjlhMmEiLCJpYXQiOjE1MzkxNzAxOTksImV4cCI6MTU3MDcwNjE5OX0.uA7Q_oItU57M4-Xcbd4v2RGLKAF9w-pDXvzWLW-VWPY"
        }
      })
      .then(function(response) {
        project.hideSmallBusy();
        console.log(response);
        $("#editcategorymodal").modal("hide");
        category.fetchCategory();
      })
      .catch(function(error) {
        project.hideSmallBusy();
        project.showError(error.response.data.message);
        console.log(error);
      });
  },
  createCategory: function() {
    $("#categorymodal").modal("show");
    var name = views.element("categorycreateformName").value;
    if (!categoryName) {
      alert("Please fill all the fields");
      return;
    }
    project.removeError();
    project.showSmallBusy();
    var createData = {
      categoryName: name
    };
    axios
      .post(app.API + `api/category`, createData, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmJkZDU1Y2U5NDQzZDYwMDk4MjlhMmEiLCJpYXQiOjE1MzkxNzAxOTksImV4cCI6MTU3MDcwNjE5OX0.uA7Q_oItU57M4-Xcbd4v2RGLKAF9w-pDXvzWLW-VWPY"
        }
      })
      .then(function(response) {
        project.hideSmallBusy();
        console.log(response);
        $("#categorymodal").modal("hide");
        category.fetchCategory();
      })
      .catch(function(error) {
        project.hideSmallBusy();
        project.showError(error.response.data.message);
        console.log(error);
      });
  },
  showcategorydeleteModal: function(target) {
    $("#deletecategorymodal").modal("show");
    var id = target.getAttribute("data-id");
    console.log(id);
    events.selectedid = id;
  },
  deleteCategory: function() {
    project.showSmallBusy();
    axios
      .delete(app.API + `api/category/${events.selectedid}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmJkZDU1Y2U5NDQzZDYwMDk4MjlhMmEiLCJpYXQiOjE1MzkxNzAxOTksImV4cCI6MTU3MDcwNjE5OX0.uA7Q_oItU57M4-Xcbd4v2RGLKAF9w-pDXvzWLW-VWPY"
        }
      })
      .then(function(response) {
        project.hideSmallBusy();
        console.log(response);
        $("#deletecategorymodal").modal("hide");
        category.fetchCategory();
      })
      .catch(function(error) {
        project.hideSmallBusy();
        project.showError(error.response.data.message);
        console.log(error);
      });
  },
  loadCategory: function() {
    views.impose("categoryUIView", function() {
      category.fetchCategory();
    });
    //views.setURL("/category.html");
    //goto,impose,overlay,flash
  },
  quickFetchCategory: function() {
    axios
      .get(app.API + "api/category", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmJkZDU1Y2U5NDQzZDYwMDk4MjlhMmEiLCJpYXQiOjE1MzkxNzAxOTksImV4cCI6MTU3MDcwNjE5OX0.uA7Q_oItU57M4-Xcbd4v2RGLKAF9w-pDXvzWLW-VWPY"
        }
      })
      .then(function(response) {
        console.log(response);
        if (response.status !== 200) return app.alert(response.status);

        events.categories = response.data.data;
        console.log("category fetched success");
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};

var order = {
  loadOrders: function() {
    views.impose("orderUIView", function() {
      order.fetchOrders();
    });
    //views.setURL("/category.html");
    //goto,impose,overlay,flash
  },
  fetchOrders: function() {
    project.showBusy();
    axios
      .get(app.API + "api/orders/all", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("vendeeToken")
        }
      })
      .then(function(response) {
        console.log(response);
        project.hideBusy();
        if (response.status !== 200) return app.alert(response.status);

        var list = "";
        var data = [];

        Object.keys(response.data.data).map(value => {
          response.data.data[value].productID.map(param => {
            return data.push({
              _id: response.data.data[value]._id,
              productDetails: param,
              customerID: response.data.data[value].customerID,
              shopperReferenceNumber:
                response.data.data[value].shopperReferenceNumber,
              status: response.data.data[value].status,
              driverReferenceNumber:
                response.data.data[value].driverReferenceNumber
            });
          });
        });
        console.log("movie val is:" + data);
        events.orders = data;
        data.map((movie, index) => {
          console.log(movie);
          list += `<tr>
            <td>${index + 1}</td>
            <td>${movie.productDetails.productName}</td>
            <td>${movie.productDetails.quantity}</td>
            <td>${movie.shopperReferenceNumber}</td>
            <td>${movie.customerID.firstname +
              " " +
              movie.customerID.lastname}</td>
              <td>${movie.status}</td>
            <td>${movie.customerID.phoneNumber}</td>
            <td>${movie.customerID.email}</td>
            <td>${movie.driverReferenceNumber}</td>
            <td>
                <div class="btn-group btn-group-sm" role="group">
                    <button  onClick=order.orderDetails(this) type="button" class="btn btn-outline-info" data-toggle="modal"
                         data-id=${movie._id}>
                        <span class="fa fa-pencil" aria-hidden="true"></span>
                    </button>
                </div>
            </td>
        </tr>`;
        });

        views.element("orderTable").innerHTML = list;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  orderDetails: function(target) {
    $("#editordermodal").modal("show");
    var id = target.getAttribute("data-id");
    events.selectedid = id;
    for (var event of events.orders) {
      if (event._id === id) {
        events.selected = event;
        break;
      }
    }

    let status = `
        <label for="editorderStatus">Status</label>
        <input type="name" class="form-control" id="editorderStatus" value='${
          events.selected.status
        }'>
    `;
    let driverRef = `
    <label for="editorderRef">Driver Ref</label>
    <input type="name" class="form-control" id="editorderRef" value='${
      events.selected.driverReferenceNumber
    }'>
`;
    views.element("orderEditStatus").innerHTML = status;
    views.element("orderEditDriverRef").innerHTML = driverRef;
  },
  editOrder: function() {
    project.removeError();
    project.showSmallBusy();
    var editData = {
      status: views.element("editorderStatus").value,
      driverReferenceNumber: views.element("editorderRef").value
    };
    console.log(events.selectedid);
    axios
      .put(app.API + `api/orders/${events.selectedid}`, editData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("vendeeToken")
        }
      })
      .then(function(response) {
        project.hideSmallBusy();
        console.log(response);
        $("#editordermodal").modal("hide");
        order.fetchOrders();
      })
      .catch(function(error) {
        project.hideSmallBusy();
        project.showError(error.response.data.message);
        console.log(error);
      });
  }
};

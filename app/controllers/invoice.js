import Controller from "@ember/controller";
import { computed } from "@ember/object";
import Table from "ember-light-table";

export default Controller.extend({
  invoices: [],
  columns: computed(function() {
    return [
      {
        label: "Id",
        valuePath: "id",
        width: "80px"
      },
      {
        label: "Amount",
        valuePath: "amount",
        width: "150px"
      },
      {
        label: "Date",
        valuePath: "date",
        width: "150px",
        draggable: true
      },
      {
        label: "Action",
        valuePath: "action_id",
        width: "150px",
        cellComponent: "action-buttons"
      }
    ];
  }),

  table: computed("model", function() {
    return new Table(this.get("columns"), []);
  }),

  totalAmount: 0,

  actions: {
    save() {
      const count = (this.invoices.length + 1).toString();
      const newInvoce = {
        id: count,
        amount: this.get("amount").toString(),
        date: this.formatDate(),
        action_id: count
      };

      const total = parseInt(this.get("amount")) + this.totalAmount;
      this.set("totalAmount", total);
      this.invoices.push(newInvoce);
      this.table.addRows(this.invoices);
      this.set("amount", "");
    },

    filter(filter) {
      const filterRows = [];
      this.invoices.map(invoice => {
        if (invoice.date.includes(filter)) filterRows.push(invoice);
      });

      this.table.setRows(filterRows);
    }
  },
  formatDate() {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
});

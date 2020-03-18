import { observable, action, computed } from "mobx";

class DataStore {
  @observable companies = [];
  @observable companiesFiltered = [];
  @observable loading = false;
  @observable currentPage = 1;
  @observable companiesPerPage = 10;
}

const store = new DataStore();
export default store;

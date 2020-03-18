import { observable, action, computed } from "mobx";
import axios from "axios";

const pathUrl = `https://recruitment.hal.skygate.io/companies`; // url to companies list
const detailsPathUrl = `https://recruitment.hal.skygate.io/incomes/`; // needs an id of company

class DataStore {
  @observable company = {};
  @observable companies = [];
  @observable companiesFiltered = [];
  @observable loading = false;
  @observable currentPage = 1;
  @observable companiesPerPage = 10;

  // download the data with API
  @action downloadCompanies = () => {
    let companies = [];
    this.changeLoading();

    axios
      .get(pathUrl)
      .then(async response => {
        const data = response.data;

        await Promise.all(
          data.map(async company => {
            const idPath = detailsPathUrl + company["id"];
            await axios.get(idPath).then(resp => {
              const detailsData = resp.data;

              // count total income per company
              const totalIncome = detailsData["incomes"].reduce(
                (prevObj, currObj) => ({
                  value: parseFloat(prevObj.value) + parseFloat(currObj.value)
                })
              );

              const updatedCompany = {
                ...company,
                incomes: detailsData["incomes"],
                totalIncome: totalIncome.value.toFixed(2)
              };

              companies.push(updatedCompany);
            });
          })
        ).catch(e => console.log(`Error! ${e.message}`));

        // sorting
        companies.sort((prevObj, currentObj) =>
          prevObj.totalIncome >= currentObj.totalIncome ? -1 : 1
        );
        this.companies = companies;
        this.companiesFiltered = companies;

        this.changeLoading();
      })
      .catch(e => console.log(`Error! ${e.message}`));
  };

  // change loading flag
  @action changeLoading = () => {
    this.loading = !this.loading;
  };
  // change page
  @action paginate = number => {
    this.currentPage = number;
  };

  // filter table of companies by name
  @action filter = name => {
    let companiesUpdated = this.companies;
    companiesUpdated = companiesUpdated.filter(company => {
      return company["name"].toLowerCase().search(name.toLowerCase()) !== -1;
    });

    this.companiesFiltered = companiesUpdated;
  };

  @action selectCompany = id =>
    (this.company = this.companies.find(
      company => parseInt(company.id) === parseInt(id)
    ));

  averageIncome = (dateStart = 0, dateEnd = 0) => {
    // if(dateStart === 0 && dateEnd === 0) {

    console.log(this.company.incomes);
    return 0;

    // let counter = 0;
    // const averIncome = this.company.incomes.reduce((prevIncome, currIncome) => {
    //   counter += 1;
    //   return {
    //     value: parseFloat(prevIncome.value) + parseFloat(currIncome.value)
    //   };
    // });

    // return averIncome.value / counter;
  };
}

const store = new DataStore();
export default store;
